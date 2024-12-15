import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReservationModule } from '@reservations/reservation.module';
import { RoomTypeInventoryModule } from '@room-type-inventories/room-type-inventory.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import docsConfig from '@configs/docs.config';
import databaseConfig from '@configs/database.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [docsConfig, databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return configService.getOrThrow('database');
      },
    }),
    ReservationModule,
    RoomTypeInventoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
