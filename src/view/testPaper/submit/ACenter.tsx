import React, { FC, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { IStore } from '../../../store'

import { RouteComponentProps } from '@reach/router'
import ProblemWrap from './ProblemWrap'
import ReadEdit from './ReadEdit'

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
`
const ScheduleWrap = styled.div`
    width: 100%;
    height: 10px;
    background-color: rgba(239, 239, 239, 1);
    border-radius: 9px;
    margin-bottom: 20px;
    position: relative;
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
    const { submitStore } = useContext<IStore>(MobXProviderContext)

    //题目类型
    const handleClickTypeName = (data: ITypeArr) => {
        if (data.type === submitStore.currentProblemDetailData.id) {
            return
        }
        sessionStorage.setItem('sessionCurrentType', JSON.stringify({ id: data.type, type: data.typeName, number: 1 }))
        submitStore.currentProblemDetailData = {
            id: data.type,
            number: 1,
            type: data.typeName,
        }

        submitStore.getTestProblemDetail({
            id: (submitStore.testProblemData as any)[submitStore.currentProblemDetailData.type][0].id,
            testId: submitStore.testProblemData.id,
        })

        submitStore.setTestProblemDetail({
            testId: submitStore.testProblemData.id,
            number: submitStore.currentProblemDetailData.number,
            type: data.typeName,
        })
    }

    //下一题
    // const handleClickNext = async () => {
    // await submitStore.handleClickNext()
    // await props.history.push({
    //     pathname: `${props.match.url}/${submitStore.currentProblemDetailData.id}`,
    //     state: {
    //         key: submitStore.currentProblemDetailData.key,
    //         courseId: submitStore.currentProblemDetailData.courseId,
    //     },
    // })
    // }

    return useObserver(() => {
        return (
            <Container>
                <HeaderWrap>
                    <TypeWrap>
                        <ScheduleWrap
                            title={`答题总进度：${submitStore.testProblemData.finishedProblemCount}/${submitStore.testProblemData.totalProblem}题`}
                        >
                            <Article
                                bgColor={
                                    (submitStore.testProblemData.finishedProblemCount /
                                        submitStore.testProblemData.totalProblem) *
                                    100
                                }
                            />
                        </ScheduleWrap>
                        {submitStore.testProblemData.problemTypeIsExit.map((item, index) => (
                            <TypeName
                                key={item.type}
                                isColor={item.typeName === submitStore.currentProblemDetailData.type}
                                onClick={() => handleClickTypeName(item)}
                            >
                                {item.name.slice(0, 1)}
                            </TypeName>
                        ))}
                        <ProblemWrap />
                    </TypeWrap>
                    {/* <FunctWrap>
                        <Button options={paperPlaneOption} onClick={handleClickNext}>
                            <FontAwesomeIcon icon={faPaperPlane} />
                            &nbsp;
                            <ButtonName>下一题</ButtonName>
                        </Button>
                    </FunctWrap> */}
                </HeaderWrap>
                <ReadEdit data={submitStore.testProblemDetailData}></ReadEdit>
            </Container>
        )
    })
}

export default ACenter
