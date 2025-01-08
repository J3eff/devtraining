import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/courses.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tags.entity';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';
//import { UpdateCourseDTO } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly coureseRepository: Repository<Course>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async findAll() {
    return await this.coureseRepository.find();
  }

  async findOne(id: number) {
    const course = await this.coureseRepository.findOne({ where: { id } });

    if (!course) throw new NotFoundException(`Course ID ${id} not found`);

    return course;
  }

  async create(createCourseDTO: CreateCourseDTO) {
    const tags = await Promise.all(
      createCourseDTO.tags.map((name) => this.preloadTagByName(name)),
    );

    // Cria entidade
    const course = this.coureseRepository.create({ ...createCourseDTO, tags });
    // Salva a entidade criada
    return await this.coureseRepository.save(course);
  }

  async update(id: number, updateCourseDTO: UpdateCourseDTO) {
    const tags =
      updateCourseDTO.tags &&
      (await Promise.all(
        updateCourseDTO.tags.map((name) => this.preloadTagByName(name)),
      ));

    const course = await this.coureseRepository.preload({
      ...updateCourseDTO,
      id,
      tags,
    });

    if (!course) throw new NotFoundException(`Course ID ${id} not found`);

    return await this.coureseRepository.save(course);
  }

  async remove(id: number) {
    const course = await this.coureseRepository.findOne({ where: { id } });

    if (!course) throw new NotFoundException(`Course ID ${id} not found`);

    return await this.coureseRepository.remove(course);
  }

  private async preloadTagByName(name: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ where: { name } });

    if (tag) return tag;

    return this.tagRepository.create({ name });
  }
}
