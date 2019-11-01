import React, { FC, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { RouteComponentProps } from '@reach/router'

import { IStore } from '../../../store'
import ProblemWrap from './ProblemWrap'
import ChoiceProblem from '../../../components/QuestionType/ChoiceProblem'
import JudgeProblem from '../../../components/QuestionType/JudgeProblem'
import FillingProblem from '../../../components/QuestionType/FillingProblem'
import ShortAnswerProblem from '../../../components/QuestionType/ShortAnswerProblem'

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
    margin-top: 20px;
`

const HeaderWrap = styled.div`
    width: 100%;
    display: flex;
`
const TypeWrap = styled.div`
    flex: 1;
    box-sizing: border-box;
    padding: 24px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 7px 0px rgba(232, 91, 82, 0.15);
    border-radius: 10px;
`
const TypeName = styled.span<IColor>`
    display: inline-block;
    width: 34px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    margin-right: 42px;
    color: ${props => (props.isColor ? '#fff' : '#333')};
    background-color: ${props => (props.isColor ? '#3B8DF2' : '#fff')};
    box-shadow: 0px 2px 4px 0px rgba(65, 145, 243, 0.2);
    border-radius: 50%;
    cursor: pointer;
    :hover {
        background-color: #3b8df2;
        color: #fff;
    }
`

const ACenter: FC<RouteComponentProps> = props => {
    const { completeStore } = useContext<IStore>(MobXProviderContext)

    //题目类型
    const handleClickTypeName = (data: ITypeArr) => {
        if (data.type === completeStore.currentProblemDetailData.id) {
            return
        }
        sessionStorage.setItem('sessionCurrentType', JSON.stringify({ id: data.type, type: data.typeName, number: 1 }))
        completeStore.currentProblemDetailData = {
            id: data.type,
            number: 1,
            type: data.typeName,
        }

        completeStore.getTestProblemDetail({
            id: (completeStore.testProblemData as any)[completeStore.currentProblemDetailData.type][0].id,
            testId: completeStore.testProblemData.id,
        })
    }

    return useObserver(() => {
        console.log(completeStore.testProblemDetailData)
        return (
            <Container>
                <HeaderWrap>
                    <TypeWrap>
                        {completeStore.testProblemData.problemTypeIsExit.map(item => (
                            <TypeName
                                key={item.type}
                                isColor={item.typeName === completeStore.currentProblemDetailData.type}
                                onClick={() => handleClickTypeName(item)}
                            >
                                {item.name.slice(0, 1)}
                            </TypeName>
                        ))}
                        <ProblemWrap />
                    </TypeWrap>
                </HeaderWrap>
                {completeStore.testProblemDetailData.problemType === 1 ||
                completeStore.testProblemDetailData.problemType === 2 ? (
                    <ChoiceProblem
                        data={{
                            ...completeStore.testProblemDetailData,
                            loreList: completeStore.testProblemDetailData.loreDTOList,
                            type: completeStore.testProblemDetailData.problemType,
                        }}
                        isExpand={true}
                    />
                ) : null}
                {completeStore.testProblemDetailData.problemType === 3 ? (
                    <JudgeProblem
                        data={{
                            ...completeStore.testProblemDetailData,
                            loreList: completeStore.testProblemDetailData.loreDTOList,
                            type: completeStore.testProblemDetailData.problemType,
                        }}
                        isExpand={true}
                    />
                ) : null}
                {completeStore.testProblemDetailData.problemType === 4 ? (
                    <FillingProblem
                        data={{
                            ...completeStore.testProblemDetailData,
                            loreList: completeStore.testProblemDetailData.loreDTOList,
                            type: completeStore.testProblemDetailData.problemType,
                        }}
                        isExpand={true}
                    />
                ) : null}
                {completeStore.testProblemDetailData.problemType === 5 ? (
                    <ShortAnswerProblem
                        data={{
                            ...completeStore.testProblemDetailData,
                            loreList: completeStore.testProblemDetailData.loreDTOList,
                            type: completeStore.testProblemDetailData.problemType,
                        }}
                        isExpand={true}
                    />
                ) : null}
                {/* <Route>
                    <ReadEdit path='/complete/:testId/:id' />
                </Route> */}
            </Container>
        )
    })
}

export default ACenter
