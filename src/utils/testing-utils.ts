import { BaseEntity } from './common.entity';

export const repositoryMockFactory = <T extends BaseEntity>(
  initialEntity: T,
) => {
  let bd: T[] = [initialEntity];

  const find = jest.fn(() => bd.filter((entity) => entity.createdAt !== null));
  const findOne = jest.fn((id: string) =>
    find().find((entity) => entity.id === id),
  );

  return jest.fn(() => ({
    find,
    findOne,
    save: jest.fn((entity) => {
      bd.push({ id: bd.length + 1, ...entity });
      return entity;
    }),
    update: jest.fn((id, partialEntity: Partial<T>) => {
      const entity = findOne(id);
      let affected = 0;
      if (entity) {
        bd = bd.map((_entity) => {
          if (entity.id === _entity.id) {
            _entity = {
              ...entity,
              ...partialEntity,
            };
          }
          return _entity;
        });
        affected = 1;
      }
      return {
        raw: [],
        generatedMaps: [],
        affected,
      };
    }),
    softDelete: jest.fn((id) => {
      const entity = findOne(id);
      let affected = 0;
      if (entity) {
        affected = 1;
      }
      return {
        raw: [],
        generatedMaps: [],
        affected,
      };
    }),
    createQueryBuilder: jest.fn(() => ({
      relation: jest.fn(() => ({
        of: jest.fn(() => ({ loadMany: jest.fn(), addAndRemove: jest.fn() })),
      })),
    })),
  }));
};
