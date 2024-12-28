/* * */

export async function vendusApi<T>(data: T) {
	//

	if (!process.env.VENDUS_API_KEY) {
		throw new Error('Environment variable VENDUS_API_KEY is not defined.');
	}

	const response = await fetch('https://www.vendus.pt/ws/v1.2/documents', {
		body: JSON.stringify(data),
		headers: {
			'Authorization': 'Basic ' + Buffer.from(process.env.VENDUS_API_KEY).toString('base64'),
			'Content-Type': 'application/json',
		},
		method: 'POST',
	});

	return await response.json();

	//
};
