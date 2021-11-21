import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/record.model';
import { Entity, Column, TableInheritance, OneToMany } from 'typeorm';
import { Comment } from 'src/modules/comment/models/comment.model';

@Entity({ name: 'user' })
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class User extends BaseEntity {
  constructor(initial: { name: string; email: string }) {
    super();

    this.email = initial?.email;
  }

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({
    unique: true,
  })
  email: string;

  @OneToMany(() => Comment, (comment) => comment.createdBy)
  comments: Comment[];
}
