import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Comment } from './models/comment.model';
import { PhotoModule } from '../photo/photo.module';
import { UserModule } from '../user/user.module';
import { AlbumModule } from '../album/album.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment]),
    PhotoModule,
    AlbumModule,
    UserModule,
  ],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
