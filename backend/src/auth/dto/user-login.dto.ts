import { IsEmail, IsString,} from "class-validator";

export class loginUserDto {

    @IsEmail({}, { message: 'Email must be valid' })
    email!: string;

    @IsString()
    password!: string

}
