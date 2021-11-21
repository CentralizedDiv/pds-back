import { ApiProperty } from '@nestjs/swagger';
import { Album } from 'src/modules/album/models/album.model';

export class CreatePhotoDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  url: string;

  @ApiProperty()
  isCover: boolean;

  @ApiProperty()
  isSelected: boolean;

  @ApiProperty()
  albumId: string;

  album: Album;
}
