import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Value, Document, Block } from 'slate'

interface IImgWrap {
    height: string
    align: string
}

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 1;
`
const Paragraph = styled.div`
    line-height: 40px;
`
const ImgWrap = styled.div<IImgWrap>`
    height: ${props => (props.height === '0px' ? '100%' : props.height)};
    text-align: ${props => props.align};
`

const Inline = styled.span`
    box-sizing: border-box;
    display: inline-block;
    width: 56px;
    height: 36px;
    border-radius: 4px;
    font-size: 18px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(7, 41, 121, 1);
    border: 2px solid rgba(7, 41, 121, 1);
    text-align: center;
    line-height: 32px;
    margin: 0 6px;
`

interface IProps {
    data: Value
}

const PlanView: FC<IProps> = props => {
    let idx = 0
    const renderParagraph = (block: Block, index: number | undefined) => (
        <Paragraph key={index}>
            {block.nodes.map((v, i) => {
                if (v && v.object === 'text') {
                    return v.text
                } else if (v && v.object === 'inline') {
                    idx++
                    return <Inline key={idx}>{idx}</Inline>
                }
                return null
            })}
        </Paragraph>
    )
    const renderImage = (block: Block, index: number | undefined) => {
        return (
            <ImgWrap key={index} height={block.data.height + 'px'} align={block.data.align}>
                <img src={block.data.url} alt='图片' />
            </ImgWrap>
        )
    }

    const renderDocument = (document: Document) =>
        document &&
        document.nodes.map((v, i) => {
            if (v && v.object === 'block') {
                if (v.type === 'paragraph') {
                    return renderParagraph(v, i)
                } else if (v.type === 'image') {
                    return renderImage(v, i)
                }
                return null
            }
            return null
        })

    return <Container>{props.data && renderDocument(props.data.document)}</Container>
}

export default PlanView
