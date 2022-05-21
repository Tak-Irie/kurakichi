export interface IUsecase<IRequest, IResponse> {
  execute(request: IRequest): Promise<IResponse> | IResponse;
}
