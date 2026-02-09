import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileSpreadsheet,
  ChevronRight,
  Loader2,
  RefreshCw,
  Link2Off,
  ArrowRight,
  ArrowLeft,
  Check,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGoogleSheets, Sheet, SheetData, ColumnMapping } from '@/hooks/useGoogleSheets';
import { ParsedContact } from '@/utils/contactParsers';

interface GoogleSheetsImportProps {
  onContactsParsed: (contacts: ParsedContact[]) => void;
  onBack: () => void;
}

type ImportStep = 'connect' | 'select-spreadsheet' | 'select-sheet' | 'map-columns' | 'preview';

const CONTACT_FIELDS = [
  { key: 'phone_number', label: 'Phone Number', required: true },
  { key: 'name', label: 'Name', required: false },
  { key: 'email', label: 'Email', required: false },
  { key: 'tags', label: 'Tags', required: false },
  { key: 'notes', label: 'Notes', required: false },
] as const;

const GoogleSheetsImport = ({ onContactsParsed, onBack }: GoogleSheetsImportProps) => {
  const {
    isConnected,
    isCheckingConnection,
    isConnecting,
    connect,
    disconnect,
    isDisconnecting,
    spreadsheets,
    isLoadingSpreadsheets,
    refetchSpreadsheets,
    fetchSheets,
    fetchSheetData,
  } = useGoogleSheets();

  const [step, setStep] = useState<ImportStep>('connect');
  const [selectedSpreadsheet, setSelectedSpreadsheet] = useState<string | null>(null);
  const [selectedSpreadsheetName, setSelectedSpreadsheetName] = useState<string>('');
  const [sheets, setSheets] = useState<Sheet[]>([]);
  const [selectedSheet, setSelectedSheet] = useState<string | null>(null);
  const [isLoadingSheets, setIsLoadingSheets] = useState(false);
  const [sheetData, setSheetData] = useState<SheetData | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [columnMapping, setColumnMapping] = useState<ColumnMapping>({
    phone_number: null,
    name: null,
    email: null,
    tags: null,
    notes: null,
  });
  const [parsedContacts, setParsedContacts] = useState<ParsedContact[]>([]);

  // Update step based on connection status
  useEffect(() => {
    if (!isCheckingConnection) {
      if (isConnected && step === 'connect') {
        setStep('select-spreadsheet');
      } else if (!isConnected) {
        setStep('connect');
      }
    }
  }, [isConnected, isCheckingConnection, step]);

  // Load sheets when spreadsheet is selected
  useEffect(() => {
    if (selectedSpreadsheet) {
      setIsLoadingSheets(true);
      fetchSheets(selectedSpreadsheet)
        .then(setSheets)
        .catch((err) => console.error('Error fetching sheets:', err))
        .finally(() => setIsLoadingSheets(false));
    }
  }, [selectedSpreadsheet, fetchSheets]);

  // Load data when sheet is selected
  useEffect(() => {
    if (selectedSpreadsheet && selectedSheet) {
      setIsLoadingData(true);
      fetchSheetData(selectedSpreadsheet, selectedSheet)
        .then((data) => {
          setSheetData(data);
          // Auto-detect column mappings
          autoDetectMappings(data.headers);
        })
        .catch((err) => console.error('Error fetching data:', err))
        .finally(() => setIsLoadingData(false));
    }
  }, [selectedSpreadsheet, selectedSheet, fetchSheetData]);

  // Auto-detect column mappings based on header names
  const autoDetectMappings = useCallback((headers: string[]) => {
    const mapping: ColumnMapping = {
      phone_number: null,
      name: null,
      email: null,
      tags: null,
      notes: null,
    };

    headers.forEach((header, index) => {
      const lowerHeader = header.toLowerCase().trim();
      
      if (lowerHeader.includes('phone') || lowerHeader.includes('mobile') || lowerHeader.includes('number') || lowerHeader.includes('tel')) {
        mapping.phone_number = index;
      } else if (lowerHeader.includes('name') || lowerHeader === 'full name' || lowerHeader === 'contact') {
        if (mapping.name === null) mapping.name = index;
      } else if (lowerHeader.includes('email') || lowerHeader.includes('e-mail')) {
        mapping.email = index;
      } else if (lowerHeader.includes('tag') || lowerHeader.includes('label') || lowerHeader.includes('group')) {
        mapping.tags = index;
      } else if (lowerHeader.includes('note') || lowerHeader.includes('comment') || lowerHeader.includes('description')) {
        mapping.notes = index;
      }
    });

    setColumnMapping(mapping);
  }, []);

  // Parse contacts from sheet data using column mapping
  const parseContacts = useCallback(() => {
    if (!sheetData || columnMapping.phone_number === null) return [];

    const contacts: ParsedContact[] = [];

    for (const row of sheetData.rows) {
      const phoneValue = row[columnMapping.phone_number]?.trim();
      if (!phoneValue) continue;

      // Clean phone number
      const phone = phoneValue.replace(/[^\d+]/g, '');
      if (phone.length < 7) continue;

      const contact: ParsedContact = {
        phone_number: phone,
        name: columnMapping.name !== null ? row[columnMapping.name]?.trim() || undefined : undefined,
        email: columnMapping.email !== null ? row[columnMapping.email]?.trim() || undefined : undefined,
        tags: columnMapping.tags !== null 
          ? row[columnMapping.tags]?.split(/[,;]/).map(t => t.trim()).filter(Boolean) 
          : undefined,
        notes: columnMapping.notes !== null ? row[columnMapping.notes]?.trim() || undefined : undefined,
      };

      contacts.push(contact);
    }

    return contacts;
  }, [sheetData, columnMapping]);

  // Update parsed contacts when mapping changes
  useEffect(() => {
    if (step === 'map-columns' || step === 'preview') {
      const contacts = parseContacts();
      setParsedContacts(contacts);
    }
  }, [step, parseContacts]);

  const handleSpreadsheetSelect = (spreadsheetId: string) => {
    const spreadsheet = spreadsheets.find(s => s.id === spreadsheetId);
    setSelectedSpreadsheet(spreadsheetId);
    setSelectedSpreadsheetName(spreadsheet?.name || '');
    setSelectedSheet(null);
    setSheetData(null);
    setStep('select-sheet');
  };

  const handleSheetSelect = (sheetTitle: string) => {
    setSelectedSheet(sheetTitle);
    setStep('map-columns');
  };

  const handleMappingChange = (field: keyof ColumnMapping, value: string) => {
    setColumnMapping(prev => ({
      ...prev,
      [field]: value === 'none' ? null : parseInt(value),
    }));
  };

  const handleContinueToPreview = () => {
    const contacts = parseContacts();
    setParsedContacts(contacts);
    setStep('preview');
  };

  const handleImport = () => {
    onContactsParsed(parsedContacts);
  };

  const handleBackStep = () => {
    switch (step) {
      case 'select-spreadsheet':
        onBack();
        break;
      case 'select-sheet':
        setStep('select-spreadsheet');
        setSelectedSpreadsheet(null);
        break;
      case 'map-columns':
        setStep('select-sheet');
        setSelectedSheet(null);
        setSheetData(null);
        break;
      case 'preview':
        setStep('map-columns');
        break;
    }
  };

  if (isCheckingConnection) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
        <p className="text-muted-foreground">Checking connection...</p>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      {step === 'connect' && (
        <motion.div
          key="connect"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="space-y-6 py-4"
        >
          <div className="text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <FileSpreadsheet className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-lg">Connect Google Sheets</h3>
            <p className="text-muted-foreground mt-1">
              Import contacts directly from your Google Sheets
            </p>
          </div>

          <Button
            onClick={connect}
            disabled={isConnecting}
            className="w-full"
            size="lg"
          >
            {isConnecting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Connecting...
              </>
            ) : (
              <>
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Connect Google Sheets
              </>
            )}
          </Button>

          <Button variant="outline" onClick={onBack} className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </motion.div>
      )}

      {step === 'select-spreadsheet' && (
        <motion.div
          key="select-spreadsheet"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Select a Spreadsheet</h3>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => refetchSpreadsheets()}
                disabled={isLoadingSpreadsheets}
              >
                <RefreshCw className={`w-4 h-4 ${isLoadingSpreadsheets ? 'animate-spin' : ''}`} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => disconnect()}
                disabled={isDisconnecting}
                className="text-muted-foreground"
              >
                <Link2Off className="w-4 h-4 mr-1" />
                Disconnect
              </Button>
            </div>
          </div>

          {isLoadingSpreadsheets ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
            </div>
          ) : spreadsheets.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <FileSpreadsheet className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No spreadsheets found</p>
              <p className="text-sm">Create a spreadsheet in Google Sheets first</p>
            </div>
          ) : (
            <ScrollArea className="h-[300px]">
              <div className="space-y-2 pr-4">
                {spreadsheets.map((spreadsheet) => (
                  <button
                    key={spreadsheet.id}
                    onClick={() => handleSpreadsheetSelect(spreadsheet.id)}
                    className="w-full p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-colors text-left flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <FileSpreadsheet className="w-5 h-5 text-primary" />
                      <div>
                        <p className="font-medium text-sm">{spreadsheet.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Modified {new Date(spreadsheet.modifiedTime).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </button>
                ))}
              </div>
            </ScrollArea>
          )}

          <Button variant="outline" onClick={handleBackStep} className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </motion.div>
      )}

      {step === 'select-sheet' && (
        <motion.div
          key="select-sheet"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="space-y-4"
        >
          <div>
            <h3 className="font-semibold">Select a Sheet</h3>
            <p className="text-sm text-muted-foreground">
              From: {selectedSpreadsheetName}
            </p>
          </div>

          {isLoadingSheets ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
            </div>
          ) : (
            <div className="space-y-2">
              {sheets.map((sheet) => (
                <button
                  key={sheet.id}
                  onClick={() => handleSheetSelect(sheet.title)}
                  className="w-full p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-muted/50 transition-colors text-left flex items-center justify-between group"
                >
                  <span className="font-medium text-sm">{sheet.title}</span>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </button>
              ))}
            </div>
          )}

          <Button variant="outline" onClick={handleBackStep} className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </motion.div>
      )}

      {step === 'map-columns' && (
        <motion.div
          key="map-columns"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="space-y-4"
        >
          <div>
            <h3 className="font-semibold">Map Columns</h3>
            <p className="text-sm text-muted-foreground">
              Match spreadsheet columns to contact fields
            </p>
          </div>

          {isLoadingData ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
            </div>
          ) : sheetData ? (
            <>
              <div className="space-y-3">
                {CONTACT_FIELDS.map((field) => (
                  <div key={field.key} className="flex items-center gap-3">
                    <Label className="w-28 text-sm flex items-center gap-1">
                      {field.label}
                      {field.required && <span className="text-destructive">*</span>}
                    </Label>
                    <Select
                      value={columnMapping[field.key]?.toString() ?? 'none'}
                      onValueChange={(value) => handleMappingChange(field.key, value)}
                    >
                      <SelectTrigger className="flex-1">
                        <SelectValue placeholder="Select column" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">-- Skip --</SelectItem>
                        {sheetData.headers.map((header, index) => (
                          <SelectItem key={index} value={index.toString()}>
                            {header || `Column ${index + 1}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>

              {columnMapping.phone_number === null && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <p className="text-sm">Phone number column is required</p>
                </div>
              )}

              <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
                <Check className="w-4 h-4 text-primary" />
                <p className="text-sm">
                  <strong>{sheetData.totalRows}</strong> rows found in sheet
                </p>
              </div>

              <div className="flex gap-3 pt-2">
                <Button variant="outline" onClick={handleBackStep} className="flex-1">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  onClick={handleContinueToPreview}
                  disabled={columnMapping.phone_number === null}
                  className="flex-1"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </>
          ) : null}
        </motion.div>
      )}

      {step === 'preview' && (
        <motion.div
          key="preview"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          className="space-y-4"
        >
          <div>
            <h3 className="font-semibold">Preview Contacts</h3>
            <p className="text-sm text-muted-foreground">
              {parsedContacts.length} contacts ready to import
            </p>
          </div>

          <ScrollArea className="h-[200px] border rounded-lg">
            <div className="p-3 space-y-2">
              {parsedContacts.slice(0, 50).map((contact, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 rounded-lg bg-muted/30 text-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{contact.phone_number}</span>
                    {contact.name && (
                      <span className="text-muted-foreground">{contact.name}</span>
                    )}
                  </div>
                  {contact.tags && contact.tags.length > 0 && (
                    <div className="flex gap-1">
                      {contact.tags.slice(0, 2).map((tag, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {parsedContacts.length > 50 && (
                <p className="text-center text-sm text-muted-foreground py-2">
                  ... and {parsedContacts.length - 50} more
                </p>
              )}
            </div>
          </ScrollArea>

          {parsedContacts.length === 0 && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <p className="text-sm">No valid contacts found. Check your column mapping.</p>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button variant="outline" onClick={handleBackStep} className="flex-1">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              onClick={handleImport}
              disabled={parsedContacts.length === 0}
              className="flex-1"
            >
              Import {parsedContacts.length} Contacts
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GoogleSheetsImport;