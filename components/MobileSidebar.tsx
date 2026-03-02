'use client';

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { AppWindowIcon, ChevronRight, LayoutDashboard, Menu, Settings, Users } from 'lucide-react';
import Link from 'next/link';

type MobileSidebarProps = {
  panel: 'Admin' | 'Doctor' | 'Patient';
  links: { name: string; href: string; icon: React.ReactNode }[];
};

const SidebarLinks = ({label, icon, href}:{label:string, icon:React.ReactNode, href:string})=>{
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 px-4 py-3 text-sm font-medium text-zinc-700 rounded-2xl hover:bg-zinc-100 transition-all"
    >
      {icon}
      {label}
    </Link>
  )
}

export const MobileSidebar = ({ panel, links }:{panel:MobileSidebarProps['panel'], links:MobileSidebarProps['links']}) => {

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="md:hidden fixed bottom-6 left-4 rounded-full z-50 h-11 w-11 flex items-center justify-center bg-white border border-zinc-200 shadow-sm active:scale-95 transition-transform">
          <ChevronRight className="h-6 w-6 text-zinc-700" />
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-72 p-0 border-r border-zinc-200 bg-white"
      >
        <SheetTitle/>
        <div className="flex flex-col h-full">
          <div className="border-b border-zinc-200 px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-2xl bg-linear-to-br from-[#7F8B6E] to-[#B7B0A3] flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-2xl">{panel.charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <div className="font-semibold text-xl text-zinc-900">{panel}</div>
                <div className="text-xs text-zinc-500 -mt-0.5">Panel</div>
              </div>
            </div>
          </div>
          <div className="flex-1 px-4 py-8 overflow-y-auto">
            <div className="space-y-8">
              <div>
                <div className="px-3 mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                  Core
                </div>
                <nav className="space-y-1">
                  {links.map((link) => (
                    <SidebarLinks key={link.href} label={link.name} icon={link.icon} href={link.href}/>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};