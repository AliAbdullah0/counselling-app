import Link from "next/link";
import { getCurrentPatient, getCurrentDoctor } from "@/actions/helper.actions";
import { logOut } from "@/actions/user.actions";

// Navigation is a server component so that we can read the cookie and
// decide whether to render the login or logout button on the server.
// This keeps the UI in sync with the current authentication state.
export default async function Navigation() {
  const patientResp = await getCurrentPatient();
  const doctorResp = await getCurrentDoctor();
  const loggedIn = !!patientResp?.data || !!doctorResp?.data;

  return (
    <nav className="w-full bg-cyan-600 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
      
          <div className="flex-shrink-0">
            <Link href="/">
              <span className="text-xl font-bold">CounsellingApp</span>
            </Link>
          </div>

        
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link
              href="/"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Contact
            </Link>
          </div>

       
          <div className="flex items-center">
            {loggedIn ? (
              <form action={logOut} method="post">
                <button
                  type="submit"
                  className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600"
                >
                  Logout
                </button>
              </form>
            )
            
            : (
              <Link href="/login">
                <button className="px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-900">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
