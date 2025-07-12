/* * */

import { IconEye, IconEyeClosed } from '@tabler/icons-react';

/* * */

export function VisibilityToggleIcon({ reveal }: { reveal: boolean }) {
	return reveal ? <IconEye size={20} /> : <IconEyeClosed size={20} />;
}
