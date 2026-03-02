"use server"

import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"

export const getAllVerificationRequests = async () => {
    try {
        const res = await prisma.verificationRequest.findMany({
            orderBy:{
                createdAt: "desc"
            }
        })
        return res
    } catch (error) {
        throw error
    }
}

export const verifyDoctor = async (id: string) => {
    try {
        console.log("Verifying doctor with ID:", id)
        const request = await prisma.verificationRequest.findFirst({
            where: {
                id
            }
        })
        const doctor = await prisma.doctor.findFirst({
            where: {
                email: request?.email
            }
        })
        if(!doctor) return
        if(doctor.verified) {
            return {
                status: 400,
                message: "Doctor already verified."
            }
        }
        const res = await prisma.doctor.update({
            where: {
                email: doctor.email
            },
            data: {
                verified: true,
                updatedAt: new Date(),
            }
        })
        console.log(res)
        await prisma.verificationRequest.deleteMany({
                where: {
                    email:doctor.email
                }
        })

        return {
            status: 200,
            message: "Doctor verified."
        }
    } catch (error) {
        return {
            status: 500,
            message: "An error occurred while verifying the doctor."
        }
    }
}

export const adminLogin = async (form: FormData) => {
    const username = form.get("username") as string
    const password = form.get("password") as string

    if (!username || !password) {
        return { status: 400, message: "Username and password required." }
    }

    try {
        const admin = await prisma.admin.findFirst({
            where: { username },
        })

        if (!admin) {
            return { status: 404, message: "Admin not found." }
        }

        const isValid = await bcrypt.compare(password, admin.password)

        if (!isValid) {
            return { status: 401, message: "Invalid credentials." }
        }
        const cookie = await cookies()
        await cookie.set("admin.session.id", admin.id)
            return {
                status: 200,
                message: "Login successful.",
            }
    } catch (error) {
        return { status: 500, message: "Error logging in." }
    }
}