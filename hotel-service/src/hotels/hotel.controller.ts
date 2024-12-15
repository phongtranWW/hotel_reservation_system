import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { HotelService } from '@hotels/hotel.service';

@Controller('hotels')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page: number,
    @Query('limit', ParseIntPipe) limit: number,
  ) {
    return await this.hotelService.getHotels(page, limit);
  }

  @Get(':hotelId')
  async findOne(@Param('hotelId', ParseIntPipe) hotelId: number) {
    return await this.hotelService.getSpecifiedHotel(hotelId);
  }
}
