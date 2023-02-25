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
  id: string;

  @IsNotEmpty()
  @Length(5)
  name: string;

  @IsNotEmpty()
  difficulty: string;

  @IsNotEmpty()
  muscle: string;

  @IsNotEmpty()
  mode: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty()
  steps: string[];

  @IsNotEmptyObject()
  @IsObject()
  @IsDefined()
  @ValidateNested()
  @Type(() => Videos)
  videos: Videos;
}
