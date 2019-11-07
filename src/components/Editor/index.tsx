import React, { useRef, FC } from 'react'
import styled from '@emotion/styled'

import { Editor, RenderBlockProps, RenderMarkProps, RenderInlineProps, EventHook, OnChangeFn } from 'slate-react'
import { Block, SchemaProperties, Editor as SlateEditor, Value } from 'slate'

import Paragraph from './Paragraph'
import Image from './Image'
import Formula from './Formula'
// import Header from './Header'
// import Links from './Links'
// import Video from './Video'

const Container = styled.div<{ minHeight: string }>`
    width: 100%;
    min-height: ${props => props.minHeight || '500px'};
`
const MyA = styled.a`
    display: inline-block;
    height: 20px;
    line-height: 20px;
    color: #3a93df;
    text-align: center;
    margin: 0 8px;
`

const schema: SchemaProperties = {
    document: {
        last: { type: 'paragraph' },
        normalize: (editor, { code, node, child }) => {
            switch (code) {
                case 'last_child_type_invalid': {
                    const paragraph = Block.create('paragraph')
                    return editor.insertNodeByKey(node.key, node.nodes.size, paragraph)
                }
            }
        },
    },
    blocks: {
        image: {
            isVoid: true,
        },
        formula: {
            isVoid: true,
        },
        video: {
            isVoid: true,
        },
    },
}

interface IProps {
    minHeight?: string
    showVacancy?: any
    value: Value
    onChange: OnChangeFn
    onBlur?(): void
}
const MyEditor: FC<IProps> = props => {
    const editorRef = useRef(null)
    const renderMark = (props: RenderMarkProps, editor: SlateEditor, next: () => any) => {
        const { children, mark, attributes } = props
        switch (mark.type) {
            case 'bold':
                return <strong {...attributes}>{children}</strong>
            case 'italic':
                return <em {...attributes}>{children}</em>
            case 'underlined':
                return <u {...attributes}>{children}</u>
            default:
                return next()
        }
    }
    const renderBlock = (data: RenderBlockProps, editor: SlateEditor, next: () => any) => {
        switch (data.node.type) {
            case 'paragraph':
                return (
                    <Paragraph {...data} showVacancy={props.showVacancy}>
                        {data.children}
                    </Paragraph>
                )
            case 'image':
                return (
                    <Image
                        {...data}
                        url={data.node.data.get('url')}
                        height={data.node.data.get('height')}
                        align={data.node.data.get('align')}
                    />
                )
            case 'formula':
                return <Formula {...data} text={data.node.data.get('text')} />
            // case 'video':
            //     return <Video {...data} url={data.node.data.get('url')} />
            default:
                return next()
        }
    }
    const renderInline = (data: RenderInlineProps, editor: SlateEditor, next: () => any) => {
        switch (data.node.type) {
            case 'link': {
                return <MyA {...data} href={data.node.data.get('href')} />
            }
            default: {
                return next()
            }
        }
    }

    const handleKeyDown: EventHook = (event: any, editor, next) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            editor.insertBlock('paragraph')
            return
        } else if (event.key === 'Backspace') {
            if (editor.value.previousBlock === null && !editor.value.startText.text) {
                event.preventDefault()
                editor.moveFocusToStartOfNextBlock()
                editor.deleteBackward()
                return
            }
        }
        return next()
    }
    const handleBlur: EventHook = (event: any, editor, next) => {
        event.preventDefault()
        editor.moveFocusToStartOfNextBlock()
        props.onBlur && props.onBlur()
        return next()
    }
    return (
        <Container minHeight={props.minHeight + ''}>
            <Editor
                value={props.value}
                onChange={props.onChange}
                // onBlur={handleBlur}
                renderBlock={renderBlock}
                renderMark={renderMark}
                renderInline={renderInline}
                schema={schema}
                ref={editorRef}
                // onKeyDown={handleKeyDown}
            />
        </Container>
    )
}

export default MyEditor
