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
<<<<<<< HEAD
  async create(@Body() createComment: CreateCommentDto) {
    return this.commentService.create(createComment);
=======
  async create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
>>>>>>> c7b5342 (Criando rota de comentário e usuário)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.delete(id);
  }
}
