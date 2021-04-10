import { UniqueEntityId } from '../../shared/domain/UniqueEntityId';
import { DialogRoom } from './DialogRoom';

export interface IDialogRoomRepo {
  getDialogRoom(roomId: UniqueEntityId): Promise<DialogRoom | false>;
  registerDialogRoom(dialogRoom: DialogRoom): Promise<DialogRoom | false>;
}
