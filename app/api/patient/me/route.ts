import { getCurrentPatient } from "@/actions/helper.actions";

export async function GET() {
  const result = await getCurrentPatient();

  return Response.json(result);
}