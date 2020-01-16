import React, { FC, useEffect, useContext, useState } from 'react'
import styled from '@emotion/styled'
import { RouteComponentProps, navigate } from '@reach/router'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { Value } from 'slate'
import { FaCheck, FaTimes } from 'react-icons/fa'

import { IStore } from '../../store'
import Editor from '../../components/EditorX'
import Button from '../../components/Button'
import Knowledge from '../../components/Knowledge'
import OptionA from './OptionA'
import OptionB from './OptionB'

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background-color: #c4ebf2;
    padding: 20px 0;
`

const Package = styled.div`
    width: 1260px;
    height: 100%;
    display: flex;
    margin: 0 auto;
`
const Left = styled.div`
    background-color: rgba(255, 255, 255);
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

const Right = styled.div`
    width: 102px;
    margin-left: 20px;
`

const ButtonWrap = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`

const TopicWrap = styled.div`
    padding-top: 20px;
    min-height: 60px;
    font-size: 16px;
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
    height: initial;
    flex: 1;
`

const OptionWrap = styled.div`
    width: 100%;
    box-sizing: border-box;
    margin-bottom: 20px;
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
`
const AnswerItem = styled.div`
    flex: 1;
    box-sizing: border-box;
    min-height: 60px;
    background-color: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(42, 71, 139, 0.2);
    border-radius: 4px;
    font-size: 14px;
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
    border-radius: 4px;
`
const AnswerWrap = styled.div<{ setMargin: boolean }>`
    display: flex;
    margin-top: 20px;
    & ${AnswerItem}:first-of-type {
        margin-right: ${props => (props.setMargin ? '60px' : '')};
    }
`
const ItemCommon = styled.div`
    height: 1;
    width: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: rgba(7, 41, 121, 1);
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    border-right: 1px solid #f5f5f5;
`
const ItemName = styled(ItemCommon)`
    text-align: center;
    font-size: 16px;
`

const AnswerRichText = styled.div`
    display: flex;
    align-items: center;
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(7, 41, 121, 1);
    margin: 0 10px;
`
const KnowledgeWrap = styled.div`
    display: flex;
    align-items: center;
`
const TypeNumber = styled.span`
    box-sizing: border-box;
    font-size: 14px;
    font-family: PingFangSC-Light, PingFang SC;
    font-weight: 300;
    color: rgba(237, 73, 126, 1);
    height: 36px;
    line-height: 34px;
    background-color: rgba(255, 246, 244, 1);
    border-radius: 4px;
    border: 1px solid rgba(237, 73, 126, 1);
    padding: 0 10px;
    margin-right: 8px;
    margin-bottom: 6px;
`
const SolutionWrap = styled.div`
    background-color: rgba(216, 216, 216, 0.37);
    border-radius: 4px;
    border: 1px solid rgba(151, 151, 151, 0);
    margin-top: 20px;
