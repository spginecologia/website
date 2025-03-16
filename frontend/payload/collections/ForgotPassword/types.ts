/* * */

export interface ForgotPasswordRequest {
	redirect?: string
	username: string
};

export interface ForgotPasswordResponse {
	has_email: false | string
	user_found: boolean
};
