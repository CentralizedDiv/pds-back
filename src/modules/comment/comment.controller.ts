import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  Get,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.commentService.findById(id);
  }

  @Post()
  @HttpCode(201)
  async create(@Body() createComment: CreateCommentDto) {
    return this.commentService.create(createComment);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.commentService.delete(id);
  }
}
