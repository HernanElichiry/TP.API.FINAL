import { IsString, IsArray, IsNumber, IsPositive, IsNotEmpty, Min, Max, ArrayNotEmpty } from 'class-validator';

export class CreateCourseDto {
  /*@IsInt()
  @IsPositive()
  id: number;*/

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  instructor: string;

  @IsNumber()
  @IsPositive()
  duration: number;

  @IsString()
  @IsNotEmpty()
  platform: string;

  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  topics: string[];
}