import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  Get,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';

@Controller()
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Get()
  findAll() {
    return this.photoService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.photoService.findById(id);
  }

  @Post()
  @HttpCode(204)
  async create(@Body() createPhotoDto: CreatePhotoDto) {
    return this.photoService.create(createPhotoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photoService.delete(id);
  }
}
