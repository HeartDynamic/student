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
    const { submitStore } = useContext<IStore>(MobXProviderContext)

    const buttonOption = {
        width: '100px',
        size: '20px',
        family: 'PingFangSC-Medium',
        weight: '500',
        cursor: 'auto',
    }

    return useObserver(() => {
        return (
            <OptionWrap>
                {submitStore.testProblemDetailData.option.map((item: any, index: number) => (
                    <OptionUl key={item.id}>
                        <Button
                            options={{
                                ...buttonOption,
                                color: item.statu ? '#fff' : '#3f8cea',
                                bgColor: item.statu ? '#3f8cea' : '#fff',
                                HbgColor: item.statu ? '#3f8cea' : '#fff',
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
