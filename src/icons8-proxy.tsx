/**
 * icons8-proxy.tsx
 *
 * Lightweight drop-in replacement for lucide-react.
 * Only exports icons that are actually used in this codebase.
 * Icons are rendered as <img> elements fetching from img.icons8.com.
 *
 * Adding a new icon: just add one line at the bottom of this file.
 */

import React from 'react';

interface Icons8Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  size?: number;
  className?: string;
  color?: string;
}

// Name overrides: kebab-case lucide name → icons8 slug
const OVERRIDES: Record<string, string> = {
  'check-circle-2': 'checked--v1',
  'check-circle': 'checked--v1',
  'check': 'check--v1',
  'check-check': 'double-tick',
  'check-square': 'checked-checkbox--v1',
  'x': 'multiply',
  'chevron-right': 'forward',
  'chevron-left': 'back',
  'chevron-down': 'expand-arrow--v1',
  'chevron-up': 'collapse-arrow',
  'arrow-right': 'arrow',
  'arrow-left': 'back',
  'arrow-down': 'down-squared',
  'message-square': 'chat',
  'message-circle': 'chat',
  'send': 'paper-plane',
  'file-text': 'document',
  'file-image': 'image',
  'image': 'image',
  'image-off': 'no-image',
  'music': 'music',
  'paperclip': 'attach',
  'layout-template': 'template',
  'user-plus': 'add-user-male',
  'users': 'group',
  'user': 'user-male-circle',
  'user-cog': 'admin-settings-male',
  'more-vertical': 'more',
  'more-horizontal': 'more',
  'info': 'info',
  'search': 'search',
  'bell': 'bell',
  'trash-2': 'trash',
  'phone': 'phone',
  'bar-chart': 'bar-chart',
  'bar-chart-3': 'bar-chart',
  'trending-up': 'positive-dynamic',
  'trending-down': 'negative-dynamic',
  'clock': 'clock',
  'target': 'target',
  'alert-circle': 'error',
  'shield-alert': 'error',
  'shield-check': 'security-checked',
  'settings-2': 'settings',
  'settings': 'settings',
  'menu': 'menu',
  'plus': 'plus-math',
  'shield': 'security-checked',
  'plus-circle': 'plus-math',
  'sparkles': 'sparkling-diamond',
  'heart': 'hearts',
  'map-pin': 'marker',
  'instagram': 'instagram',
  'facebook': 'facebook',
  'save': 'save',
  'key': 'key',
  'globe': 'globe',
  'globe-2': 'earth-globe-europe-africa',
  'eye': 'visible',
  'eye-off': 'hide',
  'copy': 'copy',
  'code': 'source-code',
  'code-2': 'source-code',
  'zap': 'lightning-bolt',
  'link-2': 'link',
  'link': 'link',
  'external-link': 'external-link',
  'mail': 'envelope',
  'log-out': 'exit',
  'refresh-cw': 'synchronize',
  'loader-2': 'loading',
  'download': 'download',
  'upload': 'upload',
  'star': 'star',
  'tag': 'price-tag',
  'filter': 'filter',
  'pencil': 'pencil',
  'edit': 'edit',
  'lock': 'lock',
  'dollar-sign': 'dollar-coin',
  'credit-card': 'card-in-use',
  'share-2': 'share',
  'help-circle': 'help',
  'life-buoy': 'lifebuoy',
  'book': 'book',
  'book-open': 'book-shelf',
  'building-2': 'modern-city',
  'graduation-cap': 'graduation-cap',
  'calculator': 'calculator',
  'smartphone': 'smartphone',
  'server': 'server',
  'terminal': 'console',
  'qr-code': 'qr-code',
  'plug': 'plug',
  'puzzle': 'jigsaw',
  'palette': 'paint-palette',
  'video': 'video-call',
  'play': 'play',
  'signal': 'signal',
  'wifi': 'wifi',
  'gift': 'gift',
  'thumbs-up': 'thumbs-up',
  'scale': 'scales',
  'megaphone': 'megaphone',
  'apple': 'apple',
  'battery': 'battery',
  'shopping-cart': 'shopping-cart',
  'x-circle': 'cancel',
  'circle': 'filled-circle',
  'dot': 'circled-dot',
  'sun': 'sun',
  'moon': 'moon-symbol',
  'panel-left': 'side-panel',
  'grip-vertical': 'drag',
  'quote': 'quote',
  'handshake': 'handshake',
  'construction': 'under-construction',
  'type': 'text-color',
  'wrench': 'wrench',
};

