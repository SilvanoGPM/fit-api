import {
  IsNotEmpty,
  Length,
  IsNumber,
  IsPositive,
  IsOptional,
  Min,
  IsUUID,
  IsString,
} from 'class-validator';

export class ReplaceFoodDTO {
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @Length(5)
  name: string;

  @IsPositive()
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsOptional()
  categoryId: number;

  @IsNumber()
  @Min(0)
  energy: number;

  @IsNumber()
  @Min(0)
  protein: number;

  @IsNumber()
  @Min(0)
  carbohydrate: number;

  @IsNumber()
  @Min(0)
  lipid: number;

  @IsNumber()
  @Min(0)
  fiber: number;
}
