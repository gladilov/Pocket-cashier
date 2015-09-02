module MLukShipmentStarted {

	/* Input/output Models */

	export interface IOutputModel extends IReceipt { }

    /* Model logic */
    export class CModel extends MLukMvvm.CWaitModelBase {

        url = globalAPIPc + "luk-mu/goods/status";

        doModelUpdate() {

			this.forceBlockUI(this);
            globalAPIDebugOutput("\n\Ship:\n");
            this.jqGet(this.url, null, true, { Authorization: "bearer " + globalAPISessionId })
                .done(response => {
				globalAPIDebugOutput(JSON.stringify(response));

				this.forceUnblockUI(this);
				//Передаем Output Model в следующий стейт.
				this.nextStateBy<IOutputModel>('Done', response);
			})
                .fail((jqxhr, textStatus, error) => {
				globalAPIDebugOutput(textStatus + ": " + error + "\n" + jqxhr.responseText);
				this.forceUnblockUI(this);
				this.handleError(jqxhr);
			});
        }

		protected doHandleError(httpStatus: number, restError: MLukMvvm.IRestError, errorMessage: MLukMvvm.IErrorMessage, emptyModel: any): boolean {

			var override: boolean = false;

			if (errorMessage.nextStateKeyword == 'Repeat') {
				this.nextStateBy<MLukErrorAndRepeat.IInputModel>('Repeat', {
					message: {
						Header: errorMessage.eventBody.message.Header,
						Text: 'Дождитесь окончания заправки. Повторить запрос?',
					},
					buttonName: errorMessage.eventBody.buttonName,
					errorCode: httpStatus,
					transferingMessage: emptyModel
				});

				override = true;
			}

			return override;
		}
    }

	/* Internal Model: */

	export interface IInternalModel extends MLukMvvm.IInternalWaitModelBase { }

}