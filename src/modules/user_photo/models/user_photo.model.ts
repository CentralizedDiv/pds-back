import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/record.model';
import { Album } from 'src/modules/album/models/album.model';
import { Photo } from 'src/modules/photo/models/photo.model';
import { User } from 'src/modules/user/models/user.model';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';

@Entity({ name: 'user_photo' })
export class UserPhoto extends BaseEntity {
  constructor(initial: { isSelected: boolean; isFavorite: boolean }) {
    super();

    this.isSelected = initial?.isSelected;
    this.isFavorite = initial?.isFavorite;
  }

  @ApiProperty()
  @Column({
    default: false,
  })
  isSelected: boolean;

  @ApiProperty()
  @Column({
    default: false,
  })
  isFavorite: boolean;

  @ManyToMany(() => Album)
  @JoinTable()
  albums: Album[];

  @ManyToMany(() => Photo)
  @JoinTable()
  photos: Photo[];

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];
}
