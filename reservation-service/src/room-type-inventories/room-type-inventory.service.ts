import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoomTypeInventory } from '@room-type-inventories/entities/room-type-inventory.entity';
import { Between, Repository } from 'typeorm';

@Injectable()
export class RoomTypeInventoryService {
  constructor(
    @InjectRepository(RoomTypeInventory)
    private readonly roomTypeInventoryRepository: Repository<RoomTypeInventory>,
  ) {}

  async findAvailableRoomTypeInventories(
    startDate: string,
    endDate: string,
    hotelId: number,
    roomTypeId: number,
    numberOfRoomsToReserve: number,
  ) {
    const roomTypeInventories = await this.roomTypeInventoryRepository.findBy({
      hotelId,
      roomTypeId,
      date: Between(startDate, endDate),
    });

    return roomTypeInventories.filter((roomTypeInventory) => {
      return (
        numberOfRoomsToReserve + roomTypeInventory.totalReserved <=
        roomTypeInventory.totalInventory
      );
    });
  }
}
