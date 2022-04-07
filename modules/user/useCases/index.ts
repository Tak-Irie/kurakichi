import { UserRepository } from "../../user copy/infrastructure/UserRepository";
import { MessageRepo } from "../../user copy/infrastructure";

import { RegisterUserUseCase } from "./registerUser/RegisterUserUseCase";
import { GetUsersUseCase } from "./getUsers/GetUsersUseCase";
import { LoginUserUseCase } from "./loginUser/LoginUserUseCase";
import { GetUserByIdUseCase } from "./getUserById/GetUserByIdUseCase";
import { LogoutUserUseCase } from "./logoutUser/logoutUserUseCase";
import { DeleteUserUseCase } from "./deleteUser/DeleteUserUseCase";
import { SsoUserUseCase } from "./ssoUser/ssoUserUseCase";
import { ForgotPasswordUseCase } from "./forgotPassword/ForgotPasswordUseCase";
import { ChangePasswordUseCase } from "./changePassword/ChangePasswordUseCase";
import { UpdateUserUseCase } from "./updateUser/updateUserUseCase";
import { GetUsersByOrgIdUseCase } from "./getUsersByOrgId/getUsersByOrgIdUseCase";
import { GetUsersByIdsUseCase } from "./getUsersByIds/GetUsersByIdsUseCase";

import { SendMessageUseCase } from "./sendMessage/sendMessageUseCase";
import { GetMessagesUseCase } from "./getMessages/getMessagesUseCase";
import { GetMessagesByReceiverIdUseCase } from "./getMessagesByReceiverId/GetMessagesByReceiverIdUseCase";
import { ReplyMessageUseCase } from "./replyMessage/ReplyMessageUseCase";
import { GetMessagesByTreeIdUseCase } from "./getMessagesByTreeId/GetMessagesByTreeIdUseCase";

const userRepo = new UserRepository();
const messageRepo = new MessageRepo();

export const useGetUserById = new GetUserByIdUseCase(userRepo);
export const useRegisterUserUseCase = new RegisterUserUseCase(userRepo);
export const useGetUsersUseCase = new GetUsersUseCase(userRepo);
export const useLoginUserUseCase = new LoginUserUseCase(userRepo);
export const useLogoutUserUseCase = new LogoutUserUseCase(userRepo);
export const useDeleteUserUseCase = new DeleteUserUseCase(userRepo);
export const useSsoUserUseCase = new SsoUserUseCase(userRepo);
export const useForgotPasswordUseCase = new ForgotPasswordUseCase(userRepo);
export const useChangePasswordUseCase = new ChangePasswordUseCase(userRepo);
export const useUpdateUserUseCase = new UpdateUserUseCase(userRepo);
export const useGetUsersByOrgIdUseCase = new GetUsersByOrgIdUseCase(userRepo);
export const useGetUsersByIdsUseCase = new GetUsersByIdsUseCase(userRepo);

export const useSendMessageUseCase = new SendMessageUseCase(messageRepo);
export const useGetMessagesUseCase = new GetMessagesUseCase(messageRepo);
export const useGetMessagesByReceiverIdUseCase =
  new GetMessagesByReceiverIdUseCase(messageRepo);
export const useReplyMessageUseCase = new ReplyMessageUseCase(messageRepo);
export const useGetMessagesByTreeIdUseCase = new GetMessagesByTreeIdUseCase(
  messageRepo
);

export * from "./DTOUser";
export * from "./DTOMessage";
export * from "./DTOSecureBase";
