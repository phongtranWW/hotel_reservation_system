import { Module } from '@nestjs/common';
import { ReservationService } from '@reservations/reservation.service';
import { ReservationController } from '@reservations/reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from '@reservations/entities/reservation.entity';
import { RoomTypeInventory } from '@room-type-inventories/entities/room-type-inventory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, RoomTypeInventory])],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
