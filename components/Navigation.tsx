import Link from "next/link";
import { getCurrentPatient, getCurrentDoctor } from "@/actions/helper.actions";
import { logOut } from "@/actions/user.actions";
import { Button } from "@/components/ui/button";
import MobileNav from "./MobileNav";


export default async function Navigation() {
  const patientResp = await getCurrentPatient();
  const doctorResp = await getCurrentDoctor();
  const loggedIn = !!patientResp?.data || !!doctorResp?.data;

  return (
    <nav className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
        <div className="flex justify-between h-20 items-center">

          <div className="flex-shrink-0">
            <Link href="/">
              <span className="text-xl font-bold text-black">CounsellingApp</span>
            </Link>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:space-x-10">
            <Link href="/" className="inline-flex items-center text-sm font-semibold text-black hover:text-cyan-900">
              Home
            </Link>
            <Link href="/about" className="inline-flex items-center text-sm font-semibold text-black hover:text-cyan-900">
              About
            </Link>
            <Link href="/contact" className="inline-flex items-center text-sm font-semibold text-black hover:text-cyan-900">
              Contact
            </Link>
          </div>

       <div className="flex items-center gap-3">
  <MobileNav />
  <div className="hidden sm:block"> 
    {loggedIn ? (
      <form action={logOut}>
        <Button type="submit" variant="destructive">Logout</Button>
      </form>
    ) : (
      <Link href="/login">
        <Button variant="outline" className="rounded-full px-6 border-2 border-cyan-500 text-black hover:bg-cyan-800 hover:text-white">
  Login
</Button>
      </Link>
    )}
  </div>
</div>

        </div>
      </div>
    </nav>
  );
}   