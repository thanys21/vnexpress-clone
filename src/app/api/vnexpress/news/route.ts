import dbConnect from "@/lib/mongodb"

export const GET = async () => {
    try {
        await dbConnect();

        
    } catch (errpr) {
        
    }
}