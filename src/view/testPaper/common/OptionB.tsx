import React, { FC, useState } from 'react'
import styled from '@emotion/styled'
import Button from '../../../components/Button'

const OptionWrap = styled.div``

const OptionUl = styled.div`
    margin-bottom: 12px;
`

interface IParams {
    data: {
        answer: string
        studentAnswer: string
    }
}
const OptionB: FC<IParams> = props => {
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
        let color = '#E85B52'
        if (data.answerOption === props.data.studentAnswer) {
            color = '#fff'
        }
        return color
    }
    const setStyleBgColor = (data: any) => {
        let color = ''
        if (data.answerOption === props.data.studentAnswer) {
            color = '#f1fd72'
        }
        return color
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
    return (
        <OptionWrap>
            {answerOption.map((item: any, index: number) => (
                <OptionUl key={index}>
                    <Button
                        options={{
                            ...buttonOption,
                            color: setStyleColor({
                                answer: props.data.answer,
                                studentAnswer: props.data.studentAnswer,
                                answerOption: answerOption[index].id,
                            }),
                            bgColor: setStyleBgColor({
                                answer: props.data.answer,
                                studentAnswer: props.data.studentAnswer,
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
}

export default OptionB
