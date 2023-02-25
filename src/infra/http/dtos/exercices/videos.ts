import { IsString, IsArray } from 'class-validator';

export class Videos {
  @IsArray()
  @IsString({ each: true })
  male: string[];

  @IsArray()
  @IsString({ each: true })
  female: string[];
}
