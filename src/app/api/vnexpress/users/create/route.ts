import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export const POST = async (request: NextRequest) => {
    try {
        await dbConnect();

        const body = await request.json();
        const { name, email, account, password } = body;

        if (!name || !account || !password) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const existingUser = await User.findOne({ account });
        if (existingUser) {
            return NextResponse.json(
                { success: false, error: 'Account already exists' },
                { status: 409 }
            );
        }

        const lastUser = await User.findOne().sort({ user_id: -1 }).limit(1);
        const newUserId = lastUser && lastUser.user_id ? lastUser.user_id + 1 : 1;

        const newUser = await User.create({
            user_id: newUserId,
            name,
            email: email || undefined,
            account,
            password,
        });

        return NextResponse.json({
            success: true,
            data: newUser,
            message: 'User created successfully'
        }, { status: 201 });
    } catch (error) {
        console.error('Error creating user:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create user' },
            { status: 500 }
        );
    }
}
