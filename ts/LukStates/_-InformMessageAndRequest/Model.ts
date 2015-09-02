module MInformMessageAndRequest {

	/* Input/output Models */
	export interface IInputModel {
		message: MLukViews.IMessageViewResource;
		buttonName: string;
		errorCode: number;
	}

	/* Model logic */

    export class CModel extends MMvvm.CModelBase {

		doModelUpdate(eventBody: IInputModel) {

			this.modelWasUpdatedBy<IInputModel>(eventBody);			
		}
    }
}  