/* * */

export interface SignupRequest {
	redirect?: string
	username: string
};

export interface SignupResponse {
	anonymized_email?: string
	status: 'error' | 'user_created' | 'user_exists'
};
