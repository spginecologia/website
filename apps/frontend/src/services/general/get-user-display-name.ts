/* * */

/**
 * Get the user's display name based on the user's name and title.
 * For example, if the user's first name is "John" and the user's title is "Dr.",
 * the display name will be "Dr. John".
 * @param name The user's name
 * @param title The user's title
 */
export function getUserDisplayName(title: null | string | undefined, firstName: null | string | undefined): string {
	//

	if (!firstName) {
		return 'Sócio sem nome';
	}

	if (!title) {
		return firstName;
	}

	return `${title} ${firstName}`;

	//
}
