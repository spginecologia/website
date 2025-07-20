/* * */

export const REDIRECT_PARAM_KEY = 'redirect';

/* * */

/**
 * Redirect the user to a specific URL based on a search parameter.
 * @param fallback The URL to redirect to if the parameter is not found.
 */
export function navigationHandleRedirectParam(fallback = '/account') {
	//

	const searchParams = new URLSearchParams(window.location.search);

	const redirectPath = searchParams.get(REDIRECT_PARAM_KEY);

	if (!redirectPath) {
		window.location.replace(fallback);
		return;
	}

	if (redirectPath.startsWith('/')) {
		window.location.replace(redirectPath);
		return;
	}

	window.location.replace(`/${redirectPath}`);

	//
}

/* * */

/**
 * Get the value of a search parameter from the URL.
 * @returns The value of the search parameter, or null if it doesn't exist.
 */
export function navigationGetRedirectParam(): string {
	//

	const searchParams = new URLSearchParams(window.location.search);

	return searchParams.get(REDIRECT_PARAM_KEY) || '';

	//
}

/* * */

/**
 * Add the redirect parameter to a URL.
 * @param url The URL to add the parameter to.
 * @param redirectTo The redirect param value.
 * @returns The URL with the redirect parameter added.
 */
export function navigationGetUrlWithRedirectParam(url: string, redirectTo?: string): string {
	//

	if (!redirectTo) return url;

	const urlObject = new URL(url);

	const searchParams = new URLSearchParams(urlObject.search);

	searchParams.set(REDIRECT_PARAM_KEY, redirectTo);

	urlObject.search = searchParams.toString();

	return urlObject.toString();

	//
}
