import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import New, { INew } from '@/models/New';

export const POST = async (request: NextRequest) => {
    try {
        await dbConnect();

        const body = await request.json();
        const { new_id } = body;

        if (!new_id) {
            return NextResponse.json(
                { success: false, error: 'new_id is required' },
                { status: 400 }
            );
        }

        const deletedNew = await New.findOneAndDelete({ new_id: new_id }).lean<INew>();

        if (!deletedNew) {
            return NextResponse.json(
                { success: false, error: 'New not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: deletedNew,
            message: 'New deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting new:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete new' },
            { status: 500 }
        );
    }
}
