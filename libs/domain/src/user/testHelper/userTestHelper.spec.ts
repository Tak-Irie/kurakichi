import { IUserRepository, User, UserEmail, UserName, UserPassword } from '../domain';
import { UniqueEntityId } from '../../shared/domain/UniqueEntityId';

const validEmail = 'success@email.com';
const invalidEmail = 'fail';
const validPassword = 'password';
const invalidPassword = 'p';
const hashedValidPassword =
  '$argon2i$v=19$m=4096,t=3,p=1$6zoQ/V/6nOPil25jstUgHg$+CpC+cvfnq9N5cwsHbvSEQH4yDmo7zTcgDbZT6CYJdk';

const username = UserName.create({ username: 'validUser' }).getValue();

const email = UserEmail.create({ email: validEmail }).getValue();

const createPassword = async () => {
  const pass = await UserPassword.create({
    password: validPassword,
    isHashed: false,
  });
  return pass.getValue();
};

export const createMockValidUser = async () => {
  const validPass = await createPassword();

  const user = User.create({
    id: UniqueEntityId.create(),
    username,
    email,
    password: validPass,
  }).getValue();

  return user;
};

// export const mockValidUserWithArgon2 = User.create({
//   id: UniqueEntityId.create(),
//   username,
//   email,
//   password: hashedPassword,
// }).getValue();

// const hashedPassword = UserPassword.create({
//   password: hashedValidPassword,
//   isHashed: true,
// }).then((pass) => pass.getValue());
