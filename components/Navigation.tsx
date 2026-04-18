import Link from "next/link";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import MobileNav from "./MobileNav";
import { logout } from "@/actions/helper.actions";
export default async function Navigation() {
  const cookieStore = await cookies();

  const patientCookie = cookieStore.get("session.cookie.id");
  const doctorCookie = cookieStore.get("doctor.session.id");
  const adminCookie = cookieStore.get("admin.session.id");

  let role: "patient" | "doctor" | "admin" | null = null;

  if (patientCookie) role = "patient";
  else if (doctorCookie) role = "doctor";
  else if (adminCookie) role = "admin";

  const isLoggedIn = !!role;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100 ">
      <div className=" mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-1 group">
            <span className="text-3xl font-bold tracking-tighter text-gray-900">
              Coun
              <span className="text-cyan-600 group-hover:text-cyan-700 transition-colors">
                selling Bot
              </span>
              <span className="text-xs align-super text-gray-400 font-normal ml-0.5">.</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="relative  font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200
                           after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-0 after:bg-cyan-600 
                           after:transition-all after:duration-300 hover:after:w-full"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <MobileNav />

            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <Button 
                  asChild 
                  variant="default"
                  className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium transition-all duration-200 hover:shadow-md"
                >
                  <Link href={`/${role}`} className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
                <form action={logout}>
                  <Button 
                    type="submit" 
                    variant="outline"
                    className="border-gray-300 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-200 flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            ) : (
              <Button 
                asChild 
                size="default"
                className="bg-gray-900 hover:bg-black text-white font-medium shadow-sm transition-all duration-200 hover:shadow-md"
              >
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}