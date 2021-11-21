import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/record.model';
import { Entity, Column, TableInheritance } from 'typeorm';

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
}
