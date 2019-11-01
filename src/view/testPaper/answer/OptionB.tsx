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
    const { answerStore } = useContext<IStore>(MobXProviderContext)

    const buttonOption = {
        width: '102px',
        height: '40px',
        size: '20px',
        family: 'PingFangSC-Medium',
        weight: '500',
        bgColor: '#fff',
        color: '#3f8cea',
        shadow: '0px 7px 7px 0px rgba(149,220,235,0.22)',
        HbgColor: '#3f8cea',
        HColor: '#fff',
    }
    return useObserver(() => {
        return (
            <OptionWrap>
                {answerOption.map((item: any, index: number) => (
                    <OptionUl key={index}>
                        <Button
                            options={{
                                ...buttonOption,
                                color: answerStore.setAnswer.studentAnswer === item.id ? '#fff' : '#3f8cea',
                                bgColor: answerStore.setAnswer.studentAnswer === item.id ? '#3f8cea' : '#fff',
                            }}
                            onClick={() => answerStore.handleClickJudge(item.id)}
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
