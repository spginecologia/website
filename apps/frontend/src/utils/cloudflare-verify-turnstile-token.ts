/* * */

/**
 * Verifies a Cloudflare Turnstile token.
 * @param token - The token to verify.
 * @returns boolean - true if the token is valid, false otherwise.
 */
export async function cloudflareVerifyTurnstileToken(token: string): Promise<boolean> {
	try {
		//

		const verifyEndpoint = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
		const secretKey = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY ?? 'missing-secret-key';

		const response = await fetch(verifyEndpoint, {
			body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token)}`,
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
			},
			method: 'POST',
		});

		const responseResult = await response.json();

		return responseResult.success || false;

		//
	}
	catch (err) {
		console.log(err);
		return false;
	}
}
