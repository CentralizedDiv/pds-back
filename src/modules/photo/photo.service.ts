import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { Photo } from './models/photo.model';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
  ) {}

  async findById(id: string) {
    return await this.photoRepository.findOne(id);
  }

  async findAll() {
    return await this.photoRepository.find();
  }

  async create(photo: CreatePhotoDto) {
    return await this.photoRepository.save(photo);
  }

  async update(id: string, photo: Partial<Photo>) {
    return await this.photoRepository.update(id, photo);
  }

  async delete(id: string) {
    return await this.photoRepository.delete(id);
  }
}
