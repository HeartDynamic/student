import React, { FC, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { IStore } from '../../../store'

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`

const Ul = styled.ul`
    flex: 1;
    box-sizing: border-box;
    display: flex;
`
const Li = styled.li`
    margin-right: 30px;
`
const Question = styled.div`
    font-size: 16px;
    font-family: PingFangSC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
`

const Span = styled.span`
    display: inline-block;
    width: 60px;
    height: 30px;
    line-height: 30px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 3px 6px 0px rgba(78, 140, 247, 0.14);
    border-radius: 4px;
    padding: 0 6px;
    margin-top: 20px;
    font-size: 16px;
    font-family: PingFangSC;
    font-weight: 500;
    color: rgba(237, 80, 131, 1);
    text-align: center;
`

const FractionListB: FC = props => {
    const { completeStore } = useContext<IStore>(MobXProviderContext)

    return useObserver(() => {
        return (
            <Container>
                <Ul>
                    {completeStore.testProblemDetailData.fractionList.map((item: any, index: number) => (
                        <Li key={index}>
                            <Question>第{index + 1}题</Question>
                            <Span>{item.fraction}</Span>
                        </Li>
                    ))}
                </Ul>
            </Container>
        )
    })
}

export default FractionListB
