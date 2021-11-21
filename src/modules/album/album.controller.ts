import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  Get,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.albumService.findById(id);
  }

  @Post()
  @HttpCode(201)
  async createAlbum(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.createAlbum(createAlbumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.albumService.deleteAlbum(id);
  }
}
