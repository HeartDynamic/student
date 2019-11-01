/*
   第一次进入答题
*/
import React, { useEffect, FC, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { RouteComponentProps } from '@reach/router'
import { IStore } from '../../../store'

import ACenter from './ACenter'

const Container = styled.div`
    width: 1320px;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    margin: 0px auto;
    padding-top: 20px;
`

interface IParams {
    id: string
}

const Answer: FC<RouteComponentProps<IParams>> = props => {
    const { answerStore } = useContext<IStore>(MobXProviderContext)
    useEffect(() => {
        if (props.id) {
            answerStore.getTestProblem(Number(props.id))
        }
        // eslint-disable-next-line
    }, [props.id])
    return (
        <Container>
            {/* <ALeft /> */}
            <ACenter />
        </Container>
    )
}

export default Answer
