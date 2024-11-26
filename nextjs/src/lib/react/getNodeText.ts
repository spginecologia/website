import { ReactElement, ReactNode } from 'react';

export const getNodeText = (node: ReactNode): string | undefined => {
	if (node === null || node === undefined) return '';

	switch (typeof node) {
		case 'boolean':
		case 'number':
		case 'string':
			return node.toString();
		case 'object':
			if (node instanceof Array) {
				return node.map(getNodeText).join('');
			}

			if ('props' in node) {
				const element = node as ReactElement<{ children?: ReactNode }>;
				const props = element.props;
				return getNodeText(props.children);
			}
			break;
		default:
			console.warn('Unresolved `node` of type:', typeof node, node);
			return undefined;
	}
};
