import dbConnect from "@/lib/mongodb"
import New, { INew } from "@/models/New";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
    try {
        await dbConnect();

        const searchParams = request.nextUrl.searchParams;
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '10', 10);
        const category = searchParams.get('category') || '';
        const offset = (page - 1) * limit;
        const search = searchParams.get('search') || '';

        // Build query object
        const query: Record<string, string | number> = {};
        if (search) {
            query.new_id = Number(search);
        }
        if (category) {
            query.category = category;
        }

        // Fetch one extra to check if there are more items
        const news = await New.find(query)
            .sort({ publish_date: -1 })
            .skip(offset)
            .limit(limit + 1)
            .lean<INew[]>();

        const hasMore = news.length > limit;
        const data = hasMore ? news.slice(0, limit) : news;

        const [total, totalALl] = await Promise.all([
            New.countDocuments(query),
            New.countDocuments(),
        ]);

        return NextResponse.json({
            success: true,
            data,
            hasMore,
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