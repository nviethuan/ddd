import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Username or password is not valid',
  })
  username: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Username or password is not valid',
  })
  password: string;
}
