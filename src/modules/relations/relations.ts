import { Relations } from '../../db/relations';
import { FindByCpf } from '../person';
import { RelationsMock } from '../../test/relations.mock';

export const RelationsInMemory: Relations[] = RelationsMock;

export function CreateRelations(cpf1: string, cpf2: string) {
  const findFirstCpf = FindByCpf(cpf1);
  const findSecondCpf = FindByCpf(cpf2);

  if (!findFirstCpf || !findSecondCpf) {
    throw new Error('CPF not found');
  }

  const findSameRelation = RelationsInMemory.find(
    (relation) =>
      (relation.cpf1 === cpf1 && relation.cpf2 === cpf2) ||
      (relation.cpf2 === cpf1 && relation.cpf1 === cpf2),
  );

  if (findSameRelation) {
    throw new Error('Relation already exists');
  }

  RelationsInMemory.push({ cpf1, cpf2 });
  return { cpf1, cpf2 };
}

export function ClearRelations() {
  RelationsInMemory.splice(0, RelationsInMemory.length);
}
