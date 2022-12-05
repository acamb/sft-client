export interface PaginatedResponse<T>{

    totalItems: number;
    items: Array<T>;
    totalPages: number;
    currentPage: number;

}