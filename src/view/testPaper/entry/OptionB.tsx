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

const OptionB: FC = () => {
    const { entryStore } = useContext<IStore>(MobXProviderContext)
    const [answerOption] = useState([
        {
            id: '1',
            name: '对',
        },
        {
            id: '0',
            name: '错',
        },
    ])

    const setStyleColor = (data: any) => {
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
    }
    const setStyleBgColor = (data: any) => {
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
    }

    const buttonOption = {
        width: '150px',
        height: '60px',
        size: '20px',
        family: 'PingFangSC-Medium',
        weight: '500',
        bgColor: '#fff',
        color: '#3f8cea',
        border: '2px solid #fff',
        shadow: '0px 7px 7px 0px rgba(62,144,243,0.21)',
        cursor: 'auto',
    }
    return useObserver(() => {
        return (
            <OptionWrap>
                {answerOption.map((item: any, index: number) => (
                    <OptionUl key={index}>
                        <Button
                            options={{
                                ...buttonOption,
                                color: setStyleColor({
                                    answer: entryStore.testProblemDetailData.answer,
                                    studentAnswer: entryStore.testProblemDetailData.studentAnswer,
                                    answerOption: answerOption[index].id,
                                }),
                                bgColor: setStyleBgColor({
                                    answer: entryStore.testProblemDetailData.answer,
                                    studentAnswer: entryStore.testProblemDetailData.studentAnswer,
                                    answerOption: answerOption[index].id,
                                }),
                            }}
                        >
                            {item.name}
                        </Button>
                    </OptionUl>
                ))}
            </OptionWrap>
        )
    })
}

export default OptionB
