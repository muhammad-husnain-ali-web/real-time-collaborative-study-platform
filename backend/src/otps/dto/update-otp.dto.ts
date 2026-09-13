import { IsDate, IsEnum, IsString } from "class-validator";
import { Purpose } from "../enum/purpose.enum";

export class UpdateOtpDto {
    @IsString()
    otp!: string

    @IsDate()
    otpExpiry!: Date;

    @IsDate()
    resendAllowedAfter!: Date;

    @IsEnum(Purpose)
    purpose!: Purpose

}