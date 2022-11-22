import { Person } from '../../db/person';
import { sortByLength } from '../../utils';
import { RelationsInMemory } from '../relations';
import { PersonsMock } from '../../test/persons.mock';

export const PersonsInMemory: Person[] = PersonsMock;

export function ValidateCpf(cpf: string) {
  return cpf.length === 11;
}

export function FindByCpf(cpf: string) {
  if (ValidateCpf(cpf)) {
    return PersonsInMemory.find((person) => person.cpf === cpf);
  }
  throw Error('Invalid CPF');
}

export function CreatePerson(data: { cpf: string; name: string }) {
  const { cpf, name } = data;
  if (!cpf || !name) throw new Error('Wrong input');
  if (!ValidateCpf(cpf)) throw new Error('Invalid CPF');

  const personAlreadyRegistered = FindByCpf(cpf);
  if (personAlreadyRegistered) {
    throw new Error('Person already registered');
  }

  PersonsInMemory.push({ cpf, name });
  return { cpf, name };
}

export function GetRecomendedFriends(cpf: string) {
  if (!ValidateCpf(cpf)) throw new Error('Invalid CPF');

  const cpfExists = FindByCpf(cpf);
  if (!cpfExists) throw new Error('Not found');

  const friends: Set<string> = new Set();
  if (RelationsInMemory.length === 0) {
    return [];
  }

  RelationsInMemory.forEach(({ cpf1, cpf2 }) => {
    if (cpf1 === cpf || cpf2 === cpf) {
      friends.add(cpf1 === cpf ? cpf2 : cpf1);
    }
  });

  if (friends.size === 0) {
    return [];
  }

  const recomendations: Map<string, string[]> = new Map();

  friends.forEach((cpf1) => {
    RelationsInMemory.forEach((relation) => {
      if (
        relation.cpf1 !== cpf &&
        relation.cpf2 !== cpf &&
        (relation.cpf2 === cpf1 || relation.cpf1 === cpf1)
      ) {
        const findCpf = relation.cpf1 === cpf1 ? relation.cpf2 : relation.cpf1;
        if (friends.has(findCpf)) return;
        if (!recomendations.has(findCpf)) {
          recomendations.set(findCpf, []);
        }
        recomendations.set(findCpf, [...recomendations.get(findCpf), findCpf]);
      }
    });
  });

  return [...new Set(sortByLength([...recomendations.values()])).values()];
}

export function ClearPersons() {
  PersonsInMemory.splice(0, PersonsInMemory.length);
}
