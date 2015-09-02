module MLukCostOrVolumeAwaiting {

	/* Input/output Models */

	export interface IInputModel  extends IFuelCost, IFuelVolume { }
	
	export interface IOutputModel extends IReceipt { }

    /* Model logic */
    export class CModel extends MLukMvvm.CWaitModelBase {

        url = globalAPIPc + "luk-mu/goods/cost";

        doModelUpdate(fuelCostOrVolume: IInputModel) {

			this.forceBlockUI(this);
			globalAPIDebugOutput("\n\CostOrVolumeAwaiting:\n");
            this.jqPost(this.url, fuelCostOrVolume, true, { Authorization: "bearer " + globalAPISessionId })
                .done(response => {
				globalAPIDebugOutput(JSON.stringify(response));

				this.forceUnblockUI(this);
				//Передаем Output Model в следующий стейт.
				this.nextStateBy<IOutputModel>('Calculated', response);
			})
                .fail((jqxhr, textStatus, error) => {
				globalAPIDebugOutput(textStatus + ": " + error + "\n" + jqxhr.responseText);
				this.forceUnblockUI(this);
				this.handleError(jqxhr, fuelCostOrVolume);
			});
        }		
    }

	/* Internal Model: */
	
	export interface IInternalModel extends MLukMvvm.IInternalWaitModelBase { }
}