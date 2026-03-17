'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface ModuleCardProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
  id?: string;
}

export default function ModuleCard({ children, title, description, className, id }: ModuleCardProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/40 p-6 backdrop-blur-md",
        "before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-br before:from-blue-500/5 before:to-transparent",
        className
      )}
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white tracking-tight">{title}</h2>
        {description && <p className="text-sm text-zinc-400 mt-1">{description}</p>}
      </div>
      {children}
    </motion.section>
  );
}
