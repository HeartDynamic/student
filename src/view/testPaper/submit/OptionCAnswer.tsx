import React from 'react'
import styled from '@emotion/styled'
import { useObserver } from 'mobx-react-lite'

import PlanView from '../common/PlanView'

const MyAnswerLi = styled.div`
    display: flex;
    align-items: center;
    background-color: #eef5f5;
    border-radius: 10px;
    margin-top: 16px;
    margin-right: 16px;
    margin-left: 16px;
`

const NUmber = styled.span`
    display: inline-block;
    margin: 30px;
    width: 40px;
    height: 40px;
    line-height: 40px;
    background-color: #3a93df;
    border-radius: 50px;
    text-align: center;
    color: #fff;
`
const MyEditorWrapList = styled.div`
    flex: 1;
    background-color: #eef5f5;
    border-radius: 8px;
`
interface IProps {
    data: any
}
const OptionC = (props: IProps) => {
    return useObserver(() => {
        return (
            <MyAnswerLi>
                <NUmber>{props.data.index + 1}</NUmber>
                <MyEditorWrapList>
                    <PlanView data={props.data.value} />
                </MyEditorWrapList>
            </MyAnswerLi>
        )
    })
}

export default OptionC
