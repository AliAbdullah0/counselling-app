import Link from "next/link";
import { isLoggedIn } from "@/actions/helper.actions";
import { Button } from "@/components/ui/button";
import MobileNav from "./MobileNav";

export default async function Navigation() {
  const loggedIn = await isLoggedIn();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

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

            {!loggedIn && (
              <Button
                asChild
                className="hidden sm:inline-flex px-6 py-2 bg-cyan-600 text-white font-medium rounded-lg shadow-md hover:bg-cyan-700 hover:shadow-lg transition-all duration-300">
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}