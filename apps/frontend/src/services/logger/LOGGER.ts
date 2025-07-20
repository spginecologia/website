/* * */

class LOGGER {
	//

	divider(message?: string, size = 75) {
		console.log();
		if (message) console.log(`- ${message} ${'-'.repeat(size - 2 - message.length < 1 ? 1 : size - 2 - message.length)}`);
		else console.log('-'.repeat(size));
		console.log();
	}

	//

	error(context: string, message: string, error?: Error) {
		console.log(`[${context}] ✘ ${message}`, error || '');
	}

	//

	info(context: string, message: string, spacesAfter = 0, spacesBefore = 0) {
		if (spacesBefore > 0) this.spacer(spacesBefore);
		console.log(`[${context}] → ${message}`);
		if (spacesAfter > 0) this.spacer(spacesAfter);
	}

	//

	init() {
		const currentDate = new Date().toISOString();
		console.log();
		console.log('-'.repeat(currentDate.length));
		console.log(currentDate);
		console.log('-'.repeat(currentDate.length));
		console.log();
	}

	//

	spacer(lines: number) {
		for (let i = 0; i < lines; i++) {
			console.log();
		}
	}

	//

	success(context: string, message: string, spacesAfter = 0, spacesBefore = 0) {
		if (spacesBefore > 0) this.spacer(spacesBefore);
		console.log(`[${context}] ✓ ${message}`);
		if (spacesAfter > 0) this.spacer(spacesAfter);
	}

	//

	terminate(message: string) {
		console.log();
		console.log('-'.repeat(message.length));
		console.log(message);
		console.log('-'.repeat(message.length));
		console.log();
	}

	//

	title(message: string) {
		console.log();
		console.log(`▶︎ ${message}`);
		console.log();
	}

	//
}

/* * */

export default new LOGGER();