const _componentCache = new Map<string, React.ForwardRefExoticComponent<Icons8Props & React.RefAttributes<HTMLImageElement>>>();

export const createIcons8Component = (name: string) => {
  if (_componentCache.has(name)) return _componentCache.get(name)!;

  const Component = React.forwardRef<HTMLImageElement, Icons8Props>(
    ({ size = 24, className = '', color, loading = 'lazy', ...props }, ref) => {
      let iconName = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
      if (OVERRIDES[iconName]) iconName = OVERRIDES[iconName];

      const src1 = `https://img.icons8.com/color/48/${iconName}.png`;
      const src2 = `https://img.icons8.com/fluency/48/${iconName}.png`;
      const src3 = `https://img.icons8.com/nolan/64/${iconName}.png`;

      return (
        <img
          ref={ref}
          src={src1}
          width={size}
          height={size}
          loading={loading}
          decoding="async"
          className={`inline-block object-contain ${className}`}
          style={{ filter: color === '#ffffff' || color === 'white' ? 'brightness(0) invert(1)' : 'none' }}
          alt={name}
          onError={(e) => {
            const t = e.currentTarget;
            if (!t.dataset.tried2) { t.dataset.tried2 = '1'; t.src = src2; }
            else if (!t.dataset.tried3) { t.dataset.tried3 = '1'; t.src = src3; }
            else if (!t.dataset.triedFinal) { t.dataset.triedFinal = '1'; t.src = 'https://img.icons8.com/color/48/help.png'; }
            else { t.src = 'https://img.icons8.com/ios/50/help.png'; }
          }}
          {...props}
        />
      );
    }
  );
  Component.displayName = name;
  _componentCache.set(name, Component);
  return Component;
};

