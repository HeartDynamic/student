import React, { FC } from 'react'
import styled from '@emotion/styled'
import { RouteComponentProps } from '@reach/router'

import DynamicList from './DynamicList'
import Pending from './Pending'
import Practice from './Practice'
import BitmapLeft from '../../images/main-bitmap1.png'
import BitmapRight from '../../images/main-bitmap2.png'

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    padding: 36px;
`

const MyLeft = styled.div`
    width: 258px;
    /* height: 100%;
    box-shadow: 0px 8px 10px 0px rgba(222, 129, 129, 0.16);
    border-radius: 8px;
    background-color: #fff; */
`
const MyBitmapLeftWrap = styled.div`
    width: 100%;
`
const Bitmap = styled.div`
    width: 100%;
    height: 146px;
    background: url(${BitmapLeft}) no-repeat;
    text-align: center;
`
const MyBitmapRightWrap = styled.div`
    width: 100%;
    height: 126px;
    background: url(${BitmapRight}) no-repeat;
    text-align: center;
`
const MyAmid = styled.div`
    flex: 1;
    height: 100%;
    box-shadow: 0px 8px 7px 0px rgba(253, 61, 131, 0.13);
    border-radius: 10px;
    margin: 0 50px;
    background-color: #fff;
`
const MyAmidWrap = styled.div`
    box-sizing: border-box;
    padding: 20px 16px 20px 66px;
    height: 100%;
`
const MyTitle = styled.span`
    font-size: 20px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
`
const MyTitle1 = styled.span`
    font-size: 20px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    position: relative;
    top: 20px;
`
const MyTitleLeft = styled(MyTitle1)``
const MyTitleRight = styled(MyTitle1)``

const MyRight = styled.div`
    width: 320px;
    height: 100%;
    box-shadow: 0px 8px 7px 0px rgba(112, 142, 251, 0.22);
    border-radius: 10px;
    background-color: #fff;
    box-sizing: border-box;
`

const Main: FC<RouteComponentProps> = () => {
    return (
        <Container>
            <MyLeft>
                <MyBitmapLeftWrap>
                    <Bitmap>
                        <MyTitleLeft>掌握程度</MyTitleLeft>
                    </Bitmap>
                </MyBitmapLeftWrap>
                <Practice></Practice>
            </MyLeft>
            <MyAmid>
                <MyAmidWrap>
                    <MyTitle>最新动态</MyTitle>
                    <DynamicList />
                </MyAmidWrap>
            </MyAmid>
            <MyRight>
                <MyBitmapRightWrap>
                    <MyTitleRight>待完成任务列表</MyTitleRight>
                </MyBitmapRightWrap>
                <Pending />
            </MyRight>
        </Container>
    )
}

export default Main
