import { GetUsersUsecase } from "./GetUsers/GetUsersUseCase";
import { LoginUserUsecase } from "./LoginUser/LoginUserUseCase";
import { GetUserByIdUsecase } from "./GetUserById/GetUserByIdUseCase";
import { DeleteUserUsecase } from "./DeleteUser/DeleteUserUseCase";
import { SsoUserUsecase } from "./SsoUser/SsoUserUseCase";
import { ForgotPasswordUsecase } from "./ForgotPassword/ForgotPasswordUseCase";
import { UpdateUserUsecase } from "./UpdateUser/UpdateUserUseCase";
import { GetUsersByOrgIdUsecase } from "./GetUsersByOrgId/GetUsersByOrgIdUseCase";
import { GetUsersByIdsUsecase } from "./GetUsersByIds/GetUsersByIdsUseCase";

import { SendMessageUsecase } from "./SendMessage/SendMessageUseCase";
import { GetMessagesUsecase } from "./GetMessages/GetMessagesUseCase";
import { GetMessagesByReceiverIdUsecase } from "./GetMessagesByReceiverId/GetMessagesByReceiverIdUseCase";
import { ReplyMessageUsecase } from "./ReplyMessage/ReplyMessageUseCase";
import { GetMessagesByTreeIdUsecase } from "./GetMessagesByTreeId/GetMessagesByTreeIdUseCase";
import { LogoutUserUsecase } from "./LogoutUser/LogoutUserUseCase";
import { ChangePasswordUsecase } from "./ChangePassword/ChangePasswordUsecase";
import { RegisterUserUsecase } from "./RegisterUser/RegisterUserUseCase";
import { UserRepository } from "../infra/UserRepository";
import { MessageRepo } from "../infra/MessageRepo";

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
