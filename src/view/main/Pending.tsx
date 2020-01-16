import React, { useEffect, FC, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { navigate } from '@reach/router'
import { FaSignInAlt } from 'react-icons/fa'

import { IStore } from '../../store'
import { IAllTestList } from '../../store/main'

interface StyledComponentProps {
    color: string
}

const Container = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - 126px);
    padding-right: 10px;
`

const ScrollbarWrap = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow-y: auto;

    padding-left: 12px;
    padding-top: 18px;
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
const MyUl = styled.ul`
    box-sizing: border-box;
    padding-right: 20px;
    :last-of-type li {
        margin-bottom: 20px;
    }
`
const MyLi = styled.li`
    width: 240px;
    height: 60px;
    box-shadow: 0px 4px 8px 0px rgba(124, 138, 205, 0.23);
    border-radius: 6px;
    position: relative;
    left: 26px;
    margin-top: 20px;
`

const MyInfoRight = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 50px;
    padding-right: 20px;
    font-size: 20px;
    text-align: center;
    line-height: 54px;
    color: #419af1;
    cursor: pointer;
`

const MyTestVolumes = styled.div`
    font-size: 16px;
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: rgba(74, 74, 74, 1);
    margin-top: 2px;
`

const MysubjectName = styled.span<StyledComponentProps>`
    display: inline-block;
    width: 68px;
    text-align: center;
    height: 32px;
    line-height: 32px;
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    background-color: ${props => props.color};
    border-radius: 16px;
    position: absolute;
    left: -30px;
    top: 50%;
    transform: translateY(-16px);
`

const Pending: FC = props => {
    const { mainStore } = useContext<IStore>(MobXProviderContext)
    useEffect(() => {
        let data = {
            page: 1,
            limit: 10,
        }
        mainStore.getTaskTestList(data)
        // eslint-disable-next-line
    }, [])

    const handleClickLink = (data: IAllTestList) => {
        console.log(data, 123)
        sessionStorage.removeItem('sessionCurrentType')
        if ((data.status === 1 || data.status === 2) && data.testStatus === 1) {
            navigate(`/answer/${data.id}`)
        } else if (data.status === 3 && data.testStatus === 1) {
            navigate(`/submit/${data.id}`, { state: { courseId: data.courseId } })
        } else if ((data.status === 1 || data.status === 2 || data.status === 3) && data.testStatus === 3) {
            navigate(`/entry/${data.id}`, { state: { courseId: data.courseId } })
        } else if (data.status === 4 && data.testStatus === 3) {
            navigate(`/complete/${data.id}`, { state: { courseId: data.courseId } })
        }
    }

    return useObserver(() => (
        <Container>
            <ScrollbarWrap>
                <MyUl>
                    {mainStore.taskTestListData.data.map((item: IAllTestList, index: number) => (
                        <MyLi key={index} title={'进入' + item.testName} onClick={() => handleClickLink(item)}>
                            <MysubjectName color={item.color}>{item.subjectName}</MysubjectName>
                            <MyInfoRight color={item.color}>
                                <MyTestVolumes>{item.testVolumesName}</MyTestVolumes>
                                <FaSignInAlt></FaSignInAlt>
                            </MyInfoRight>
                        </MyLi>
                    ))}
                </MyUl>
            </ScrollbarWrap>
        </Container>
    ))
}

export default Pending
