import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CoursesService {

  constructor(
    @InjectRepository(Course)
            private couresRepository: Repository<Course>,
  ){}

  async create(createCourseDto: CreateCourseDto, request: any) {
    try{
      const newCourse = this.couresRepository.create({ ...createCourseDto, teacher :request.user.id });
      await this.couresRepository.save(newCourse)
      return { success: true, message: "Course Saved Successfully" }
    }
    catch (error: any) {
      if (error?.code === 'ER_DUP_ENTRY' || error?.errno === 1062){
        throw new ConflictException({ success: false, message: "Course Code already exit" });
      }
      throw error
    }
  }

  findAll() {
    return `This action returns all courses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