// ---------------------------------------------------------------------------
// Named exports — only the icons actually used in this codebase.
// To add a new icon: export const MyIcon = createIcons8Component("MyIcon");
// ---------------------------------------------------------------------------
export const AlertCircle = createIcons8Component("AlertCircle");
export const AlertCircleIcon = AlertCircle;
export const Apple = createIcons8Component("Apple");
export const AppleIcon = Apple;
export const ArrowDown = createIcons8Component("ArrowDown");
export const ArrowDownIcon = ArrowDown;
export const ArrowLeft = createIcons8Component("ArrowLeft");
export const ArrowLeftIcon = ArrowLeft;
export const ArrowRight = createIcons8Component("ArrowRight");
export const ArrowRightIcon = ArrowRight;
export const BarChart = createIcons8Component("BarChart");
export const BarChartIcon = BarChart;
export const BarChart3 = createIcons8Component("BarChart3");
export const BarChart3Icon = BarChart3;
export const Battery = createIcons8Component("Battery");
export const BatteryIcon = Battery;
export const Bell = createIcons8Component("Bell");
export const BellIcon = Bell;
export const Book = createIcons8Component("Book");
export const BookIcon = Book;
export const BookOpen = createIcons8Component("BookOpen");
export const BookOpenIcon = BookOpen;
export const Bot = createIcons8Component("Bot");
export const BotIcon = Bot;
export const Building2 = createIcons8Component("Building2");
export const Building2Icon = Building2;
export const Calculator = createIcons8Component("Calculator");
export const CalculatorIcon = Calculator;
export const Calendar = createIcons8Component("Calendar");
export const CalendarIcon = Calendar;
export const Check = createIcons8Component("Check");
export const CheckIcon = Check;
export const CheckCheck = createIcons8Component("CheckCheck");
export const CheckCheckIcon = CheckCheck;
export const CheckCircle = createIcons8Component("CheckCircle");
export const CheckCircleIcon = CheckCircle;
export const CheckCircle2 = createIcons8Component("CheckCircle2");
export const CheckCircle2Icon = CheckCircle2;
export const CheckSquare = createIcons8Component("CheckSquare");
export const CheckSquareIcon = CheckSquare;
export const ChevronDown = createIcons8Component("ChevronDown");
export const ChevronDownIcon = ChevronDown;
export const ChevronLeft = createIcons8Component("ChevronLeft");
export const ChevronLeftIcon = ChevronLeft;
export const ChevronRight = createIcons8Component("ChevronRight");
export const ChevronRightIcon = ChevronRight;
export const ChevronUp = createIcons8Component("ChevronUp");
export const ChevronUpIcon = ChevronUp;
export const Circle = createIcons8Component("Circle");
export const CircleIcon = Circle;
export const Clock = createIcons8Component("Clock");
export const ClockIcon = Clock;
export const Code = createIcons8Component("Code");
export const CodeIcon = Code;
export const Code2 = createIcons8Component("Code2");
export const Code2Icon = Code2;
export const Construction = createIcons8Component("Construction");
export const ConstructionIcon = Construction;
export const Copy = createIcons8Component("Copy");
export const CopyIcon = Copy;
export const CreditCard = createIcons8Component("CreditCard");
export const CreditCardIcon = CreditCard;
export const DollarSign = createIcons8Component("DollarSign");
export const DollarSignIcon = DollarSign;
export const Dot = createIcons8Component("Dot");
export const DotIcon = Dot;
export const Download = createIcons8Component("Download");
export const DownloadIcon = Download;
export const Edit = createIcons8Component("Edit");
export const EditIcon = Edit;
export const ExternalLink = createIcons8Component("ExternalLink");
export const ExternalLinkIcon = ExternalLink;
export const Eye = createIcons8Component("Eye");
export const EyeIcon = Eye;
export const EyeOff = createIcons8Component("EyeOff");
export const EyeOffIcon = EyeOff;
export const Facebook = createIcons8Component("Facebook");
export const FacebookIcon = Facebook;
export const FileImage = createIcons8Component("FileImage");
export const FileImageIcon = FileImage;
export const FileText = createIcons8Component("FileText");
export const FileTextIcon = FileText;
export const Filter = createIcons8Component("Filter");
export const FilterIcon = Filter;
export const Gift = createIcons8Component("Gift");
export const GiftIcon = Gift;
export const Globe = createIcons8Component("Globe");
export const GlobeIcon = Globe;
export const Globe2 = createIcons8Component("Globe2");
export const Globe2Icon = Globe2;
export const GraduationCap = createIcons8Component("GraduationCap");
export const GraduationCapIcon = GraduationCap;
export const GripVertical = createIcons8Component("GripVertical");
export const GripVerticalIcon = GripVertical;
export const Handshake = createIcons8Component("Handshake");
export const HandshakeIcon = Handshake;
export const Heart = createIcons8Component("Heart");
export const HeartIcon = Heart;
export const HelpCircle = createIcons8Component("HelpCircle");
export const HelpCircleIcon = HelpCircle;
export const Image = createIcons8Component("Image");
export const ImageIcon = Image;
export const ImageOff = createIcons8Component("ImageOff");
export const ImageOffIcon = ImageOff;
export const Info = createIcons8Component("Info");
export const InfoIcon = Info;
export const Instagram = createIcons8Component("Instagram");
export const InstagramIcon = Instagram;
export const Key = createIcons8Component("Key");
export const KeyIcon = Key;
export const LayoutTemplate = createIcons8Component("LayoutTemplate");
export const LayoutTemplateIcon = LayoutTemplate;
export const LifeBuoy = createIcons8Component("LifeBuoy");
export const LifeBuoyIcon = LifeBuoy;
export const Link = createIcons8Component("Link");
export const LinkIcon = Link;
export const Link2 = createIcons8Component("Link2");
export const Link2Icon = Link2;
export const Loader2 = createIcons8Component("Loader2");
export const Loader2Icon = Loader2;
export const Lock = createIcons8Component("Lock");
export const LockIcon = Lock;
export const LogOut = createIcons8Component("LogOut");
export const LogOutIcon = LogOut;
export const Mail = createIcons8Component("Mail");
export const MailIcon = Mail;
export const MapPin = createIcons8Component("MapPin");
export const MapPinIcon = MapPin;
export const Megaphone = createIcons8Component("Megaphone");
export const MegaphoneIcon = Megaphone;
export const MessageCircle = createIcons8Component("MessageCircle");
export const MessageCircleIcon = MessageCircle;
export const MessageSquare = createIcons8Component("MessageSquare");
export const MessageSquareIcon = MessageSquare;
export const Moon = createIcons8Component("Moon");
export const MoonIcon = Moon;
export const MoreHorizontal = createIcons8Component("MoreHorizontal");
export const MoreHorizontalIcon = MoreHorizontal;
export const MoreVertical = createIcons8Component("MoreVertical");
export const MoreVerticalIcon = MoreVertical;
export const Music = createIcons8Component("Music");
export const MusicIcon = Music;
export const Palette = createIcons8Component("Palette");
export const PaletteIcon = Palette;
export const PanelLeft = createIcons8Component("PanelLeft");
export const PanelLeftIcon = PanelLeft;
export const Paperclip = createIcons8Component("Paperclip");
export const PaperclipIcon = Paperclip;
export const Pencil = createIcons8Component("Pencil");
export const PencilIcon = Pencil;
export const Phone = createIcons8Component("Phone");
export const PhoneIcon = Phone;
export const Play = createIcons8Component("Play");
export const PlayIcon = Play;
export const Plug = createIcons8Component("Plug");
export const PlugIcon = Plug;
export const Plus = createIcons8Component("Plus");
export const PlusIcon = Plus;
export const Puzzle = createIcons8Component("Puzzle");
export const PuzzleIcon = Puzzle;
export const QrCode = createIcons8Component("QrCode");
export const QrCodeIcon = QrCode;
export const Quote = createIcons8Component("Quote");
export const QuoteIcon = Quote;
export const RefreshCw = createIcons8Component("RefreshCw");
export const RefreshCwIcon = RefreshCw;
export const Save = createIcons8Component("Save");
export const SaveIcon = Save;
export const Scale = createIcons8Component("Scale");
export const ScaleIcon = Scale;
export const Search = createIcons8Component("Search");
export const SearchIcon = Search;
export const Send = createIcons8Component("Send");
export const SendIcon = Send;
export const Server = createIcons8Component("Server");
export const ServerIcon = Server;
export const Settings = createIcons8Component("Settings");
export const SettingsIcon = Settings;
export const Settings2 = createIcons8Component("Settings2");
export const Settings2Icon = Settings2;
export const Share2 = createIcons8Component("Share2");
export const Share2Icon = Share2;
export const Shield = createIcons8Component("Shield");
export const ShieldIcon = Shield;
export const ShieldAlert = createIcons8Component("ShieldAlert");
export const ShieldAlertIcon = ShieldAlert;
export const ShieldCheck = createIcons8Component("ShieldCheck");
export const ShieldCheckIcon = ShieldCheck;
export const ShoppingCart = createIcons8Component("ShoppingCart");
export const ShoppingCartIcon = ShoppingCart;
export const Signal = createIcons8Component("Signal");
export const SignalIcon = Signal;
export const Smartphone = createIcons8Component("Smartphone");
export const SmartphoneIcon = Smartphone;
export const Sparkles = createIcons8Component("Sparkles");
export const SparklesIcon = Sparkles;
export const Star = createIcons8Component("Star");
export const StarIcon = Star;
export const Sun = createIcons8Component("Sun");
export const SunIcon = Sun;
export const Tag = createIcons8Component("Tag");
export const TagIcon = Tag;
export const Target = createIcons8Component("Target");
export const TargetIcon = Target;
export const Terminal = createIcons8Component("Terminal");
export const TerminalIcon = Terminal;
export const ThumbsUp = createIcons8Component("ThumbsUp");
export const ThumbsUpIcon = ThumbsUp;
export const TrendingDown = createIcons8Component("TrendingDown");
export const TrendingDownIcon = TrendingDown;
export const TrendingUp = createIcons8Component("TrendingUp");
export const TrendingUpIcon = TrendingUp;
export const Type = createIcons8Component("Type");
export const TypeIcon = Type;
export const Upload = createIcons8Component("Upload");
export const UploadIcon = Upload;
export const User = createIcons8Component("User");
export const UserIcon = User;
export const UserCog = createIcons8Component("UserCog");
export const UserCogIcon = UserCog;
export const UserPlus = createIcons8Component("UserPlus");
export const UserPlusIcon = UserPlus;
export const Users = createIcons8Component("Users");
export const UsersIcon = Users;
export const Video = createIcons8Component("Video");
export const VideoIcon = Video;
export const Wifi = createIcons8Component("Wifi");
export const WifiIcon = Wifi;
export const Wrench = createIcons8Component("Wrench");
export const WrenchIcon = Wrench;
export const X = createIcons8Component("X");
export const XIcon = X;
export const XCircle = createIcons8Component("XCircle");
export const XCircleIcon = XCircle;
export const Zap = createIcons8Component("Zap");
export const ZapIcon = Zap;

