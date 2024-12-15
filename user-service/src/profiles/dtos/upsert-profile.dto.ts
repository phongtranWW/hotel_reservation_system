import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsString, Length } from 'class-validator';

export class UpsertProfileDto {
  @IsString()
  @Length(2, 50)
  @ApiProperty({ name: 'First Name', required: true, type: String })
  firstName: string;

  @IsString()
  @Length(2, 50)
  @ApiProperty({ name: 'Last Name', required: true, type: String })
  lastName: string;

  @IsEmail()
  @ApiProperty({ name: 'Email', required: true, type: String })
  email: string;

  @IsPhoneNumber()
  @ApiProperty({ name: 'Phone', required: true, type: String })
  phone: string;
}
