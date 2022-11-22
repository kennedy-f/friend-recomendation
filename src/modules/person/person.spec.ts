import {
  ValidateCpf,
  FindByCpf,
  CreatePerson,
  GetRecomendedFriends,
  ClearPersons,
  PersonsInMemory,
} from './person';
import { PersonsMock } from '../../test/persons.mock';

describe('person', () => {
  it('Should initialize with mocked data', () => {
    expect(PersonsInMemory).toEqual(PersonsMock);
  });

  it('Should create a person', () => {
    const testPerson = { cpf: '22222222222', name: 'test' };
    const person = CreatePerson(testPerson);
    expect(person).toEqual(testPerson);

    const findPerson = FindByCpf(testPerson.cpf);
    expect(findPerson).toEqual(testPerson);
  });

  it('Should fail when creatin a person with invalid CPF', () => {
    const testPerson = { cpf: '22233', name: 'test' };
    expect(() => CreatePerson(testPerson)).toThrow('Invalid CPF');
  });

  it('Should find a person by cpf', () => {
    const testPerson = { cpf: '11111111111', name: 'a' };

    const findPerson = FindByCpf(testPerson.cpf);
    expect(findPerson).toEqual(testPerson);
  });

  it('Should fail find person', () => {
    const testPerson = { cpf: '51111111111', name: 'a' };

    const findPerson = FindByCpf(testPerson.cpf);
    expect(findPerson).toEqual(undefined);
  });

  it('Should fail find person with invalid cpf', () => {
    const testPerson = { cpf: '5111111111', name: 'a' };

    expect(() => FindByCpf(testPerson.cpf)).toThrow('Invalid CPF');
  });

  it('Should find recommend friends', () => {
    const recommendedFriends = GetRecomendedFriends(PersonsMock[0].cpf);
    expect(recommendedFriends).toEqual([
      '11111111116',
      '11111111114',
      '11111111118',
    ]);
  });

  it('Should reset persons', () => {
    ClearPersons();
    expect(PersonsInMemory).toEqual([]);
  });
});
