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
        let color = '#333'
        if (data.answerOption === props.data.studentAnswer) {
            color = '#fff'
        }
        return color
    }
    const setStyleBgColor = (data: any) => {
        let bgColor = '#fff'
        let HbgColor = '#fff'
        if (data.answerOption === props.data.studentAnswer) {
            bgColor = '#59D676'
            HbgColor = '#59D676'
        }
        return { bgColor, HbgColor }
    }

    const buttonOption = {
        width: '100px',
        size: '20px',
        family: 'PingFangSC-Medium',
        weight: '500',
        bgColor: '#fff',
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
                                studentAnswer: props.data.studentAnswer,
                                answerOption: answerOption[index].id,
                            }),
                            ...setStyleBgColor({
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
