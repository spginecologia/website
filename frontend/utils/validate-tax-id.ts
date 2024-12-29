/* * */

/**
 * Validates a Tax ID value.
 * @param value The Tax ID value to validate.
 * @param isOptional If true, the Tax ID is considered valid if it is empty.
 * @returns A boolean indicating whether the Tax ID is valid or not.
 */
export function validateTaxId(value: number | string, isOptional: boolean): boolean {
	//

	if (isOptional && !value) {
		return true;
	}

	const valueAsString = value.toString();

	const isValidLength = valueAsString.length === 9;
	const isOnlyNumbers = /^\d+$/.test(valueAsString);

	return isValidLength && isOnlyNumbers;

	//
}
