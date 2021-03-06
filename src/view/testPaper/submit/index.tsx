/*
   交卷之后（老师未公布答案）
*/
import React, { useEffect, FC, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { RouteComponentProps } from '@reach/router'
import { IStore } from '../../../store'

import ALeft from './ALeft'
import ACenter from './ACenter'

interface IParams {
    id: string
    key: string
    courseId: string
}

const Container = styled.div`
    width: 1320px;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    /* grid-template-columns: 160px 1fr; */
    /* grid-column-gap: 20px; */
    margin: 0px auto;
    padding-top: 20px;
`

interface IParams {
    id: string
}
const Answer: FC<RouteComponentProps<IParams>> = props => {
    const { submitStore } = useContext<IStore>(MobXProviderContext)
    useEffect(() => {
        if (props.id) {
            submitStore.getTestProblem(Number(props.id))
        }
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
