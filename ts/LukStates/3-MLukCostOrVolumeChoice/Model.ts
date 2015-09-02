module MLukCostOrVolumeChoice {

	/* Input/output Models */

	export interface IInputModel extends IReceipt {}

	export interface IOutputModelFuelCost extends IFuelCost {}

	export interface IOutputModelFuelVolume extends IFuelVolume{ }

	export interface IOutputModelShip extends IFuelCost, IFuelName { }

    /* CModelState */

    /* Model logic */

    export class CModel extends MMvvm.CModelBase {

        doModelUpdate(receipt: IInputModel) {
			// Нотифицируем View Model.
			this.modelWasUpdatedBy<IInternalModel>(receipt);
        }
    }

	/* Internal Model: */

	export interface IInternalModel extends IReceipt { }
}
