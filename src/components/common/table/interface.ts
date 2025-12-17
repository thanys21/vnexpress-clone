
export interface Columns<T> {
    title: string;
    type: string;
    value: (item: T, index: number) => React.ReactElement;
}

export interface Pagination {
    total: number;
    limit: number;
    page: number;
    handleChange: (page: number) => void;
}

export interface TableProps<T> {
    columns: Columns<T>[];
    data: T[];
    pagination: Pagination;
    fixed?: {
        title: boolean;
        firstColumn: boolean;
    };
}
