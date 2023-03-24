import { IsNotEmpty, IsStrongPassword, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ReplaceUserDTO {
  @IsNotEmpty()
  @Length(5)
  @ApiProperty({ description: 'Nome do usuário.' })
  name: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @ApiProperty({ description: 'Senha do usuário' })
  password: string;
}
