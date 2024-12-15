import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Headers,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { ProfileService } from '@profiles/profile.service';
import { UpsertProfileDto } from '@profiles/dtos/upsert-profile.dto';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async getProfile(@Headers('X-Consumer-ID') userId: string) {
    return await this.profileService.getProfile(userId);
  }

  @Put()
  @UseInterceptors(ClassSerializerInterceptor)
  async upsertProfile(
    @Headers('X-Consumer-ID') userId: string,
    @Body() profile: UpsertProfileDto,
  ) {
    return await this.profileService.upsertProfile(userId, profile);
  }
}
