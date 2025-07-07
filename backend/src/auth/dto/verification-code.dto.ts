import { IsEmail, Length } from 'class-validator';

export class VerificationCodeDto {
    @IsEmail()
    email: string;

    @Length(6, 6)
    code: string;
}