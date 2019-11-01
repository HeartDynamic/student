import React, { useEffect, FC, useContext } from 'react'
import styled from '@emotion/styled'
import { RouteComponentProps } from '@reach/router'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'

import { IStore } from '../../../store'
import ChoiceProblemList from './ChoiceProblemList'
import JudgeProblemList from './JudgeProblemList'
import FillingProblemList from './FillingProblemList'
import ShortAnswerProblemList from './ShortAnswerProblemList'

interface IParams {
    id: string
    testId: string
    key: string
}

const Container = styled.div`
    width: 100%;
    margin-top: 20px;
`

const ReadEdit: FC<RouteComponentProps<IParams>> = props => {
    const { completeStore } = useContext<IStore>(MobXProviderContext)
    // useEffect(() => {
    //     completeStore.getTestProblemAnswer({
    //         id: Number(props.match.params.id),
    //         testId: Number(props.match.params.testId),
    //     })
    //     //eslint-disable-next-line
    // }, [props.match.params.id])
    return useObserver(() => (
        <Container>
            {completeStore.testProblemDetailData.problemType === 1 ||
            completeStore.testProblemDetailData.problemType === 2 ? (
                <ChoiceProblemList />
            ) : null}
            {completeStore.testProblemDetailData.problemType === 3 ? <JudgeProblemList /> : null}
            {completeStore.testProblemDetailData.problemType === 4 ? <FillingProblemList /> : null}
            {completeStore.testProblemDetailData.problemType === 5 ? <ShortAnswerProblemList /> : null}
        </Container>
    ))
}

export default ReadEdit
