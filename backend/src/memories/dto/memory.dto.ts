import { Expose, Transform } from "class-transformer";

export class MemoryDto {
    @Expose()
    id: number;

    @Expose()
    latitude: number;

    @Expose()
    longitude: number;

    @Expose()
    city: string;

    @Expose()
    country: string;

    @Expose()
    title: string;

    @Expose()
    description?: string;

    @Expose()
    photoUrl?: string[];

    @Expose()
    @Transform(({ obj }) => obj.category?.id)
    categoryId?: number;

    @Expose()
    @Transform(({ obj }) => obj.category?.name)
    categoryName?: string;

    @Expose()
    @Transform(({ obj }) =>
        `${obj.user.firstName} ${obj.user.lastName}`.trim()
    )
    userFullName: string;

    @Expose()
    createdAt: Date;

    @Expose()
    updatedAt: Date;
}