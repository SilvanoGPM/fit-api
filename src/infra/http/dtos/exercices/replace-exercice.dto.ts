import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

import {
  IsNotEmpty,
  IsNotEmptyObject,
  Length,
  IsString,
  ArrayNotEmpty,
  IsArray,
  IsObject,
  IsDefined,
  ValidateNested,
  IsUUID,
} from 'class-validator';

import { Videos } from './videos';

export class ReplaceExerciceDTO {
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ description: 'Identificador do exercício para atualizar' })
  id: string;

  @IsNotEmpty()
  @Length(5)
  @ApiProperty({ minLength: 5, description: 'Nome do exercício.' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Dificuldade de realizar o exercício.',
    examples: ['Beginner', 'Advanced'],
  })
  difficulty: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Grupo muscular que o exercício trabalha.',
    examples: ['biceps', 'triceps', 'traps'],
  })
  muscle: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Dificuldade de realizar o exercício.',
    examples: ['dumbbells', 'bodyweight'],
  })
  mode: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  @ApiProperty({
    description: 'Passo a passo para executar o exercício.',
  })
  steps: string[];

  @IsNotEmptyObject()
  @IsObject()
  @IsDefined()
  @ValidateNested()
  @Type(() => Videos)
  @ApiProperty({
    description: 'Videos de pessoas realizando o exercício.',
  })
  videos: Videos;
}
