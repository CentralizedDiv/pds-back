import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/record.model';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'photo' })
export class Photo extends BaseEntity {
  constructor(initial: { name: string; url: string }) {
    super();

    this.name = initial?.name;
    this.url = initial?.url;
  }

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({
    unique: true,
  })
  url: string;
}
