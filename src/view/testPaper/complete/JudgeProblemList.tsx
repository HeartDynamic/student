import React, { FC, useContext, useState } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Value } from 'slate'

import { IStore } from '../../../store'
import Editor from '../../../components/EditorX'
import Knowledge from './Knowledge'
import FractionListA from './FractionListA'

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
`
const Package = styled.div`
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(31, 122, 171, 0.2);
    border-radius: 10px;
    border: 3px solid rgba(255, 255, 255, 0.8178);
    margin-top: 20px;
    margin-bottom: 20px;
`
const Wrap = styled.div`
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
    padding: 8px 12px;
    flex-grow: 1;
`
const RichTextWrap = styled.div`
    padding: 8px 0 8px 20px;
    font-size: 14px;
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
`
const AnswerWrap = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 60px;
`
const Answer = styled.div`
    min-height: 60px;
    line-height: 60px;
    padding-left: 8px;
    border: 1px solid #ccc;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(31, 122, 171, 0.2);
    border-radius: 10px;
    border: 3px solid rgba(255, 255, 255, 0.8);
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(7, 41, 121, 1);
`
const Solution = styled.div`
    background-color: rgba(216, 216, 216, 0.37);
    border-radius: 10px;
    border: 1px solid rgba(151, 151, 151, 0);
    margin-top: 20px;
`
const Analysis = styled.div`
    box-sizing: border-box;
    height: 34px;
    border-bottom: 1px solid #dfdfdf;
    font-size: 14px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    padding: 8px 0px 8px 20px;
`

const JudgeProblemsList: FC = props => {
    const { completeStore } = useContext<IStore>(MobXProviderContext)
    const [setFont] = useState([faTimes, faCheck])
    return useObserver(() => {
        return (
            <Container>
                <FractionListA></FractionListA>
                <Package>
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
                    <Wrap>
                        <AnswerWrap>
                            <Answer>
                                答案：
                                <FontAwesomeIcon icon={setFont[completeStore.testProblemDetailData.answer]} />
                            </Answer>
                            <Answer>
                                我的作答：
                                <FontAwesomeIcon icon={setFont[completeStore.testProblemDetailData.studentAnswer]} />
                            </Answer>
                        </AnswerWrap>
                    </Wrap>
                    <Wrap>
                        <Solution>
                            <Analysis>解析</Analysis>
                            <RichTextWrap>
                                <Editor
                                    value={Value.fromJSON(completeStore.testProblemDetailData.solution)}
                                    readonly
                                ></Editor>
                            </RichTextWrap>
                        </Solution>
                    </Wrap>
                </Package>
            </Container>
        )
    })
}

export default JudgeProblemsList
