import React, { FC, useState } from 'react'
import styled from '@emotion/styled'
// eslint-disable-next-line
import { RouteComponentProps, Link } from '@reach/router'
import { update } from 'ramda'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply } from '@fortawesome/free-solid-svg-icons'

// import Plan from './Plan'
// import Preparation from './Preparation'
// import Preview from './Preview'
// import ClassTest from './ClassTest'
// import Task from './Task'
// import Examination from './Examination'

interface IParams {
    id: string
}

const Container = styled.div`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 20px;
    padding-bottom: 20px;
`
const Wrap = styled.div`
    width: 1250px;
    height: 100%;
    background-color: #fff;
    margin: 0 auto;
    box-shadow: rgba(16, 36, 94, 0.4) 0px 2px 6px 0px;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 20px;
`
const TabWrap = styled.div`
    width: 100%;
    height: 50px;
    position: relative;
`
const Line = styled.div`
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: #eee;
    bottom: 0;
    z-index: 9;
`
const ItemWrap = styled.div`
    position: absolute;
    z-index: 10;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`
const TabItem = styled(Link)`
    display: block;
    position: relative;
    overflow: hidden;
    padding-left: 20px;
    padding-right: 20px;
    margin-right: 20px;
`
const Item = styled.div<{ isActive: boolean }>`
    position: relative;
    border-radius: 20px 20px 0;
    padding-left: 20px;
    padding-right: 20px;
    line-height: 48px;
    color: ${props => (props.isActive ? '#fff' : '#666')};
    background-color: ${props => (props.isActive ? '#00a6f3' : '#eee')};
    box-shadow: 20px 20px 0 0 ${props => (props.isActive ? '#00a6f3' : '#eee')},
        -20px 20px 0 0 ${props => (props.isActive ? '#00a6f3' : '#eee')};
    transition: all 0.1s linear;
    &:before {
        content: '';
        position: absolute;
        left: -20px;
        bottom: 0;
        width: 20px;
        height: 50px;
        background: #fff;
        border-radius: 0 0 20px 0;
    }
    &:after {
        content: '';
        position: absolute;
        right: -20px;
        bottom: 0;
        width: 20px;
        height: 50px;
        background: #fff;
        border-radius: 0 0 0 20px;
    }
`
const Back = styled(Link)`
    position: absolute;
    color: #666;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background-color: #fff;
    top: 50%;
    margin-top: -20px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 20;
    transition: all 0.1s linear;
    &:hover {
        background-color: #eee;
        color: #00a6f3;
    }
`

const Course: FC<RouteComponentProps<IParams>> = props => {
    const [active, setActive] = useState([false, false, false, false, false, false])
    // const checkActive = (match: match, index: number) => {
    //     if (!match) {
    //         active[index] && setActive(update(index, false, active))
    //         return false
    //     }
    //     !active[index] && setActive(update(index, true, active))
    //     return true
    // }
    return (
        <Container>
            <Wrap>
                <TabWrap>
                    <Back title='返回首页' to='/'>
                        <FontAwesomeIcon icon={faReply} />
                    </Back>
                    <Line />
                    {/* <ItemWrap>
                        <TabItem
                            to={`/correction/${props.match.params.id}`}
                            exact
                            isActive={(match: match) => checkActive(match, 0)}
                        >
                            <Item isActive={active[0]}>教案</Item>
                        </TabItem>
                        <TabItem
                            to={`/correction/${props.match.params.id}/preparation`}
                            isActive={(match: match) => checkActive(match, 1)}
                        >
                            <Item isActive={active[1]}>课前准备</Item>
                        </TabItem>
                        <TabItem
                            to={`/correction/${props.match.params.id}/preview`}
                            isActive={(match: match) => checkActive(match, 2)}
                        >
                            <Item isActive={active[2]}>预习</Item>
                        </TabItem>
                        <TabItem
                            to={`/correction/${props.match.params.id}/classTest`}
                            isActive={(match: match) => checkActive(match, 3)}
                        >
                            <Item isActive={active[3]}>随堂测</Item>
                        </TabItem>
                        <TabItem
                            to={`/correction/${props.match.params.id}/task`}
                            isActive={(match: match) => checkActive(match, 4)}
                        >
                            <Item isActive={active[4]}>作业</Item>
                        </TabItem>
                        <TabItem
                            to={`/correction/${props.match.params.id}/examination`}
                            isActive={(match: match) => checkActive(match, 5)}
                        >
                            <Item isActive={active[5]}>测试</Item>
                        </TabItem>
                    </ItemWrap> */}
                </TabWrap>
                {/* <Switch> */}
                {/* <Route path='/course/:courseId/preparation' component={Preparation} />
                    <Route path='/course/:courseId/preview' component={Preview} />
                    <Route path='/course/:courseId/classTest' component={ClassTest} />
                    <Route path='/course/:courseId/task' component={Task} />
                    <Route path='/course/:courseId/examination' component={Examination} />
                    <Route path='/course/:courseId' component={Plan} /> */}
                {/* </Switch> */}
            </Wrap>
        </Container>
    )
}

export default Course
