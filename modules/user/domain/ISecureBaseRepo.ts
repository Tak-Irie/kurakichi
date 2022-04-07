import { UniqueEntityId } from '../../shared/domain/UniqueEntityId';
import { SecureBase } from './SecureBase';

export interface ISecureBaseRepo {
  getSecureBase(baseId: UniqueEntityId): Promise<SecureBase | false>;
  registerSecureBase(secureBase: SecureBase): Promise<SecureBase | false>;
}
