/*
   交卷之后（老师公布答案）
*/
import React, { useEffect, FC, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { RouteComponentProps } from '@reach/router'
import { IStore } from '../../../store'

import ALeft from './ALeft'
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
    key: string
    courseId: string
}

const Answer: FC<RouteComponentProps<IParams>> = props => {
    const { entryStore } = useContext<IStore>(MobXProviderContext)
    useEffect(() => {
        entryStore.getTestProblemEntering({
            id: Number(props.id),
            url: props.uri!,
        })
        // eslint-disable-next-line
    }, [props.id])
    return (
        <Container>
            <ALeft />
            <ACenter />
        </Container>
    )
}

export default Answer
