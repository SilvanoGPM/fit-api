import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class PromoteUserDTO {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'E-mail do usuário para promover.' })
  email: string;

  @IsString()
  @ApiProperty({ description: 'Cargo para promover o usuário.' })
  role: string;
}
