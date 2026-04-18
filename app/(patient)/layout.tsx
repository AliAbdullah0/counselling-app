'use client';

import React from 'react';
import { 
  MessageSquare, 
  User, 
  LogOut,
  ArrowRight, 
  CrossIcon
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { 
  Drawer, 
  DrawerContent, 
  DrawerTrigger 
} from '@/components/ui/drawer';
import { DialogTitle } from '@/components/ui/dialog';

const PatientDashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const sidebarItems = [
    {
      title: "Chat",
      icon: MessageSquare,
      href: "/patient",
    },
    {
      title: "Doctors",
      icon: CrossIcon,
      href: "/doctors",
    },
    {
      title: "Profile",
      icon: User,
      href: "/profile",
    },
  ];

  const SidebarContent = () => (
    <div className="flex h-full flex-col bg-white">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold text-zinc-900">MedCare</h1>
        <p className="text-sm text-zinc-500">Patient Portal</p>
      </div>
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <a
              key={item.title}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-4 py-3 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.title}</span>
            </a>
          ))}
        </div>
      </nav>
      <div className="border-t p-4">
        <Button variant="ghost" className="w-full justify-start gap-3 text-zinc-600 hover:text-red-600">
          <LogOut className="h-5 w-5" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex h-[90vh] fixed w-full overflow-hidden bg-zinc-50">
      <div className="hidden md:flex w-72 flex-col border-r bg-white">
        <SidebarContent />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <main className="flex-1 overflow-auto p-6 md:p-8">
          {children}
        </main>
        <div className="md:hidden fixed bottom-6 left-6 z-[100]">
          <Drawer>
            <DrawerTrigger asChild>
              <Button
                size="icon"
                className="h-14 w-14 rounded-full shadow-xl bg-white border border-zinc-300 hover:bg-zinc-50 active:bg-zinc-100 text-zinc-800 hover:text-black transition-all active:scale-95"
              >
                <ArrowRight className="h-6 w-6" />
              </Button>
            </DrawerTrigger>

            <DrawerContent   className="max-h-[85vh]">
                <DialogTitle></DialogTitle>
              <div className="mx-auto w-full max-w-md p-4">
                <SidebarContent />
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboardLayout;