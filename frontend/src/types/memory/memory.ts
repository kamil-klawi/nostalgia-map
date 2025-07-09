export interface Memory {
    id: number;
    latitude: number;
    longitude: number;
    city: string;
    country: string;
    title: string;
    description?: string;
    photoUrl?: string[];
    likeCount: number;
    categoryId?: number;
    categoryName?: string;
    userFullName: string;
    createdAt: Date;
    updatedAt: Date;
}