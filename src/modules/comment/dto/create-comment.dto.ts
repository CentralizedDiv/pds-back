import { Album } from 'src/modules/album/models/album.model';
import { Photo } from 'src/modules/photo/models/photo.model';
import { User } from 'src/modules/user/models/user.model';

export class CreateCommentDto {
  description: string;

  createdBy: User;

  photo: Photo;

  album: Album;
}
