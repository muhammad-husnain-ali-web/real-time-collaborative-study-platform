import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @MinLength(2, { message: 'Name must be at least 2 character long' })
    name!: string;

    @IsEmail({}, { message: 'Email must be valid' })
    email!: string;

    @IsString()
    password!: string
}
