import React, { FC, useContext, useState } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { RouteComponentProps, navigate } from '@reach/router'
import { Value } from 'slate'
import { FaReply, FaQuoteLeft, FaPaperPlane } from 'react-icons/fa'

import { IStore } from '../../../store'
import Editor from '../../../components/EditorX'
import Button from '../../../components/Button'
import Dialog from '../../../components/Dialog'

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
`

const ButtonWrap = styled.div`
    box-sizing: border-box;
    margin-right: 20px;
    svg {
        margin-right: 8px;
    }
`
const ButtonWrap1 = styled.div`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
    button:first-of-type {
        margin-right: 20px;
    }
`

const Left = styled.div`
    display: flex;
`
const Right = styled.div`
    display: flex;
    svg {
        margin-right: 8px;
    }
`
const RutemName = styled.span``
const ButtonName = styled.span``
const EditorWrap = styled.div`
    margin-top: 10px;
`

const Back: FC<RouteComponentProps> = props => {
    const { answerStore } = useContext<IStore>(MobXProviderContext)
    const [isShowReady, setIsShowReady] = useState(false)
    const [isSaveTestSubmit, setIsSaveTestSubmit] = useState(false)

    //交卷
    const handleClickSave = () => {
        setIsSaveTestSubmit(true)
        // answerStore.saveTestSubmit(history)
    }

    //打印
    const handleClickPrint = () => {
        navigate(`/answer/print/${answerStore.testProblemData.id}`, {
            state: {
                linkData: `/answer/${answerStore.testProblemData.id}`,
            },
        })
    }

    const handleCloseConfirm = () => {
        setIsSaveTestSubmit(false)
    }
    const handleConfirm = () => {
        setIsSaveTestSubmit(false)
        answerStore.saveTestSubmit()
    }

    const handleClickReady = () => {
        setIsShowReady(!isShowReady)
    }

    const handleClickClose = () => {
        setIsShowReady(false)
    }

    //返回首页
    const handleClickLink = () => {
        sessionStorage.removeItem('sessionCurrentType')
        navigate(`/`)
    }

    const starOption = {
        height: '40px',
        size: '16px',
        family: 'PingFangSC-Medium',
        weight: '500',
        bgColor: '#3E90F3',
        HbgColor: '#3f8cea',
    }
    const carryOption = {
        height: '40px',
        size: '16px',
        family: 'PingFangSC-Medium',
        weight: '500',
    }
    const carryOption1 = {
        height: '40px',
        size: '16px',
        family: 'PingFangSC-Medium',
        weight: '500',
        bgColor: '#E85B52',
        HbgColor: '#dc6f68',
    }
    const dialogOption = {
        width: '50%',
        marginTop: '8%',
        borderBottom: ' 1px solid rgba(151, 151, 151, 0.26)',
    }
    const dialogSaveOption = {
        width: '20%',
        height: '50px',
        marginTop: '10%',
        borderBottom: ' 1px solid rgba(151, 151, 151, 0.26)',
    }

    return useObserver(() => (
        <Container>
            <Left>
                <ButtonWrap>
                    <Button onClick={handleClickLink}>
                        <FaReply></FaReply>
                        <RutemName>返回首页</RutemName>
                    </Button>
                </ButtonWrap>
                {answerStore.testProblemData.preparation.id && (
                    <ButtonWrap>
                        <Button options={starOption} onClick={handleClickReady}>
                            <FaQuoteLeft></FaQuoteLeft>
                            <ButtonName>课前准备</ButtonName>
                        </Button>
                    </ButtonWrap>
                )}
            </Left>
            <Right>
                <Button options={carryOption} onClick={handleClickPrint}>
                    打印
                </Button>
                &nbsp; &nbsp; &nbsp;
                <Button options={carryOption1} onClick={handleClickSave}>
                    <FaPaperPlane></FaPaperPlane>
                    <ButtonName>交卷</ButtonName>
                </Button>
            </Right>
            {isShowReady ? (
                <Dialog title='课前准备' options={dialogOption} onClickClose={handleClickClose}>
                    <EditorWrap>
                        <Editor
                            value={Value.fromJSON(JSON.parse(answerStore.testProblemData.preparation.content))}
                            readonly
                        ></Editor>
                    </EditorWrap>
                </Dialog>
            ) : null}
            {isSaveTestSubmit ? (
                <Dialog title='交卷' options={dialogSaveOption} onClickClose={handleCloseConfirm}>
                    <ButtonWrap1>
                        <Button options={{ ...carryOption, bgColor: '#3E90F3' }} onClick={handleConfirm}>
                            确定
                        </Button>
                        <Button options={carryOption} onClick={handleCloseConfirm}>
                            取消
                        </Button>
                    </ButtonWrap1>
                </Dialog>
            ) : null}
        </Container>
    ))
}

export default Back