// Aliases for common variant names
export const Sparkle = Sparkles;
export const SparkleIcon = Sparkles;
export const Contact2 = createIcons8Component("Contact2");
export const Contact2Icon = Contact2;
export const Trash = createIcons8Component("Trash");
export const TrashIcon = Trash;
export const Trash2 = Trash;
export const Trash2Icon = Trash;
export const RefreshCcw = RefreshCw;
export const RefreshCcwIcon = RefreshCw;

export const Menu = createIcons8Component("Menu");
export const MenuIcon = Menu;
export const Hash = createIcons8Component("Hash");
export const HashIcon = Hash;
export const CircleDashed = createIcons8Component("CircleDashed");
export const CircleDashedIcon = CircleDashed;
export const Edit2 = createIcons8Component("Edit2");
export const Edit2Icon = Edit2;

export const createLucideIcon = createIcons8Component;
export default { createIcons8Component };

export const Briefcase = createIcons8Component("Briefcase");
export const BriefcaseIcon = Briefcase;

export const FileSpreadsheet = createIcons8Component("FileSpreadsheet");
export const FileSpreadsheetIcon = FileSpreadsheet;

export const Link2Off = createIcons8Component("Link2Off");
export const Link2OffIcon = Link2Off;

export const ClipboardPaste = createIcons8Component("ClipboardPaste");
export const ClipboardPasteIcon = ClipboardPaste;

