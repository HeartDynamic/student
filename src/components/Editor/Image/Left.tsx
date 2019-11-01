import React, { FC } from 'react'
import styled from '@emotion/styled'

const Wrap = styled.div`
    height: 100%;
    width: 12px;
    position: absolute;
    left: -7px;
`
const Line = styled.div`
    width: 3px;
    height: 100%;
    background-color: #0085ba;
    left: 6px;
    position: absolute;
    border-radius: 2px;
`
const Dot = styled.div`
    position: absolute;
    top: 50%;
    margin-top: -4px;
    height: 11px;
    width: 11px;
    border-radius: 50%;
    background-color: #0085ba;
    border: 2px solid #fff;
`

const Left: FC = () => (
    <Wrap>
        <Line />
        <Dot />
    </Wrap>
)

export default Left
