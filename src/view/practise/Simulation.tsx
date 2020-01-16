import React, { FC } from 'react'
import styled from '@emotion/styled'
import { RouteComponentProps } from '@reach/router'

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
`

const Simulation: FC<RouteComponentProps> = () => {
    return <Container>模拟</Container>
}

export default Simulation
