import { getCurrentDoctor } from "@/actions/helper.actions";
export async function GET() {
  const result = await getCurrentDoctor();
  return Response.json(result);
}

