import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray } from 'class-validator';

export class Videos {
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    description: 'Links de vídeos de homens realizando o exercício',
  })
  male: string[];

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    description: 'Links de vídeos de mulheres realizando o exercício',
  })
  female: string[];
}
