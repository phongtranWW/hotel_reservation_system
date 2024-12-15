import {
  Body,
  Controller,
  Get,
  Headers,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ReservationService } from '@reservations/reservation.service';
import { CreateReservationDto } from '@reservations/dtos/create-reservation.dto';
import { ApiBody, ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('Reservation')
@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @ApiHeader({
    name: 'X-Consumer-ID',
    description: 'User ID',
    required: true,
  })
  @ApiBody({ type: CreateReservationDto })
  @Post()
  async create(
    @Headers('X-Consumer-ID') userId: string,
    @Body() createReservationDto: CreateReservationDto,
  ) {
    return await this.reservationService.create(userId, createReservationDto);
  }

  @ApiHeader({
    name: 'X-Consumer-ID',
    description: 'User ID',
    required: true,
  })
  @ApiQuery({ name: 'page', required: true, type: Number })
  @ApiQuery({ name: 'limit', required: true, type: Number })
  @Get()
  async findUserReservations(
    @Headers('X-Consumer-ID') userId: string,
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return await this.reservationService.findUserReservations(
      userId,
      page,
      limit,
    );
  }
}
