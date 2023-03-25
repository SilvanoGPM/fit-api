import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'E-mail do usuário.' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Senha do usuário' })
  password: string;
}
