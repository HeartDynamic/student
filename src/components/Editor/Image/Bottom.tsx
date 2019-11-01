import React, { FC } from 'react'
import styled from '@emotion/styled'

const Wrap = styled.div`
    width: 100%;
    height: 12px;
    position: absolute;
    bottom: -4px;
`
const Line = styled.div`
    height: 3px;
    width: 100%;
    background-color: #0085ba;
    bottom: 3px;
    position: absolute;
    border-radius: 2px;
`
const Dot = styled.div`
    position: absolute;
    left: 50%;
    margin-left: -4px;
    height: 11px;
    width: 11px;
    border-radius: 50%;
    background-color: #0085ba;
    border: 2px solid #fff;
`

const Bottom: FC = () => (
    <Wrap>
        <Line />
        <Dot />
    </Wrap>
)

export default Bottom
