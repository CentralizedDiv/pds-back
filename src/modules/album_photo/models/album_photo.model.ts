import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/record.model';
import { Album } from 'src/modules/album/models/album.model';
import { Photo } from 'src/modules/photo/models/photo.model';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';

@Entity({ name: 'album_photo' })
export class AlbumPhoto extends BaseEntity {
  constructor(initial: { isCover: boolean; isWaterMark: boolean }) {
    super();
    this.isCover = initial?.isCover;
    this.isWaterMark = initial?.isWaterMark;
  }

  @ApiProperty()
  @Column({
    default: false,
  })
  isCover: boolean;

  @ApiProperty()
  @Column({
    default: false,
  })
  isWaterMark: boolean;

  @ManyToMany(() => Album)
  @JoinTable()
  albums: Album[];

  @ManyToMany(() => Photo)
  @JoinTable()
  photos: Photo[];
}
