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
  async create(@Body() createAlbum: CreateAlbumDto) {
    return this.albumService.create(createAlbum);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.albumService.delete(id);
  }
}
