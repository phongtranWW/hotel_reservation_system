import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateReservationDto {
  @ApiProperty({ type: 'string', format: 'uuid' })
  @IsString()
  @IsUUID()
  reservationId: string;

  @ApiProperty({ type: 'number' })
  @IsNumber()
  hotelId: number;

  @ApiProperty({ type: 'number' })
  @IsNumber()
  roomTypeId: number;

  @ApiProperty({ type: 'string', format: 'date' })
  @IsString()
  startDate: string;

  @ApiProperty({ type: 'string', format: 'date' })
  @IsString()
  endDate: string;

  @ApiProperty({ type: 'number' })
  @IsNumber()
  numberOfRooms: number;
}
