import { useState, useCallback, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface Spreadsheet {
  id: string;
  name: string;
  modifiedTime: string;
}

export interface Sheet {
  id: number;
  title: string;
}

export interface SheetData {
  headers: string[];
  rows: string[][];
  totalRows: number;
}

export interface ColumnMapping {
  phone_number: number | null;
  name: number | null;
  email: number | null;
  tags: number | null;
  notes: number | null;
}

const FUNCTION_BASE_URL = "https://njnmspciqlwilrbbrcmc.supabase.co/functions/v1/google-sheets";

export const useGoogleSheets = () => {
  const { user, session } = useAuth();
  const queryClient = useQueryClient();
  const [isConnecting, setIsConnecting] = useState(false);

  // Check connection status
  const { data: connectionStatus, isLoading: isCheckingConnection, refetch: refetchStatus } = useQuery({
    queryKey: ['google-sheets-status', user?.id],
    queryFn: async () => {
      if (!session?.access_token) return { connected: false };
      
      const response = await fetch(`${FUNCTION_BASE_URL}/status`, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });
      
      if (!response.ok) {
        return { connected: false };
      }
      
      return response.json();
    },
    enabled: !!user && !!session,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const isConnected = connectionStatus?.connected ?? false;

  // Listen for OAuth callback messages
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'google-sheets-success') {
        console.log('Google Sheets connected successfully');
        setIsConnecting(false);
        refetchStatus();
        queryClient.invalidateQueries({ queryKey: ['google-sheets-spreadsheets'] });
        toast.success('Google Sheets connected successfully!');
      } else if (event.data?.type === 'google-sheets-error') {
        console.error('Google Sheets connection error:', event.data.error);
        setIsConnecting(false);
        toast.error(`Failed to connect: ${event.data.error}`);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [refetchStatus, queryClient]);

  // Initiate OAuth connection
  const connect = useCallback(async () => {
    if (!session?.access_token) {
      toast.error('Please sign in first');
      return;
    }

    setIsConnecting(true);
    
    try {
      const response = await fetch(`${FUNCTION_BASE_URL}/auth`, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to get auth URL');
      }

      const { authUrl } = await response.json();
      
      // Open popup for OAuth
      const width = 600;
      const height = 700;
      const left = window.screenX + (window.innerWidth - width) / 2;
      const top = window.screenY + (window.innerHeight - height) / 2;
      
      const popup = window.open(
        authUrl,
        'google-oauth',
        `width=${width},height=${height},left=${left},top=${top},popup=yes`
      );

      if (!popup) {
        toast.error('Please allow popups to connect Google Sheets');
        setIsConnecting(false);
      }
    } catch (error) {
      console.error('Connection error:', error);
      toast.error('Failed to connect to Google Sheets');
      setIsConnecting(false);
    }
  }, [session]);

  // Disconnect
  const disconnect = useMutation({
    mutationFn: async () => {
      if (!session?.access_token) throw new Error('Not authenticated');
      
      const response = await fetch(`${FUNCTION_BASE_URL}/disconnect`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to disconnect');
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['google-sheets-status'] });
      queryClient.invalidateQueries({ queryKey: ['google-sheets-spreadsheets'] });
      toast.success('Disconnected from Google Sheets');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  // Fetch spreadsheets
  const { 
    data: spreadsheets, 
    isLoading: isLoadingSpreadsheets,
    refetch: refetchSpreadsheets 
  } = useQuery({
    queryKey: ['google-sheets-spreadsheets', user?.id],
    queryFn: async (): Promise<Spreadsheet[]> => {
      if (!session?.access_token) return [];
      
      const response = await fetch(`${FUNCTION_BASE_URL}/spreadsheets`, {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (!response.ok) {
        const error = await response.json();
        if (error.code === 'NOT_CONNECTED') {
          return [];
        }
        throw new Error(error.error || 'Failed to fetch spreadsheets');
      }

      const data = await response.json();
      return data.spreadsheets || [];
    },
    enabled: !!user && !!session && isConnected,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Fetch sheet names for a spreadsheet
  const fetchSheets = useCallback(async (spreadsheetId: string): Promise<Sheet[]> => {
    if (!session?.access_token) return [];
    
    const response = await fetch(`${FUNCTION_BASE_URL}/sheets/${spreadsheetId}`, {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch sheets');
    }

    const data = await response.json();
    return data.sheets || [];
  }, [session]);

  // Fetch sheet data
  const fetchSheetData = useCallback(async (
    spreadsheetId: string, 
    sheetName: string,
    maxRows: number = 1000
  ): Promise<SheetData> => {
    if (!session?.access_token) {
      return { headers: [], rows: [], totalRows: 0 };
    }
    
    const response = await fetch(
      `${FUNCTION_BASE_URL}/data/${spreadsheetId}/${encodeURIComponent(sheetName)}?maxRows=${maxRows}`,
      {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch sheet data');
    }

    return response.json();
  }, [session]);

  return {
    isConnected,
    isCheckingConnection,
    isConnecting,
    connect,
    disconnect: disconnect.mutate,
    isDisconnecting: disconnect.isPending,
    spreadsheets: spreadsheets ?? [],
    isLoadingSpreadsheets,
    refetchSpreadsheets,
    fetchSheets,
    fetchSheetData,
  };
};