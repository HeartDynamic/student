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
    box-sizing: border-box;
    height: 100%;
    width: 100%;
    padding-right: 5px;
`
const Wrap = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow: auto;
    &::-webkit-scrollbar-button {
        background-color: #fff;
    }
    &::-webkit-scrollbar {
        background-color: #fff;
        width: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgba(66, 88, 99, 0.4);
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: #ddd;
    }
`
const Package = styled.div`
    box-sizing: border-box;
    display: flex;
    width: 1260px;
    margin: 20px auto 0;
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
            <Wrap>
                <Package>
                    <ALeft></ALeft>
                    <ACenter></ACenter>
                </Package>
            </Wrap>
        </Container>
    )
}

export default Answer
