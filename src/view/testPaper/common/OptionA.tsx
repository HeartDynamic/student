import React, { FC, useState } from 'react'
import styled from '@emotion/styled'
import Button from '../../../components/Button'

const OptionWrap = styled.div``

const OptionUl = styled.div`
    margin-bottom: 12px;
`
interface IParams {
    data: {
        problemType: number
        answer: string
        studentAnswer: any
        option: any
    }
}
const OptionA: FC<IParams> = props => {
    const [answerOption] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'])

    const setStyleColor = (data: any) => {
        let color = '#333'
        if (props.data.problemType === 1) {
            if (props.data.answer === props.data.studentAnswer) {
                if (data.answerOption === props.data.answer) {
                    color = '#fff'
                }
            }
        } else if (props.data.problemType === 2) {
            let studentAnswer: any = []
            if (props.data.studentAnswer) {
                studentAnswer = props.data.studentAnswer.split(',')
            }
            studentAnswer.map((t: string) => {
                if (data.answerOption === t) {
                    color = '#fff'
                }
                return t
            })
        }
        return color
    }
    const setStyleBgColor = (data: any) => {
        let bgColor = '#fff'
        let HbgColor = '#fff'
        if (props.data.problemType === 1) {
            if (data.answerOption === props.data.studentAnswer) {
                bgColor = '#59D676'
                HbgColor = '#59D676'
            }
        } else if (props.data.problemType === 2) {
            let studentAnswer: any = []
            if (props.data.studentAnswer) {
                studentAnswer = props.data.studentAnswer.split(',')
            }
            studentAnswer.map((t: string) => {
                if (data.answerOption === t) {
                    bgColor = '#59D676'
                    HbgColor = '#59D676'
                }
                return t
            })
        }
        return { bgColor, HbgColor }
    }

    const buttonOption = {
        width: '100px',
        size: '20px',
        family: 'PingFangSC-Medium',
        weight: '500',
        cursor: 'auto',
    }

    return (
        <OptionWrap>
            {props.data.option.map((item: any, index: number) => (
                <OptionUl key={item.id}>
                    <Button
                        options={{
                            ...buttonOption,
                            color: setStyleColor({
                                answer: props.data.answer,
                                studentAnswer: props.data.studentAnswer,
                                answerOption: answerOption[index],
                            }),
                            ...setStyleBgColor({
                                answer: props.data.answer,
                                studentAnswer: props.data.studentAnswer,
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
}

export default OptionA
