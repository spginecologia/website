import type { SerializedHorizontalRuleNode } from '@payloadcms/richtext-lexical';

import { ReactNodeConverter } from '@/payload/lexical/types';

export const HorizontalRuleReactNodeConverter: ReactNodeConverter<SerializedHorizontalRuleNode> = {
	converter() {
		return <hr />;
	},
	nodeTypes: ['horizontalrule'],
};
