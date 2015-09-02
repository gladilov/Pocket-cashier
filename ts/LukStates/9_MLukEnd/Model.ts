module MLukEnd {

	/* Input/output Models */

    /* CModelState */

    /* Model logic */

    export class CModel extends MMvvm.CModelBase {

        doModelUpdate() {
			// Нотифицируем View Model.
			this.modelWasUpdatedBy();
        }
    }

	/* Internal Model: */
}
 