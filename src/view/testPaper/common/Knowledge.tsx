import React, { FC } from 'react'
import styled from '@emotion/styled'

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

interface IParams {
    loreList: { id: number; name: string }[]
}
const Knowledge: FC<IParams> = props => {
    return (
        <Ul>
            {props.loreList.map(item => (
                <Li key={item.id} title={item.name}>
                    {item.name}
                </Li>
            ))}
        </Ul>
    )
}

export default Knowledge
