export interface New {
    new_id: number;
    title: string;
    sub_title?: string;
    content: string;
    thumbnail?: string;
    category: string;
    author?: string;
    publish_date: Date;
    views: number;
}