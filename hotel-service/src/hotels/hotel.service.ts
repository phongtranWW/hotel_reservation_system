import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager, EntityNotFoundError } from 'typeorm';
import { Hotel } from '@hotels/entities/hotel.entity';

@Injectable()
export class HotelService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async getHotels(page: number, limit: number) {
    return await this.entityManager.find(Hotel, {
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async getSpecifiedHotel(hotelId: number) {
    try {
      return await this.entityManager.findOneOrFail(Hotel, {
        where: { hotelId },
        relations: ['roomTypes'],
        select: {
          hotelId: true,
          name: true,
          address: true,
          location: true,
          roomTypes: {
            roomTypeId: true,
            name: true,
            description: true,
            capacity: true,
            bedCount: true,
            bedType: true,
            price: true,
            currency: true,
          },
        },
      });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('Hotel does not exist');
      }

      throw new InternalServerErrorException();
    }
  }
}
