import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import New, { INew } from '@/models/New';

export const GET = async ({ params }: { params: { id: string } }) => {
    try {
        await dbConnect();

        const { id } = params;
        const theNew = await New.findOne({ new_id: Number(id) }).lean<INew>();

        return NextResponse.json({
            success: true,
            data: theNew
        });
    } catch (error) {
        console.error('Error fetching new:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch new' },
            { status: 500 }
        );
    }
}