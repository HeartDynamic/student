import React, { FC, useContext, useState } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { IStore } from '../../../store'
import Button from '../../../components/Button'

const OptionWrap = styled.div``

const OptionUl = styled.div`
    margin-bottom: 12px;
`

const OptionA: FC = () => {
    const [answerOption] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'])
    const { entryStore } = useContext<IStore>(MobXProviderContext)

    const setStyleColor = (data: any) => {
        if (entryStore.testProblemDetailData.problemType === 1) {
            if (entryStore.testProblemDetailData.answer === entryStore.testProblemDetailData.studentAnswer) {
                if (data.answerOption === entryStore.testProblemDetailData.answer) {
                    return '#fff'
                } else {
                    return '#E85B52'
                }
            } else {
                if (data.answerOption === entryStore.testProblemDetailData.answer) {
                    return '#fff'
                } else if (data.answerOption === entryStore.testProblemDetailData.studentAnswer) {
                    return '#fff'
                } else {
                    return '#E85B52'
                }
            }
        } else if (entryStore.testProblemDetailData.problemType === 2) {
            let answer = entryStore.testProblemDetailData.answer.split(',')
            let studentAnswer: any = []
            if (entryStore.testProblemDetailData.studentAnswer) {
                studentAnswer = entryStore.testProblemDetailData.studentAnswer.split(',')
            }
            let color = '#E85B52'
            answer.map((item: string) => {
                if (data.answerOption === item) {
                    color = '#fff'
                } else {
                    studentAnswer.map((t: string) => {
                        if (data.answerOption === t) {
                            color = '#fff'
                        }
                        return t
                    })
                }
                return item
            })
            return color
        }
    }
    const setStyleBgColor = (data: any) => {
        if (entryStore.testProblemDetailData.problemType === 1) {
            if (entryStore.testProblemDetailData.answer === entryStore.testProblemDetailData.studentAnswer) {
                if (data.answerOption === entryStore.testProblemDetailData.answer) {
                    return '#59D676'
                }
            } else {
                if (data.answerOption === entryStore.testProblemDetailData.answer) {
                    return '#59D676'
                } else if (data.answerOption === entryStore.testProblemDetailData.studentAnswer) {
                    return '#E85B52'
                } else {
                    return '#fff'
                }
            }
        } else if (entryStore.testProblemDetailData.problemType === 2) {
            let answer = entryStore.testProblemDetailData.answer.split(',')
            let studentAnswer: any = []
            if (entryStore.testProblemDetailData.studentAnswer) {
                studentAnswer = entryStore.testProblemDetailData.studentAnswer.split(',')
            }
            let color = ''
            answer.map((item: string) => {
                if (data.answerOption === item) {
                    color = '#59D676'
                } else {
                    studentAnswer.map((t: string) => {
                        if (data.answerOption === t) {
                            color = '#E85B52'
                        }
                        return t
                    })
                }
                return item
            })
            return color
        }
    }

    const buttonOption = {
        width: '150px',
        height: '60px',
        size: '20px',
        family: 'PingFangSC-Medium',
        weight: '500',
        color: '#3f8cea',
        border: '2px solid #fff',
        cursor: 'auto',
        shadow: '0px 7px 7px 0px rgba(62,144,243,0.21)',
    }

    return useObserver(() => {
        return (
            <OptionWrap>
                {JSON.parse(entryStore.testProblemDetailData.option).map((item: any, index: number) => (
                    <OptionUl key={item.id}>
                        <Button
                            options={{
                                ...buttonOption,
                                color: setStyleColor({
                                    answer: entryStore.testProblemDetailData.answer,
                                    studentAnswer: entryStore.testProblemDetailData.studentAnswer,
                                    answerOption: answerOption[index],
                                }),
                                bgColor: setStyleBgColor({
                                    answer: entryStore.testProblemDetailData.answer,
                                    studentAnswer: entryStore.testProblemDetailData.studentAnswer,
                                    answerOption: answerOption[index],
                                }),
                            }}
                        >
                            {answerOption[index]}
                        </Button>
                    </OptionUl>
                ))}
            </OptionWrap>
        )
    })
}

export default OptionA
