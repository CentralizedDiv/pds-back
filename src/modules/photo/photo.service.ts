import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { Photo } from './models/photo.model';
import { AlbumService } from '../album/album.service';
import { S3 } from 'aws-sdk';

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

  async upload(file: Express.Multer.File) {
    const { originalname } = file;
    const bucketS3 = 'my-aws-bucket';
    await this.uploadS3(file.buffer, bucketS3, originalname);
  }

  async uploadS3(file, bucket, name) {
    const s3 = this.getS3();
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
    };
    return new Promise((resolve, reject) => {
      s3.upload(params, (err, data) => {
        if (err) {
          Logger.error(err);
          reject(err.message);
        }
        resolve(data);
      });
    });
  }

  getS3() {
    return new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
  }

  async delete(id: string) {
    return await this.photoRepository.softDelete(id);
  }
}
