'use client';

/* * */

import '@mantine/core/styles.layer.css';
import '@mantine/dates/styles.layer.css';
import '@mantine/notifications/styles.css';

/* * */

import '@/themes/_default/styles/reset.css';
import '@/themes/_default/styles/variables.css';
import '@/themes/_default/styles/wordpress.css';

/* * */

import { VisibilityToggleIcon } from '@/components/common/VisibilityToggleIcon';
import { combineClassNames } from '@/utils/combine-class-names';
import { Accordion, Alert, Anchor, Button, Checkbox, createTheme, Loader, Notification, Paper, PasswordInput, SegmentedControl, Select, Skeleton, Table, Text, TextInput, Title } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { IconCaretLeftFilled } from '@tabler/icons-react';

/* * */

import AccordionOverride from '@/themes/_default/overrides/Accordion.module.css';
import AlertOverride from '@/themes/_default/overrides/Alert.module.css';
import AnchorOverride from '@/themes/_default/overrides/Anchor.module.css';
import ButtonOverride from '@/themes/_default/overrides/Button.module.css';
import CheckboxOverride from '@/themes/_default/overrides/Checkbox.module.css';
import CheckboxGroupOverride from '@/themes/_default/overrides/CheckboxGroup.module.css';
import DateInputOverride from '@/themes/_default/overrides/DateInput.module.css';
import LoaderOverride from '@/themes/_default/overrides/Loader.module.css';
import NotificationOverride from '@/themes/_default/overrides/Notification.module.css';
import PaperOverride from '@/themes/_default/overrides/Paper.module.css';
import PasswordInputOverride from '@/themes/_default/overrides/PasswordInput.module.css';
import SegmentedControlOverride from '@/themes/_default/overrides/SegmentedControl.module.css';
import SelectOverride from '@/themes/_default/overrides/Select.module.css';
import SkeletonOverride from '@/themes/_default/overrides/Skeleton.module.css';
import TableOverride from '@/themes/_default/overrides/Table.module.css';
import TextOverride from '@/themes/_default/overrides/Text.module.css';
import TextInputOverride from '@/themes/_default/overrides/TextInput.module.css';
import TitleOverride from '@/themes/_default/overrides/Title.module.css';
import Link from 'next/link';

/* * */

