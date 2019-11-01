import React, { FC, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { IStore } from '../../../store'
import { RouteComponentProps } from '@reach/router'
import mark from '../common/mark.png'
import whtie1 from '../common/whtie1.png'
import whtie2 from '../common/whtie2.png'

interface ISetType {
    setType: {
        isColor: boolean
        mark: number
        studentAnswer: number
    }
}

interface IProblems {
    id: number
    ifEntering: number
    problemType: number
    number: number
    mark: number
    ifStudentAnswer: number
    index: number
    key: string
}

const Wrap = styled.div``
const ProblemNameWrap = styled.div`
    margin-top: 36px;
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
            : '#E95C53'};
    background: url(${props => (props.setType.isColor ? whtie2 : props.setType.mark === 1 ? mark : whtie1)});
    text-align: center;
    border-radius: 50%;
    cursor: pointer;
    font-size: 18px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    :hover {
        background-image: url(${whtie2});
        color: #fff;
    }
`

const ProblemWrap: FC<RouteComponentProps> = props => {
    const { entryStore } = useContext<IStore>(MobXProviderContext)

    //题目number
    const handleClickTypeNumber = (data: IProblems) => {
        if (data.number === entryStore.currentProblemDetailData.number) {
            return
        }
        sessionStorage.setItem(
            'sessionCurrentType',
            JSON.stringify({ type: entryStore.currentProblemDetailData.type, number: data.number })
        )
        entryStore.getTestProblemDetail({
            id: (entryStore.testProblemData as any)[entryStore.currentProblemDetailData.type][data.number - 1].id,
            testId: entryStore.testProblemData.id,
        })
        entryStore.currentProblemDetailData.number = data.number
    }
    return useObserver(() => {
        return (
            <Wrap>
                <ProblemNameWrap>
                    {(entryStore.testProblemData as any)[entryStore.currentProblemDetailData.type].length > 0
                        ? (entryStore.testProblemData as any)[entryStore.currentProblemDetailData.type].map(
                              (item: IProblems, index: number) => (
                                  <ProblemName
                                      key={index}
                                      setType={{
                                          mark: item.mark,
                                          isColor: item.number === entryStore.testProblemDetailData.number,
                                          studentAnswer: item.ifEntering,
                                      }}
                                      onClick={() => handleClickTypeNumber({ ...item, index })}
                                  >
                                      {item.number}
                                  </ProblemName>
                              )
                          )
                        : '暂无数据'}
                </ProblemNameWrap>
            </Wrap>
        )
    })
}

export default ProblemWrap
