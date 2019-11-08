import React, { FC, useState } from 'react'
import styled from '@emotion/styled'
import { Link } from '@reach/router'
import { FaSignInAlt } from 'react-icons/fa'

const Container = styled.div`
    background-color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    box-sizing: border-box;
    padding: 8px 10px;
`
const Triangle = styled.div`
    width: 0;
    height: 0;
    border-bottom: 20px solid rgba(255, 255, 255, 1);
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translate(-20px);
`
const ShowLink = styled.div`
    display: none;
    position: absolute;
    top: 40px;
    z-index: 1;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 8px 0px rgba(106, 174, 255, 0.55);
    border-radius: 10px;
    padding: 10px 20px;
`
const Content = styled.div`
    height: 100%;
    width: 100%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    &:hover {
        border-radius: 4px;
        background-color: #00a6f3;
        span {
            color: #fff;
        }
        ${ShowLink} {
            display: block;
        }
    }
`
const SubjectName = styled.span`
    font-size: 14px;
    color: #00a6f3;
`
const Wrap = styled.div``
const Header = styled.div`
    font-size: 16px;
    font-family: PingFangSC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    padding: 10px 0;
`

const Ul = styled.ul`
    display: flex;
`
const Li = styled.li`
    box-sizing: border-box;
    width: 90px;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    a {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
`

const Name = styled.div`
    font-size: 18px;
    font-family: PingFangSC;
    font-weight: 500;
    color: rgba(65, 154, 241, 1);
`

const Statu = styled.div<{ setColor: string }>`
    font-size: 14px;
    font-family: PingFangSC;
    font-weight: 500;
    color: ${props => props.setColor};
    padding: 14px 0;
`
const Icon = styled.div<{ bgColor?: string; shadow?: string }>`
    width: 30px;
    height: 30px;
    background-color: ${props => props.bgColor};
    border-radius: 50%;
    text-align: center;
    line-height: 30px;
    box-shadow: ${props => props.shadow};
    color: #fff;
`
const Icon1 = styled.div`
    width: 30px;
    height: 30px;
`

interface ITestList {
    id: null | number
    status: null | number
    testId: null | number
    type: null | number
    testStatus: null | number
    totalScore: null | number
}
interface IProps {
    data: {
        courseId?: number
        courseSubjectName?: string
        courseName?: string
        testList?: ITestList[]
    }
}

const ClassCourse: FC<IProps> = props => {
    const [typeArr] = useState(['预习', '随堂测', '作业', '测试'])

    const FunctLink = (data: ITestList, index: number) => {
        let isLink = false
        let setName = '无'
        let setStyle = {
            color: 'rgba(70,176,178,1)',
            bgColor: 'rgba(65,154,241,1)',
            shadow: '0px 4px 7px 0px rgba(65,154,241,1)',
        }
        let pathname = `/answer/${data.id}`
        let state = {}

        if ((data.status === 1 || data.status === 2) && data.testStatus === 1) {
            pathname = `/answer/${data.id}`
            isLink = true
            setName = '去作答'
            setStyle = {
                color: 'rgba(244,64,64,1)',
                bgColor: 'rgba(244,64,64,1)',
                shadow: '0px 4px 7px 0px rgba(245,66,66,1)',
            }
        } else if (data.status === 3 && data.testStatus === 1) {
            pathname = `/submit/${data.id}`
            state = { courseId: props.data.courseId }
            isLink = true
            setName = '去查看'
            setStyle.color = 'rgba(51,51,51,1)'
        } else if ((data.status === 1 || data.status === 2 || data.status === 3) && data.testStatus === 3) {
            pathname = `/entry/${data.id}`
            state = { courseId: props.data.courseId }
            setName = '去录入'
            isLink = true
            setStyle = {
                color: 'rgba(51,51,51,1)',
                bgColor: 'rgba(253,65,128,1)',
                shadow: '0px 4px 7px 0px rgba(253,65,128,1)',
            }
        } else if (data.status === 4 && data.testStatus === 3) {
            pathname = `/complete/${data.id}`
            state = { courseId: props.data.courseId }
            isLink = true
            setName = '已完成'
            setStyle.color = 'rgba(70,176,178,1)'
        }
        if (isLink) {
            return (
                <Li key={index}>
                    <Link to={pathname} state={state}>
                        <Name>{typeArr[index]}</Name>
                        <Statu setColor={setStyle.color}>{setName}</Statu>
                        <Icon bgColor={setStyle.bgColor} shadow={setStyle.shadow}>
                            <FaSignInAlt></FaSignInAlt>
                        </Icon>
                    </Link>
                </Li>
            )
        } else {
            return (
                <Li key={index}>
                    <Name>{typeArr[index]}</Name>
                    <Statu setColor={setStyle.color}>{setName}</Statu>
                    <Icon1></Icon1>
                </Li>
            )
        }
    }
    return (
        <Container>
            {props.data && (
                <Content>
                    <SubjectName>{props.data.courseSubjectName}</SubjectName>
                    <ShowLink>
                        <Triangle></Triangle>
                        <Wrap>
                            <Header>{props.data.courseName}</Header>
                            <Ul>
                                {props.data.testList &&
                                    props.data.testList.map((item: ITestList, index: number) => FunctLink(item, index))}
                            </Ul>
                        </Wrap>
                    </ShowLink>
                </Content>
            )}
        </Container>
    )
}

export default ClassCourse
