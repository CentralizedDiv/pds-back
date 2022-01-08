import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models/user.model';
<<<<<<< HEAD
import { CreateUserDto } from './dto/create-user.dto';
=======
>>>>>>> c7b5342 (Criando rota de comentário e usuário)

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
<<<<<<< HEAD

  async create(user: CreateUserDto) {
    return await this.userRepository.save(user);
  }
=======
>>>>>>> c7b5342 (Criando rota de comentário e usuário)
}
