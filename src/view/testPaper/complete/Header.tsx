import React, { FC, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { Link, navigate } from '@reach/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReply } from '@fortawesome/free-solid-svg-icons'

import { IStore } from '../../../store'
import Circle from '../../../components/Echarts/Circle'
import Button from '../../../components/Button'

const Container = styled.div`
    box-sizing: border-box;
    width: 1320px;
    height: 270px;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0px 2px 4px 0px rgba(31, 122, 171, 0.2);
    border-radius: 6px;
    border: 3px solid rgba(255, 255, 255, 1);
    padding: 0 30px;
`
const TitleWrap = styled.div`
    margin: 30px 0 24px 0;
`
const Title = styled.span`
    display: inline-block;
    text-align: center;
    font-size: 16px;
    font-family: PingFangSC;
    font-weight: 500;
    color: rgba(20, 78, 94, 1);
`
const Vertical = styled.span`
    display: inline-block;
    width: 60px;
    text-align: center;
    color: #d4dae8;
`
const TitleType = styled.span`
    font-size: 18px;
    font-family: PingFangSC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
`
const FractionContainer = styled.div`
    display: flex;
    height: 160px;
`
const FeaturesWrap = styled.div`
    width: 160px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`
const RutemWrap = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 56px;
    line-height: 54px;
    box-shadow: 0px 6px 5px 0px rgba(59, 141, 242, 0.2);
    border-radius: 11px;
    border: 1px solid rgba(153, 153, 153, 1);
    a {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        color: #999;
    }
`
const RutemName = styled.span``
const CircleTypeWrap = styled.ul`
    box-sizing: border-box;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding: 0 30px;
`
const LiItem = styled.li`
    width: 160px;
    height: 160px;
`
const CircleWrap = styled.div`
    width: 100%;
    height: 100%;
`

const TestPaperWrap = styled.div``
const TotalScoreWrap = styled.div`
    width: 120px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`
const TestPaper = styled.div`
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
`
const Fraction = styled.div`
    margin-top: 10px;
    font-family: PingFangSC;
    font-weight: 500;
    color: rgba(237, 80, 131, 1);
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
const TestTotalProblem = styled.div``
const TotalProblem = styled.div`
    text-align: center;
    font-size: 20px;
    font-family: PingFangSC;
    font-weight: 500;
    color: rgba(58, 147, 223, 1);
`
const ButtonWrap = styled.div`
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 20px;
    svg {
        margin-right: 8px;
    }
`

const Header: FC = props => {
    const { completeStore } = useContext<IStore>(MobXProviderContext)

    //返回首页
    const handleClickLink = () => {
        sessionStorage.removeItem('sessionCurrentType')
        navigate(`/`)
    }

    const buttonOption = {
        height: '40px',
        color: 'rgba(153, 153, 153, 1)',
        border: '1px solid rgba(153,153,153,1)',
        shadow: '0px 6px 5px 0px rgba(59,141,242,0.2)',
        HColor: '#3a93df',
        HBorder: '1px solid #3a93df',
    }

    return useObserver(() => {
        return (
            <Container>
                <TitleWrap>
                    <Title>试卷</Title>
                    <Vertical>|</Vertical>
                    <TitleType>{completeStore.testProblemData.testName}</TitleType>
                </TitleWrap>
                <FractionContainer>
                    <FeaturesWrap>
                        <ButtonWrap>
                            <Button options={buttonOption} onClick={handleClickLink}>
                                <FontAwesomeIcon icon={faReply} />
                                <RutemName>返回首页</RutemName>
                            </Button>
                        </ButtonWrap>
                        <RutemWrap>
                            <Link to='/'>
                                <RutemName>查看该卷分析</RutemName>
                            </Link>
                        </RutemWrap>
                    </FeaturesWrap>
                    <CircleTypeWrap>
                        {completeStore.testAccuracy.problemAccuracy.map((item, index) => (
                            <LiItem key={item.type}>
                                <CircleWrap>
                                    <Circle data={{ ...item, circleId: 'circle' + index }}></Circle>
                                </CircleWrap>
                            </LiItem>
                        ))}
                    </CircleTypeWrap>
                    <TotalScoreWrap>
                        <TestPaperWrap>
                            <TestPaper>试卷得分</TestPaper>
                            <Fraction>
                                <GetTotalScore>{completeStore.testAccuracy.getTotalScore}</GetTotalScore>
                                <Skim>/</Skim>
                                <TestTotalScore>{completeStore.testAccuracy.testTotalScore}</TestTotalScore>
                            </Fraction>
                        </TestPaperWrap>
                        <TestTotalProblem>
                            <TestPaper>总题数</TestPaper>
                            <TotalProblem>{completeStore.testAccuracy.testTotalProblem}</TotalProblem>
                        </TestTotalProblem>
                    </TotalScoreWrap>
                </FractionContainer>
            </Container>
        )
    })
}

export default Header
