import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/record.model';
import { Entity, Column, OneToMany } from 'typeorm';
import { Photo } from 'src/modules/photo/models/photo.model';
import { Comment } from 'src/modules/comment/models/comment.model';

@Entity({ name: 'album' })
export class Album extends BaseEntity {
  constructor(initial: {
    name: string;
    url: string;
    allowAdditionalPhotos: boolean;
    numberOfContractedPhotos: number;
    selectionDeadline: string;
    allowDownload: boolean;
    showWatermark: boolean;
  }) {
    super();

    this.name = initial?.name;
    this.url = initial?.url;
    this.allowAdditionalPhotos = initial?.allowAdditionalPhotos;
    this.numberOfContractedPhotos = initial?.numberOfContractedPhotos;
    this.selectionDeadline = initial?.selectionDeadline;
    this.allowDownload = initial?.allowDownload;
    this.showWatermark = initial?.showWatermark;
  }

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({
    unique: true,
  })
  url: string;

  @ApiProperty()
  @Column()
  allowAdditionalPhotos: boolean;

  @ApiProperty()
  @Column()
  numberOfContractedPhotos: number;

  @ApiProperty()
  @Column()
  selectionDeadline: string;

  @ApiProperty()
  @Column()
  allowDownload: boolean;

  @ApiProperty()
  @Column()
  showWatermark: boolean;

  @OneToMany(() => Photo, (photo) => photo.album)
  photos: Photo[];

  @OneToMany(() => Comment, (comment) => comment.album)
  comments: Comment[];
}
