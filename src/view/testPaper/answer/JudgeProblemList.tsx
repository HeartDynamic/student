import React, { FC, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { Value } from 'slate'

import { IStore } from '../../../store'
import Editor from '../../../components/EditorX'
import OptionB from './OptionB'

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: flex;
    margin-top: 20px;
`

const Left = styled.div`
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 4px 11px 0px rgba(64, 158, 255, 0.1);
    border-radius: 4px;
    flex-grow: 1;
    padding-right: 10px;
`
const ScrollbarWrap = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding-right: 30px;
    padding-left: 20px;
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
`
const Topic = styled.div`
    width: 100%;
    display: flex;
    margin-top: 20px;
`
const Right = styled.div`
    width: 102px;
    margin-left: 20px;
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
    flex: 1;
`

const JudgeProblemsList: FC = props => {
    const { answerStore } = useContext<IStore>(MobXProviderContext)
    return useObserver(() => {
        return (
            <Container>
                <Left>
                    <ScrollbarWrap>
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
                    </ScrollbarWrap>
                </Left>
                <Right>
                    <OptionB />
                </Right>
            </Container>
        )
    })
}

export default JudgeProblemsList
