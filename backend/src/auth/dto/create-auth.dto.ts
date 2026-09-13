import { IsEmail, IsEnum, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Role } from "src/users/enum/role.enum";

export class CreateAuthDto {
    @IsString()
    @MinLength(2, { message: 'Name must be at least 2 character long' })
    name!: string;
    
    @IsEmail({}, { message: 'Email must be valid' })
    email!: string;

    @IsString()
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        { message: 'Password too weak. Must include uppercase, lowercase, number, special character' }
    )
    password!: string

    @IsString()
    confirmPassword!: string

    @IsEnum(Role, {
    message: 'Role must be student, teacher, or admin',
  })
  role!: Role;
}