`
const Analysis = styled.div`
    box-sizing: border-box;
    border-bottom: 1px solid #dfdfdf;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    padding: 8px 0px 8px 20px;
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
const myMap = ['A', 'B', 'C', 'D', 'E', 'F', 'I', 'J', 'K']
const Daily: FC<RouteComponentProps> = () => {
    const { practiseStore } = useContext<IStore>(MobXProviderContext)
    const [typeArr] = useState(['单', '多', '判', '填', '解'])

    useEffect(() => {
        practiseStore.getDailyProblem()
        // eslint-disable-next-line
    }, [])

    //提交
    const handleClickSave = () => {
        let studentAnswer = ''
        if (practiseStore.dailyProblem.type === 3) {
            studentAnswer = practiseStore.dailyProblem.studentAnswer
        } else {
            let answer: string[] = []
            practiseStore.dailyProblem.option.map((t: any, i: number) => {
                if (t.isSelected) {
                    answer.push(myMap[i])
                }
                return t
            })
            studentAnswer = answer.join(',')
        }
        practiseStore.postDailyProblem({
            id: practiseStore.dailyProblem.id,
            studentAnswer: studentAnswer,
        })
    }

    const handleClickLink = () => {
        navigate('/')
    }

    return useObserver(() => {
        return (
            <Container>
                <Package>
                    <Left>
                        <ScrollbarWrap>
                            <TopicWrap>
                                <Editor value={Value.fromJSON(practiseStore.dailyProblem.topic)} readonly></Editor>
                            </TopicWrap>

                            {practiseStore.dailyProblem.type !== 3 && (
                                <OptionWrap>
                                    <Option>
                                        {practiseStore.dailyProblem.option.map((item: any, index: number) => (
                                            <OptionItem key={item.id}>
                                                <ItemIndex>{myMap[index]}</ItemIndex>
                                                <RichTextWrap>
                                                    <Editor value={Value.fromJSON(item.value)} readonly></Editor>
                                                </RichTextWrap>
                                            </OptionItem>
                                        ))}
                                    </Option>
                                </OptionWrap>
                            )}
                            {practiseStore.dailyProblem.solution && (
                                <>
                                    <KnowledgeWrap>
                                        <TypeNumber>
                                            {typeArr[practiseStore.dailyProblem.type - 1]}#
                                            {practiseStore.dailyProblem.id}
                                        </TypeNumber>
                                        {practiseStore.dailyProblem.loreList.map((item, index) => (
                                            <Knowledge key={item.id} data={{ ...item, index }}></Knowledge>
                                        ))}
                                    </KnowledgeWrap>
                                    {practiseStore.dailyProblem.type === 3 ? (
                                        <AnswerWrap setMargin={practiseStore.dailyProblem.studentAnswer}>
                                            <AnswerItem>
                                                <ItemName>答案</ItemName>
                                                <AnswerRichText>
                                                    {practiseStore.dailyProblem.answer === '1' ? (
                                                        <FaCheck></FaCheck>
                                                    ) : (
                                                        <FaTimes></FaTimes>
                                                    )}
                                                </AnswerRichText>
                                            </AnswerItem>
                                            {practiseStore.dailyProblem.studentAnswer && (
                                                <AnswerItem>
                                                    <ItemName>学生作答</ItemName>
                                                    <AnswerRichText>
                                                        {practiseStore.dailyProblem.studentAnswer === '1' ? (
                                                            <FaCheck></FaCheck>
                                                        ) : (
                                                            <FaTimes></FaTimes>
                                                        )}
                                                    </AnswerRichText>
                                                </AnswerItem>
                                            )}
                                        </AnswerWrap>
                                    ) : (
                                        <AnswerWrap setMargin={practiseStore.dailyProblem.studentAnswer}>
                                            <AnswerItem>
                                                <ItemName>答案</ItemName>
                                                <AnswerRichText>{practiseStore.dailyProblem.answer}</AnswerRichText>
                                            </AnswerItem>
                                            {practiseStore.dailyProblem.studentAnswer && (
                                                <AnswerItem>
                                                    <ItemName>学生作答</ItemName>
                                                    <AnswerRichText>
                                                        {practiseStore.dailyProblem.studentAnswer}
                                                    </AnswerRichText>
                                                </AnswerItem>
                                            )}
                                        </AnswerWrap>
                                    )}

                                    <SolutionWrap>
                                        <Analysis>解析</Analysis>
                                        <RichTextWrap>
                                            <Editor
                                                value={Value.fromJSON(practiseStore.dailyProblem.solution)}
                                                readonly
                                            ></Editor>
                                        </RichTextWrap>
                                    </SolutionWrap>
                                </>
                            )}
                        </ScrollbarWrap>
                    </Left>
                    <Right>
                        {practiseStore.dailyProblem.solution ? (
                            <ButtonWrap>
                                <Button onClick={handleClickLink}>返回</Button>
                            </ButtonWrap>
                        ) : (
                            <ButtonWrap>
                                <Button onClick={handleClickSave}>提交</Button>
                            </ButtonWrap>
                        )}
                        {practiseStore.dailyProblem.type === 3 ? <OptionB /> : <OptionA></OptionA>}
                    </Right>
                </Package>
            </Container>
        )
    })
}

export default Daily
