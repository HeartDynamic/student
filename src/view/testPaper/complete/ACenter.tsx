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
import Fraction from '../common/Fraction'
import FractionListA from './FractionListA'
import OptionA from '../common/OptionA'
import FractionListB from './FractionListB'
import OptionB from '../common/OptionB'

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
    margin-bottom: 20px;
`

const HeaderWrap = styled.div`
    width: 100%;
    display: flex;
`
const Wrap = styled.div`
    display: flex;
`
const Package = styled.div`
    box-sizing: border-box;
    width: 100%;
    padding: 20px;
    margin-top: 20px;
    box-shadow: 0px 2px 4px 0px rgba(31, 122, 171, 0.2);
    border-radius: 4px;
    border: 3px solid rgba(255, 255, 255, 1);
`
const OptionWrap = styled.div`
    margin-left: 20px;
`
const TypeWrap = styled.div`
    flex: 1;
    box-sizing: border-box;
    padding: 20px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 7px 0px rgba(232, 91, 82, 0.15);
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
                {(completeStore.testProblemDetailData.problemType === 1 ||
                    completeStore.testProblemDetailData.problemType === 2) && (
                    <Package>
                        <Fraction
                            data={{
                                getFraction: completeStore.testProblemDetailData.getFraction,
                                fraction: completeStore.testProblemDetailData.fraction,
                            }}
                        ></Fraction>
                        <Wrap>
                            <ChoiceProblem
                                data={{
                                    ...completeStore.testProblemDetailData,
                                    type: completeStore.testProblemDetailData.problemType,
                                }}
                                isExpand={true}
                            />
                            <OptionWrap>
                                <OptionA
                                    data={{
                                        problemType: completeStore.testProblemDetailData.problemType,
                                        answer: completeStore.testProblemDetailData.answer,
                                        studentAnswer: completeStore.testProblemDetailData.studentAnswer,
                                        option: completeStore.testProblemDetailData.option,
                                    }}
                                ></OptionA>
                            </OptionWrap>
                        </Wrap>
                    </Package>
                )}
                {completeStore.testProblemDetailData.problemType === 3 && (
                    <Package>
                        <Fraction
                            data={{
                                getFraction: completeStore.testProblemDetailData.getFraction,
                                fraction: completeStore.testProblemDetailData.fraction,
                            }}
                        ></Fraction>
                        <Wrap>
                            <JudgeProblem
                                data={{
                                    ...completeStore.testProblemDetailData,
                                    type: completeStore.testProblemDetailData.problemType,
                                }}
                                isExpand={true}
                            />
                            <OptionWrap>
                                <OptionB
                                    data={{
                                        answer: completeStore.testProblemDetailData.answer,
                                        studentAnswer: completeStore.testProblemDetailData.studentAnswer,
                                    }}
                                ></OptionB>
                            </OptionWrap>
                        </Wrap>
                    </Package>
                )}
                {completeStore.testProblemDetailData.problemType === 4 && (
                    <Package>
                        <Fraction
                            data={{
                                getFraction: completeStore.testProblemDetailData.getFraction,
                                fraction: completeStore.testProblemDetailData.fraction,
                            }}
                        ></Fraction>
                        <FractionListA></FractionListA>
                        <FillingProblem
                            data={{
                                ...completeStore.testProblemDetailData,
                                type: completeStore.testProblemDetailData.problemType,
                            }}
                            isExpand={true}
                        />
                    </Package>
                )}
                {completeStore.testProblemDetailData.problemType === 5 && (
                    <Package>
                        <Fraction
                            data={{
                                getFraction: completeStore.testProblemDetailData.getFraction,
                                fraction: completeStore.testProblemDetailData.fraction,
                            }}
                        ></Fraction>
                        <FractionListB></FractionListB>
                        <ShortAnswerProblem
                            data={{
                                ...completeStore.testProblemDetailData,
                                type: completeStore.testProblemDetailData.problemType,
                            }}
                            isExpand={true}
                        />
                    </Package>
                )}
            </Container>
        )
    })
}

export default ACenter
