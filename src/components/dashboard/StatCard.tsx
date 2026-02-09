import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  icon: string;
  delay?: number;
}

const StatCard = ({ title, value, change, changeType, icon, delay = 0 }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 rounded-lg bg-sidebar-accent/50">
          <img src={icon} alt={title} className="w-6 h-6 object-contain" />
        </div>
        <span className={cn(
          "text-xs font-medium px-2 py-1 rounded-full",
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
