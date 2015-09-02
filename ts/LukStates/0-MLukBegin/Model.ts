module MLukBegin {
	
	/*
		У модели любого стейта есть:
		0-1 IInputModel
		0-1 Internal Models
		0-n IOutputModel
	*/

	/* Input/output Models */

	export interface IOutputModel extends IGasStationId { }

    /* Model logic */

    export class CModel extends MLukMvvm.CWaitModelBase {

        url = globalAPIPc + "luk-mu/stations";

		doModelUpdate() {

			this.forceBlockUI();
			globalAPIDebugOutput("\n\getStations:\n");
            this.jqGet(this.url, null, false, { Authorization: "bearer " + globalAPISessionId })
                .done(response => {
                globalAPIDebugOutput(JSON.stringify(response));
				this.forceUnblockUI();
				// Нотифицируем View Model.
				this.modelWasUpdatedBy<IInternalModel>(response);
            })
                .fail((jqxhr, textStatus, error) => {
				this.forceUnblockUI();
                globalAPIDebugOutput(textStatus + ": " + error + "\n" + jqxhr.responseText);
				this.handleError(jqxhr);
			});
		}
    }

	/* Internal Model: */

	export interface IGasStationSummary {
		// ReSharper disable InconsistentNaming
		GasStationName: string;
		Geo: any;
		// ReSharper restore InconsistentNaming
	}

	export interface IInternalModel {
		[gasStationId: string]: IGasStationSummary;
	}

}