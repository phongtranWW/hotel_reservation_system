import { Module } from '@nestjs/common';
import { ProfileService } from '@profiles/profile.service';
import { ProfileController } from '@profiles/profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '@profiles/entities/profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Profile])],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
