import React, { useEffect, FC, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { navigate } from '@reach/router'
import { FaDotCircle, FaSignInAlt } from 'react-icons/fa'

import { IStore } from '../../store'
import { IAllTestList } from '../../store/main'

interface StyledComponentProps {
    stypeOption: {
        color: string
        shadow: string
    }
}

const ScrollbarWrap = styled.div`
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - 46px);
    overflow-y: auto;
    padding-right: 30px;
    padding-top: 20px;
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
    height: 100%;
`
const MyLi = styled.li`
    margin-bottom: 20px;
`
const MyInfoWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const Myvertical = styled.div`
    position: relative;
    left: 12px;
    width: 6px;
    height: 40px;
    background-color: rgba(211, 222, 255, 1);
    border-radius: 3px;
`
const MyInfoLeft = styled.div`
    display: flex;
`
const MyInfoRight = styled.div<StyledComponentProps>`
    width: 56px;
    height: 56px;
    font-size: 20px;
    text-align: center;
    line-height: 54px;
    background-color: ${props => props.stypeOption.color};
    box-shadow: ${props => props.stypeOption.shadow};
    border-radius: 50%;
    color: #fff;
    cursor: pointer;
`
const MyFontWrap = styled.div<StyledComponentProps>`
    width: 50px;
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: ${props => props.stypeOption.color};
    svg {
        font-size: 20px;
        margin-left: 6px;
    }
`
const MyTestName = styled.div`
    margin-top: 4px;
    font-size: 16px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
`
const MySubjectNameWrap = styled.div``
const MyTestVolumes = styled.div`
    font-size: 16px;
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: rgba(74, 74, 74, 1);
    margin-top: 2px;
`
const MyTimeWrap = styled.div``
const MyTime = styled.span`
    font-size: 14px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(213, 213, 213, 1);
    margin-left: 20px;
`
const MysubjectName = styled.span`
    font-size: 18px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(74, 74, 74, 1);
`

const DynamicList: FC = props => {
    const { mainStore } = useContext<IStore>(MobXProviderContext)
    useEffect(() => {
        let data = {
            page: 1,
            limit: 10,
        }
        mainStore.getAllTestList(data)
        // eslint-disable-next-line
    }, [])

    const handleClickLink = (data: IAllTestList) => {
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
        <ScrollbarWrap>
            <MyUl>
                {mainStore.allTestListData.data.map((item: IAllTestList, index: number) => (
                    <MyLi key={index}>
                        <MyInfoWrap>
                            <MyInfoLeft>
                                <MyFontWrap stypeOption={{ color: item.color, shadow: item.shadow }}>
                                    <FaDotCircle></FaDotCircle>
                                    <MyTestName>{item.testName}</MyTestName>
                                </MyFontWrap>
                                <MySubjectNameWrap>
                                    <MyTimeWrap>
                                        <MysubjectName>{item.subjectName}</MysubjectName>
                                        <MyTime>
                                            {item.createTimeName} 星期{item.createTimeWeek}
                                        </MyTime>
                                    </MyTimeWrap>
                                    <MyTestVolumes>{item.testVolumesName}</MyTestVolumes>
                                </MySubjectNameWrap>
                            </MyInfoLeft>
                            <MyInfoRight
                                stypeOption={{ color: item.color, shadow: item.shadow }}
                                title={'进入' + item.testName}
                                onClick={() => handleClickLink(item)}
                            >
                                <FaSignInAlt></FaSignInAlt>
                            </MyInfoRight>
                        </MyInfoWrap>
                        {mainStore.allTestListData.data.length !== index + 1 && <Myvertical />}
                    </MyLi>
                ))}
            </MyUl>
        </ScrollbarWrap>
    ))
}

export default DynamicList
