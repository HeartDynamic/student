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
                {answerStore.testProblemDetailData.option.map((item: any, index: number) => (
                    <OptionUl key={item.id}>
                        <Button
                            options={{
                                ...buttonOption,
                                color: item.isSelected ? '#fff' : '#3f8cea',
                                bgColor: item.isSelected ? '#3f8cea' : '#fff',
                            }}
                            onClick={() =>
                                answerStore.handleClickOption({
                                    id: item.id,
                                    studentAnswer: answerOption[index],
                                })
                            }
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
