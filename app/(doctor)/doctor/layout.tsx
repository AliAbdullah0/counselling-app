import Link from 'next/link';
import { AppWindowIcon, LayoutDashboard, Menu, Settings, Users } from 'lucide-react';

import { MobileSidebar } from '@/components/MobileSidebar'; 

const DoctorLayout = ({ children }: { children: React.ReactNode }) => {
    const links = [
        { name: 'Dashboard', href: '/admin', icon: <LayoutDashboard className="h-5 w-5 text-zinc-500 group-hover:text-[#B7B0A3] transition-colors" /> },
        { name: 'Patients', href: '/admin/patients', icon: <Users className="h-5 w-5 text-zinc-500 group-hover:text-[#B7B0A3] transition-colors" /> },
    ]
  return (
    <div className="flex h-screen w-full overflow-hidden bg-zinc-50">
      <div className="hidden md:flex w-72 border-r border-zinc-200 bg-white flex-col">
        <div className="border-b border-zinc-200 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-linear-to-br from-[#7F8B6E] to-[#B7B0A3] flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-2xl">D</span>
            </div>
            <div>
              <div className="font-semibold text-xl text-zinc-900">Doctor</div>
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
                  <Link
                    key={link.name}
                    href={link.href}
                    className="group flex items-center gap-3 px-4 py-3 text-sm font-medium text-zinc-700 rounded-2xl hover:bg-zinc-100 transition-all active:scale-[0.985]"
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      <MobileSidebar panel="Doctor" links={links} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
};

export default DoctorLayout;