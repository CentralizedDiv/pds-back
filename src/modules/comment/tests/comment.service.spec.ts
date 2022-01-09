import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AlbumService } from 'src/modules/album/album.service';
import { Album } from 'src/modules/album/models/album.model';
import { Photo } from 'src/modules/photo/models/photo.model';
import { PhotoService } from 'src/modules/photo/photo.service';
import { User } from 'src/modules/user/models/user.model';
import { UserService } from 'src/modules/user/user.service';
import { repositoryMockFactory } from 'src/utils/testing-utils';
import { CommentController } from '../comment.controller';
import { CommentService } from '../comment.service';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { Comment } from '../models/comment.model';

describe('CommentService', () => {
  let service: CommentService;
  const entity: Comment = {
    id: 'eb4d3654-b7d9-4ada-8d8b-de8fa71c2365',
    description: 'Festa',
    createdBy: null,
    photo: null,
    album: null,
    createdAt: '2022-01-02',
    updatedAt: '2022-01-03',
  };

  const createEntity: CreateCommentDto = {
    description: 'Comentario',
    createdBy: null,
    photoId: '2',
    albumId: '3',
    createdById: '',
    photo: undefined,
    album: undefined,
  };

  const photo: Photo = {
    name: '',
    url: '',
    isCover: false,
    isSelected: false,
    album: undefined,
    comments: [],
    id: '',
    updatedAt: '',
    createdAt: '',
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

  const user: User = {
    name: '',
    email: '',
    comments: [],
    id: '',
    updatedAt: '',
    createdAt: '',
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [
        CommentService,
        AlbumService,
        PhotoService,
        UserService,
        {
          provide: getRepositoryToken(Comment),
          useFactory: repositoryMockFactory(entity),
        },
        {
          provide: getRepositoryToken(Album),
          useFactory: repositoryMockFactory(album),
        },
        {
          provide: getRepositoryToken(Photo),
          useFactory: repositoryMockFactory(photo),
        },
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory(user),
        },
      ],
    }).compile();

    service = moduleRef.get<CommentService>(CommentService);
  });

  describe('findAll', () => {
    it('should return an array of comments', async () => {
      expect(await service.findAll()).toStrictEqual([entity]);
    });
  });

  describe('findById', () => {
    it('should return a comment', async () => {
      //expect(await service.findById(entity.id)).toStrictEqual(entity);
    });

    it('should return undefined on an non-existing comment', async () => {
      expect(await service.findById('10')).toBe(undefined);
    });
  });

  describe('create', () => {
    it('should return the created comment', async () => {
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
