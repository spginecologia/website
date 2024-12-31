/* * */

interface Props {

	/**
	 * The URL to redirect to if the parameter is not found.
	 * @default '/account'
	 */
	fallback?: string

	/**
	 * The key of the search parameter to check for.
	 * @default 'redirect'
	 */
	searchParamsKey?: string

}

export function navigationHandleRedirectParam({ fallback = '/account', searchParamsKey = 'redirect' }: Props) {
	//

	const searchParams = new URLSearchParams(window.location.search);

	const redirectPath = searchParams.get(searchParamsKey);

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
