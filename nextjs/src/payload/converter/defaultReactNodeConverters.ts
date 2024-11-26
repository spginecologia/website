import type { ReactNodeConverter } from '@/payload/lexical/types';

import { HeadingReactNodeConverter } from '@/payload/converter/reactnode/heading';
import { HorizontalRuleReactNodeConverter } from '@/payload/converter/reactnode/hr';
import { LinebreakReactNodeConverter } from '@/payload/converter/reactnode/linebreak';
import { LinkReactNodeConverter } from '@/payload/converter/reactnode/link';
import { ListItemReactNodeConverter, ListReactNodeConverter } from '@/payload/converter/reactnode/list';
import { ParagraphReactNodeConverter } from '@/payload/converter/reactnode/paragraph';
import { QuoteReactNodeConverter } from '@/payload/converter/reactnode/quote';
import { TableReactNodeConverter } from '@/payload/converter/reactnode/tables/table';
import { TableCellReactNodeConverter } from '@/payload/converter/reactnode/tables/tableCell';
import { TableRowReactNodeConverter } from '@/payload/converter/reactnode/tables/tableRow';
import { TextReactNodeConverter } from '@/payload/converter/reactnode/text';
import { UploadReactNodeConverter } from '@/payload/converter/reactnode/upload';

export const defaultReactNodeConverters: ReactNodeConverter<any>[] = [
	HeadingReactNodeConverter,
	HorizontalRuleReactNodeConverter,
	LinebreakReactNodeConverter,
	LinkReactNodeConverter,
	ListReactNodeConverter,
	ListItemReactNodeConverter,
	ParagraphReactNodeConverter,
	QuoteReactNodeConverter,
	TableReactNodeConverter,
	TableCellReactNodeConverter,
	TableRowReactNodeConverter,
	TextReactNodeConverter,
	UploadReactNodeConverter,
];