export const MousePointer = createIcons8Component("MousePointer");
export const MousePointerIcon = MousePointer;

export const Pause = createIcons8Component("Pause");
export const PauseIcon = Pause;

export const Sheet = createIcons8Component("Sheet");
export const SheetIcon = Sheet;

export const ShoppingBag = createIcons8Component("ShoppingBag");
export const ShoppingBagIcon = ShoppingBag;

export const MousePointerClick = createIcons8Component("MousePointerClick");
export const MousePointerClickIcon = MousePointerClick;

export const Inbox = createIcons8Component("Inbox");
export const InboxIcon = Inbox;

export const Smile = createIcons8Component("Smile");
export const SmileIcon = Smile;

export const School = createIcons8Component("School");
export const SchoolIcon = School;

export const Truck = createIcons8Component("Truck");
export const TruckIcon = Truck;

export const Package = createIcons8Component("Package");
export const PackageIcon = Package;

export const Rocket = createIcons8Component("Rocket");
export const RocketIcon = Rocket;

export const Pin = createIcons8Component("Pin");
export const PinIcon = Pin;

export const AlertTriangle = createIcons8Component("AlertTriangle");
export const AlertTriangleIcon = AlertTriangle;

export const Reply = createIcons8Component("Reply");
export const ReplyIcon = Reply;

export const MessagesSquare = createIcons8Component("MessagesSquare");
export const MessagesSquareIcon = MessagesSquare;

export const UserCheck = createIcons8Component("UserCheck");
export const UserCheckIcon = UserCheck;

export const Ban = createIcons8Component("Ban");
export const BanIcon = Ban;
