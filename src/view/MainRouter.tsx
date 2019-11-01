import React, { FC, useEffect, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { Router, RouteComponentProps } from '@reach/router'

import { IStore } from '../store'

import Main from './main'
import Course from './course'
import Header from '../components/Header'

const Container = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 80px;
    background-color: #f9f9f9;
    position: relative;
`

const Content = styled(Router)`
    width: 1260px;
    height: 100%;
    margin: 0 auto;
`

const MainRouter: FC<RouteComponentProps> = () => {
    const { userStore } = useContext<IStore>(MobXProviderContext)
    useEffect(() => {
        userStore.getUserInfo()
    })
    return (
        <Container>
            <Header />
            <Content>
                <Main path='/'></Main>
                <Course path='/course'></Course>
            </Content>
        </Container>
    )
}

export default MainRouter
