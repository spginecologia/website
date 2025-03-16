/* * */

/**
 * Returns an anonymized email address.
 *
 * @param email - The email address to anonymize.
 * @returns The anonymized email address.
 */
export function getAnonymizedEmail(email: string): string {
	//

	// Split the email into local part and domain
	const [localPart, domainPart] = email.split('@');
	if (!localPart || !domainPart) return '****@****.***'; // fallback for invalid format

	// Split domain into domain name and TLD
	const domainParts = domainPart.split('.');
	if (domainParts.length < 2) return '****@****.***'; // fallback if no TLD found

	const domainName = domainParts.slice(0, -1).join('.'); // handles subdomains if any
	const tld = domainParts[domainParts.length - 1];

	// Local Part: show first 2 characters, replace the rest with *
	const visibleLocal = localPart.slice(0, 2);
	const hiddenLocalCount = Math.max(localPart.length - 2, 0);
	const maskedLocal = visibleLocal + '*'.repeat(hiddenLocalCount);

	// Domain: show first character, mask the rest
	const visibleDomain = domainName[0];
	const hiddenDomainCount = Math.max(domainName.length - 1, 0);
	const maskedDomain = visibleDomain + '*'.repeat(hiddenDomainCount);

	// TLD: show first character, mask the rest
	const visibleTLD = tld[0];
	const hiddenTLDCount = Math.max(tld.length - 1, 0);
	const maskedTLD = visibleTLD + '*'.repeat(hiddenTLDCount);

	// Construct final anonymized email
	return `${maskedLocal}@${maskedDomain}.${maskedTLD}`;

	//
}
