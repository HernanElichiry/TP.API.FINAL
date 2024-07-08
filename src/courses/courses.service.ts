import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './entities/course.entity';

import { UpdateCourseDto } from './dto/update-course.dto';


@Injectable()
export class CoursesService {
  private readonly baseURL = 'http://localhost:3030/Courses';

  async getAll(): Promise<Course[]> {
    const res = await fetch(this.baseURL);
    const parsed = await res.json(); 
    return parsed;
  }


  async getOneById(id: number): Promise<Course> {
      const res = await fetch(`${this.baseURL}/${id}`);
      if (!res.ok) {
        throw new NotFoundException(`Course with ID ${id} not found`);
      }
    
      const parsed = await res.json();
      return parsed;
    }

  private async setId(): Promise<string> {
    const courses = await this.getAll();
    const ids = courses.map(item => parseInt(item.id)); // Convertir los IDs a números para encontrar el mayor
    const maxId = ids.length > 0 ? Math.max(...ids) : 0; // Encontrar el ID más grande en la matriz de IDs
    return (maxId + 1).toString(); // Convertir el nuevo ID a string
  }

  async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    const newId = await this.setId();
    const newCourse: Course = { id: newId, ...createCourseDto };

    const res = await fetch(this.baseURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newCourse),
    });
    const parsed = await res.json(); // Usa await aquí
    return parsed;
  }

  async updateAll(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const courseToUpdate = await this.getOneById(id);
    
    const updatedCourse = { ...courseToUpdate, ...updateCourseDto }; //operación que crea un nuevo objeto combinando dos objetos:
  
    const res = await fetch(`${this.baseURL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedCourse),
    });
  
    if (!res.ok) {
      throw new InternalServerErrorException('Error al actualizar el curso');
    }
  
    const parsed = await res.json();
    return parsed;
  }
  
  async partialUpdate(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const courseToUpdate = await this.getOneById(id);
    
    const updatedCourse = { ...courseToUpdate, ...updateCourseDto };
  
    const res = await fetch(`${this.baseURL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedCourse),
    });
  
    if (!res.ok) {
      throw new InternalServerErrorException('Error al actualizar el curso');
    }
  
    const parsed = await res.json();
    return parsed;
  }

  async deleteCourseById(id: number): Promise<any> {
    const res = await fetch(`${this.baseURL}/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      if (res.status === 404) {
        throw new NotFoundException(`Course with ID ${id} not found`);
      }
      throw new Error("Failed to delete course");
    }

    const parsed = await res.json();
    return parsed;
  }

// http://localhost:3000/courses/search/byCategory?category=
/* async getCoursesByCategory(category: string): Promise<Course[]> {
    // Validar que la categoría no esté vacía
    if (!category) {
      throw new BadRequestException('parametro Category es requerido');
    }
    
    const res = await fetch(`${this.baseURL}?category=${category}`);
    const parsed = await res.json();
     // Verificar si se encontraron cursos
  if (parsed.length === 0) {
    throw new NotFoundException(`No se encontraron cursos para la categoría: ${category}`);
  }

  
    return parsed;
  
 }*/

 async getCoursesByCategory(category: string): Promise<Course[]> {
  // Validar que el campo category no este vacío
  if (!category) {
    throw new BadRequestException('El parámetro "category" es requerido');
  }

  const res = await fetch(this.baseURL); 
  const courses: Course[] = await res.json();

  // Normalizar la categoría para comparación insensible a mayúsculas/minúsculas y acentos
  const normalizedCategory = this.normalizeString(category);

  // Filtrar los cursos por categoría normalizada
  const filteredCourses = courses.filter(course => 
    this.normalizeString(course.category) === normalizedCategory
  );

  // Verificar si se encontraron cursos
  if (filteredCourses.length === 0) {
    throw new NotFoundException(`No se encontraron cursos para la categoría: ${category}`);
  }

  return filteredCourses;
}

// Método para normalizar strings
private normalizeString(string: string): string {
  return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}
  



}