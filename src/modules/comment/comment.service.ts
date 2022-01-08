import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './models/comment.model';
import { PhotoService } from '../photo/photo.service';
import { UserService } from '../user/user.service';
import { AlbumService } from '../album/album.service';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    private readonly photoService: PhotoService,
    private readonly albumService: AlbumService,
    private readonly userService: UserService,
  ) {}

  async findById(id: string) {
    return await this.commentRepository.findOne({
      where: { id: id },
      relations: ['photo', 'album', 'createdBy'],
    });
  }

  async findAll() {
    return await this.commentRepository.find({
      relations: ['photo', 'album', 'createdBy'],
    });
  }

  async create(comment: CreateCommentDto) {
    if (comment.photoId)
      comment.photo = await this.photoService.findById(comment.photoId);

    if (comment.albumId)
      comment.album = await this.albumService.findById(comment.albumId);

    if (comment.createdById)
      comment.createdBy = await this.userService.findById(comment.createdById);
    return await this.commentRepository.save(comment);
  }

  async update(id: string, comment: Partial<Comment>) {
    return await this.commentRepository.update(id, comment);
  }

  async delete(id: string) {
    return await this.commentRepository.delete(id);
  }
}
