import { IsOptional, IsString, MinLength } from "class-validator";

export class CreateCourseDto {

    @IsString()
    @MinLength(5, { message: 'Title must be at least 5 character long' })
    title!: string;

    @IsOptional()
    code!: string;

    @IsOptional()
    description!: string;

}
