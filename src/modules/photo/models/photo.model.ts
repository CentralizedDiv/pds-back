import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/record.model';
import { Entity, Column, OneToMany, ManyToOne } from 'typeorm';
import { Album } from 'src/modules/album/models/album.model';
import { Comment } from 'src/modules/comment/models/comment.model';

@Entity({ name: 'photo' })
export class Photo extends BaseEntity {
  constructor(initial: {
    name: string;
    url: string;
    isCover: boolean;
    isSelected: boolean;
  }) {
    super();

    this.name = initial?.name;
    this.url = initial?.url;
    this.isCover = initial?.isCover;
    this.isSelected = initial?.isSelected;
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
  @Column({
    default: false,
  })
  isCover: boolean;

  @ApiProperty()
  @Column({
    default: false,
  })
  isSelected: boolean;

  @Column()
  albumId: string;

  @ManyToOne(() => Album, (album) => album.photos)
  album: Album;

  @OneToMany(() => Comment, (comment) => comment.photo)
  comments: Comment[];
}
