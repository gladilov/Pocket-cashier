module MLukSideChoice {

	/* Input/output Models */

	export interface IInputModel extends IGasStationId { }
	export interface IOutputModel extends IFuelingPointId { }

	
    /* Model logic */

    export class CModel extends MLukMvvm.CWaitModelBase {

        url = globalAPIPc + "luk-mu/station/";

        doModelUpdate(inputModel: IInputModel) {

			this.forceBlockUI();
			globalAPIDebugOutput("\n\getStationDetails:\n");
            this.jqGet(this.url + inputModel.GasStationId, null, false, { Authorization: "bearer " + globalAPISessionId })
                .done(response => {
                globalAPIDebugOutput(JSON.stringify(response));
								
				// Нотифицируем View Model.	
				this.forceUnblockUI();
				this.modelWasUpdatedBy<IInternalModel>(response);
            })
                .fail((jqxhr, textStatus, error) => {
                globalAPIDebugOutput(textStatus + ": " + error + "\n" + jqxhr.responseText);
				this.forceUnblockUI();
				this.handleError(jqxhr, inputModel);
			});
		}
    }

	/* Internal Model: */

	export interface IFuelingPointInfo {
		// ReSharper disable InconsistentNaming
		FuelingPointId: string;
		FuelingPointNumber: number;
		// ReSharper restore InconsistentNaming
	}

	export interface IInternalModel {
		// ReSharper disable InconsistentNaming
		GasStationId: string;
		GasStationName: string;
		FuelingPointList: IFuelingPointInfo[];
		// ReSharper restore InconsistentNaming
	}

}