import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AlbumModule } from './modules/album/album.module';
import { PhotoModule } from './modules/photo/photo.module';

@Module({
  imports: [TypeOrmModule.forRoot(config), AlbumModule, PhotoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
