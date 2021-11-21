import { ChildEntity, Column } from 'typeorm';
import { User } from 'src/modules/user/models/user.model';

@ChildEntity()
export class Customer extends User {
  @Column()
  address: string;
}
