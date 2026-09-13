import { IsEmail } from "class-validator";

export class resendOtpAuthDto {

    @IsEmail({}, { message: 'Email must be valid' })
    email!: string;
}