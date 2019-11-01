import React, { FC, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { Value } from 'slate'

import { IStore } from '../../../store'
import Editor from '../../../components/EditorX'
import Knowledge from './Knowledge'
import FractionListC from './FractionListC'

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
`
const Package = styled.div`
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(31, 122, 171, 0.2);
    border-radius: 10px;
    border: 3px solid rgba(255, 255, 255, 0.8178);
    margin-bottom: 20px;
`
const Package1 = styled.div`
    background-color: rgba(216, 216, 216, 0.37);
    border-radius: 10px;
    margin-bottom: 20px;
`
const ProblemText = styled.div`
    box-sizing: border-box;
    height: 50px;
    line-height: 48px;
    border-bottom: 1px solid rgba(151, 151, 151, 0.3);
    padding-left: 10px;
    font-size: 18px;
    font-family: PingFangSC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
`
const Wrap = styled.div`
    width: 100%;
    min-height: 60px;
    box-sizing: border-box;
    padding: 10px;
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
    flex-grow: 1;
`

const Answer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 30px;
    padding: 0px 10px;
    font-size: 16px;
    font-family: PingFangSC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
`

const Solution = styled.div`
    padding: 0 10px;
    font-size: 14px;
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
`

const ShortAnswerProblemList: FC = props => {
    const { completeStore } = useContext<IStore>(MobXProviderContext)
    return useObserver(() => {
        return (
            <Container>
                <FractionListC></FractionListC>
                <Package>
                    <ProblemText>题目</ProblemText>
                    <Wrap>
                        <Knowledge />
                        <Topic>
                            <TagWrap>
                                <Index>{completeStore.testProblemDetailData.number}</Index>
                                <Fraction>{completeStore.testProblemDetailData.fraction} 分</Fraction>
                            </TagWrap>
                            <TopicWrap>
                                <Editor
                                    value={Value.fromJSON(completeStore.testProblemDetailData.topic)}
                                    readonly
                                ></Editor>
                            </TopicWrap>
                        </Topic>
                    </Wrap>
                </Package>
                <Package>
                    <ProblemText>我的作答</ProblemText>
                    <Wrap>
                        <Answer>
                            <Editor
                                value={Value.fromJSON(completeStore.testProblemDetailData.studentAnswer)}
                                readonly
                            ></Editor>
                        </Answer>
                    </Wrap>
                </Package>
                <Package>
                    <ProblemText>答案</ProblemText>
                    <Wrap>
                        <Answer>
                            <Editor
                                value={Value.fromJSON(completeStore.testProblemDetailData.answer)}
                                readonly
                            ></Editor>
                        </Answer>
                    </Wrap>
                </Package>
                <Package1>
                    <ProblemText>解析</ProblemText>
                    <Wrap>
                        <Solution>
                            <Editor
                                value={Value.fromJSON(completeStore.testProblemDetailData.solution)}
                                readonly
                            ></Editor>
                        </Solution>
                    </Wrap>
                </Package1>
            </Container>
        )
    })
}

export default ShortAnswerProblemList
