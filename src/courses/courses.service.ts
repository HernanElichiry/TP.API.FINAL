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


  /*async getOneById(id: number): Promise<Course> {
    const res = await fetch(`${this.baseURL}/${id}`);
    const parsed = await res.json();
    if (Object.keys(parsed).length) return parsed;   // Verifica si el objeto parsed tiene claves
    //track no existe: lanzamos una excepción al controller
    throw new NotFoundException(`Track con id ${id} no existe`);
    
  }*/

  async getOneById(id: number): Promise<Course> {
      if (isNaN(id) || !Number.isInteger(id) || id <= 0) {
        throw new BadRequestException('Invalid ID provided');
      }
    
      const res = await fetch(`${this.baseURL}/${id}`);
      if (!res.ok) {
        throw new NotFoundException(`Course with ID ${id} not found`);
      }
    
      const parsed = await res.json();
      return parsed;
    }

  private async setId(): Promise<string> {
    const courses = await this.getAll();
    const ids = courses.map(item => parseInt(item.id, 10)); // Convertir los IDs a números para encontrar el mayor
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
  
  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
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


 async getCoursesByCategory(category: string): Promise<Course[]> {
    // Validar que la categoría no esté vacía
    if (!category) {
      throw new BadRequestException('parametro Category es requerido');

    }

    const res = await fetch(`${this.baseURL}?category=${category}`);
    const parsed = await res.json();
    return parsed;
  
 }
  
  


}