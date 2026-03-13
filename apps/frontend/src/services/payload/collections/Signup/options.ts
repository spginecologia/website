/* * */

export const SignupOptions = {

	/**
	 * The minimum number of sponsor approvals required
	 * for a user to be approved as an "effective" member.
	 */
	required_sponsor_count: 2,

	/**
	 * The maximum number of sponsors a user can add to their application.
	 * Can be higher than `required_sponsor_count` to allow users to add more sponsors
	 * in case some of them do not answer in time, but should not be lower than `required_sponsor_count`.
	 */
	max_sponsor_count: 2,

} as const;
