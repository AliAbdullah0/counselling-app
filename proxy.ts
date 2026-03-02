import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const doctorCookie = request.cookies.get("doctor.session.id");
  const patientCookie = request.cookies.get("session.cookie.id");
  const adminCookie = request.cookies.get("admin.session.id");

  const pathname = request.nextUrl.pathname;

  const loginPaths = ["/login", "/sign-up"];
  const patientPaths = ["/patient"];
  const doctorPaths = ["/doctor"];
  const adminPaths = ["/admin"];

  if (adminCookie) {
    if (
      loginPaths.some((p) => pathname.startsWith(p)) ||
      patientPaths.some((p) => pathname.startsWith(p)) ||
      doctorPaths.some((p) => pathname.startsWith(p))
    ) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  if (doctorCookie) {
    if (
      loginPaths.some((p) => pathname.startsWith(p)) ||
      patientPaths.some((p) => pathname.startsWith(p)) ||
      adminPaths.some((p) => pathname.startsWith(p))
    ) {
      return NextResponse.redirect(new URL("/doctor", request.url));
    }
  }

  if (patientCookie) {
    if (
      loginPaths.some((p) => pathname.startsWith(p)) ||
      doctorPaths.some((p) => pathname.startsWith(p)) ||
      adminPaths.some((p) => pathname.startsWith(p))
    ) {
      return NextResponse.redirect(new URL("/patient", request.url));
    }
  }

  const protectedPaths = [...patientPaths, ...doctorPaths, ...adminPaths];
  if (!doctorCookie && !patientCookie && !adminCookie) {
    if (protectedPaths.some((p) => pathname.startsWith(p))) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/sign-up", "/login", "/patient", "/doctor", "/admin"],
};