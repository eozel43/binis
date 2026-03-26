import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function StatsCard({ title, value, icon: Icon, description, className, index = 0 }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5, scale: 1.01 }}
            className={cn(
                "relative overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm hover:shadow-xl transition-all duration-300 group", 
                className
            )}
        >
            {/* Mesh Gradient Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.1),transparent)] pointer-events-none" />
            <div className="absolute -right-4 -top-4 h-24 w-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
            
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                <h3 className="tracking-tight text-xs font-semibold text-muted-foreground uppercase font-lexend">{title}</h3>
                {Icon && (
                    <motion.div 
                        whileHover={{ rotate: 15, scale: 1.1 }}
                        className="p-2.5 bg-primary/10 rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500 shadow-inner"
                    >
                        <Icon className="h-4 w-4" />
                    </motion.div>
                )}
            </div>
            <div className="p-6 pt-0 relative z-10">
                <div className="text-3xl font-bold tracking-tight text-foreground font-lexend">{value}</div>
                {description && (
                    <div className="flex items-center gap-1.5 mt-2">
                        <div className="h-1 w-1 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        <p className="text-[11px] font-medium text-muted-foreground/80 leading-none">{description}</p>
                    </div>
                )}
            </div>
            
            {/* Bottom Glow Line */}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary group-hover:w-full transition-all duration-500" />
        </motion.div>
    );
}
