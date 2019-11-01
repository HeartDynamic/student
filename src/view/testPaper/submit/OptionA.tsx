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
        console.log(submitStore.testProblemDetailData.option, 123)
        return (
            <OptionWrap>
                {submitStore.testProblemDetailData.option.map((item: any, index: number) => (
                    <OptionUl key={item.id}>
                        <Button
                            options={{
                                ...buttonOption,
                                color: item.statu ? '#fff' : '#3f8cea',
                                bgColor: item.statu ? '#3f8cea' : '#fff',
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
