import React, { FC, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { IStore } from '../../../store'

const Ul = styled.ul`
    width: 100%;
    box-sizing: border-box;
    display: flex;
`
const Li = styled.li`
    box-sizing: border-box;
    height: 36px;
    line-height: 36px;
    text-align: center;
    background-color: rgba(221, 237, 241, 1);
    border-radius: 10px;
    border: 1px solid rgba(58, 147, 223, 1);
    font-size: 12px;
    font-family: PingFangSC;
    font-weight: 300;
    color: rgba(58, 147, 223, 1);
    padding: 0 10px;
    margin-right: 10px;
`

const Knowledge: FC = props => {
    const { entryStore } = useContext<IStore>(MobXProviderContext)
    return useObserver(() => {
        return (
            <Ul>
                {entryStore.testProblemDetailData.loreList.map(item => (
                    <Li key={item.id} title={item.name}>
                        {item.name}
                    </Li>
                ))}
            </Ul>
        )
    })
}

export default Knowledge
