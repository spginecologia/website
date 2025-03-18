/* * */

type TaxIdType = 'company' | 'singular';

/**
 * Validates a Tax ID value.
 * @param value The Tax ID value to validate.
 * @param isOptional If true, the Tax ID is considered valid if it is empty.
 * @param allowedTypes An array of Tax ID types considered valid.
 * @returns A boolean indicating whether the Tax ID is valid or not.
 */
export function validateTaxId(value: number | string, isOptional: boolean, allowedTypes: TaxIdType[]): boolean {
	//

	//
	// Return true if the value is optional and empty

	if (isOptional && !value) return true;

	//
	// Ensure the value is a string

	const valueAsString = value.toString();

	//
	// Check if the value has 9 digits

	const isValidLength = valueAsString.length === 9;
	if (!isValidLength) return false;

	//
	// Check if the value has only numbers

	const isOnlyNumbers = /^\d+$/.test(valueAsString);
	if (!isOnlyNumbers) return false;

	//
	// Implement the validation logic with control digit
	// as described in Wikipedia's article:
	// https://pt.wikipedia.org/wiki/N%C3%BAmero_de_identifica%C3%A7%C3%A3o_fiscal#Obter_d%C3%ADgito_de_controlo

	const valueAsArray = valueAsString.split('').map(Number);

	let sum = 0;
	for (let i = 0; i < 8; i++) {
		sum += valueAsArray[i] * (9 - i);
	}

	const rest = sum % 11;
	const calculatedControlDigit = rest === 0 || rest === 1 ? 0 : 11 - rest;

	if (calculatedControlDigit !== valueAsArray[8]) return false;

	//
	// Check if the NIF is a singular person or a company
	// and if each type is allowed by the caller

	const isSingularType = valueAsArray[0] === 1 || valueAsArray[0] === 2 || valueAsArray[0] === 3 || valueAsArray[0] === 4;
	if (isSingularType && !allowedTypes.includes('singular')) return false;

	const isCompanyType = valueAsArray[0] === 5 || valueAsArray[0] === 6 || valueAsArray[0] === 9;
	if (isCompanyType && !allowedTypes.includes('company')) return false;

	//
	// Return true if all checks passed

	return true;

	//
}
