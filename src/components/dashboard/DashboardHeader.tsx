import { Bell, Search, ChevronDown, LogOut } from 'lucide-react';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDashboardStats } from '@/hooks/useDashboardStats';
import { useConversations } from '@/hooks/useConversations';

const DashboardHeader = ({ onMenuClick }: { onMenuClick?: () => void }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const { data: stats } = useDashboardStats();
  const { conversations } = useConversations();

  const unreadCount = stats?.unreadMessages || 0;
  // Filter conversations that have unread messages
  const notifications = conversations.filter(c => (c.unread_count || 0) > 0).slice(0, 5);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const userInitials = user?.email?.substring(0, 2).toUpperCase() || 'U';
  const userEmail = user?.email || 'User';

  return (
    <header className="h-16 border-b border-border bg-card flex items-center justify-between px-4 sm:px-6">
      {/* Mobile Menu Button */}
      <button
        onClick={onMenuClick}
        className="md:hidden p-2 -ml-2 mr-2 text-muted-foreground hover:text-foreground"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
      </button>

      {/* Search */}
      <div className="relative max-w-md flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search conversations, contacts..."
          className="pl-10 bg-background border-border"
        />
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative p-2 rounded-lg hover:bg-accent transition-colors outline-none">
              <Bell className="w-5 h-5 text-muted-foreground" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-whatsapp rounded-full animate-pulse" />
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-0">
            <div className="p-4 border-b border-border">
              <h4 className="font-semibold text-sm">Notifications</h4>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground text-sm">
                  <p>No new notifications</p>
                </div>
              ) : (
                notifications.map((conv) => (
                  <DropdownMenuItem
                    key={conv.id}
                    className="p-4 border-b border-border last:border-0 cursor-pointer focus:bg-accent"
                    onClick={() => navigate(`/dashboard/conversations/${conv.id}`)}
                  >
                    <div className="flex items-start gap-3 w-full">
                      <div className="w-2 h-2 mt-2 rounded-full bg-whatsapp flex-shrink-0" />
                      <div className="flex-1 overflow-hidden">
                        <p className="text-sm font-medium truncate">
                          {conv.contacts?.name || conv.contacts?.phone_number || 'Unknown'}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {conv.unread_count} new message{conv.unread_count > 1 ? 's' : ''}
                        </p>
                      </div>
                      <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                        {new Date(conv.last_message_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </DropdownMenuItem>
                ))
              )}
            </div>
            {notifications.length > 0 && (
              <div className="p-2 border-t border-border">
                <button
                  className="w-full text-center text-xs text-primary hover:underline py-1"
                  onClick={() => navigate('/dashboard/conversations')}
                >
                  View all
                </button>
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <ModeToggle />

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent transition-colors">
              <Avatar className="w-8 h-8">
                <AvatarImage src="" />
                <AvatarFallback className="bg-whatsapp text-primary-foreground text-sm font-medium">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium text-foreground truncate max-w-[120px]">{userEmail}</p>
                <p className="text-xs text-muted-foreground">User</p>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem className="text-muted-foreground text-xs">
              {userEmail}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
