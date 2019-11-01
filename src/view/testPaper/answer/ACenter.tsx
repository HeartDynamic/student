import React, { FC, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { RouteComponentProps } from '@reach/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

import ProblemWrap from './ProblemWrap'
import { IStore } from '../../../store'
import Button from '../../../components/Button'
import ReadEdit from './ReadEdit'
import Back from './Back'
import frequently from '../../../utils/frequently'

interface ITypeArr {
    name: string
    type: number
    typeName: string
}

interface IColor {
    isColor: boolean
}

export interface IProblems {
    id: number
    problemType: number
    number: number
    mark: number
    studentAnswer: number
    index: number
}

const Container = styled.div`
    width: 100%;
`

const HeaderWrap = styled.div`
    width: 100%;
    display: flex;
    margin-bottom: 20px;
`
const TotalProblem = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 14px;
`
const ScheduleWrap = styled.div`
    width: 100%;
    height: 10px;
    background-color: rgba(239, 239, 239, 1);
    border-radius: 9px;
    position: relative;
`
const TotalProblemText = styled.span`
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(59, 141, 242, 1);
    margin-left: 20px;
`

const Article = styled.div<{ bgColor: number }>`
    position: absolute;
    width: ${props => Math.ceil(props.bgColor) + '%'};
    transition: width 2s;
    height: 10px;
    border-radius: 9px;
    background-color: #3b8df2;
`

const TypeWrap = styled.div`
    flex: 1;
    box-sizing: border-box;
    padding: 20px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 4px 11px 0px rgba(64, 158, 255, 0.1);
    border-radius: 4px;
`
const TypeName = styled.span<IColor>`
    display: inline-block;
    width: 34px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    margin-right: 42px;
    color: ${props => (props.isColor ? '#fff' : '#333')};
    background-color: ${props => (props.isColor ? '#E85B52' : '#fff')};
    box-shadow: 0px 4px 11px 0px rgba(64, 158, 255, 0.1);
    border-radius: 50%;
    cursor: pointer;
    :hover {
        background-color: rgba(233, 92, 83, 1);
        color: #fff;
    }
`
const ButtonWrap = styled.div`
    display: flex;
    justify-content: flex-end;
    box-sizing: border-box;
    svg {
        margin-right: 8px;
    }
`
const ButtonName = styled.span``

const ACenter: FC<RouteComponentProps> = props => {
    const { answerStore } = useContext<IStore>(MobXProviderContext)

    //题目类型
    const handleClickTypeName = (data: ITypeArr) => {
        if (data.type === answerStore.currentProblemDetailData.id) {
            return
        }
        sessionStorage.setItem('sessionCurrentType', JSON.stringify({ id: data.type, type: data.typeName, number: 1 }))
        answerStore.currentProblemDetailData = {
            id: data.type,
            number: 1,
            type: data.typeName,
        }

        answerStore.getTestProblemDetail({
            id: (answerStore.testProblemData as any)[answerStore.currentProblemDetailData.type][0].id,
            testId: answerStore.testProblemData.id,
        })

        answerStore.setTestProblemDetail({
            testId: answerStore.testProblemData.id,
            number: answerStore.currentProblemDetailData.number,
            type: data.typeName,
        })
    }

    //标记
    const handleClickMark = () => {
        let throttle = frequently(_log, 1000)
        function _log() {
            answerStore.addProblemMark()
        }
        throttle()
    }

    const starOption = {
        height: '40px',
        size: '16px',
        family: 'PingFangSC-Medium',
        weight: '500',
        bgColor: '#3E90F3',
        HbgColor: '#3f8cea',
    }

    return useObserver(() => {
        return (
            <Container>
                <Back></Back>
                <HeaderWrap>
                    <TypeWrap>
                        <TotalProblem>
                            <ScheduleWrap
                                title={`答题总进度：${answerStore.testProblemData.finishedProblemCount}/${answerStore.testProblemData.totalProblem}题`}
                            >
                                <Article
                                    bgColor={
                                        (answerStore.testProblemData.finishedProblemCount /
                                            answerStore.testProblemData.totalProblem) *
                                        100
                                    }
                                />
                            </ScheduleWrap>
                            <TotalProblemText>
                                {answerStore.testProblemData.finishedProblemCount}/
                                {answerStore.testProblemData.totalProblem}
                            </TotalProblemText>
                        </TotalProblem>
                        {answerStore.testProblemData.problemTypeIsExit.map((item, index) => (
                            <TypeName
                                key={item.type}
                                isColor={item.typeName === answerStore.currentProblemDetailData.type}
                                onClick={() => handleClickTypeName(item)}
                            >
                                {item.name.slice(0, 1)}
                            </TypeName>
                        ))}
                        <ProblemWrap />
                    </TypeWrap>
                </HeaderWrap>
                <ButtonWrap>
                    <Button options={starOption} onClick={handleClickMark}>
                        <FontAwesomeIcon icon={faStar} />
                        <ButtonName>{answerStore.testProblemDetailData.mark ? '取消标记' : '标记该题'}</ButtonName>
                    </Button>
                </ButtonWrap>
                <ReadEdit data={answerStore.testProblemDetailData}></ReadEdit>
            </Container>
        )
    })
}

export default ACenter
