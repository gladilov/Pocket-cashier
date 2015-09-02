module MTools {

	export function merge(hashDestination: any, hashSource: any) {
		for (var key in hashSource) {
			hashDestination[key] = hashSource[key];
		}
	}

	interface IHash {
		[key: string]: any;
	}

	class CHash implements IHash{
		[key: string]: any;
	}

	export function mergeTo(hashA: any, hashB: any): any {
		var resultHash = new CHash;
		
		for (var key in hashA) {
			resultHash[key] = hashA[key];
		}

		for (var key in hashB) {
			resultHash[key] = hashB[key];
		}

		return resultHash;
	}
} 