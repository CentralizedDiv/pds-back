import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/record.model';
import { Photo } from 'src/modules/photo/models/photo.model';
import { User } from 'src/modules/user/models/user.model';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';

@Entity({ name: 'comment' })
export class Comment extends BaseEntity {
  constructor(initial: { description: string }) {
    super();

    this.description = initial?.description;
  }

  @ApiProperty()
  @Column()
  description: string;

  @ManyToMany(() => Photo)
  @JoinTable()
  photos: Photo[];

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];
}
