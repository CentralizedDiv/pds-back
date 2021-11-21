import { Comment } from 'src/modules/comment/models/comment.model';
import { Photo } from 'src/modules/photo/models/photo.model';

export class CreateAlbumDto {
  name: string;

  url: string;

  allowAdditionalPhotos: boolean;

  numberOfContractedPhotos: number;

  selectionDeadline: string;

  allowDownload: boolean;

  showWatermark: boolean;

  comments: Comment[];

  photos: Photo[];
}
