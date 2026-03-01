import Link from "next/link";
import { isLoggedIn } from "@/actions/helper.actions";
import { logOut } from "@/actions/user.actions";
import { Button } from "@/components/ui/button";
import MobileNav from "./MobileNav";
import { LogOutIcon } from "lucide-react";

export default async function Navigation() {
  const loggedIn = await isLoggedIn();
  return (
    <nav className="w-full sticky top-0 z-50 backdrop-blur-md border-b border-gray-200 border-dashed">
      <div className="container mx-auto px-4 ">
        <div className="flex justify-between h-20 items-center">
          <div className="shrink-0">
            <Link href="/">
              <span className="md:text-3xl text-2xl font-extrabold text-black">
                Coun<span className="text-accent">selling Bot</span>.
              </span>
            </Link>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:space-x-10">
            {[
              { name: "Home", href: "/" },
              { name: "About", href: "/about" },
              { name: "Contact", href: "/contact" },
            ].map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="relative font-light px-3 py-2 border-b-2 border-transparent transition-all duration-300 hover:border-cyan-600 hover:-translate-y-0.5">
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <MobileNav />
            <div className="hidden sm:block">
              {loggedIn ? (
                <form action={logOut}>
                    <LogOutIcon/>
                </form>
              ) : (
                <Button
                  asChild
                  className="px-6 hover:bg-cyan-800 hover:text-white"
                >
                  <Link href="/login">Login</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
