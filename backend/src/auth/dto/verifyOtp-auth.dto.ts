import { IsEmail, IsString } from "class-validator";

export class VerifyOtpAuthDto {

    @IsEmail({}, { message: 'Email must be valid' })
    email!: string;

    @IsString()
    otp!: string
}