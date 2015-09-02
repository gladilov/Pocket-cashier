module MLukPayAndShip {

	/* Input/output Models */

	export interface IInputModel extends IFuelCost, IFuelName, IRepeatIfNotShipped { }
	
	export interface IOutputModel extends IReceipt { }

    /* Model logic */
    export class CModel extends MLukMvvm.CWaitModelBase {

        url = globalAPIPc + "luk-mu/goods/ship";

        doModelUpdate(order: IInputModel) {

			this.forceBlockUI(this);
			if (order.RepeatIfNotShipped != undefined && order.RepeatIfNotShipped == true) {
				globalAPIDebugOutput("\n\Ship, status request:\n");
			}
			else {
				globalAPIDebugOutput("\n\Ship:\n");
			}
            
            this.jqPost(this.url, order, true, { Authorization: "bearer " + globalAPISessionId })
                .done(response => {
				globalAPIDebugOutput(JSON.stringify(response));

				this.forceUnblockUI(this);
				//Передаем Output Model в следующий стейт.
				this.nextStateBy<IOutputModel>('PaymentAccepted', response);
			})
                .fail((jqxhr, textStatus, error) => {
				globalAPIDebugOutput(textStatus + ": " + error + "\n" + jqxhr.responseText);
				this.forceUnblockUI(this);
				this.handleError(jqxhr, order);
			});
        }

		protected doHandleError(httpStatus: number, restError: MLukMvvm.IRestError, errorMessage: MLukMvvm.IErrorMessage, order: IInputModel): boolean {

			var override: boolean = false;			

			if (restError != null) {
				switch (restError.ErrorCode) {
					case 'InsufficientFunds':

						globalAPISavePaymentContext(order);
						this.nextStateBy<MLukPayByInvoice.IInputModel>('Invoice', order);

						override = true;
						break;
				}
			}

			if (!override && errorMessage.nextStateKeyword == 'Repeat') {

				order.RepeatIfNotShipped = true;

				this.nextStateBy<MLukErrorAndRepeat.IInputModel>('Repeat', {
					message: {
						Header: errorMessage.eventBody.message.Header,
						Text: 'Заправьтесь если отпуск топлива начался. Если нет, то повторите запрос и подождите, или вы можете повесить пистолет.'
					},
					buttonName: errorMessage.eventBody.buttonName,
					errorCode: httpStatus,
					transferingMessage: order
				});

				override = true;
			}

			return override;
		}
    }

	/* Internal Model: */

	export interface IInternalModel extends MLukMvvm.IInternalWaitModelBase { }
}