import React, { FC, useContext, useState, ChangeEvent } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { RouteComponentProps, navigate } from '@reach/router'
import { IStore } from '../../../store'

import Button from '../../../components/Button'

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

const Input = styled.input`
    width: 60px;
    height: 30px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 3px 6px 0px rgba(78, 140, 247, 0.14);
    border-radius: 4px;
    padding: 0 6px;
    margin-top: 20px;
    outline: none;
    border: none;
    font-size: 16px;
    font-family: PingFangSC;
    font-weight: 500;
    color: rgba(237, 80, 131, 1);
    text-align: center;
`

const ButtonWrap = styled.div`
    display: flex;
`
interface IParams {
    testId: string
}

const FractionListB: FC<RouteComponentProps<IParams>> = props => {
    const { entryStore } = useContext<IStore>(MobXProviderContext)
    const [fraction, setFraction] = useState(0)
    const [currentFraction, setCurrentFraction] = useState(0)

    const handleChange = (e: ChangeEvent<HTMLInputElement>, i: number) => {
        let num = 0
        entryStore.testProblemDetailData.fractionList.map((item, index) => {
            if (index === i) {
                item.fraction = e.target.value
                num += Number(e.target.value)
            } else {
                num += Number(item.fraction)
            }
            return item
        })
        setFraction(num)
        setCurrentFraction(Number(e.target.value))
    }

    const handleBlur = (i: number) => {
        let num = 0
        entryStore.testProblemDetailData.fractionList.map((item, index) => {
            if (index === i) {
                if (fraction > entryStore.testProblemDetailData.fraction) {
                    item.fraction = (
                        entryStore.testProblemDetailData.fraction -
                        (fraction - currentFraction)
                    ).toString()
                    num += Number(entryStore.testProblemDetailData.fraction - (fraction - currentFraction))
                } else {
                    num += Number(item.fraction)
                }
            } else {
                num += Number(item.fraction)
            }
            setFraction(num)
            return item
        })
    }

    const showFraction = () => {
        if (entryStore.testProblemDetailData.fraction - fraction < 0) {
            return '已超出' + (entryStore.testProblemDetailData.fraction - fraction) + '分'
        }
        return '还能输入' + (entryStore.testProblemDetailData.fraction - fraction) + '分'
    }

    //录入
    const handleClickNext = async () => {
        let data = {
            id: entryStore.testProblemDetailData.studentTestProblemId,
            testVolumesProblemId: entryStore.testProblemDetailData.id,
            studentTestId: entryStore.testProblemData.id,
            getFraction: fraction,
            fractionList: JSON.stringify(entryStore.testProblemDetailData.fractionList),
            isTrue: entryStore.testProblemDetailData.fraction - fraction === 0 ? 1 : 0,
        }
        entryStore.getTestsEntering(data)
    }

    const handleClickLink = () => {
        navigate(`/entry/print/${entryStore.testProblemData.id}`, {
            state: {
                linkData: `/entry/${entryStore.testProblemData.id}`,
            },
        })
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
                        <Li key={index} title={showFraction()}>
                            <Question>第{index + 1}题</Question>
                            <Input
                                type='text'
                                value={item.fraction}
                                onChange={e => handleChange(e, index)}
                                onBlur={() => handleBlur(index)}
                            />
                        </Li>
                    ))}
                </Ul>
                <ButtonWrap>
                    <Button onClick={handleClickLink}>打印答案</Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button options={buttonOption} onClick={handleClickNext}>
                        保存该题录入
                    </Button>
                </ButtonWrap>
            </Container>
        )
    })
}

export default FractionListB
