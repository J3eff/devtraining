import { Injectable } from '@nestjs/common';
import { Course } from './courses.entity';

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
}
