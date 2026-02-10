/* * */

/**
 * Get the user's display name based on the user's name and title.
 * For example, if the user's first name is "John" and the user's title is "Dr.",
 * the display name will be "Dr. John".
 * @param title The user's title.
 * @param firstName The user's first name.
 */
export function getUserDisplayName(title: null | string | undefined, firstName: null | string | undefined): string {
	//

	//
	// Detect the title of the user.
	// If '(nenhum)' is selected, it means
	// the user decided to have no title.

	let effectiveTitle: string;

	if (!title || title === '(nenhum)') effectiveTitle = '';
	else effectiveTitle = title;

	//
	// Detect the first name of the user.
	// If the user has no first name, we will return
	// 'Sócio sem nome' as the display name.

	if (!firstName) {
		return 'Sócio sem nome';
	}

	return `${effectiveTitle} ${firstName}`.trim();

	//
}
