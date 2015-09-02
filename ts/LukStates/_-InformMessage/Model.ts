module MInformMessage {

	/* Input/output Models */

	export interface IInputModel extends MLukViews.IMessageViewResource {}

	/* Model logic */

    export class CModel extends MMvvm.CModelBase {
		     
		doModelUpdate(eventBody: IInputModel) {

			this.modelWasUpdatedBy<IInputModel>(eventBody);
			this.nextStateBy('Displayed');
		}
    }

	/* Internal Model: */

	export interface IInternalModel extends MLukViews.IMessageViewResource { }
}  