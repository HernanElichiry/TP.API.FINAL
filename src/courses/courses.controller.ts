import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, NotFoundException, ParseIntPipe, HttpStatus, Query, Put } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';


@Controller('Courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}
 
  //manejador de ruta
  @Get('')
  async getAllCourses(): Promise<Course[]> {
    return this.coursesService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number): Promise<Course> {
    return this.coursesService.getOneById(id);//este parseintpipe convierte string en numero y no acepta caracteres
 }

  @Post('')
 async create(@Body()createCourse: CreateCourseDto): Promise<Course> {
    return this.coursesService.createCourse(createCourse);
  }
 

  @Patch(':id')
  async update(@Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number,
   @Body() updateCourseDto: UpdateCourseDto): Promise<Course> {
    const update = this.coursesService.partialUpdate(id, updateCourseDto);

    return update;

  }

  @Put(':id')
  async updateAll(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE })) id: number,
    @Body() updateCourseDto: UpdateCourseDto,): Promise<Course> {
    const update =  this.coursesService.updateAll(id, updateCourseDto);
    return update;  
  }
  
  @Delete(':id')
 async remove(@Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number):Promise<string> {
    return this.coursesService.deleteCourseById(id);
  }

  @Get('search/byCategory')
  async getCoursesByCategory(@Query('category') category: string): Promise<Course[]> {
    return this.coursesService.getCoursesByCategory(category);
  }

}
