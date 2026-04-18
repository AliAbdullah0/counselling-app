"use server";

import prisma from "@/lib/prisma";
import { STATUS } from "@/lib/generated/prisma/enums";
import { cookies } from "next/headers";

export async function sendContactRequest({
  patientId,
  doctorId,
  message,
}: {
  patientId: string;
  doctorId: string;
  message: string;
}) {
  if (!patientId || !doctorId) {
    throw new Error("Missing patient or doctor ID");
  }

  if (!message || message.trim().length < 5) {
    throw new Error("Message too short");
  }

  const [patient, doctor] = await Promise.all([
    prisma.patient.findUnique({ where: { id: patientId } }),
    prisma.doctor.findUnique({ where: { id: doctorId } }),
  ]);

  if (!patient) throw new Error("Patient not found");
  if (!doctor) throw new Error("Doctor not found");

  const existing = await prisma.contactRequest.findFirst({
    where: {
      patientId,
      doctorId,
      status: STATUS.PENDING,
    },
  });

  if (existing) {
    throw new Error("Request already pending");
  }

  const request = await prisma.contactRequest.create({
    data: {
      patientId,
      doctorId,
      message: message.trim(),
      status: STATUS.PENDING,
    },
  });

  return request;
}

export async function getCurrentDoctorRequests() {
    const doctorId = (await cookies()).get("doctor.session.id")?.value;

  if (!doctorId) {
    throw new Error("Doctor ID is required");
  }

  const requests = await prisma.contactRequest.findMany({
    where: {
      doctorId,
      status: STATUS.PENDING,
    },
    include: {
      patient: {
        select: {
          id: true,
          name: true,
          email: true,
          contactNo: true,
          age: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return requests;
}

export async function acceptContactRequest(requestId: string) {
  const doctorId = (await cookies()).get("doctor.session.id")?.value;

  if (!doctorId) {
    throw new Error("Unauthorized");
  }

  try {
    const request = await prisma.contactRequest.update({
      where: { 
        id: requestId,
        doctorId, 
      },
      data: {
        status: STATUS.ACCEPTED,
      },
    });
    await prisma.patient.update({
      where: { id: request.patientId },
      data: { doctorId },
    });

    return { success: true, message: "Request accepted successfully" };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to accept request");
  }
}

export async function getAcceptedPatients() {
  const doctorId = (await cookies()).get("doctor.session.id")?.value;

  if (!doctorId) {
    throw new Error("Doctor ID is required");
  }

  const patients = await prisma.patient.findMany({
    where: { 
      doctorId,
      contactRequests: {
        some: {
          doctorId,
          status: STATUS.ACCEPTED,
        },
      },
    },
    select: {
      id: true,
      name: true,
      email: true,
      contactNo: true,
      age: true,
      address: true,
      createdAt: true,
      updatedAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return patients;
}