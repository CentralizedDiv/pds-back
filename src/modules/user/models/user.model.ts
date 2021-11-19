import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/record.model';
import { Entity, Column } from 'typeorm';

export enum UserType {
  CUSTOMER = 'CUSTOMER',
  PHOTOGRAPHER = 'PHOTOGRAPHER',
}

@Entity({ name: 'user' })
export class User extends BaseEntity {
  constructor(initial: { name: string; email: string; type: UserType }) {
    super();

    this.email = initial?.email;
    this.type = initial?.type;
  }

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({
    unique: true,
  })
  email: string;

  @ApiProperty({ enum: UserType, isArray: true })
  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.CUSTOMER,
  })
  type: UserType;
}
