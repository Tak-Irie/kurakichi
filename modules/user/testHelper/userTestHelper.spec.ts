import {
  User,
  UserEmail,
  UserName,
  UserPassword,
} from "../../user copy/domain";
import { UniqueEntityId } from "../../shared/domain/UniqueEntityId";

const userName = UserName.create({ userName: "validUser" }).getValue();
const email = UserEmail.create({ email: "valid-email@example.com" }).getValue();
const createPassword = async () => {
  const pass = await UserPassword.create({
    password: "validPassword",
    isHashed: false,
  });
  return pass.getValue();
};

export const createMockValidUser = async () => {
  const validPass = await createPassword();

  const user = User.create({
    id: UniqueEntityId.reconstruct("12345678901234567890123456").getValue(),
    userName,
    email,
    password: validPass,
  });

  return user;
};
