import Link from "next/link";
import { isLoggedIn, logout } from "@/actions/helper.actions";
import { Button } from "@/components/ui/button";
import MobileNav from "./MobileNav";
import Cookie from "js-cookie";
import { cookies } from "next/headers";

export default async function Navigation() {
    const cookieStore = await cookies();

  const patientCookie = cookieStore.get("session.cookie.id");
  const doctorCookie = cookieStore.get("doctor.session.id");
  const adminCookie = cookieStore.get("admin.session.id");

  let role = null;

  if (patientCookie) role = "patient";
  else if (doctorCookie) role = "doctor";
  else if (adminCookie) role = "admin";

  const loggedIn = !!role;


  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    ];
  const dashboardLinks = [
    { name: "Dashboard", href: "/patient/dashboard" },
    { name: "Dashboard", href: "/doctor/dashboard" },
    { name: "Dashboard", href: "/admin/dashboard" },
  ]
  const checkForLoggedInUser = ()=>{
    const patientCookie = Cookie.get("session.cookie.id");
    const doctorCookie = Cookie.get("doctor.session.id");
    const adminCookie = Cookie.get("admin.session.id");
    if(patientCookie){
      return "patient"
    }
    if(doctorCookie){
      return "doctor"
    }
    if(adminCookie){
      return "admin"
    }
  }

  return (
    <nav className="w-full sticky top-0 z-50 backdrop-blur-md bg-white/70 border-b border-dashed border-gray-200 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="shrink-0">
            <Link href="/">
              <span className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
                Coun
                <span className="text-cyan-600">selling Bot</span>.
              </span>
            </Link>
          </div>

          <div className="hidden sm:flex sm:space-x-8">
            {navLinks.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="relative font-medium text-gray-700 px-3 py-2 rounded-md transition-all duration-300 hover:text-cyan-600 hover:scale-105 hover:underline-offset-4 hover:underline">
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <MobileNav />

            {loggedIn ? (
  <>
    <Button asChild>
      <Link href={`/${role}/dashboard`}>Dashboard</Link>
    </Button>

    <form action={logout}>
      <Button type="submit" variant="destructive">
        Logout
      </Button>
    </form>
  </>
) : (
  <Button asChild>
    <Link href="/login">Login</Link>
  </Button>
)}
        
          </div>
        </div>
      </div>
    </nav>
  );
}