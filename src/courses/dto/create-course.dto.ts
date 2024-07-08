
  import { IsArray, IsNotEmpty, IsNumber, IsPositive, IsString, Min, Max, ArrayNotEmpty, Length, IsDefined, ArrayMinSize, ArrayMaxSize } from 'class-validator';

  export class CreateCourseDto {
    /*
    @IsInt()
    @IsPositive()
    id: number;
    */

    @IsString({ message: 'El título debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El título no puede estar vacío' })
    @Length(5, 100, { message: 'El título debe tener entre 5 y 100 caracteres' })
    @IsDefined()
    title: string;
  
    @IsString({ message: 'La descripción debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La descripción no puede estar vacía' })
    @Length(20, 300, { message: 'La descripción debe tener entre 20 y 300 caracteres' })
    @IsDefined()
    description: string;
  
    @IsString({ message: 'El nombre del instructor debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'El nombre del instructor no puede estar vacío' })
    @Length(3, 50, { message: 'El nombre del instructor debe tener entre 3 y 50 caracteres' })
    @IsDefined()
    instructor: string;
  
    @IsNumber({}, { message: 'La duración debe ser un número' })
    @IsPositive({ message: 'La duración debe ser un número positivo' })
    @IsDefined()
    duration: number;
  
    @IsString({ message: 'La plataforma debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La plataforma no puede estar vacía' })
    @Length(3, 50, { message: 'La plataforma debe tener entre 3 y 50 caracteres' })
    @IsDefined()
    platform: string;
  
    @IsNumber({}, { message: 'La calificación debe ser un número' })
    @Min(0, { message: 'La calificación mínima es 0' })
    @Max(5, { message: 'La calificación máxima es 5' })
    @IsDefined()
    rating: number;
  
    @IsString({ message: 'La categoría debe ser una cadena de texto' })
    @IsNotEmpty({ message: 'La categoría no puede estar vacía' })
    @Length(3, 20, { message: 'La categoría debe tener entre 3 y 20 caracteres' })
    @IsDefined()
    category: string;
  
    @IsArray()
    @ArrayNotEmpty({ message: 'Los temas no pueden estar vacíos' })
    @ArrayMinSize(1, { message: 'Debe haber al menos un tema' })
    @ArrayMaxSize(10, { message: 'No puede haber más de 10 temas' })
    @IsString({ each: true, message: 'Cada tema debe ser una cadena de texto' })
    @IsDefined()
    topics: string[];
  }
  