export default createTheme({
	//

	components: {

		Accordion: Accordion.extend({
			classNames: () => {
				let defaultClasses = {
					chevron: AccordionOverride.chevron,
					content: AccordionOverride.content,
					control: AccordionOverride.control,
					icon: AccordionOverride.icon,
					item: AccordionOverride.item,
					label: AccordionOverride.label,
					root: AccordionOverride.root,
				};
				return defaultClasses;
			},
			defaultProps: {
				chevron: <IconCaretLeftFilled />,
			},
		}),

		Alert: Alert.extend({
			classNames: (_, props) => {
				let defaultClasses = {
					closeButton: AlertOverride.closeButton,
					icon: AlertOverride.icon,
					label: AlertOverride.label,
					message: AlertOverride.message,
					root: AlertOverride.root,
					title: AlertOverride.title,
				};
				if (props.variant === 'info') {
					defaultClasses = combineClassNames(defaultClasses, [AlertOverride.variantinfo]);
				}
				return defaultClasses;
			},
			defaultProps: {
				variant: 'info',
			},
		}),

		Anchor: Anchor.extend({
			classNames: () => {
				let defaultClasses = {
					root: AnchorOverride.root,
				};
				return defaultClasses;
			},
			defaultProps: {
				component: Link,
			},
		}),

		Button: Button.extend({
			classNames: (_, props) => {
				let defaultClasses = {
					inner: ButtonOverride.inner,
					label: ButtonOverride.label,
					root: ButtonOverride.root,
					section: ButtonOverride.section,
				};
				if (props.variant === 'primary') {
					defaultClasses = combineClassNames(defaultClasses, [ButtonOverride.variantPrimary]);
				}
				if (props.variant === 'secondary') {
					defaultClasses = combineClassNames(defaultClasses, [ButtonOverride.variantSecondary]);
				}
				if (props.variant === 'muted') {
					defaultClasses = combineClassNames(defaultClasses, [ButtonOverride.variantMuted]);
				}
				if (props.variant === 'contrast') {
					defaultClasses = combineClassNames(defaultClasses, [ButtonOverride.variantContrast]);
				}
				if (props.variant === 'link') {
					defaultClasses = combineClassNames(defaultClasses, [ButtonOverride.variantLink]);
				}
				return defaultClasses;
			},
			defaultProps: {
				variant: 'primary',
			},
		}),

		Checkbox: Checkbox.extend({
			classNames: (_, props) => {
				let defaultClasses = {
					description: CheckboxOverride.description,
					error: CheckboxOverride.error,
					inner: CheckboxOverride.inner,
					input: CheckboxOverride.input,
					label: CheckboxOverride.label,
					root: CheckboxOverride.root,
					wrapper: CheckboxOverride.wrapper,
				};
				if (props.variant === 'primary') {
					defaultClasses = combineClassNames(defaultClasses, [CheckboxOverride.variantPrimary]);
				}
				return defaultClasses;
			},
			defaultProps: {
				variant: 'primary',
			},
		}),

		CheckboxGroup: Checkbox.Group.extend({
			classNames: (_, props) => {
				let defaultClasses = {
					label: CheckboxGroupOverride.label,
				};
				if (props.variant === 'primary') {
					defaultClasses = combineClassNames(defaultClasses, [CheckboxGroupOverride.variantPrimary]);
				}
				return defaultClasses;
			},
			defaultProps: {
				variant: 'primary',
			},
		}),

		DateInput: DateInput.extend({
			classNames: (_, props) => {
				let defaultClasses = {
					description: DateInputOverride.description,
					error: DateInputOverride.error,
					input: DateInputOverride.input,
					label: DateInputOverride.label,
					root: DateInputOverride.root,
					section: DateInputOverride.section,
					wrapper: DateInputOverride.wrapper,
				};
				if (props.variant === 'primary') {
					defaultClasses = combineClassNames(defaultClasses, [DateInputOverride.variantPrimary]);
				}
				if (props.variant === 'contrast') {
					defaultClasses = combineClassNames(defaultClasses, [DateInputOverride.variantContrast]);
				}
				return defaultClasses;
			},
			defaultProps: {
				variant: 'primary',
			},
		}),

		Loader: Loader.extend({
			classNames: (_, props) => {
				let defaultClasses = {
					root: LoaderOverride.root,

				};
				if (props.variant === 'contrast') {
					defaultClasses = combineClassNames(defaultClasses, [LoaderOverride.variantContrast]);
				}
				return defaultClasses;
			},
		}),

		Notification: Notification.extend({
			classNames: () => {
				let defaultClasses = {
					body: NotificationOverride.body,
					description: NotificationOverride.description,
					icon: NotificationOverride.icon,
					loader: NotificationOverride.loader,
					root: NotificationOverride.root,
					title: NotificationOverride.title,
				};
				return defaultClasses;
			},
		}),

		Paper: Paper.extend({
			classNames: () => {
				let defaultClasses = {
					root: PaperOverride.root,
				};
				return defaultClasses;
			},
		}),

		PasswordInput: PasswordInput.extend({
			classNames: (_, props) => {
				let defaultClasses = {
					// PasswordInput is very similar to TextInput. The only difference is that
					// the 'input' field is wrapped by an outer div, with the class '.input'.
					// The actual 'input' field is named '.innerInput'. It is necessary to
					// map the 'input' field styles to the '.innerInput' class and apply reset styles
					// to the '.input' class, otherwise the input will appear to be rendered twice.
					description: TextInputOverride.description,
					error: TextInputOverride.error,
					innerInput: TextInputOverride.input,
					input: PasswordInputOverride.input,
					label: TextInputOverride.label,
					required: TextInputOverride.required,
					root: TextInputOverride.root,
					section: TextInputOverride.section,
					wrapper: TextInputOverride.wrapper,
				};
				if (props.variant === 'primary') {
					defaultClasses = combineClassNames(defaultClasses, [TextInputOverride.variantPrimary]);
				}
				return defaultClasses;
			},
			defaultProps: {
				variant: 'primary',
				visibilityToggleIcon: VisibilityToggleIcon,
			},
		}),

		SegmentedControl: SegmentedControl.extend({
			classNames: (_, props) => {
				let defaultClasses = {
					control: SegmentedControlOverride.control,
					indicator: SegmentedControlOverride.indicator,
					innerLabel: SegmentedControlOverride.innerLabel,
					label: SegmentedControlOverride.label,
					root: SegmentedControlOverride.root,
				};
				if (props.variant === 'white') {
					defaultClasses = combineClassNames(defaultClasses, [SegmentedControlOverride.variantWhite]);
				}
				return defaultClasses;
			},
		}),

		Select: Select.extend({
			classNames: (_, props) => {
				let defaultClasses = {
					description: SelectOverride.description,
					dropdown: SelectOverride.dropdown,
					error: SelectOverride.error,
					input: SelectOverride.input,
					label: SelectOverride.label,
					root: SelectOverride.root,
					section: SelectOverride.section,
					wrapper: SelectOverride.wrapper,
				};
				if (props.variant === 'primary') {
					defaultClasses = combineClassNames(defaultClasses, [SelectOverride.variantPrimary]);
				}
				return defaultClasses;
			},
			defaultProps: {
				variant: 'primary',
			},
		}),

		Skeleton: Skeleton.extend({
			classNames: () => {
				let defaultClasses = {
					root: SkeletonOverride.root,

				};
				return defaultClasses;
			},
		}),

		Table: Table.extend({
			classNames: () => {
				let defaultClasses = {
					table: TableOverride.table,
					th: TableOverride.th,
					thead: TableOverride.thead,
					tr: TableOverride.tr,
				};
				return defaultClasses;
			},
		}),

		Text: Text.extend({
			classNames: (_, props) => {
				let defaultClasses = {
					root: TextOverride.root,
				};
				if (props.variant === 'primary') {
					defaultClasses = combineClassNames(defaultClasses, [TextOverride.variantPrimary]);
				}
				if (props.variant === 'secondary') {
					defaultClasses = combineClassNames(defaultClasses, [TextOverride.variantSecondary]);
				}
				if (props.variant === 'overline') {
					defaultClasses = combineClassNames(defaultClasses, [TextOverride.variantOverline]);
				}
				if (props.variant === 'error') {
					defaultClasses = combineClassNames(defaultClasses, [TextOverride.variantError]);
				}
				if (props.size === 'md') {
					defaultClasses = combineClassNames(defaultClasses, [TextOverride.sizeMd]);
				}
				if (props.size === 'sm') {
					defaultClasses = combineClassNames(defaultClasses, [TextOverride.sizeSm]);
				}
				if (props.size === 'xs') {
					defaultClasses = combineClassNames(defaultClasses, [TextOverride.sizeXs]);
				}
				return defaultClasses;
			},
			defaultProps: {
				variant: 'primary',
			},
		}),

		TextInput: TextInput.extend({
			classNames: (_, props) => {
				let defaultClasses = {
					description: TextInputOverride.description,
					error: TextInputOverride.error,
					input: TextInputOverride.input,
					label: TextInputOverride.label,
					required: TextInputOverride.required,
					root: TextInputOverride.root,
					section: TextInputOverride.section,
					wrapper: TextInputOverride.wrapper,
				};
				if (props.variant === 'primary') {
					defaultClasses = combineClassNames(defaultClasses, [TextInputOverride.variantPrimary]);
				}
				if (props.variant === 'contrast') {
					defaultClasses = combineClassNames(defaultClasses, [TextInputOverride.variantContrast]);
				}
				return defaultClasses;
			},
			defaultProps: {
				variant: 'primary',
			},
		}),

		Title: Title.extend({
			classNames: (_, props) => {
				let defaultClasses = {
					root: TitleOverride.root,
				};
				if (props.order === 1) {
					defaultClasses = combineClassNames(defaultClasses, [TitleOverride.orderH1]);
				}
				if (props.order === 2) {
					defaultClasses = combineClassNames(defaultClasses, [TitleOverride.orderH2]);
				}
				if (props.order === 3) {
					defaultClasses = combineClassNames(defaultClasses, [TitleOverride.orderH3]);
				}
				if (props.order === 4) {
					defaultClasses = combineClassNames(defaultClasses, [TitleOverride.orderH4]);
				}
				if (props.size === 'sm') {
					defaultClasses = combineClassNames(defaultClasses, [TitleOverride.sizeSm]);
				}
				if (props.size === 'xs') {
					defaultClasses = combineClassNames(defaultClasses, [TitleOverride.sizeXs]);
				}
				return defaultClasses;
			},
		}),

	},

	fontFamily: 'lato',

	//
});
