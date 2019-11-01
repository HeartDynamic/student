import React, { FC } from 'react'
import styled from '@emotion/styled'
import { RouteComponentProps } from '@reach/router'
import { useObserver } from 'mobx-react-lite'

import ChoiceProblemList from './ChoiceProblemList'
import JudgeProblemList from './JudgeProblemList'
import FillingProblemList from './FillingProblemList'
import ShortAnswerProblemList from './ShortAnswerProblemList'

interface ITestProblemDetail {
    id: number
    volumeId: number
    problemType: number
    number: number
    topic: any
    option: any
    answer: any
    solution: any
    fraction: number
    studentTestProblemId: number
    mark: number
    studentAnswer: any
}
interface IParams {
    data: ITestProblemDetail
}

const Container = styled.div`
    width: 100%;
    height: calc(100% - 320px);
`

const ReadEdit: FC<RouteComponentProps<IParams>> = props => {
    return useObserver(() => {
        return (
            <Container>
                {props.data!.problemType === 1 || props.data!.problemType === 2 ? <ChoiceProblemList /> : null}
                {props.data!.problemType === 3 ? <JudgeProblemList /> : null}
                {props.data!.problemType === 4 ? <FillingProblemList /> : null}
                {props.data!.problemType === 5 ? <ShortAnswerProblemList /> : null}
            </Container>
        )
    })
}

export default ReadEdit
