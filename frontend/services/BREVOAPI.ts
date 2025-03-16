/* * */

interface BrevoApiData {

	/**
	 * The data to send to the API. Must be a JSON string.
	 */
	data: string

	/**
	 * The HTTP method to use.
	 */
	method: 'DELETE' | 'GET' | 'POST' | 'PUT'

	/**
	 * The additional path to use. Only used when the method is 'PUT'.
	 */
	path?: string

	/**
	 * The service to use. Currently only 'contacts' is supported.
	 */
	service: 'contacts'

}

/* * */

export async function BREVOAPI({ data, method, path, service }: BrevoApiData) {
	try {
		//

		//
		// Ensure the API key is available

		const apiKey = process.env.BREVO_API_KEY;

		if (!apiKey) {
			throw new Error('The BREVO API key is missing.');
		}

		//
		// Setup the request options

		let url = `https://api.brevo.com/v3/${service}`;

		if (path) url += `/${path}`;

		const options = {
			body: data,
			headers: {
				'accept': 'application/json',
				'api-key': process.env.BREVO_API_KEY || 'placeholder',
				'content-type': 'application/json',
			},
			method: method,
		};

		//
		// Make the request to the API

		const response = await fetch(url, options);

		//
		// Handle the response statuses

		if (!response.ok) {
			const text = await response.text();
			console.log(text);
			throw new Error(`The BREVO API returned an error: ${response.status} ${response.statusText}`);
		}

		if (response.status === 204) {
			// 204 means "No content" and has no body to parse.
			// Consider as a successful request.
			return;
		}

		return await response.json();

		//
	}
	catch (err) {
		console.log(err);
		throw new Error(err.message || 'An error occurred while trying to contact the BREVO API.');
	}
}
