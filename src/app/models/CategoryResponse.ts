export interface CategoryResponse {
    id: string;
    name: string;
}

export interface CategoryWithChildrenRespose extends CategoryResponse {
    children: CategoryWithChildrenRespose[];
}