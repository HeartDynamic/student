import React, { FC, useContext, useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { RouteComponentProps } from '@reach/router'
import { IStore } from '../../../store'

import Button from '../../../components/Button'
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

const ButtonWrap = styled.div``

interface IParams {
    testId: string
}

const FractionListA: FC<RouteComponentProps<IParams>> = props => {
    const { entryStore } = useContext<IStore>(MobXProviderContext)
    const [currentFraction, setCurrentFraction] = useState(
        Array.from({ length: entryStore.testProblemDetailData.fractionList.length }, () => 1)
    )

    useEffect(() => {
        setCurrentFraction(Array.from({ length: entryStore.testProblemDetailData.fractionList.length }, () => 1))
        // eslint-disable-next-line
    }, [entryStore.testProblemDetailData.id])

    //对错
    const handleClick = (text: string, index: number) => {
        if (text === '对') {
            if (entryStore.testProblemDetailData.fractionList[index].fraction === '2') {
                entryStore.testProblemDetailData.fractionList[index].fraction = ''
            } else {
                entryStore.testProblemDetailData.fractionList[index].fraction = '2'
            }
        } else if (text === '错') {
            if (entryStore.testProblemDetailData.fractionList[index].fraction === '3') {
                entryStore.testProblemDetailData.fractionList[index].fraction = ''
            } else {
                entryStore.testProblemDetailData.fractionList[index].fraction = '3'
            }
        }
    }

    //保存该题录入
    const handleClickNext = () => {
        let fraction = 0
        let length = entryStore.testProblemDetailData.fractionList.length
        let Total = 0
        entryStore.testProblemDetailData.fractionList.map(item => {
            if (item.fraction === '2') {
                fraction += 1
            }
        })

        Total = Number(
            (entryStore.testProblemDetailData.fraction / entryStore.testProblemDetailData.fractionList.length).toFixed(
                1
            )
        )
        let data = {
            id: entryStore.testProblemDetailData.studentTestProblemId,
            testVolumesProblemId: entryStore.testProblemDetailData.id,
            studentTestId: entryStore.testProblemData.id,
            getFraction: Math.ceil(Total * fraction),
            fractionList: JSON.stringify(entryStore.testProblemDetailData.fractionList),
            isTrue: entryStore.testProblemDetailData.fractionList.every(item => item.fraction === '2') ? 1 : 0,
        }
        entryStore.getTestsEntering(data)
    }

    const buttonOption = {
        height: '36px',
        bgColor: '#E95C53',
        size: '16px',
        family: 'PingFangSC',
        weight: '600',
        shadow: '0px 6px 6px 0px rgba(183,51,94,0.21)',
        border: '1px solid rgba(255,255,255,1)',
    }
    return useObserver(() => {
        return (
            <Container>
                <Ul>
                    {entryStore.testProblemDetailData.fractionList.map((item: any, index: number) => (
                        <Li key={index}>
                            <Question>{index + 1}</Question>
                            <FontWrap>
                                <BgCircle
                                    title='对'
                                    onClick={() => handleClick('对', index)}
                                    bgImage={item.fraction}
                                ></BgCircle>
                                <BgCircle1
                                    title='错'
                                    onClick={() => handleClick('错', index)}
                                    bgImage={item.fraction}
                                ></BgCircle1>
                            </FontWrap>
                        </Li>
                    ))}
                </Ul>
                <ButtonWrap>
                    <Button options={buttonOption} onClick={handleClickNext}>
                        保存该题录入
                    </Button>
                </ButtonWrap>
            </Container>
        )
    })
}

export default FractionListA
