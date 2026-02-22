/* * */

/**
 * Get the user's display name based on the user's name and title.
 * For example, if the user's first name is "John" and the user's title is "Dr.",
 * the display name will be "Dr. John".
 * @param title The user's title.
 * @param firstName The user's first name.
 * @param lastName The user's last name.
 */
export function getUserDisplayName(title: null | string | undefined, firstName: null | string | undefined, lastName?: null | string | undefined): string {
	//

	let result = '';

	//
	// Detect the title of the user.
	// If '(nenhum)' is selected, it means
	// the user decided to have no title.

	if (title && title !== '(nenhum)') {
		result = title;
	}

	//
	// Detect the first name of the user.
	// If the user has no first name, we return
	// 'Sócio sem nome' as the display name.

	if (!firstName) {
		return 'Sócio sem nome';
	}

	result = `${result} ${firstName}`.trim();

	//
	// Detect the last name of the user.
	// If the user has a last name, we add it to the display name.

	if (lastName) {
		result = `${result} ${lastName}`.trim();
	}

	//
	// Return the display name.

	return result.trim();

	//
}
