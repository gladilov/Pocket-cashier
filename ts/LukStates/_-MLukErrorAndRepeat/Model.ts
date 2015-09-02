module MLukErrorAndRepeat {

	export interface ITransferingMessage {
		transferingMessage: any;
	}

	/* Input/output Models */
	export interface IInputModel extends MInformMessageAndRequest.IInputModel, ITransferingMessage {}
    
	/* CModelState */

    /* Model logic */

    export class CModel extends MInformMessageAndRequest.CModel { }
}
