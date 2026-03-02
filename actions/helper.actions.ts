"use server"

import prisma from "@/lib/prisma"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const getCurrentPatient = async () => {
  const cookieStore = await cookies()
  const patientCookie = cookieStore.get("session.cookie.id")?.value

  if (patientCookie) {
    const patient = await prisma.patient.findUnique({
      where: { id: patientCookie },
      include: {
        Doctors: true, 
      },
    })

    if (!patient) {
      return { status: 404, data: null }
    }

    return {
      status: 200,
      data: patient,
    }
  }
  return { status: 404, data: null }
}

export const getCurrentDoctor = async () => {
  const cookieStore = await cookies()
  const id = cookieStore.get("doctor.session.id")?.value

  if (id) {
    const doctor = await prisma.doctor.findUnique({
      where: { id},
      include: {
        Patient: true, 
      },
    })
    console.log(doctor)
    if (!doctor) {
      return { status: 404, data: null }
    }

    return {
      status: 200,
      data: doctor,
    }
  }
  return 
}

export const isLoggedIn = async () => {
 const cookie = await cookies();
 const patientCookie = cookie.get("session.cookie.id")?.value
 const doctorCookie = cookie.get("doctor.session.id")?.value
 const adminCookie = cookie.get("admin.session.id")?.value
 if(patientCookie || doctorCookie || adminCookie){ 
  return true
 }
 return false
}

export async function logout() {
  const cookieStore =  await cookies();

  cookieStore.delete("session.cookie.id");
  cookieStore.delete("doctor.session.id");
  cookieStore.delete("admin.session.id");

  redirect("/login");
}