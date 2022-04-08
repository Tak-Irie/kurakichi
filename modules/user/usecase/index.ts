import { RegisterUserUsecase } from "./registerUser/RegisterUserUsecase";
import { GetUsersUsecase } from "./getUsers/GetUsersUsecase";
import { LoginUserUsecase } from "./loginUser/LoginUserUsecase";
import { GetUserByIdUsecase } from "./getUserById/GetUserByIdUsecase";
import { DeleteUserUsecase } from "./deleteUser/DeleteUserUsecase";
import { SsoUserUsecase } from "./ssoUser/ssoUserUsecase";
import { ForgotPasswordUsecase } from "./forgotPassword/ForgotPasswordUsecase";
import { UpdateUserUsecase } from "./updateUser/updateUserUsecase";
import { GetUsersByOrgIdUsecase } from "./getUsersByOrgId/getUsersByOrgIdUsecase";
import { GetUsersByIdsUsecase } from "./getUsersByIds/GetUsersByIdsUsecase";

import { SendMessageUsecase } from "./sendMessage/sendMessageUsecase";
import { GetMessagesUsecase } from "./getMessages/getMessagesUsecase";
import { GetMessagesByReceiverIdUsecase } from "./getMessagesByReceiverId/GetMessagesByReceiverIdUsecase";
import { ReplyMessageUsecase } from "./replyMessage/ReplyMessageUsecase";
import { GetMessagesByTreeIdUsecase } from "./getMessagesByTreeId/GetMessagesByTreeIdUsecase";
import { MessageRepo } from "../infra/MessageRepo";
import { LogoutUserUsecase } from "./logoutUser/LogoutUserUsecase";
import { ChangePasswordUsecase } from "./changePassword/ChangePasswordUsecase";
import { UserRepository } from "../infra/UserRepository";

const userRepo = new UserRepository();
const messageRepo = new MessageRepo();

export const useGetUserById = new GetUserByIdUsecase(userRepo);
export const useRegisterUserUsecase = new RegisterUserUsecase(userRepo);
export const useGetUsersUsecase = new GetUsersUsecase(userRepo);
export const useLoginUserUsecase = new LoginUserUsecase(userRepo);
export const useLogoutUserUsecase = new LogoutUserUsecase(userRepo);
export const useDeleteUserUsecase = new DeleteUserUsecase(userRepo);
export const useSsoUserUsecase = new SsoUserUsecase(userRepo);
export const useForgotPasswordUsecase = new ForgotPasswordUsecase(userRepo);
export const useChangePasswordUsecase = new ChangePasswordUsecase(userRepo);
export const useUpdateUserUsecase = new UpdateUserUsecase(userRepo);
export const useGetUsersByOrgIdUsecase = new GetUsersByOrgIdUsecase(userRepo);
export const useGetUsersByIdsUsecase = new GetUsersByIdsUsecase(userRepo);

export const useSendMessageUsecase = new SendMessageUsecase(messageRepo);
export const useGetMessagesUsecase = new GetMessagesUsecase(messageRepo);
export const useGetMessagesByReceiverIdUsecase =
  new GetMessagesByReceiverIdUsecase(messageRepo);
export const useReplyMessageUsecase = new ReplyMessageUsecase(messageRepo);
export const useGetMessagesByTreeIdUsecase = new GetMessagesByTreeIdUsecase(
  messageRepo
);

export * from "./DTOUser";
export * from "./DTOMessage";
