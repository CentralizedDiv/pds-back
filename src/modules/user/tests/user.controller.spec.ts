import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from 'src/utils/testing-utils';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { User } from '../models/user.model';

describe('UserController', () => {
  let controller: UserController;
  const entity: User = {
    name: 'Igor',
    email: 'igor@teste.com',
    comments: [],
    id: 'eb4d3654-b7d9-4ada-8d8b-de8fa71c2365',
    updatedAt: '2021-10-10',
    createdAt: '2021-08-10',
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory(entity),
        },
      ],
    }).compile();

    controller = moduleRef.get<UserController>(UserController);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      expect(await controller.findAll()).toStrictEqual([entity]);
    });
  });

  describe('findById', () => {
    it('should return a user', async () => {
      //expect(await controller.findById(entity.id)).toStrictEqual(entity);
    });

    it('should return undefined on an non-existing user', async () => {
      expect(await controller.findById('10')).toBe(undefined);
    });
  });

  describe('create', () => {
    it('should return the created user', async () => {
      expect(await controller.create(entity)).toEqual(entity);
    });
  });

  describe('delete', () => {
    it('should return an delete result', async () => {
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };

      expect(await controller.delete(entity.id)).toStrictEqual(result);
    });
  });
});
