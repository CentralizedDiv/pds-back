import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/record.model';
import { Entity, Column, ManyToOne } from 'typeorm';
import { Photo } from 'src/modules/photo/models/photo.model';
import { Album } from 'src/modules/album/models/album.model';
import { User } from 'src/modules/user/models/user.model';

@Entity({ name: 'comment' })
export class Comment extends BaseEntity {
  constructor(initial: { description: string; createdBy: User }) {
    super();

    this.description = initial?.description;
    this.createdBy = initial?.createdBy;
  }

  @ApiProperty()
  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.comments)
  createdBy: User;

  @ManyToOne(() => Photo, (photo) => photo.comments)
  photo: Photo;

  @ManyToOne(() => Album, (album) => album.comments)
  album: Album;
}
