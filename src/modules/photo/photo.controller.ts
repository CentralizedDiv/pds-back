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
  async create(@Body() createPhotoDto: CreatePhotoDto) {
    return this.photoService.create(createPhotoDto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(201)
  async upload(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photoService.delete(id);
  }
}