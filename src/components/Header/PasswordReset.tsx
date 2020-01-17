import React, { FC, useEffect, useState, ChangeEventHandler, KeyboardEventHandler, useContext } from 'react'
import styled from '@emotion/styled'
import { Link, RouteComponentProps, navigate } from '@reach/router'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { FaExclamationTriangle } from 'react-icons/fa'
import Spinner from '../Spinner'

import { IStore } from '../../store'

import { encrypt } from '../../utils/encrypt'
import Input from '../../components/Input'

const MyH2 = styled.h2`
    color: #333;
`
const Container = styled.div`
    position: absolute;
    width: 500px;
    height: 600px;
    left: 50%;
    top: 50%;
    margin: -300px 0 0 -250px;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: rgba(16, 36, 94, 0.4) 0 2px 6px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    padding: 40px 40px;
`

const CaptchaWrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`
const CaptchaInput = styled(Input)``
const Captcha = styled.div`
    width: 150px;
    margin-left: 20px;
`
const CaptcahImg = styled.div<{ img: string }>`
    border: 1px solid #ccc;
    height: 46px;
    width: 100%;
    box-sizing: border-box;
    border-radius: 4px;
    background-image: url(${props => props.img});
    background-size: 100% 100%;
    cursor: pointer;
`
const LoginButton = styled.div`
    width: 100%;
    height: 56px;
    background-color: #00a6f3;
    line-height: 56px;
    text-align: center;
    color: #fff;
    font-size: 20px;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
    margin-bottom: 20px;
`
const Warn = styled.div`
    color: red;
    cursor: pointer;
    width: 100%;
    height: 100%;
`
const CaptchaContent = styled.div`
    height: 46px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`
const CaptchaHelper = styled.div`
    height: 20px;
    width: 100%;
    text-align: center;
    line-height: 20px;
    font-size: 12px;
    color: red;
`

const PasswordReset: FC<RouteComponentProps> = () => {
    const { userStore } = useContext<IStore>(MobXProviderContext)
    const [password, setPassword] = useState('')
    const [passwordReset, setPasswordReset] = useState('')
    const [passwordReset1, setPasswordReset1] = useState('')
    const [captcha, setCaptcha] = useState('')
    const [passwordMsg, setPasswordMsg] = useState('')
    const [passwordResetMsg, setPasswordResetMsg] = useState('')
    const [passwordReset1Msg, setPasswordReset1Msg] = useState('')
    const [captchaMsg, setCaptchaMsg] = useState('')

    //原密码
    const handleChangePassword: ChangeEventHandler<HTMLInputElement> = event => {
        setPasswordMsg('')
        setPassword(event.target.value)
    }
    //新密码
    const handleChangePasswordReset: ChangeEventHandler<HTMLInputElement> = event => {
        setPasswordResetMsg('')
        setPasswordReset(event.target.value)
    }
    //确认密码
    const handleChangePasswordReset1: ChangeEventHandler<HTMLInputElement> = event => {
        setPasswordReset1Msg('')
        setPasswordReset1(event.target.value)
    }
    //验证码
    const handleChangeCaptcha: ChangeEventHandler<HTMLInputElement> = event => {
        setCaptchaMsg('')
        setCaptcha(event.target.value)
    }
    //输入验证
    const checkForm = () => {
        if (!password) {
            setPasswordMsg('请输入原密码')
            return false
        } else if (!passwordReset) {
            setPasswordResetMsg('新密码不能为空')
            return false
        } else if (passwordReset.length < 6) {
            setPasswordResetMsg('请输入长度超过6位的密码')
            return false
        } else if (passwordReset.length > 20) {
            setPasswordResetMsg('密码长度不能超过20位')
            return false
        } else if (!passwordReset1) {
            setPasswordReset1Msg('请再次输入密码以确认')
            return false
        } else if (passwordReset !== passwordReset1) {
            setPasswordReset1Msg('请确保两次输入的密码一致')
            return false
        } else if (!captcha) {
            setCaptchaMsg('请输入验证码')
            return false
        } else if (captcha.toUpperCase() !== userStore.captcha!.capText.toUpperCase()) {
            setCaptchaMsg('请输入正确的验证码')
            return false
        }
        return true
    }
    const doChangePassword = () => {
        if (checkForm()) {
            const data = {
                password: encrypt(userStore.username, password, captcha, userStore.captcha!.key),
                passwordReset: encrypt(userStore.username, passwordReset, captcha, userStore.captcha!.key),
                key: userStore.captcha!.key,
                captcha: captcha,
            }
            userStore.doChangePasswd(data).then(res => {
                if (res === 'ok') {
                    navigate('/')
                }
            })
        } else {
            userStore.getCaptcha()
        }
    }
    const handleClickCaptcha = () => {
        userStore.getCaptcha()
    }
    const handleEnter: KeyboardEventHandler = event => {
        if (event.which === 13) {
            // @ts-ignore
            event.target.blur()
            doChangePassword()
        }
    }
    useEffect(() => {
        userStore.getCaptcha()
        // eslint-disable-next-line
    }, [])
    return useObserver(() => (
        <Container>
            <MyH2>修改密码</MyH2>
            <Input
                type='password'
                message={passwordMsg}
                label='原密码'
                value={password}
                onChange={handleChangePassword}
            />
            <Input
                type='password'
                label='新密码'
                message={passwordResetMsg}
                value={passwordReset}
                onChange={handleChangePasswordReset}
            />
            <Input
                type='password'
                label='确认密码'
                message={passwordReset1Msg}
                value={passwordReset1}
                onChange={handleChangePasswordReset1}
            />
            <CaptchaWrap>
                <CaptchaInput
                    label='验证码'
                    type='text'
                    value={captcha}
                    onChange={handleChangeCaptcha}
                    message={captchaMsg}
                    onKeyUp={handleEnter}
                />
                <Captcha>
                    <CaptchaContent>
                        {!userStore.captchaReady ? (
                            <Spinner />
                        ) : userStore.captchaImgMsg ? (
                            <Warn onClick={handleClickCaptcha}>
                                <FaExclamationTriangle />
                            </Warn>
                        ) : (
                            <CaptcahImg img={userStore.captcha!.base64} onClick={handleClickCaptcha} />
                        )}
                    </CaptchaContent>
                    <CaptchaHelper>{userStore.captchaImgMsg}</CaptchaHelper>
                </Captcha>
            </CaptchaWrap>
            <LoginButton onClick={doChangePassword}>确认修改</LoginButton>
            <Link to='/' style={{ color: '#333' }}>
                返回首页
            </Link>
        </Container>
    ))
}

export default PasswordReset
