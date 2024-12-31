/* * */

/**
 * Validates an Email value.
 * @param value The Email value to validate.
 * @param isOptional If true, the Email is considered valid if it is empty.
 * @returns A boolean indicating whether the Email is valid or not.
 */
export function validateEmail(value: string, isOptional: boolean): boolean {
	//

	if (isOptional && !value) {
		return true;
	}

	const isValidEmail = value.includes('@');

	return isValidEmail;

	//
}
