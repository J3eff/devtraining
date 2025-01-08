import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/courses.entity';
//import { UpdateCourseDTO } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'NestJs',
      description: 'Cursos sobre fundamentos do framework NestJs',
      tags: ['node.js', 'nestjs', 'typescript', 'javascript'],
    },
  ];

  findAll() {
    return this.courses;
  }

  findOne(id: number) {
    const course = this.courses.find((course) => course.id === id);

    if (!course) throw new NotFoundException(`Course ID ${id} not found`);

    return course;
  }

  create(createCourseDTO: any) {
    this.courses.push(createCourseDTO);
    return createCourseDTO;
  }

  update(id: number, updateCourseDTO: Course) {
    const existingCourse = this.findOne(id);
    if (existingCourse) {
      const index = this.courses.findIndex((course) => course.id === id);
      this.courses[index] = { id, ...updateCourseDTO };
    }
  }

  remove(id: number) {
    const index = this.courses.findIndex((course) => course.id === id);
    if (index >= 0) {
      this.courses.splice(index, 1);
    }
  }
}
