module MLukErrorAndContinue {

	/* Input/output Models */
	
	export interface IInputModel extends MInformMessageAndRequest.IInputModel { }

    /* CModelState */

    /* Model logic */

    export class CModel extends MMvvm.CModelBase {

        doModelUpdate(inputModel: IInputModel) {
			// Нотифицируем View Model.
			this.modelWasUpdatedBy<IInputModel>(inputModel);
        }
    }
}
 