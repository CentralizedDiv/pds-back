import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/record.model';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Comment } from 'src/modules/comment/models/comment.model';

@Entity({ name: 'photo' })
export class Photo extends BaseEntity {
  constructor(initial: {
    name: string;
    url: string;
    isCover: boolean;
    isWaterMark: boolean;
  }) {
    super();

    this.name = initial?.name;
    this.url = initial?.url;
    this.isCover = initial?.isCover;
    this.isWaterMark = initial?.isWaterMark;
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
  isWaterMark: boolean;

  @ManyToMany(() => Comment)
  @JoinTable()
  comments: Comment[];
}
