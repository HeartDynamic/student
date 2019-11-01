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
    const { submitStore } = useContext<IStore>(MobXProviderContext)

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
                                color: submitStore.setAnswer.studentAnswer === item.id ? '#fff' : '#3f8cea',
                                bgColor: submitStore.setAnswer.studentAnswer === item.id ? '#3f8cea' : '#fff',
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
