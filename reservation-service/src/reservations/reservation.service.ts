import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Reservation } from '@reservations/entities/reservation.entity';
import {
  EntityManager,
  EntityNotFoundError,
  OptimisticLockVersionMismatchError,
  QueryFailedError,
} from 'typeorm';
import { CreateReservationDto } from '@reservations/dtos/create-reservation.dto';
import { RoomTypeInventory } from '@room-type-inventories/entities/room-type-inventory.entity';

@Injectable()
export class ReservationService {
  constructor(@InjectEntityManager() private entityManager: EntityManager) {}

  async create(
    userId: string,
    createReservationDto: CreateReservationDto,
  ): Promise<Reservation> {
    try {
      let reservation: Reservation;

      await this.entityManager.transaction(
        async (transactionalEntityManager) => {
          // Step 1: Check if enough rooms are available
          const roomTypeInventory =
            await transactionalEntityManager.findOneByOrFail(
              RoomTypeInventory,
              {
                hotelId: createReservationDto.hotelId,
                roomTypeId: createReservationDto.roomTypeId,
                date: createReservationDto.startDate,
              },
            );

          if (
            roomTypeInventory.totalReserved +
              createReservationDto.numberOfRooms >
            roomTypeInventory.totalInventory
          ) {
            throw new BadRequestException('Not enough rooms available');
          }

          // Step 2: Update room type inventory
          await transactionalEntityManager.update(
            RoomTypeInventory,
            {
              hotelId: createReservationDto.hotelId,
              roomTypeId: createReservationDto.roomTypeId,
              date: createReservationDto.startDate,
            },
            {
              totalReserved:
                roomTypeInventory.totalReserved +
                createReservationDto.numberOfRooms,
            },
          );

          // Step 3: Create reservation
          reservation = transactionalEntityManager.create(Reservation, {
            userId,
            ...createReservationDto,
          });

          await transactionalEntityManager.insert(Reservation, reservation);
        },
      );

      return reservation;
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new BadRequestException('No room type inventory found');
      }

      if (error instanceof OptimisticLockVersionMismatchError) {
        throw new BadRequestException('Error creating reservation');
      }

      if (error instanceof QueryFailedError) {
        throw new BadRequestException('Reservation already exists');
      }

      throw new InternalServerErrorException(error.message);
    }
  }

  async findUserReservations(
    userId: string,
    page: number,
    limit: number,
  ): Promise<Reservation[]> {
    return await this.entityManager.find(Reservation, {
      where: { userId },
      take: limit,
      skip: (page - 1) * limit,
    });
  }
}
