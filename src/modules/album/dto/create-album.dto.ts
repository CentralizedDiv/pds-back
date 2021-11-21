import { ApiProperty } from '@nestjs/swagger';
import { Photo } from 'src/modules/photo/models/photo.model';

export class CreateAlbumDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  extraPhotos: boolean;

  @ApiProperty()
  photos: Photo[];
}
