import { getAllPatients } from "@/actions/helper.actions"

export const GET = async ()=>{
    try {
        const res = await getAllPatients()
        return new Response(JSON.stringify(res), { status: 200 })
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch patients" }), { status: 500 })
    }
}