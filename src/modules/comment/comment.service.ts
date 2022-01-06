import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './models/comment.model';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async findById(id: string) {
    return await this.commentRepository.findOne(id);
  }

  async findAll() {
    return await this.commentRepository.find();
  }

  async createComment(comment: CreateCommentDto) {
    return await this.commentRepository.save(comment);
  }

  async update(id: string, comment: Partial<Comment>) {
    return await this.commentRepository.update(id, comment);
  }

  async deleteAlbum(id: string) {
    return await this.commentRepository.delete(id);
  }
}
