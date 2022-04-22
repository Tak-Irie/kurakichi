import { BaseRepo } from "../infra";
import { CreateBaseUsecase } from "./CreateBase/CreateBaseUsecase";

const baseRepo = new BaseRepo();

export const useCreateBaseUsecase = new CreateBaseUsecase(baseRepo);

export * from "./DTOBase";
