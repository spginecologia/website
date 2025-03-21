/* * */

/**
 * Validates an Email value.
 * @param value The Email value to validate.
 * @param isOptional If true, the Email is considered valid if it is empty.
 * @returns A boolean indicating whether the Email is valid or not.
 */
export function validateEmail(value: string, isOptional: boolean): boolean {
	//

	//
	// Return true if the value is optional and empty.
	// Return false if the value is not optional and empty.

	if (isOptional && !value) return true;
	if (!isOptional && !value) return false;

	//
	// Check if the value is a valid email address

	const isValidEmail = /.+@[^@]+\.[^@]{2,}$/.test(value);

	//
	// Return the result of the validation

	return isValidEmail;

	//
}
