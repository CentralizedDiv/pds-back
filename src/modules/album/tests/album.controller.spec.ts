import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from 'src/utils/testing-utils';
import { AlbumController } from '../album.controller';
import { AlbumService } from '../album.service';
import { Album } from '../models/album.model';

describe('AlbumController', () => {
  let controller: AlbumController;
  const entity: Album = {
    id: 'eb4d3654-b7d9-4ada-8d8b-de8fa71c2365',
    name: 'Festa',
    url: 'festa.com',
    numberOfContractedPhotos: 10,
    selectionDeadline: '2022-10-10',
    allowDownload: false,
    showWatermark: true,
    allowAdditionalPhotos: false,
    comments: [],
    photos: [],
    createdAt: '2022-01-02',
    updatedAt: '2022-01-03',
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AlbumController],
      providers: [
        AlbumService,
        {
          provide: getRepositoryToken(Album),
          useFactory: repositoryMockFactory(entity),
        },
      ],
    }).compile();

    controller = moduleRef.get<AlbumController>(AlbumController);
  });

  describe('findAll', () => {
    it('should return an array of albums', async () => {
      expect(await controller.findAll()).toStrictEqual([entity]);
    });
  });

  describe('findById', () => {
    it('should return a album', async () => {
      //expect(await albumController.findById(entity.id)).toStrictEqual(entity);
    });

    it('should return undefined on an non-existing album', async () => {
      expect(await controller.findById('10')).toBe(undefined);
    });
  });

  describe('create', () => {
    it('should return the created album', async () => {
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
