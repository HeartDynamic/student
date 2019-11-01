import React, { FC } from 'react'
import styled from '@emotion/styled'

import Right from './Right'
import Nav from './Nav'

import logo from './logo.png'

const Container = styled.div`
    top: 0;
    width: 100%;
    height: 80px;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 6px 9px 0px;
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Logo = styled.div`
    height: 64px;
    width: 174px;
    margin-left: 20px;
    background-image: url(${logo});
    background-size: 100% 100%;
`

const Header: FC = () => {
    return (
        <Container>
            <Logo />
            <Nav />
            <Right />
        </Container>
    )
}

export default Header
