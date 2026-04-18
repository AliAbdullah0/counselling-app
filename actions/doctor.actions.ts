"use server"
 
import prisma from "@/lib/prisma"
import argon2 from "argon2"
import { cookies } from "next/headers"
import { getCurrentDoctor } from "./helper.actions"


export const createDoctor = async (form: FormData) => {
  const name = form.get("name") as string
  const email = form.get("email") as string
  const password = form.get("password") as string
  const qualification = form.get("qualification") as string 
  const clinicAddress = form.get("clinicAddress") as string 
  const contactNo = form.get("contactNo") as string 
  const whatsappNumber = form.get("whatsappNumber") as string 
  const buisnessEmail = form.get("buisnessEmail") as string 
  const education = form.get("education") as string 
  const speciality = form.get("speciality") as string 

  if (!name || !email || !password) {
    return { status: 400, message: "Name, email and password are required." }
  }

  try {
    const existingDoctor = await prisma.doctor.findUnique({
      where: { email },
    })

    if (existingDoctor) {
      return { status: 409, message: "Doctor already exists." }
    }

    if (buisnessEmail) {
      const existingBusinessEmail = await prisma.doctor.findUnique({
        where: { buisnessEmail },
      })

      if (existingBusinessEmail) {
        return { status: 409, message: "Business email already in use." }
      }
    }

    const hashedPassword = await argon2.hash(password)
    if(!qualification || !name || !email || !clinicAddress || !contactNo || !whatsappNumber || !buisnessEmail || !education || !speciality){
      return { status: 400, message: "All fields are required." }
    }
    const newDoctor = await prisma.doctor.create({
      data: {
        name,
        email,
        password: hashedPassword,
        qualification,
        clinicAddress,
        contactNo,
        whatsappNumber,
        buisnessEmail,
        education,
        speciality,
      },
    })
    const cookie = await cookies()

    await prisma.verificationRequest.create({
        data:{
            name,
            email,
            contactNo,
            clinicAddress,
            education,
            speciality,
        }
    })

    await cookie.set("doctor.session.id", newDoctor.id)
    await cookie.set("verified.doctor", newDoctor.verified ? "true" : "false")

    return {
      status: 201,
      message: "Doctor account created successfully.",
    }
  } catch (error) {
    console.error(error)
    return {
      status: 500,
      message: "Failed to create doctor account.",
    }
  }
}

export const loginDoctor = async (form: FormData) => {
  const email = form.get("email") as string
  const password = form.get("password") as string

  if (!email || !password) {
    return { status: 400, message: "Email and password required." }
  }

  try {
    const doctor = await prisma.doctor.findUnique({
      where: { email },
    })

    if (!doctor) {
      return { status: 404, message: "Doctor not found." }
    }

    const isValid = await argon2.verify(doctor.password, password)

    if (!isValid) {
      return { status: 401, message: "Invalid credentials." }
    }

     const cookie = await cookies()

    await cookie.set("doctor.session.id", doctor.id)
    await cookie.set("verified.doctor", doctor.verified ? "true" : "false")
    return {
      status: 200,
      message: "Login successful.",
    }
  } catch (error) {
    console.error(error)
    return {
      status: 500,
      message: "Login failed.",
    }
  }
}

export const updateDoctorProfile = async (
  doctorId: string,
  form: FormData
) => {
  const qualification = form.get("qualification") as string 
  const clinicAddress = form.get("clinicAddress") as string 
  const contactNo = form.get("contactNo") as string 
  const whatsappNumber = form.get("whatsappNumber") as string 
  const education = form.get("education") as string 
  const speciality = form.get("speciality") as string 
if(!education || !speciality || !clinicAddress || !contactNo || !whatsappNumber || !qualification){
  return { status: 400, message: "All fields are required." }
}
  try {
    await prisma.doctor.update({
      where: { id: doctorId },
      data: {
        qualification,
        clinicAddress,
        contactNo,
        whatsappNumber,
        education,
        speciality,
      },
    })

    return { status: 200, message: "Profile updated." }
  } catch (error) {
    console.error(error)
    return { status: 500, message: "Update failed." }
  }
}

export const checkVerificationStatus = async () => {
 try{
    const doctor = await getCurrentDoctor()
    if(!doctor) return { status: 404, message: "Doctor not found." }
    return { status: 200, verified:doctor.data?.verified }
 }catch(error){
    return { status: 500, verified:false }

 }
}

export const getAssignedPatients = async (doctorId:string) => {
  try {
    const patients = await prisma.patient.findMany({
      where: { doctorId },
      select: {
        id: true,
        name: true,
        email: true,
        contactNo: true,
        age: true,
        address: true,
      },
    })

    return { status: 200, patients }
  } catch (error) {
    console.error(error)
    return { status: 500, message: "Failed to fetch patients." }
  }
}