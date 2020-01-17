import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Router } from '@reach/router'

import MainRouter from './MainRouter'
import Answer from './testPaper/answer' //作答
import Submit from './testPaper/submit' //作答完成（老师未公布答案）
import Entry from './testPaper/entry' //去录入（老师公布答案）
import Complete from './testPaper/complete' //录入完成
import Practise from './practise' //每日一题/自主练习/模拟考试
import PrintAnswer from './Print/Answer' //打印
import PrintEntry from './Print/Entry' //打印
import PasswordReset from '../components/Header/PasswordReset' //修改密码

const Container = styled(Router)`
    width: 100%;
    height: 100%;
`

const App: FC = () => {
    return (
        <Container>
            <Complete path='/complete/:id' />
            <Entry path='/entry/:id' />
            <PrintEntry path='entry/print/:id' />
            <Submit path='/submit/:id' />
            <Answer path='/answer/:id' />
            <PrintAnswer path='answer/print/:id' />
            <Practise path='/practise/*' />
            <PasswordReset path='/password-reset' />
            <MainRouter path='/*' />
        </Container>
    )
}

export default App
