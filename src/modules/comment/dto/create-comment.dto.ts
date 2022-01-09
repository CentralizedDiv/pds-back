import { ApiProperty } from '@nestjs/swagger';
import { Album } from 'src/modules/album/models/album.model';
import { Photo } from 'src/modules/photo/models/photo.model';
import { User } from 'src/modules/user/models/user.model';

export class CreateCommentDto {
  @ApiProperty()
  description: string;

  @ApiProperty()
  createdById: string;

  createdBy: User;

  @ApiProperty()
  photoId: string;

  photo: Photo;

  @ApiProperty()
  albumId: string;

  album: Album;
}
