import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import New, { INew } from '@/models/New';

export const POST = async (request: NextRequest) => {
    try {
        await dbConnect();

        const body = await request.json();
        const { new_id, title, sub_title, content, thumbnail, category, author, publish_date, } = body;

        if (!new_id) {
            return NextResponse.json(
                { success: false, error: 'new_id is required' },
                { status: 400 }
            );
        }

        const updateData: Partial<INew> = {};
        if (title) updateData.title = title;
        if (sub_title) updateData.sub_title = sub_title;
        if (content) updateData.content = content;
        if (thumbnail) updateData.thumbnail = thumbnail;
        if (category) updateData.category = category;
        if (author) updateData.author = author;
        if (publish_date) updateData.publish_date = publish_date;

        const updatedNew = await New.findOneAndUpdate(
            { new_id },
            { $set: updateData },
            { new: true, runValidators: true }
        ).lean<INew>();

        if (!updatedNew) {
            return NextResponse.json(
                { success: false, error: 'New not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: updatedNew,
            message: 'New updated successfully'
        });
    } catch (error) {
        console.error('Error updating new:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update new' },
            { status: 500 }
        );
    }
}
