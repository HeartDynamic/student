import React, { FC } from 'react'
import styled from '@emotion/styled'

const Container = styled.div`
    width: 250px;
    height: 800px;
    background-color: #fff;
    margin-right: 30px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 3px 13px 1px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Status: FC = () => {
    return <Container>status</Container>
}

export default Status
