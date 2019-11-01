import React, { FC, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { Value } from 'slate'

import { IStore } from '../../../store'
import Editor from '../../../components/EditorX'
import OptionA from './OptionA'
import Knowledge from './Knowledge'

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: auto 152px;
    grid-column-gap: 20px;
`
const Wrap = styled.div`
    width: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(31, 122, 171, 0.2);
    border-radius: 10px;
    border: 3px solid rgba(255, 255, 255, 0.8178);
    box-sizing: border-box;
    padding: 8px 12px 30px 12px;
    margin-bottom: 20px;
`
const Block = styled.div`
    width: 100%;
    display: flex;
    margin-top: 20px;
`

const Left = styled.div`
    overflow: hidden;
`
const ScrollbarWrap = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding-right: 30px;
    padding-top: 20px;
    padding-left: 10px;
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
const Right = styled.div``
const Content = styled.div`
    flex: 1;
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
const RichTextWrap = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 8px 8px 20px;
    font-size: 14px;
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
`
const Option = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 60px;
`
const OptionItem = styled.div`
    box-sizing: border-box;
    min-height: 60px;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(31, 122, 171, 0.2);
    border-radius: 4px;
    /* border: 3px solid rgba(255, 255, 255, 0.8); */
    margin-top: 8px;
    margin-bottom: 8px;
    border-radius: 4px;
    font-size: 14px;
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
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

const myMap = ['A', 'B', 'C', 'D', 'E', 'F']

const ChoiceProblemList: FC = props => {
    const { entryStore } = useContext<IStore>(MobXProviderContext)
    return useObserver(() => {
        return (
            <Container>
                <Left>
                    <ScrollbarWrap>
                        <Wrap>
                            <Knowledge />
                            <Block>
                                <TagWrap>
                                    <Index>{entryStore.testProblemDetailData.number}</Index>
                                    <Fraction>{entryStore.testProblemDetailData.fraction} 分</Fraction>
                                </TagWrap>
                                <Content>
                                    <TopicWrap>
                                        <Editor
                                            value={Value.fromJSON(entryStore.testProblemDetailData.topic)}
                                            readonly
                                        ></Editor>
                                    </TopicWrap>
                                    <Option>
                                        {JSON.parse(entryStore.testProblemDetailData.option).map(
                                            (item: any, index: number) => (
                                                <OptionItem key={item.id}>
                                                    <ItemIndex>{myMap[index]}</ItemIndex>
                                                    <RichTextWrap>
                                                        <Editor value={Value.fromJSON(item.value)} readonly></Editor>
                                                    </RichTextWrap>
                                                </OptionItem>
                                            )
                                        )}
                                    </Option>
                                    <AnswerWrap>
                                        <Answer>答案：{entryStore.testProblemDetailData.answer}</Answer>
                                        <Answer>我的作答：{entryStore.testProblemDetailData.studentAnswer}</Answer>
                                    </AnswerWrap>
                                    <Solution>
                                        <Analysis>解析</Analysis>
                                        <RichTextWrap>
                                            <Editor
                                                value={Value.fromJSON(entryStore.testProblemDetailData.solution)}
                                                readonly
                                            ></Editor>
                                        </RichTextWrap>
                                    </Solution>
                                </Content>
                            </Block>
                        </Wrap>
                    </ScrollbarWrap>
                </Left>
                <Right>
                    <OptionA />
                </Right>
            </Container>
        )
    })
}

export default ChoiceProblemList
