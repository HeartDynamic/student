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
        let color = '#E85B52'
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
        if (props.data.problemType === 1) {
            if (props.data.answer === props.data.studentAnswer) {
                if (data.answerOption === props.data.answer) {
                    return '#f1fd72'
                }
            }
        } else if (props.data.problemType === 2) {
            let studentAnswer: any = []
            let color = ''
            if (props.data.studentAnswer) {
                studentAnswer = props.data.studentAnswer.split(',')
            }
            studentAnswer.map((t: string) => {
                if (data.answerOption === t) {
                    color = '#f1fd72'
                }
                return t
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
                            bgColor: setStyleBgColor({
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
