import { Relations } from '../db/relations';

export function getRecomendedFriends(cpf: string, relations: Relations[]) {
  const friends: Set<string> = new Set();

  relations.forEach(({ cpf1, cpf2 }) => {
    if (cpf1 === cpf || cpf2 === cpf) {
      friends.add(cpf1 === cpf ? cpf2 : cpf1);
    }
  });

  const recomendations: Map<string, string[]> = new Map();

  friends.forEach((cpf1) => {
    relations.forEach((relation) => {
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

  return sortByLength([...recomendations.values()]);
}
