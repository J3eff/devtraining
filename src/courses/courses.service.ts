import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/courses.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
//import { UpdateCourseDTO } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly coureseRepository: Repository<Course>,
  ) {}

  async findAll() {
    return await this.coureseRepository.find();
  }

  async findOne(id: number) {
    const course = await this.coureseRepository.findOne({ where: { id } });

    if (!course) throw new NotFoundException(`Course ID ${id} not found`);

    return course;
  }

  async create(createCourseDTO: any) {
    // Cria entidade
    const course = this.coureseRepository.create(createCourseDTO);
    // Salva a entidade criada
    return await this.coureseRepository.save(course);
  }

  async update(id: number, updateCourseDTO: Course) {
    const course = await this.coureseRepository.preload({
      ...updateCourseDTO,
      id,
    });

    if (!course) throw new NotFoundException(`Course ID ${id} not found`);

    return await this.coureseRepository.save(course);
  }

  async remove(id: number) {
    const course = await this.coureseRepository.findOne({ where: { id } });

    if (!course) throw new NotFoundException(`Course ID ${id} not found`);

    return await this.coureseRepository.remove(course);
  }
}
