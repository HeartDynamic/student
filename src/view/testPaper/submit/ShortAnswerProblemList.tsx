import React, { FC, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { Value } from 'slate'

import Editor from '../../../components/EditorX'
import { IStore } from '../../../store'

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
`
const Package = styled.div`
    width: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(31, 122, 171, 0.2);
    border-radius: 10px;
    border: 3px solid rgba(255, 255, 255, 0.8178);
    margin-top: 20px;
`
const Package1 = styled.div`
    width: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(31, 122, 171, 0.2);
    border-radius: 10px;
    border: 3px solid rgba(255, 255, 255, 0.8178);
    margin-top: 20px;
    margin-bottom: 10px;
`

const ScrollbarWrap = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding-right: 30px;
    padding-left: 2px;
    &::-webkit-scrollbar-button {
        background-color: #fff;
    }
    &::-webkit-scrollbar {
        background-color: #fff;
        width: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgba(66, 88, 99, 0.4);
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: #ddd;
    }
`
const Wrap = styled.div`
    width: 100%;
    height: 100%;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 8px 12px 10px 12px;
`
const Topic = styled.div`
    width: 100%;
    display: flex;
    margin-top: 20px;
`

const TagWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 52px;
    height: 52px;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(31, 122, 171, 0.2);
    border-radius: 4px;
    opacity: 0.8178;
    margin-right: 10px;
`
const Index = styled.div`
    color: #072979;
    font-size: 20px;
`
const Fraction = styled.div`
    border-top: 1px solid #e2eef4;
    font-size: 12px;
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
`
const TopicWrap = styled.div`
    min-height: 60px;
    font-size: 16px;
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
    height: initial;
    padding: 8px 12px 8px 0;
    flex: 1;
`

const AnswerSpan = styled.span`
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(7, 41, 121, 1);
`

const Answer = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 20px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(7, 41, 121, 1);
`

const ShortAnswerProblemList: FC = props => {
    const { submitStore } = useContext<IStore>(MobXProviderContext)

    return useObserver(() => {
        return (
            <Container>
                <ScrollbarWrap>
                    <Package>
                        <Wrap>
                            <Topic>
                                <TagWrap>
                                    <Index>{submitStore.testProblemDetailData.number}</Index>
                                    <Fraction>{submitStore.testProblemDetailData.fraction} 分</Fraction>
                                </TagWrap>

                                <TopicWrap>
                                    <Editor
                                        value={Value.fromJSON(submitStore.testProblemDetailData.topic)}
                                        readonly
                                    ></Editor>
                                </TopicWrap>
                            </Topic>
                        </Wrap>
                    </Package>
                    <Package1>
                        <Wrap>
                            <AnswerSpan>我的作答</AnswerSpan>
                            <Answer>
                                <Editor value={submitStore.testProblemDetailData.studentAnswer} readonly></Editor>
                            </Answer>
                        </Wrap>
                    </Package1>
                </ScrollbarWrap>
            </Container>
        )
    })
}

export default ShortAnswerProblemList
