"use server"

import argon2 from "argon2";
import prisma from "@/lib/prisma"
import { cookies } from "next/headers";


export const createPatient = async (form: FormData) => {
  const name = form.get("name") as string
  const email = form.get("email") as string
  const password = form.get("password") as string
  const age = form.get("age") as string 
  const contactNo = form.get("contactNo") as string
  const address = form.get("address") as string

  if (!name || !email || !password || !address || !age || !contactNo) {
    return { status: 400, message: "All fields are required!" }
  }

  try {
    const existingPatient = await prisma.patient.findUnique({
      where: { email },
    })

    if (existingPatient) {
      return { status: 409, message: "Account already exists!" }
    }

    const hashedPassword = await argon2.hash(password)

    const newPatient = await prisma.patient.create({
      data: {
        name,
        email,
        password: hashedPassword,
        address,
        age,
        contactNo,
      },
    })
    const cookie = await cookies();
    await cookie.set("session.cookie.id", newPatient.id)

    return {
      status: 201,
      message: "Account Created Successfully.",
    }
  } catch (error) {
    console.log(error)
    return {
      status: 500,
      message: "Error Creating Account.",
    }
  }
}

export const loginPatient = async (form:FormData)=>{
    try {
        const email = form.get("email") as string
        const password = form.get("password") as string
        const patient = await prisma.patient.findUnique({
            where:{
                email
            }
        })
        if(!patient) throw new Error("No Account found!")
        const isPasswordCorrect = await argon2.verify(patient.password,password)
        if(!isPasswordCorrect) throw new Error("Invalid Credentials!")
        const cookie = await cookies()
        await cookie.set("session.cookie.id",patient.id)
        return {
            status:200,
            message:"Login Successful."
        }
    } catch (error) {
        return {
            status:500,
            message:"Error Logging in."
        }
    }
}

