/* * */

const BASE_URL = 'https://api.brevo.com/v3';

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
	 * The service to use. Currently only 'contacts' is supported.
	 */
	service: 'contacts'

}

/* * */

export async function brevoApi({ data, method, service }: BrevoApiData) {
	//

	const url = `${BASE_URL}/${service}`;

	const options = {
		body: data,
		headers: {
			'accept': 'application/json',
			'api-key': process.env.BREVO_API_KEY || 'placeholder',
			'content-type': 'application/json',
		},
		method: method,
	};

	fetch(url, options)
		.then(res => res.json())
		.then(json => console.log(json))
		.catch(err => console.error(err));

	//
}
