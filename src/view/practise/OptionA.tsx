import React, { FC, useContext, useState } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { IStore } from '../../store'
import Button from '../../components/Button'

const OptionWrap = styled.div``

const OptionUl = styled.div`
    margin-bottom: 12px;
`

const OptionA: FC = () => {
    const [answerOption] = useState(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'])
    const { practiseStore } = useContext<IStore>(MobXProviderContext)

    const handleClickSelected = (index: number) => {
        practiseStore.dailyProblem.option.map((t: any, i: number) => {
            if (practiseStore.dailyProblem.type === 1) {
                if (i === index) {
                    t.isSelected = !t.isSelected
                } else {
                    t.isSelected = false
                }
            } else if (practiseStore.dailyProblem.type === 2) {
                if (i === index) {
                    t.isSelected = !t.isSelected
                }
            }
            return t
        })
    }

    const buttonOption = {
        width: '100px',
        height: '40px',
        size: '20px',
        family: 'PingFangSC-Medium',
        weight: '500',
        color: '#3f8cea',
        shadow: '0px 7px 7px 0px rgba(149,220,235,0.22)',
        HbgColor: '#3f8cea',
        HColor: '#fff',
    }

    return useObserver(() => {
        return (
            <OptionWrap>
                {practiseStore.dailyProblem.option.map((item: any, index: number) => (
                    <OptionUl key={item.id}>
                        <Button
                            options={{
                                ...buttonOption,
                                color: item.isSelected ? '#fff' : '#3f8cea',
                                bgColor: item.isSelected ? '#3f8cea' : '#fff',
                            }}
                            disabled={practiseStore.dailyProblem.solution}
                            onClick={() => handleClickSelected(index)}
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
