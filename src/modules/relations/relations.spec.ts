import {
  ClearRelations,
  CreateRelations,
  RelationsInMemory,
} from './relations';

describe('Relations', () => {
  it('Should create a relation', () => {
    const testCpfs = { cpf1: '11111111111', cpf2: '11111111117' };
    const relation = CreateRelations(testCpfs.cpf1, testCpfs.cpf2);
    expect(relation).toEqual({ cpf1: testCpfs.cpf1, cpf2: testCpfs.cpf2 });

    const findInMemory = RelationsInMemory.find(
      (relation) =>
        relation.cpf1 === testCpfs.cpf1 && relation.cpf2 === testCpfs.cpf2,
    );

    expect(findInMemory).toEqual(testCpfs);
  });

  it('Should clear data', () => {
    ClearRelations();
    expect(RelationsInMemory).toEqual([]);
  });
});
