import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import New from '@/models/New';

export const POST = async (request: NextRequest) => {
    try {
        await dbConnect();

        const body = await request.json();
        const { title, sub_title, content, thumbnail, category, author, } = body;

        if (!title || !category || !content) {
            return NextResponse.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const lastNew = await New.findOne().sort({ new_id: -1 }).limit(1);
        const newNewId = lastNew && lastNew.new_id ? lastNew.new_id + 1 : 1;

        await New.create({
            new_id: newNewId,
            title,
            sub_title,
            content,
            thumbnail,
            category,
            author,
            publish_date: new Date(),
        });

        return NextResponse.json({
            success: true,
            new_id: newNewId,
            message: 'New created successfully'
        }, { status: 201 });
    } catch (error) {
        console.error('Error creating new:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create new' },
            { status: 500 }
        );
    }
}
