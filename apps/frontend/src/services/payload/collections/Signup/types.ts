/* * */

export interface SignupRequest {
	redirect?: string
	username: string
};

export interface SignupResponse {
	anonymized_email?: string
	status: 'error' | 'user_created' | 'user_exists'
};

/* * */

export interface SignupSponsorCheckRequest {
	tax_id: string
};

export interface SignupSponsorCheckResponse {
	is_valid: boolean
}

/* * */

export interface SignupApprovalRequest {
	approval_id: string
	decision: 'approve' | 'reject' | 'status_request'
	proponent_tax_id: string
	sponsor_tax_id: string
}

export interface SignupApprovalResponse {
	error?: string
	status?: 'sponsor_approved' | 'sponsor_rejected' | 'user_active' | 'waiting'
}
