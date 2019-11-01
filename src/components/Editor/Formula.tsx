import React, { useState, useEffect, FC } from 'react'
import { RenderBlockProps } from 'slate-react'
import styled from '@emotion/styled'
import TeX from '@matejmazur/react-katex'

const Container = styled.div<{ showBorder: boolean }>`
    outline: none;
    border: 1px solid ${props => (props.showBorder ? 'rgba(66, 88, 99, 0.4)' : 'transparent')};
`

interface IProps {
    text: string
}

const Formula: FC<RenderBlockProps & IProps> = props => {
    const [showBorder, setShowBorder] = useState(false)
    useEffect(() => {
        if (props.isFocused) {
            setShowBorder(true)
        } else {
            setShowBorder(false)
        }
    }, [props.isFocused])
    const handle = (errorCode: any, errorMsg: any, token: any) => {
        if (errorCode === 'unicodeTextInMathMode') {
            return 'ignore'
        }
        return 'warn'
    }
    return (
        <Container showBorder={showBorder}>
            <TeX block settings={{ macros: { '*': `\\cdot` }, strict: handle }}>
                {props.text}
            </TeX>
        </Container>
    )
}

export default Formula
