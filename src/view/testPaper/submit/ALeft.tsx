import React, { FC, useContext, useState } from 'react'
import styled from '@emotion/styled'
import { useObserver } from 'mobx-react-lite'
import { MobXProviderContext } from 'mobx-react'
import { RouteComponentProps, navigate } from '@reach/router'
import { Value } from 'slate'
import { FaReply } from 'react-icons/fa'

import { IStore } from '../../../store'
import Editor from '../../../components/EditorX'
import Dialog from '../../../components/Dialog'
import Button from '../../../components/Button'

interface ITestList {
    id: number
    type: number
    testId: number
    status: number
}

interface IOptions {
    currenState: boolean
}

const Container = styled.div`
    width: 160px;
    height: 100%;
    margin-right: 20px;
`

const TestWrap = styled.div`
    box-sizing: border-box;
    margin-top: 26px;
    width: 100%;
    box-shadow: 0px 9px 8px 0px rgba(232, 91, 82, 0.12);
    border-radius: 11px;
    padding: 8px;
`
const ReadyWrap = styled.div`
    height: 60px;
    border-bottom: 1px solid #fff2f2;
`
const ReadyName = styled.span`
    display: inline-block;
    width: 100%;
    line-height: 60px;
    text-align: center;
    cursor: pointer;
    font-size: 20px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(71, 154, 245, 1);
`
const Test = styled.div<{ option: IOptions }>`
    width: 147px;
    height: 48px;
    text-align: center;
    line-height: 48px;
    font-size: 20px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    background-color: ${props => (props.option.currenState ? '#3B8DF2' : '')};
    color: ${props => (props.option.currenState ? '#fff' : '')};
    border-radius: 10px;
    margin-bottom: 4px;
    :hover {
        background-color: rgba(59, 141, 242, 1);
        color: #fff;
        cursor: pointer;
    }
`
const RutemName = styled.span``
const ButtonWrap = styled.div`
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 20px;
    svg {
        margin-right: 8px;
    }
`

const ALeft: FC<RouteComponentProps> = props => {
    const [isShowReady, setIsShowReady] = useState(false)
    const [typeArr] = useState([
        { id: 1, name: '随堂测' },
        { id: 2, name: '作业' },
        { id: 3, name: '测试' },
        { id: 4, name: '预习' },
    ])
    const { submitStore } = useContext<IStore>(MobXProviderContext)

    //课前准备
    const handleClickReady = () => {
        setIsShowReady(!isShowReady)
    }

    //切换类型
    const handleClickTestType = (data: ITestList) => {
        // if (submitStore.testProblemData.id === data.id) return
        // submitStore.testProblemData.id = data.id
        // props.history.push({
        //     pathname: `/submit/${data.id}`,
        //     state: {
        //         courseId: submitStore.testsStatuData.courseId.toString(),
        //     },
        // })
    }

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
    const dialogOption = {
        width: '50%',
        marginTop: '8%',
        borderBottom: ' 1px solid rgba(151, 151, 151, 0.26)',
    }
    return useObserver(() => (
        <Container>
            <ButtonWrap>
                <Button options={buttonOption} onClick={handleClickLink}>
                    <FaReply></FaReply>
                    <RutemName>返回首页</RutemName>
                </Button>
            </ButtonWrap>
            <TestWrap>
                {submitStore.testProblemData.preparation.id && (
                    <ReadyWrap>
                        <ReadyName onClick={handleClickReady}>课前准备</ReadyName>
                        {isShowReady ? (
                            <Dialog title='课前准备' options={dialogOption} onClickClose={handleClickReady}>
                                <Editor
                                    value={Value.fromJSON(JSON.parse(submitStore.testProblemData.preparation.content))}
                                    readonly
                                ></Editor>
                            </Dialog>
                        ) : null}
                    </ReadyWrap>
                )}
                {submitStore.testsStatuData.testList.map((item: ITestList) => (
                    <Test
                        key={item.id}
                        option={{ currenState: submitStore.testProblemData.id === item.id }}
                        onClick={() => handleClickTestType(item)}
                    >
                        {typeArr[item.type - 1].name}
                    </Test>
                ))}
            </TestWrap>
        </Container>
    ))
}

export default ALeft
