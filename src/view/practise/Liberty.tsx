import React, { FC } from 'react'
import styled from '@emotion/styled'
import { RouteComponentProps } from '@reach/router'

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
`

const Liberty: FC<RouteComponentProps> = () => {
    return <Container>自主</Container>
}

export default Liberty
