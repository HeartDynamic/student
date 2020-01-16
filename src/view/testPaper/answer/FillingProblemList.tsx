import React, { FC, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { Value } from 'slate'

import { IStore } from '../../../store'
import OptionC from './OptionC'
import Editor from '../../../components/EditorX'
import Button from '../../../components/Button'
import Toast from '../../../components/Toast'

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    margin-top: 20px;
`
const Package = styled.div`
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 4px 11px 0px rgba(64, 158, 255, 0.1);
    border-radius: 4px;
    flex-grow: 1;
`
const Package1 = styled.div`
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 4px 11px 0px rgba(64, 158, 255, 0.1);
    border-radius: 4px;
    flex-grow: 1;
    margin-top: 20px;
`
const ScrollbarWrap = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding-right: 20px;
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
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 30px;
    padding: 0px 48px 20px 14px;
`

const FillingProblemList: FC = props => {
    const { answerStore } = useContext<IStore>(MobXProviderContext)

    //保存答案
    const handleClickSave = () => {
        answerStore.handleBlurAnswer()
        answerStore.addDoProblem()
        Toast.success('保存答案成功')
    }
    const starOption = {
        height: '40px',
        size: '16px',
        family: 'PingFangSC-Medium',
        weight: '500',
        bgColor: '#3E90F3',
        HbgColor: '#3f8cea',
    }

    return useObserver(() => {
        return (
            <Container>
                <ScrollbarWrap>
                    <Package>
                        <Wrap>
                            <Topic>
                                <TagWrap>
                                    <Index>{answerStore.testProblemDetailData.number}</Index>
                                    <Fraction>{answerStore.testProblemDetailData.fraction} 分</Fraction>
                                </TagWrap>
                                <TopicWrap>
                                    <Editor
                                        value={Value.fromJSON(answerStore.testProblemDetailData.topic)}
                                        readonly
                                    ></Editor>
                                </TopicWrap>
                            </Topic>
                        </Wrap>
                    </Package>
                    <Package1>
                        <Button onClick={handleClickSave} options={starOption}>
                            保存答案
                        </Button>
                        <Wrap>
                            <AnswerSpan>我的作答</AnswerSpan>
                            <Answer>
                                {answerStore.testProblemDetailData.studentAnswer.map((item: any, index: number) => (
                                    <OptionC data={{ ...item, index }} key={index}></OptionC>
                                ))}
                            </Answer>
                        </Wrap>
                    </Package1>
                </ScrollbarWrap>
            </Container>
        )
    })
}

export default FillingProblemList
