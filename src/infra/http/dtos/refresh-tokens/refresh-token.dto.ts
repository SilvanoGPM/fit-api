import { IsJWT, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshTokenDTO {
  @IsNotEmpty()
  @IsJWT()
  @ApiProperty({ description: 'Refresh token para realizar o login.' })
  token: string;
}
