/* * */

/**
 * Get the duration of a video file in seconds.
 * @param bufferData - buffer data of the video file
 * @returns {number} - duration in seconds
 */
export function getVideoDurationInSeconds(bufferData: Buffer): number {
	//

	const header = Buffer.from('mvhd');
	const start = bufferData.indexOf(header) + 17;
	const timeScale = bufferData.readUInt32BE(start);
	const duration = bufferData.readUInt32BE(start + 4);

	return Math.round(duration / timeScale);

	//
}
