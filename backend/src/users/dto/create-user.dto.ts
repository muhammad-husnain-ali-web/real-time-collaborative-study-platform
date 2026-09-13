import { IsEmail, IsString, IsEnum, MinLength } from "class-validator";
import { Role } from "../enum/role.enum";

export class CreateUserDto {
    @IsString()
    @MinLength(2, { message: 'Name must be at least 2 character long' })
    name!: string;

    @IsEmail({}, { message: 'Email must be valid' })
    email!: string;

    @IsString()
    password!: string

    @IsEnum(Role, {
    message: 'Role must be student, teacher, or admin',
    })
    role!: Role;
}
