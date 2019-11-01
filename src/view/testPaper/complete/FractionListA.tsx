import React, { FC, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { RouteComponentProps } from '@reach/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { IStore } from '../../../store'

import Button from '../../../components/Button'

const Container = styled.div`
    padding: 0 10px;
`

const ButtonName = styled.span`
    display: inline-block;
    width: 88px;
`
const FractionWrap = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
`
const TestPaperWrap = styled.div``

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

const FunctWrap = styled.div`
    width: 152px;
    margin-left: 20px;

    button {
        svg {
            font-size: 20px;
        }
    }
`
interface IParams {
    testId: string
}

const FractionListA: FC<RouteComponentProps<IParams>> = props => {
    const { completeStore } = useContext<IStore>(MobXProviderContext)
    //下一题
    const handleClickNext = async () => {
        await completeStore.handleClickNext()
        // await props.history.push({
        //     pathname: `/complete/${props.match.params.testId}/${completeStore.currentProblemDetailData.id}`,
        //     state: {
        //         key: completeStore.currentProblemDetailData.key,
        //         courseId: completeStore.currentProblemDetailData.courseId,
        //     },
        // })
    }
    const paperPlaneOption = {
        width: '150px',
        height: '50px',
        size: '18px',
        family: 'PingFangSC-Medium',
        weight: '500',
        bgColor: '#fff',
        color: '#3f8cea',
        border: '2px solid #fff',
        shadow: '0px 2px 4px 0px rgba(13,109,177,0.25)',
        HColor: '#fff',
        HbgColor: '#3f8cea',
    }
    return useObserver(() => {
        return (
            <Container>
                <FractionWrap>
                    <TestPaperWrap>
                        <TestPaper>该题得分</TestPaper>
                        <Fraction>
                            <GetTotalScore>{completeStore.testProblemDetailData.getFraction}</GetTotalScore>
                            <Skim>/</Skim>
                            <TestTotalScore>{completeStore.testProblemDetailData.fraction}</TestTotalScore>
                        </Fraction>
                    </TestPaperWrap>
                    <FunctWrap>
                        <Button options={paperPlaneOption} onClick={handleClickNext}>
                            <FontAwesomeIcon icon={faPaperPlane} />
                            <ButtonName>下一题</ButtonName>
                        </Button>
                    </FunctWrap>
                </FractionWrap>
            </Container>
        )
    })
}

export default FractionListA
