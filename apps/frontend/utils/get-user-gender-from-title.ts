/* * */

/**
 * Guesses the user gender based on the chosen title.
 * For example, if the user's title is "Dr." then the gender is "male".
 * If the title is "Dra." then the gender is "female".
 * If the title is not recognized, then "other" is returned.
 * @param title The user's title
 */
export function getUserGenderFromTitle(title: null | string | undefined): 'female' | 'male' | 'other' {
	//

	if (!title) {
		return 'other';
	}

	if (title === 'Sr.ª' || title === 'Dr.ª' || title === 'Prof.ª' || title === 'Exmo.ª') {
		return 'female';
	}

	if (title === 'Sr.' || title === 'Dr.' || title === 'Prof.' || title === 'Exmo.') {
		return 'male';
	}

	return 'other';

	//
}
