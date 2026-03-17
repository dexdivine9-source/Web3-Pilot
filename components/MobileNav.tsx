'use client';

import { Home, ShieldAlert, MessageSquare, Share2, FileText } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: ShieldAlert, label: 'Audit', href: '#audit' },
    { icon: MessageSquare, label: 'Chat', href: '#chat' },
    { icon: Share2, label: 'Social', href: '#social' },
    { icon: FileText, label: 'Summary', href: '#summary' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-t border-white/10 px-6 py-3 md:hidden">
      <div className="flex items-center justify-between max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 transition-colors",
                isActive ? "text-blue-500" : "text-zinc-500 hover:text-zinc-300"
              )}
            >
              <item.icon size={20} />
              <span className="text-[10px] font-medium uppercase tracking-tighter">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
