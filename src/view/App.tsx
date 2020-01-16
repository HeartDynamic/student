import React, { FC } from 'react'
import styled from '@emotion/styled'
import { Router } from '@reach/router'

import MainRouter from './MainRouter'
import Answer from './testPaper/answer' //作答
import Submit from './testPaper/submit' //作答完成（老师未公布答案）
import Entry from './testPaper/entry' //去录入（老师公布答案）
import Complete from './testPaper/complete' //录入完成
import Practise from './practise' //每日一题/自主练习/模拟考试

const Container = styled(Router)`
    width: 100%;
    height: 100%;
`

const App: FC = () => {
    return (
        <Container>
            <Complete path='/complete/:id' />
            <Entry path='/entry/:id' />
            <Submit path='/submit/:id' />
            <Answer path='/answer/:id' />
            <Practise path='/practise/*' />
            <MainRouter path='/*' />
        </Container>
    )
}

export default App
