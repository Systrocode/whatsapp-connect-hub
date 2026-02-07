import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FeatureCardProps {
    title: string;
    description: string;
    icon: string;
    path: string;
    delay?: number;
}

const FeatureCard = ({ title, description, icon, path, delay = 0 }: FeatureCardProps) => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
            onClick={() => navigate(path)}
            className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
            <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <img src={icon} alt={title} className="w-8 h-8 object-contain" />
                </div>
                <div className="p-2 rounded-full bg-transparent group-hover:bg-accent transition-colors">
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {title}
            </h3>
            <p className="text-muted-foreground text-sm">
                {description}
            </p>
        </motion.div>
    );
};

export default FeatureCard;
