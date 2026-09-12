import { IsDate, IsEmail, IsEnum, IsString } from "class-validator";
import { Purpose } from "../enum/purpose.enum";

export class CreateOtpDto {
    @IsEmail({}, { message: 'Email must be valid' })
    email!: string;

    @IsString()
    otp!: string

    @IsDate()
    otpExpiry!: Date;

    @IsDate()
    resendAllowedAfter!: Date;

    @IsEnum(Purpose)
    purpose!: Purpose

}