import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/record.model';
import { Entity, Column, ManyToOne } from 'typeorm';
import { Photo } from 'src/modules/photo/models/photo.model';

@Entity({ name: 'comment' })
export class Comment extends BaseEntity {
  constructor(initial: { description: string }) {
    super();

    this.description = initial?.description;
  }

  @ApiProperty()
  @Column()
  description: string;

  @ManyToOne(() => Photo, (photo) => photo.comments)
  photo: Photo;
}
