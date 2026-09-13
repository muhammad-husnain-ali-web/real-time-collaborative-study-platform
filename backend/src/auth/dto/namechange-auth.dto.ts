import { IsString, MinLength } from "class-validator";

export class NameChangeAuthDto {
    @IsString()
    @MinLength(2, { message: 'Name must be at least 2 character long' })
    name!: string;
}
