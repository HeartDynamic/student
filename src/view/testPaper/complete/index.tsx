import React, { useEffect, FC, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { RouteComponentProps } from '@reach/router'
import Header from './Header'
import { IStore } from '../../../store'

import ACenter from './ACenter'

const Container = styled.div`
    width: 1320px;
    height: 100%;
    box-sizing: border-box;
    margin: 0px auto;
    padding-top: 20px;
`
interface IParams {
    id: string
}

const Answer: FC<RouteComponentProps<IParams>> = props => {
    const { completeStore } = useContext<IStore>(MobXProviderContext)
    useEffect(() => {
        if (props.id) {
            completeStore.getTestProblem(Number(props.id))
        }
        // eslint-disable-next-line
    }, [props.id])
    return (
        <Container>
            <Header></Header>
            <ACenter></ACenter>
        </Container>
    )
}

export default Answer
