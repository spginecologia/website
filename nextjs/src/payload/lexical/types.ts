import type { SerializedLexicalNode } from 'lexical';
import type { ReactNode } from 'react';

export interface ReactNodeConverter<T extends SerializedLexicalNode = SerializedLexicalNode> {
	converter: ({
		childIndex,
		converters,
		node,
		parent,
	}: {
		childIndex: number
		converters: ReactNodeConverter[]
		node: T
		parent: SerializedLexicalNodeWithParent
	}) => ReactNode
	nodeTypes: string[]
}

export type SerializedLexicalNodeWithParent = {
	parent?: SerializedLexicalNode
} & SerializedLexicalNode;
