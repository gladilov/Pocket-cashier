module MLukDone {

	/* Input/output Models */
	export interface IInputModel extends IReceipt  { }

    /* Model logic */
    export class CModel extends MMvvm.CModelBase {

        doModelUpdate(order: IInputModel) {

            globalAPIDebugOutput("\n\Done:\n");
			// Нотифицируем View Model.
			this.modelWasUpdatedBy<IInputModel>(order);
        }
    }

	/* Internal Model: */

	export interface IInternalModel extends MInformMessageAndRequest.IInputModel, IReceipt { }
}