# Friend Recomendation

Simulação de recomendação de amigos.

Já vem com alguns pre-setados 

obs: seria melhor fazer tudo com classes, porém fiz com um pouco depressa. 
```javascript
 [
  { cpf: '11111111111', name: 'a' },
  { cpf: '11111111112', name: 'b' },
  { cpf: '11111111113', name: 'c' },
  { cpf: '11111111114', name: 'd' },
  { cpf: '11111111115', name: 'e' },
  { cpf: '11111111116', name: 'f' },
  { cpf: '11111111117', name: 'g' },
  { cpf: '11111111118', name: 'h' },
  { cpf: '11111111119', name: 'i' },
];
```

```javascript
[
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
```

#### Como rodar
```shell
npm i 
npm run start
```
or
```shell
yarn install 
yarn start
```


----
### [GET] Find user by cpf

```html
localhost:3000/person/:cpf
```

#### response
```json
{
    "cpf": "11111111111",
    "name": "a"
}
```

----
### [POST] Create person

```html
localhost:3000/person
```

#### body
```json
{
  "cpf": "11111111119",
  "name": "teste"
}
```
#### response
```json
{
  "msg": "success"
}
```
----
### [POST] create relations

```html
localhost:3000/relationship
```

#### body
```json
{
  "cpf1": "11111111114",
  "cpf2": "11111111118"
}
```
#### response
```json
{
  "msg": "success"
}
```
----
### [GET] Find Recomended friends

```html
localhost:3000/recommendations/:cpf
```

#### response
```json
['11111111111', '11111111112', '11111111113']
```
----
### [DELETE] Clear

```html
localhost:3000/clean
```

#### response
```json
  {
  "msg": "success"
}
```
