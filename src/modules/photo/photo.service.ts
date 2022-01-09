import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { Photo } from './models/photo.model';
import { AlbumService } from '../album/album.service';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo) private photoRepository: Repository<Photo>,
    private readonly albumService: AlbumService,
  ) {}

  async findById(id: string) {
    return await this.photoRepository.findOne({
      where: { id: id },
      relations: ['album'],
    });
  }

  async findAll() {
    return await this.photoRepository.find({ relations: ['album'] });
  }

  async create(photo: CreatePhotoDto) {
    if (photo.albumId)
      photo.album = await this.albumService.findById(photo.albumId);
    return await this.photoRepository.save(photo);
  }

  async update(id: string, photo: Partial<Photo>) {
    return await this.photoRepository.update(id, photo);
  }

  async delete(id: string) {
    return await this.photoRepository.softDelete(id);
  }
}
