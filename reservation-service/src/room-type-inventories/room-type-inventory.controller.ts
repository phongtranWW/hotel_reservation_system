import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  ParseIntPipe,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { RoomTypeInventoryService } from '@room-type-inventories/room-type-inventory.service';

@ApiTags('Room Type Inventory')
@Controller('room-type-inventories')
export class RoomTypeInventoryController {
  constructor(
    private readonly roomTypeInventoryService: RoomTypeInventoryService,
  ) {}

  @ApiQuery({
    name: 'startDate',
    required: true,
    type: String,
    format: 'date',
  })
  @ApiQuery({
    name: 'endDate',
    required: true,
    type: String,
    format: 'date',
  })
  @ApiQuery({
    name: 'hotelId',
    required: true,
    type: Number,
  })
  @ApiQuery({
    name: 'roomTypeId',
    required: true,
    type: Number,
  })
  @ApiQuery({
    name: 'numberOfRoomsToReserve',
    required: true,
    type: Number,
  })
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAvailableRoomTypeInventories(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('hotelId', ParseIntPipe) hotelId: number,
    @Query('roomTypeId', ParseIntPipe) roomTypeId: number,
    @Query('numberOfRoomsToReserve', ParseIntPipe)
    numberOfRoomsToReserve: number,
  ) {
    return await this.roomTypeInventoryService.findAvailableRoomTypeInventories(
      startDate,
      endDate,
      hotelId,
      roomTypeId,
      numberOfRoomsToReserve,
    );
  }
}
