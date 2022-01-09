import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from 'src/utils/testing-utils';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { User } from '../models/user.model';

describe('UserService', () => {
  let service: UserService;
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

    service = moduleRef.get<UserService>(UserService);
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      expect(await service.findAll()).toStrictEqual([entity]);
    });
  });

  describe('findById', () => {
    it('should return a user', async () => {
      //expect(await albumService.findById(entity.id)).toStrictEqual(entity);
    });

    it('should return undefined on an non-existing user', async () => {
      expect(await service.findById('10')).toBe(undefined);
    });
  });

  describe('create', () => {
    it('should return the created album', async () => {
      expect(await service.create(entity)).toEqual(entity);
    });
  });

  describe('delete', () => {
    it('should return an delete result', async () => {
      const result = {
        generatedMaps: [],
        raw: [],
        affected: 1,
      };

      expect(await service.delete(entity.id)).toStrictEqual(result);
    });
  });
});
