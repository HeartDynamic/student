/*
    每日一题
    自主练习
    模拟考试
*/
import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Router, RouteComponentProps } from '@reach/router'
import Daily from './Daily'
import Liberty from './Liberty'
import Simulation from './Simulation'

const Container = styled(Router)`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
`

const Practise: FC<RouteComponentProps> = () => {
    return (
        <Container>
            <Daily path='/'></Daily>
            <Liberty path='liberty'></Liberty>
            <Simulation path='simulation'></Simulation>
        </Container>
    )
}

export default Practise
