import { Relations } from '../db/relations';
import { FindByCpf } from './person';

export const RelationsInMemory: Relations[] = [
  { cpf1: '11111111111', cpf2: '11111111112' },
  { cpf1: '11111111111', cpf2: '11111111113' },
  { cpf1: '11111111111', cpf2: '11111111115' },
  { cpf1: '11111111112', cpf2: '11111111113' },
  { cpf1: '11111111112', cpf2: '11111111114' },
  { cpf1: '11111111112', cpf2: '11111111116' },
  { cpf1: '11111111113', cpf2: '11111111116' },
  { cpf1: '11111111115', cpf2: '11111111114' },
  { cpf1: '11111111115', cpf2: '11111111116' },
  { cpf1: '11111111115', cpf2: '11111111118' },
];

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
}
