import { BaseRepo } from "../infra";
import { CreateBaseUsecase } from "./createBase/createBaseUsecase";

const baseRepo = new BaseRepo();

export const useCreateBaseUsecase = new CreateBaseUsecase(baseRepo);

export * from "./DTOBase";
