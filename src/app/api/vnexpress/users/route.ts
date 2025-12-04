import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User, { IUser } from '@/models/User';

export const GET = async (request: NextRequest) => {
    try {
        await dbConnect();

        const searchParams = request.nextUrl.searchParams;
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '10', 10);

        const offset = (page - 1) * limit;

        const [users, total] = await Promise.all([
            User.find({}).skip(offset).limit(limit).lean<IUser[]>(),
            User.countDocuments({})
        ]);

        return NextResponse.json({
            success: true,
            data: users,
            total,
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}

