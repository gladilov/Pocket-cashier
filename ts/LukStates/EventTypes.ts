interface IGasStationId {
	// ReSharper disable InconsistentNaming
	GasStationId: string;
	// ReSharper restore InconsistentNaming
}

interface IFuelingPointId {
	// ReSharper disable InconsistentNaming
	FuelingPointId: string;
	// ReSharper restore InconsistentNaming
}

interface IFuelName {
	// ReSharper disable InconsistentNaming
	FuelName: string;
	// ReSharper restore InconsistentNaming
}

interface IReceipt extends IFuelName {
	// ReSharper disable InconsistentNaming
	FuelPriceKop: number;
	FuelValueMl: number;
	FundsKop: number;
	Receipt: any;	// TODO
	// ReSharper restore InconsistentNaming
}

interface IFuelCost {
	// ReSharper disable InconsistentNaming
	FundsKop: number;
	// ReSharper restore InconsistentNaming
}

interface IFuelVolume {
	// ReSharper disable InconsistentNaming
	FuelValueMl: number;
	// ReSharper restore InconsistentNaming
}

interface IAccountNumber {
	// ReSharper disable InconsistentNaming
	Number: number;
	// ReSharper restore InconsistentNaming
}

interface IRepeatIfNotShipped {
	// ReSharper disable InconsistentNaming
	RepeatIfNotShipped: boolean;
	// ReSharper restore InconsistentNaming
}