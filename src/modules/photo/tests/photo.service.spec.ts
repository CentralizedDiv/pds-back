import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from 'src/utils/testing-utils';
import { PhotoController } from '../photo.controller';
import { PhotoService } from '../photo.service';
import { Photo } from '../models/photo.model';
import { AlbumService } from 'src/modules/album/album.service';
import { Album } from 'src/modules/album/models/album.model';
import { CreatePhotoDto } from '../dto/create-photo.dto';

describe('UserService', () => {
  let service: PhotoService;
  const entity: Photo = {
    name: 'Foto 1',
    url: 'foto.teste.com',
    isCover: false,
    isSelected: false,
    album: undefined,
    comments: [],
    id: '',
    updatedAt: '',
    createdAt: '',
  };

  const createEntity: CreatePhotoDto = {
    name: 'Foto 1',
    url: 'foto.teste.com',
    isCover: false,
    isSelected: false,
    albumId: '',
    album: undefined,
  };

  const album: Album = {
    name: '',
    url: '',
    allowAdditionalPhotos: false,
    numberOfContractedPhotos: 0,
    selectionDeadline: '',
    allowDownload: false,
    showWatermark: false,
    photos: [],
    comments: [],
    id: '',
    updatedAt: '',
    createdAt: '',
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [PhotoController],
      providers: [
        PhotoService,
        AlbumService,
        {
          provide: getRepositoryToken(Photo),
          useFactory: repositoryMockFactory(entity),
        },
        {
          provide: getRepositoryToken(Album),
          useFactory: repositoryMockFactory(album),
        },
      ],
    }).compile();

    service = moduleRef.get<PhotoService>(PhotoService);
  });

  describe('findAll', () => {
    it('should return an array of photos', async () => {
      expect(await service.findAll()).toStrictEqual([entity]);
    });
  });

  describe('findById', () => {
    it('should return a photo', async () => {
      //expect(await albumService.findById(entity.id)).toStrictEqual(entity);
    });

    it('should return undefined on an non-existing photo', async () => {
      expect(await service.findById('10')).toBe(undefined);
    });
  });

  describe('create', () => {
    it('should return the created photo', async () => {
      expect(await service.create(createEntity)).toEqual(createEntity);
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
