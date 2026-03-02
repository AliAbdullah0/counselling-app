import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const doctorCookie = request.cookies.get("doctor.session.id");
  const patientCookie = request.cookies.get("session.cookie.id");
  const adminCookie = request.cookies.get("admin.session.id");

  const pathname = request.nextUrl.pathname;
  console.log("Cookies:", { doctorCookie, patientCookie, adminCookie });

  const loginPaths = ["/login", "/sign-up"];
  const patientPaths = ["/patient"];
  const doctorPaths = ["/doctor"];
  const adminPaths = ["/admin"];

  // --- Redirect logged-in users away from login/signup ---
  if (adminCookie) {
    if (loginPaths.includes(pathname) || patientPaths.includes(pathname) || doctorPaths.includes(pathname)) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  if (doctorCookie) {
    if (loginPaths.includes(pathname) || patientPaths.includes(pathname) || adminPaths.includes(pathname)) {
      return NextResponse.redirect(new URL("/doctor", request.url));
    }
  }

  if (patientCookie) {
    if (loginPaths.includes(pathname) || doctorPaths.includes(pathname) || adminPaths.includes(pathname)) {
      return NextResponse.redirect(new URL("/patient", request.url));
    }
  }

  const protectedPaths = [...patientPaths, ...doctorPaths, ...adminPaths];
  if (!doctorCookie && !patientCookie && !adminCookie && protectedPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/sign-up", "/login", "/patient", "/doctor", "/admin"],
};