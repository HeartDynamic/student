import React, { FC } from 'react'
import styled from '@emotion/styled'

const TestPaperWrap = styled.div`
    padding-bottom: 20px;
`

const TestPaper = styled.div`
    font-size: 14px;
    font-family: PingFangSC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
`
const Fraction = styled.div`
    margin-top: 10px;
    font-family: PingFangSC;
    font-weight: 500;
    color: #3a93df;
`
const GetTotalScore = styled.span`
    font-size: 36px;
`
const Skim = styled.span`
    display: inline-block;
    padding: 0 10px 0 20px;
`

const TestTotalScore = styled.span`
    font-size: 16px;
`

interface IParams {
    data: {
        getFraction: number
        fraction: number
    }
}

const FractionListA: FC<IParams> = props => {
    return (
        <TestPaperWrap>
            <TestPaper>该题得分</TestPaper>
            <Fraction>
                <GetTotalScore>{props.data.getFraction}</GetTotalScore>
                <Skim>/</Skim>
                <TestTotalScore>{props.data.fraction}</TestTotalScore>
            </Fraction>
        </TestPaperWrap>
    )
}

export default FractionListA
