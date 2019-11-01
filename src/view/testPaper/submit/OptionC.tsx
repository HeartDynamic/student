import React, { FC, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { IStore } from '../../../store'
import OptionCAnswer from './OptionCAnswer'

const OptionUl = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 98%;
    box-shadow: 0px 6px 4px 0px rgba(61, 142, 243, 0.22);
    border-radius: 18px;
    padding-top: 16px;
    padding-bottom: 16px;
    margin-top: 16px;
`

const OptionC: FC = props => {
    const { submitStore } = useContext<IStore>(MobXProviderContext)

    return useObserver(() => {
        return (
            <OptionUl>
                {submitStore.testProblemDetailData.studentAnswer.map((item: any, index: number) => (
                    <OptionCAnswer data={{ ...item, index }} key={index} />
                ))}
            </OptionUl>
        )
    })
}

export default OptionC
