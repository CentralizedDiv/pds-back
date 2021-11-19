import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/record.model';

import { Entity, Column } from 'typeorm';

@Entity({ name: 'comment' })
export class Comment extends BaseEntity {
  constructor(initial: { description: string }) {
    super();

    this.description = initial?.description;
  }

  @ApiProperty()
  @Column()
  description: string;
}
