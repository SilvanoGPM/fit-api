import { ApiProperty } from '@nestjs/swagger';

import {
  IsNotEmpty,
  Length,
  IsNumber,
  IsPositive,
  IsOptional,
  Min,
} from 'class-validator';

export class CreateFoodDTO {
  @IsNotEmpty()
  @Length(5)
  @ApiProperty({ minLength: 5, description: 'Nome da comida.' })
  name: string;

  @IsPositive()
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsOptional()
  @ApiProperty({
    nullable: true,
    description: 'Identificador da categoria do alimento.',
  })
  categoryId: number;

  @IsNumber()
  @Min(0)
  @ApiProperty({
    minimum: 0,
    description: 'Quantidade de energia (em kcal) da comida.',
  })
  energy: number;

  @IsNumber()
  @Min(0)
  @ApiProperty({
    minimum: 0,
    description: 'Quantidade de proteínas da comida.',
  })
  protein: number;

  @IsNumber()
  @Min(0)
  @ApiProperty({
    minimum: 0,
    description: 'Quantidade de carboidratos da comida.',
  })
  carbohydrate: number;

  @IsNumber()
  @Min(0)
  @ApiProperty({
    minimum: 0,
    description: 'Quantidade de gorduras da comida.',
  })
  lipid: number;

  @IsNumber()
  @Min(0)
  @ApiProperty({
    minimum: 0,
    description: 'Quantidade de fibras da comida.',
  })
  fiber: number;
}
