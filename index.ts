import * as express from 'express';
import * as cors from 'cors';
import {
  ClearPersons,
  CreatePerson,
  FindByCpf,
  GetRecomendedFriends,
  PersonsInMemory,
  ValidateCpf,
} from './src/modules/person/person';
import {
  ClearRelations,
  CreateRelations,
  RelationsInMemory,
} from './src/modules/relations/relations';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  return res.json({ working: true });
});

app.post('/person', ({ body }, res) => {
  console.log('[post] - /person');
  const { cpf, name } = body;

  try {
    const person = CreatePerson({ cpf, name });
    return res.json({ status: 'success' }).status(200);
  } catch (err) {
    return res.status(400).json({ msg: err.message });
  }
});

app.get('/person/:cpf', (req, res) => {
  console.log(`[get] - /person/${req.params.cpf}`);

  const { cpf } = req.params;
  if (!cpf) throw new Error();
  const person = FindByCpf(cpf);
  if (!person) {
    return res.status(404).json({ msg: 'Not found' });
  }
  return res.status(200).json(person);
});

app.delete('/clean', (req, res) => {
  console.log('[GET] - Clean');
  ClearPersons();
  ClearRelations();
  return res.status(200).json({ msg: 'success' });
});

app.post('/relationship', (req, res) => {
  const { cpf1, cpf2 } = req.body;
  try {
    CreateRelations(cpf1, cpf2);
    return res.json({ status: 'success' }).status(200);
  } catch (err) {
    return res.status(404).json({ msg: err.message });
  }
});

app.get('/relations', (req, res) => {
  res.status(200).json(RelationsInMemory);
});

app.get('/recommendations/:cpf', (req, res) => {
  console.log('[get] - Recommendations');
  const { cpf } = req.params;
  try {
    const recomendedFriends = GetRecomendedFriends(cpf);
    return res.json(recomendedFriends).status(200);
  } catch (err) {
    return res.status(404).json({ msg: err.message });
  }
});

app.listen(port, () => {
  console.log(`API Running on port ${port}`);
});
