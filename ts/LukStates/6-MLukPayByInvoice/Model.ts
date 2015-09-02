module MLukPayByInvoice {

	/* Input/output Models */

	export interface IInputModel extends IFuelCost, IFuelName { }
	export interface IOutputModel extends IFuelCost, IFuelName { }

    /* Model logic */
    export class CModel extends MLukMvvm.CWaitModelBase {

        url = globalAPIPc + "luk-mu/goods/ship";
		
        doModelUpdate(order: IInputModel) {

            globalAPIDebugOutput("\n\Robokassa:\n");
			var model = new CInternalModel();
			model.FuelName = order.FuelName;
			model.FundsKop = order.FundsKop;

			this.getAccountNumber(order, (acc: number) => {
		        model.Number = acc;
		        // Нотифицируем View Model.
				this.modelWasUpdatedBy<IInternalModel>(model);
	        });
        }

		getAccountNumber(order: IInputModel, cb: (n: number) => void) {
			var accUrl = globalAPIPc + "account/info";

			globalAPIDebugOutput("\n\ngetAccountNumber:\n");
			this.forceBlockUI();
			this.jqGet(accUrl, null, false, { Authorization: "bearer " + globalAPISessionId })
				.done(response => {
				globalAPIDebugOutput(JSON.stringify(response));
				this.forceUnblockUI();
				cb(response.Result[0].Number);
			})
				.fail((jqxhr, textStatus, error) => {
				globalAPIDebugOutput(textStatus + ": " + error + "\n" + jqxhr.responseText);
				this.forceUnblockUI();
				this.handleError(jqxhr, order);
			});
		}
    }

	/* Internal Model: */
	export interface IInternalModel extends IFuelCost, IFuelName, IAccountNumber { }

	class CInternalModel implements IInternalModel {
		// ReSharper disable InconsistentNaming
		FuelName: string;
		FundsKop: number;
		Number: number;
		// ReSharper restore InconsistentNaming
	}
}