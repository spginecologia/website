'use client';

/* * */

import '@mantine/core/styles.layer.css';
import '@mantine/dates/styles.layer.css';
import '@mantine/notifications/styles.css';

/* * */

import '@/themes/styles/reset.css';
import '@/themes/styles/variables.css';

/* * */

import { VisibilityToggleIcon } from '@/components/common/VisibilityToggleIcon';
import { Accordion, Alert, Anchor, Button, Checkbox, createTheme, FileInput, Loader, Notification, NumberInput, Paper, PasswordInput, SegmentedControl, Select, Skeleton, Table, Text, TextInput, Title } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconCaretLeftFilled } from '@tabler/icons-react';

/* * */

import AccordionOverride from '@/themes/overrides/Accordion.module.css';
import AlertOverride from '@/themes/overrides/Alert.module.css';
import AnchorOverride from '@/themes/overrides/Anchor.module.css';
import ButtonOverride from '@/themes/overrides/Button.module.css';
import CheckboxOverride from '@/themes/overrides/Checkbox.module.css';
import CheckboxGroupOverride from '@/themes/overrides/CheckboxGroup.module.css';
import DateInputOverride from '@/themes/overrides/DateInput.module.css';
import FileInputOverride from '@/themes/overrides/FileInput.module.css';
import LoaderOverride from '@/themes/overrides/Loader.module.css';
import NotificationOverride from '@/themes/overrides/Notification.module.css';
import NumberInputOverride from '@/themes/overrides/NumberInput.module.css';
import PaperOverride from '@/themes/overrides/Paper.module.css';
import PasswordInputOverride from '@/themes/overrides/PasswordInput.module.css';
import SegmentedControlOverride from '@/themes/overrides/SegmentedControl.module.css';
import SelectOverride from '@/themes/overrides/Select.module.css';
import SkeletonOverride from '@/themes/overrides/Skeleton.module.css';
import TableOverride from '@/themes/overrides/Table.module.css';
import TextOverride from '@/themes/overrides/Text.module.css';
import TextInputOverride from '@/themes/overrides/TextInput.module.css';
import TitleOverride from '@/themes/overrides/Title.module.css';

/* * */

export default createTheme({
	//

	components: {

		Accordion: Accordion.extend({
			classNames: {
				...AccordionOverride,
			},
			defaultProps: {
				chevron: <IconCaretLeftFilled />,
			},
		}),

		Alert: Alert.extend({
			classNames: {
				...AlertOverride,
			},
			defaultProps: {
				variant: 'info',
			},
		}),

		Anchor: Anchor.extend({
			classNames: {
				...AnchorOverride,
			},
		}),

		Button: Button.extend({
			classNames: {
				...ButtonOverride,
			},
			defaultProps: {
				variant: 'primary',
			},
		}),

		Checkbox: Checkbox.extend({
			classNames: {
				...CheckboxOverride,
			},
		}),

		CheckboxGroup: Checkbox.Group.extend({
			classNames: {
				...CheckboxGroupOverride,
			},
		}),

		DateInput: DateInput.extend({
			classNames: {
				...DateInputOverride,
			},
		}),

		FileInput: FileInput.extend({
			classNames: {
				...FileInputOverride,
			},
		}),

		Loader: Loader.extend({
			classNames: {
				...LoaderOverride,
			},
		}),

		Notification: Notification.extend({
			classNames: {
				...NotificationOverride,
			},
		}),

		NumberInput: NumberInput.extend({
			classNames: {
				...NumberInputOverride,
			},
		}),

		Paper: Paper.extend({
			classNames: {
				...PaperOverride,
			},
		}),

		PasswordInput: PasswordInput.extend({
			classNames: {
				// PasswordInput is very similar to TextInput. The only difference is that
				// the 'input' field is wrapped by an outer div, with the class '.input'.
				// The actual 'input' field is named '.innerInput'. It is necessary to
				// map the 'input' field styles to the '.innerInput' class and apply reset styles
				// to the '.input' class, otherwise the input will appear to be rendered twice.
				innerInput: TextInputOverride.input,
				input: PasswordInputOverride.input,
				root: TextInputOverride.root,
				wrapper: TextInputOverride.wrapper,
			},
			defaultProps: {
				visibilityToggleIcon: VisibilityToggleIcon,
			},
		}),

		SegmentedControl: SegmentedControl.extend({
			classNames: {
				...SegmentedControlOverride,
			},
		}),

		Select: Select.extend({
			classNames: {
				...SelectOverride,
			},
		}),

		Skeleton: Skeleton.extend({
			classNames: {
				...SkeletonOverride,
			},
		}),

		Table: Table.extend({
			classNames: {
				...TableOverride,
			},
		}),

		Text: Text.extend({
			classNames: {
				...TextOverride,
			},
			defaultProps: {
				variant: 'primary',
			},
		}),

		TextInput: TextInput.extend({
			classNames: {
				...TextInputOverride,
			},
		}),

		Title: Title.extend({
			classNames: {
				...TitleOverride,
			},
		}),

	},

	fontFamily: 'lato',

	//
});
