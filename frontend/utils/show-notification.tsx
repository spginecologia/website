/* * */

import { NotificationData, notifications } from '@mantine/notifications';
import { IconCheck, IconX } from '@tabler/icons-react';

/* * */

interface Props {
	action?: 'show' | 'update'
	id: string
	message: string
	title: string
	type: 'error' | 'loading' | 'success'
}

/* * */

export async function showNotification({ action = 'show', id, message, title, type }: Props) {
	//

	const notificationOptions: NotificationData = {
		autoClose: 5000,
		id: id,
		message: message,
		title: title,
		withCloseButton: false,
	};

	switch (type) {
		case 'error':
			notificationOptions.loading = false;
			notificationOptions.autoClose = 7000;
			notificationOptions.icon = <IconX />;
			notificationOptions.mod = { state: 'error' };
			break;

		case 'loading':
			notificationOptions.loading = true;
			notificationOptions.autoClose = false;
			notificationOptions.mod = { state: 'loading' };
			break;

		case 'success':
			notificationOptions.loading = false;
			notificationOptions.autoClose = 3000;
			notificationOptions.icon = <IconCheck />;
			notificationOptions.className = 'success';
			notificationOptions.mod = { state: 'success' };
			break;

		default:
			break;
	}

	if (action === 'show') {
		notifications.show(notificationOptions);
	}
	else if (action === 'update') {
		notifications.update(notificationOptions);
	}

	//
}
