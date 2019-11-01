import React, { FC, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { IStore } from '../../../store'

import PlanView from '../common/PlanView'
import Knowledge from './Knowledge'
import FractionListB from './FractionListB'

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
const Wrap = styled.div`
    padding: 10px;
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

const Topic = styled.div`
    width: 100%;
    display: flex;
    margin-top: 20px;
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
const RichTextWrap = styled.div`
    display: flex;
    align-items: center;
    padding: 8px;
    font-size: 14px;
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
`

const ItemIndex = styled.div`
    height: 1;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: #072979;
    border-right: 1px solid #f5f5f5;
    /* background-color: red; */
`

const AnswerSpan = styled.span`
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(7, 41, 121, 1);
`
const AnswerItem = styled.div`
    box-sizing: border-box;
    min-height: 60px;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(31, 122, 171, 0.2);
    border-radius: 4px;
    margin-top: 8px;
    margin-bottom: 8px;
    border-radius: 4px;
    font-size: 14px;
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
`
const Answer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 30px;
    padding: 0px 48px 20px 14px;
    font-size: 16px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(7, 41, 121, 1);
`
const SolutionWrap = styled.div`
    background-color: rgba(216, 216, 216, 0.37);
    border-radius: 10px;
    border: 1px solid rgba(151, 151, 151, 0);
    margin-bottom: 20px;
`
const Solution = styled.div`
    padding: 8px 0px 8px 20px;
    font-size: 14px;
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
`
const SolutionSpan = styled.div`
    box-sizing: border-box;
    height: 34px;
    border-bottom: 1px solid #dfdfdf;
    font-size: 14px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    padding: 8px 0px 8px 10px;
`

const FillingProblemList: FC = props => {
    const { completeStore } = useContext<IStore>(MobXProviderContext)
    return useObserver(() => {
        return (
            <Container>
                <FractionListB></FractionListB>
                <Package>
                    <Wrap>
                        <Knowledge />
                        <Topic>
                            <TagWrap>
                                <Index>{completeStore.testProblemDetailData.number}</Index>
                                <Fraction>{completeStore.testProblemDetailData.fraction} 分</Fraction>
                            </TagWrap>

                            <TopicWrap>
                                <PlanView data={completeStore.testProblemDetailData.topic} />
                            </TopicWrap>
                        </Topic>
                    </Wrap>
                    <Wrap>
                        <AnswerSpan>答案</AnswerSpan>
                        <Answer>
                            {completeStore.testProblemDetailData.answer.map((item: any, index: number) => (
                                <AnswerItem key={index}>
                                    <ItemIndex>{index + 1}</ItemIndex>
                                    <RichTextWrap>
                                        <PlanView data={item.value} />
                                    </RichTextWrap>
                                </AnswerItem>
                            ))}
                        </Answer>
                    </Wrap>
                    <Wrap>
                        <SolutionWrap>
                            <SolutionSpan>解析</SolutionSpan>
                            <Solution>
                                <PlanView data={completeStore.testProblemDetailData.solution} />
                            </Solution>
                        </SolutionWrap>
                    </Wrap>
                </Package>
                <Package>
                    <Wrap>
                        <AnswerSpan>我的答案</AnswerSpan>
                        <Answer>
                            {completeStore.testProblemDetailData.studentAnswer&&completeStore.testProblemDetailData.studentAnswer.map((item: any, index: number) => (
                                <AnswerItem key={index}>
                                    <ItemIndex>{index + 1}</ItemIndex>
                                    <RichTextWrap>
                                        <PlanView data={item.value} />
                                    </RichTextWrap>
                                </AnswerItem>
                            ))}
                        </Answer>
                    </Wrap>
                </Package>
            </Container>
        )
    })
}

export default FillingProblemList
