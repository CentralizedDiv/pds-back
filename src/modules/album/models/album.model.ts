import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/record.model';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'album' })
export class Album extends BaseEntity {
  constructor(initial: { name: string; url: string; extraPhotos: boolean }) {
    super();

    this.name = initial?.name;
    this.url = initial?.url;
    this.extraPhotos = initial?.extraPhotos;
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
  extraPhotos: boolean;
}
