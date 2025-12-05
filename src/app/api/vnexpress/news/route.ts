import dbConnect from "@/lib/mongodb"
import New, { INew } from "@/models/New";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
        await dbConnect();

        const searchParams = request.nextUrl.searchParams;
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '10', 10);

        const offset = (page - 1) * limit;
        const search = searchParams.get('search') || '';
        const [news, total, totalALl] = await Promise.all([
            New.find({ new_id: Number(search) }).skip(offset).limit(limit).lean<INew[]>(),
            New.countDocuments({ new_id: Number(search) }),
            New.countDocuments(),
        ]);

        return NextResponse.json({
            success: true,
            data: news,
            total,
            totalALl,
        });
    } catch (error) {
        console.error('Error fetching news:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch news' },
            { status: 500 }
        );
    }
}