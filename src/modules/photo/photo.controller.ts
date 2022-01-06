import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  Get,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('photo')
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
  @HttpCode(201)
  async create(@Body() createPhoto: CreatePhotoDto) {
    return this.photoService.create(createPhoto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(201)
  async upload(@UploadedFile() file: Express.Multer.File) {
    return this.photoService.upload(file);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.photoService.delete(id);
  }
}
