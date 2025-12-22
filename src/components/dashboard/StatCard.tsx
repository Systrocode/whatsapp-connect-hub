import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  delay?: number;
}

const StatCard = ({ title, value, change, changeType, icon: Icon, delay = 0 }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 rounded-lg bg-whatsapp-light">
          <Icon className="w-5 h-5 text-whatsapp" />
        </div>
        <span className={cn(
          "text-sm font-medium px-2 py-1 rounded-full",
          changeType === 'positive' && "bg-whatsapp-light text-whatsapp-dark",
          changeType === 'negative' && "bg-destructive/10 text-destructive",
          changeType === 'neutral' && "bg-muted text-muted-foreground"
        )}>
          {change}
        </span>
      </div>
      <p className="text-muted-foreground text-sm mb-1">{title}</p>
      <p className="text-2xl font-bold text-foreground">{value}</p>
    </motion.div>
  );
};

export default StatCard;
