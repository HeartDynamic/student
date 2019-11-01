import React, { FC } from 'react'
import styled from '@emotion/styled'
import { RenderInlineProps } from 'slate-react'

const MyA = styled.a`
    display: inline-block;
    width: 60px;
    height: 20px;
    line-height: 20px;
    border-bottom: 1px solid #3a93df;
    color: #fff;
    margin: 0 8px;
`

const Links: FC<RenderInlineProps> = props => {
    if (props.node && props.node.text === '') {
        return null
    }
    return <MyA href={props.node.data.get('href')} />
}

export default Links
