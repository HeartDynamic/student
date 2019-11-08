import React, { FC, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { IStore } from '../../../store'

import Circle1 from '../common/Circle1.png'
import Circle2 from '../common/Circle2.png'
import Circle3 from '../common/Circle3.png'
import Circle4 from '../common/Circle4.png'

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`

const Ul = styled.ul`
    box-sizing: border-box;
    display: flex;
    flex: 1;
`
const Li = styled.li`
    margin-right: 30px;
`
const Question = styled.div`
    box-sizing: border-box;
    width: 56px;
    height: 38px;
    line-height: 34px;
    text-align: center;
    border-radius: 4px;
    border: 2px solid rgba(7, 46, 132, 1);
    font-size: 18px;
    font-family: PingFangSC;
    font-weight: 600;
    color: rgba(7, 41, 121, 1);
`
const FontWrap = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 100px;
`
const BgCircle = styled.div<{ bgImage: string }>`
    width: 30px;
    height: 30px;
    cursor: pointer;
    background-image: ${props => (props.bgImage === '2' ? `url(${Circle1})` : `url(${Circle2})`)};
    box-shadow: 0px 4px 6px 0px rgba(78, 87, 234, 0.15);
    border-radius: 50%;
`
const BgCircle1 = styled.div<{ bgImage: string }>`
    width: 30px;
    height: 30px;
    cursor: pointer;
    background-image: ${props => (props.bgImage === '3' ? `url(${Circle3})` : `url(${Circle4})`)};
    box-shadow: 0px 4px 6px 0px rgba(78, 87, 234, 0.15);
    border-radius: 50%;
`

const FractionListA: FC = props => {
    const { completeStore } = useContext<IStore>(MobXProviderContext)

    return useObserver(() => {
        return (
            <Container>
                <Ul>
                    {completeStore.testProblemDetailData.fractionList.map((item: any, index: number) => (
                        <Li key={index}>
                            <Question>{index + 1}</Question>
                            <FontWrap>
                                <BgCircle title='对' bgImage={item.fraction}></BgCircle>
                                <BgCircle1 title='错' bgImage={item.fraction}></BgCircle1>
                            </FontWrap>
                        </Li>
                    ))}
                </Ul>
            </Container>
        )
    })
}

export default FractionListA
