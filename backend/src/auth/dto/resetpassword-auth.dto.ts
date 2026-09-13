import { IsEmail, IsString, Matches, MinLength } from "class-validator";

export class ResetPasswordDto {
    @IsString()
    token!: string;

    @IsString()
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        { message: 'Password too weak. Must include uppercase, lowercase, number, special character' }
    )
    password!: string

    @IsString()
    confirmPassword!: string
}
