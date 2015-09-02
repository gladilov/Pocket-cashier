module MLukNozzleAwaiting {

	/* Input/output Models */

	export interface IInputModel extends IFuelingPointId, IGasStationId { }
	export interface IOutputModel extends IFuelName { }
		
    /* Model logic */

    export class CModel extends MLukMvvm.CWaitModelBase {

        url = globalAPIPc + "luk-mu/user/checkin";

        doModelUpdate(gasStationSide: IInputModel) {
		
			this.forceBlockUI(this);
			globalAPIDebugOutput("\n\waitNozzleOn:\n");
            this.jqPost(this.url, gasStationSide, true, { Authorization: "bearer " + globalAPISessionId })
                .done(response => {
				globalAPIDebugOutput(JSON.stringify(response));
				
				this.forceUnblockUI(this);
				// Нотифицируем View Model.
				var model = new CInternalModel;
				model.fuelName = response;
				model.state = MLukMvvm.EWaitModelState.Other;
				this.modelWasUpdatedBy<IInternalModel>(model);
								
				//Передаем Output Model в следующий стейт.
				this.nextStateBy<IOutputModel>('NozzleOn', response);
			})
                .fail((jqxhr, textStatus, error) => {
				globalAPIDebugOutput(textStatus + ": " + error + "\n" + jqxhr.responseText);
				this.forceUnblockUI(this);
				this.handleError(jqxhr, gasStationSide);
			});
        }
    }

	/* Internal Model: */
	export interface IFuelName {
		// ReSharper disable InconsistentNaming
        FuelName: string;
		// ReSharper restore InconsistentNaming
	}
	
	export interface IInternalModel extends MLukMvvm.IInternalWaitModelBase {
        fuelName: IFuelName;
	}

	export class CInternalModel implements IInternalModel {
        fuelName: IFuelName;
		waitView: string;
		state: MLukMvvm.EWaitModelState;
	}
}