import faker from 'faker';

export default {
  user: {
    email: 'test@test.com',
    password: 'password',
    name: 'test admin',
    signIn: {
      email: 'test@test.com',
      password: 'password',
    },
    signUp: {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    },
    incorrectCrendentials: {
      email: 'test@test.com',
      password: 'pass23445',
    },
    invalidEmail: {
      name: 'test test',
      email: 'testtest.com',
      password: 'password',
    },
    staticUser: {
      name: 'test admin',
      email: 'test@test.com',
      password: 'password',
    },
    existingEmail: {
      name: 'test admin',
      email: 'test@test.com',
      password: 'password',
    },
    signUpEmptyUsername: {
      name: '',
      email: 'quduskunle@gmail.com',
      password: 'password',
    },
    location: {
      location: 'kano',
      sex: {
        male: 23456,
        female: 3456,
      },
    },
    location1: {
      location: 'Ilorin',
      male: 12345,
      female: 54367,
    },
    location2: {
      location: 'Ilorin',
      sex: {
        male: 2345778,
        female: 3456,
      },
    },
  },
};
