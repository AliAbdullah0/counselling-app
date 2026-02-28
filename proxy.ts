import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const doctorCookie = request.cookies.get("doctor.session.id")
  const patientCookie = request.cookies.get("session.cookie.id")
  const pathname = request.nextUrl.pathname
  console.log("token:",doctorCookie || patientCookie)

  if (doctorCookie || patientCookie && ( pathname.startsWith("/signup") || pathname.startsWith("/login"))) {
    if(doctorCookie)
    return NextResponse.redirect(new URL("/doctor", request.url))
    else 
    return NextResponse.redirect(new URL("/patient", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/signup","/login"],
}
