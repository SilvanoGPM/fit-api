import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword, Length } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'E-mail do usuário.' })
  email: string;

  @IsNotEmpty()
  @Length(5)
  @ApiProperty({ description: 'Nome do usuário.' })
  name: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @ApiProperty({ description: 'Senha do usuário' })
  password: string;
}
