import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from '@profiles/entities/profile.entity';
import { EntityNotFoundError, Repository } from 'typeorm';
import { UpsertProfileDto } from '@profiles/dtos/upsert-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async getProfile(userId: string) {
    try {
      return await this.profileRepository.findOneByOrFail({ userId });
    } catch (error) {
      if (error instanceof EntityNotFoundError) {
        throw new NotFoundException('Profile does not exist');
      }

      throw new InternalServerErrorException(error.message);
    }
  }

  async upsertProfile(userId: string, profile: UpsertProfileDto) {
    try {
      return await this.profileRepository.save({ ...profile, userId });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
