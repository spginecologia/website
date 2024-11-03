import config from '@payload-config'
import { defaultEditorConfig } from '@payloadcms/richtext-lexical';
import { createHeadlessEditor } from '@lexical/headless';
import { getEnabledNodes, sanitizeServerEditorConfig } from '@payloadcms/richtext-lexical';
import { $generateNodesFromDOM } from '@lexical/html';
import { $getRoot, $getSelection } from 'lexical';
import { JSDOM } from 'jsdom';

import categoriesMap from './data/categories-map.json'

export type LexicalNode = {
    root: {
        type: string;
        children: { [k: string]: unknown; type: string; version: number; }[];
        direction: "ltr" | "rtl" | null;
        format: "" | "left" | "start" | "center" | "right" | "end" | "justify";
        indent: number;
        version: number;
    }
}
/**
 * Converts an HTML string to a Lexical object.
 * @param {string} content - The string content to convert.
 * @returns {Promise<object>} - A promise resolving to the Lexical JSON object with a 'root' property.
 */
export async function convertStringToLexical(content: string): Promise<object> {
    const editor = createHeadlessEditor({
        nodes: getEnabledNodes({
            editorConfig: await sanitizeServerEditorConfig(defaultEditorConfig, await config),
        }),
    });

    return new Promise((resolve) => {
        editor.update(() => {
            // In a headless environment you can use a package such as JSDom to parse the HTML string.
            const dom = new JSDOM(content)

            // Once you have the DOM instance it's easy to generate LexicalNodes.
            const nodes = $generateNodesFromDOM(editor, dom.window.document)

            // Select the root
            $getRoot().select()

            // Insert them at a selection.
            const selection = $getSelection()

            if (selection) {
                selection.insertNodes(nodes)
            }
        }, { discrete: true })

        // Do this if you then want to get the editor JSON
        const editorJSON = editor.getEditorState().toJSON()

        // Clear Editor state
        editor.update(() => {
            const root = $getRoot();
            root.clear();

        }, { discrete: true });

        resolve(editorJSON);
    });
}

export function convertCategories(categories: number | number[]) {
    return Array.isArray(categories) ? categories.map((id: number) => categoriesMap[id.toString() as keyof typeof categoriesMap]) : [categoriesMap[categories.toString() as keyof typeof categoriesMap]]
}