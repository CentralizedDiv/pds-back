import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findById(id: string) {
    return await this.userRepository.findOne(id);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async delete(id: string) {
    return await this.userRepository.delete(id);
  }
  async create(user: CreateUserDto) {
    return await this.userRepository.save(user);
  }
}
