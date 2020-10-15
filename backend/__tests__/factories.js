import faker from 'faker';
import { factory } from 'factory-girl';

import Users from '../src/app/schema/Users';

factory.define('Users', Users, {
  nome: faker.name.findName(),
  email: faker.internet.email(),
  senha: faker.internet.password(),
  telefones: [
    {
      ddd: faker.random.number({ min: 2, max: 2 }),
      numero: faker.random.number({ min: 9, max: 9 })
    }
  ]
})

export default factory;