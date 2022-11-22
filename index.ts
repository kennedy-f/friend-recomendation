import * as express from 'express';
import * as cors from 'cors';
import { Person } from './src/db/person';
import { Relations } from './src/db/relations';

const app = express();
const port = 3000;

app.use(cors());

app.get('/', (req, res) => {
  return res.json({ working: true });
});

// just checking size
function ValidateCpf(cpf: string) {
  return cpf.length >= 11;
}

function FindByCpf(cpf: string) {
  if (ValidateCpf(cpf)) {
    return persons.find((person) => person.cpf === cpf);
  }
  return false;
}

const persons: Person[] = [
  { cpf: '11111111111', name: 'a' },
  { cpf: '11111111112', name: 'b' },
  { cpf: '11111111113', name: 'c' },
  { cpf: '11111111114', name: 'd' },
  { cpf: '11111111115', name: 'e' },
  { cpf: '11111111116', name: 'f' },
];
const relations: Relations[] = [
  { cpf1: '11111111111', cpf2: '11111111112' },
  { cpf1: '11111111111', cpf2: '11111111113' },
  { cpf1: '11111111111', cpf2: '11111111115' },
  { cpf1: '11111111112', cpf2: '11111111113' },
  { cpf1: '11111111112', cpf2: '11111111114' },
  { cpf1: '11111111115', cpf2: '11111111114' },
  { cpf1: '11111111116', cpf2: '11111111112' },
  { cpf1: '11111111116', cpf2: '11111111115' },
  { cpf1: '11111111116', cpf2: '11111111113' },
];
app.post('/person', ({ body }, res) => {
  const { cpf, name } = body;

  if (!cpf || !name) throw new Error('Wrong input');
  if (ValidateCpf(cpf)) throw new Error('Invalid CPF');

  const personAlreadyRegistered = FindByCpf(cpf);
  if (personAlreadyRegistered) {
    throw new Error('Person already registered');
  }

  persons.push({ cpf, name });
  return res.json({ status: 'success' }).status(200);
});

app.get('/person/:cpf', (req, res) => {
  const { cpf } = req.params;
  if (!cpf) throw new Error();
});

app.get('/clean', () => {
  persons.splice(0, persons.length);
});

app.post('/relationship', (req, res) => {
  const { cpf1, cpf2 } = req.body;

  const findFirstCpf = FindByCpf(cpf1);
  const findSecondCpf = FindByCpf(cpf2);

  if (!findFirstCpf || !findSecondCpf) {
    return res.status(404);
  }

  relations.push({ cpf1, cpf2 });

  return res.json({ status: 'success' }).status(200);
});

app.get('/relationship/:cpf', (req, res) => {
  const { cpf } = req.params;
  const cpfExists = FindByCpf(cpf);

  if (!cpfExists) {
    return res.status(404);
  }

  getRecomendedFriends(cpf);

  return res.json().status(200);
});

app.listen(port, () => {
  console.log(`API Running on port ${port}`);
});
