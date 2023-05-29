import { ApiProperty } from '@nestjs/swagger';

import { IsNotEmpty, IsUUID, IsString, IsUrl } from 'class-validator';

export class AddFoodImageDTO {
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Identificador da comida para adicionar a imagem.',
  })
  id: string;

  @IsNotEmpty()
  @IsUrl()
  @ApiProperty({ description: 'Imagem da comida.' })
  image: string;
}
