import React, { FC, useState } from 'react'
import styled from '@emotion/styled'
import { Link } from '@reach/router'
import { update } from 'ramda'

const Container = styled.div`
    height: 100%;
    display: flex;
`
const Line = styled.span<{ isActive: boolean }>`
    height: 8px;
    width: 80px;
    border-radius: 8px;
    position: absolute;
    bottom: 6px;
    transition: background-color 0.1s linear;
    background-color: ${props => (props.isActive ? '#00a6f3' : '#fff')};
`
const Text = styled.div<{ isActive: boolean }>`
    font-size: 20px;
    transition: color 0.1s linear;
    color: ${props => (props.isActive ? '#00a6f3' : '#777')};
`
const Item = styled(Link)`
    display: block;
    width: 80px;
    height: 80px;
    cursor: pointer;
    margin-left: 25px;
    margin-right: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`

const Nav: FC = () => {
    const [active, setActive] = useState([false, false, false, false])

    const isPartiallyActive = (isCurrent: boolean, index: number) => {
        if (!isCurrent) {
            active[index] && setActive(update(index, false, active))
            return false
        }
        !active[index] && setActive(update(index, true, active))
        return true
    }
    return (
        <Container>
            <Item to='/' getProps={({ isCurrent }) => isPartiallyActive(isCurrent, 0)}>
                <Text isActive={active[0]}>首页</Text>
                <Line isActive={active[0]} />
            </Item>
            <Item to='/course' getProps={({ isCurrent }) => isPartiallyActive(isCurrent, 1)}>
                <Text isActive={active[1]}>课程表</Text>
                <Line isActive={active[1]} />
            </Item>
            {/* <Item to='/volume' getProps={({ isCurrent }) => isPartiallyActive(isCurrent, 2)}>
                <Text isActive={active[2]}>做题记录</Text>
                <Line isActive={active[2]} />
            </Item>
            <Item to='/exercise/' getProps={({ isCurrent }) => isPartiallyActive(isCurrent, 3)}>
                <Text isActive={active[3]}>错题本</Text>
                <Line isActive={active[3]} />
            </Item> */}
        </Container>
    )
}

export default Nav
