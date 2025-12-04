import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User, { IUser } from '@/models/User';

export const GET = async ({ params }: { params: { id: string } }) => {
    try {
        await dbConnect();

        const user = await User.findOne({ user_id: params.id }).lean<IUser>();

        return NextResponse.json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch users' },
            { status: 500 }
        );
    }
}