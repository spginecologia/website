/* * */

export async function GEET(request: Request) {
	try {
		//

		const params = new URLSearchParams(request.url);

		const sessionId = params.get('customer_id');

		//
	}
	catch (err) {
		console.log(err);
		return Response.error();
	}
}
