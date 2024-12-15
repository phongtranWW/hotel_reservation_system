import { Module } from '@nestjs/common';
import { RoomTypeInventoryService } from '@room-type-inventories/room-type-inventory.service';
import { RoomTypeInventoryController } from '@room-type-inventories/room-type-inventory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomTypeInventory } from '@room-type-inventories/entities/room-type-inventory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomTypeInventory])],
  controllers: [RoomTypeInventoryController],
  providers: [RoomTypeInventoryService],
})
export class RoomTypeInventoryModule {}
