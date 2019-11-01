import React, { FC, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { RouteComponentProps } from '@reach/router'

import { IStore } from '../../../store'
import mark from '../common/mark.png'
import whtie from '../common/whtie.png'
import whtie1 from '../common/whtie1.png'

interface ISetType {
    setType: {
        isColor: boolean
        mark: number
        studentAnswer: number
    }
}

interface IProblems {
    id: number
    problemType: number
    number: number
    mark: number
    ifStudentAnswer: number
    index: number
    key: string
}

const Wrap = styled.div`
    margin-top: 20px;
`
const ProblemName = styled.span<ISetType>`
    display: inline-block;
    width: 36px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    margin-right: 42px;
    color: ${props =>
        props.setType.isColor
            ? '#fff'
            : props.setType.mark === 1
            ? '#fff'
            : props.setType.studentAnswer
            ? '#3B8DF2'
            : '#E85B52'};
    background: url(${props => (props.setType.isColor ? whtie : props.setType.mark === 1 ? mark : whtie1)});
    text-align: center;
    border-radius: 50%;
    cursor: pointer;
    font-size: 18px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    :hover {
        background-image: url(${whtie});
        background-color: rgba(233, 92, 83, 1);
        color: #fff;
    }
`

const ProblemWrap: FC<RouteComponentProps> = props => {
    const { answerStore } = useContext<IStore>(MobXProviderContext)

    //题目number
    const handleClickTypeNumber = (data: IProblems) => {
        if (data.number === answerStore.currentProblemDetailData.number) {
            return
        }
        sessionStorage.setItem(
            'sessionCurrentType',
            JSON.stringify({ type: answerStore.currentProblemDetailData.type, number: data.number })
        )
        answerStore.getTestProblemDetail({
            id: (answerStore.testProblemData as any)[answerStore.currentProblemDetailData.type][data.number - 1].id,
            testId: answerStore.testProblemData.id,
        })
        answerStore.setTestProblemDetail({
            testId: answerStore.testProblemData.id,
            number: answerStore.currentProblemDetailData.number,
            type: '',
        })
        answerStore.currentProblemDetailData.number = data.number
    }
    return useObserver(() => {
        return (
            <Wrap>
                {(answerStore.testProblemData as any)[answerStore.currentProblemDetailData.type].length > 0
                    ? (answerStore.testProblemData as any)[answerStore.currentProblemDetailData.type].map(
                          (item: IProblems, index: number) => (
                              <ProblemName
                                  key={index}
                                  setType={{
                                      mark: item.mark,
                                      isColor: item.number === answerStore.currentProblemDetailData.number,
                                      studentAnswer: item.ifStudentAnswer,
                                  }}
                                  onClick={() => handleClickTypeNumber({ ...item, index })}
                              >
                                  {item.number}
                              </ProblemName>
                          )
                      )
                    : '暂无数据'}
            </Wrap>
        )
    })
}

export default ProblemWrap
