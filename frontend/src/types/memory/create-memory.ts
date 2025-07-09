export interface CreateMemory {
    latitude: number;
    longitude: number;
    city: string;
    country: string;
    title: string;
    description?: string;
    photoUrl?: string[];
    categoryId?: number;
}