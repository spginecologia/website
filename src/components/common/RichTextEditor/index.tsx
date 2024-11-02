'use client'

import React from 'react'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary'
import ToolbarPlugin from './toolbar'

interface RichTextEditorProps {
  placeholder: string
  onChange: (value: any) => void
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ placeholder, onChange }) => {
  return (
    <LexicalComposer
      initialConfig={{
        namespace: 'RichTextEditor',
        onError: (error) => {
          console.error(error)
        },
      }}
    >
      <ToolbarPlugin />
      <RichTextPlugin
        contentEditable={
          <ContentEditable
            className="editor-input"
            aria-placeholder={placeholder}
            onChange={(value) => {
              console.log(value)
              onChange(value)
            }}
            placeholder={<div className="editor-placeholder">{placeholder}</div>}
          />
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
      <AutoFocusPlugin />
    </LexicalComposer>
  )
}

export default RichTextEditor
