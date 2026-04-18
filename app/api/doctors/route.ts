import prisma from "@/lib/prisma";

export const GET = async () => {
  try {
    const doctors = await prisma.doctor.findMany({});
    return new Response(JSON.stringify(doctors), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch doctors", { status: 500 });
  }
};