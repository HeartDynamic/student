import React, { FC, useState } from 'react'
import styled from '@emotion/styled'
import { navigate } from '@reach/router'

import book1 from '../../images/main-book1.png'
// import book2 from '../../images/main-book2.png'
// import book3 from '../../images/main-book3.png'

const Container = styled.ul`
    box-sizing: border-box;
    width: 100%;
`

const Li = styled.li<{ bimg: string }>`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 258px;
    height: 60px;
    margin-bottom: 20px;
    box-shadow: 0px 4px 11px 0px rgba(64, 158, 255, 0.1);
    border-radius: 4px;
    background: ${props => `url(${props.bimg}) no-repeat`};
    cursor: pointer;
`
const Name = styled.span`
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(1, 86, 145, 1);
    padding-right: 20px;
`

const Practice: FC = () => {
    const [typeArr] = useState([
        { id: 1, img: book1, name: '每日一题', link: '/practise' },
        // { id: 2, img: book2, name: '自主练习', link: '/practise/liberty' },
        // { id: 3, img: book3, name: '模拟考试', link: '/practise/simulation' },
    ])

    const handleClickLink = (link: string) => {
        navigate(link)
    }
    return (
        <Container>
            {typeArr.map(item => (
                <Li key={item.id} bimg={item.img} title={'进入' + item.name} onClick={() => handleClickLink(item.link)}>
                    <Name>{item.name}</Name>
                </Li>
            ))}
        </Container>
    )
}

export default Practice
