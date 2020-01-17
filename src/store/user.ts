import { observable, action } from 'mobx'
import Cookies from 'js-cookie'

import Toast from '../components/Toast'

import api from '../api'

interface IUserInfo {
    id: number
    username: string
    realName: string
    subjectName: string
    schoolName: string
}

interface ICaptcha {
    base64: string
    capText: string
    key: string
}

interface IPasswdReset {
    password: string
    passwordReset: string
    key: string
    captcha: string
}

export interface IUserStore {
    userInfoReady: boolean
    username: string
    userInfo: IUserInfo
    getUserInfo(): Promise<void>
    logOut(): Promise<void>
    getCaptcha(): Promise<void>
    captcha: ICaptcha | null
    captchaImgMsg: string
    captchaReady: boolean
    isChangingPassword: boolean
    doChangePasswd(data: IPasswdReset): Promise<string | undefined>
}

class UserStore implements IUserStore {
    @observable userInfoReady = false
    @observable captchaImgMsg = ''

    @observable isChangingPassword = false
    @observable captcha = null
    @observable captchaReady = false
    @observable username = Cookies.get('username') || ''
    @observable userInfo: IUserInfo = {
        id: -1,
        username: '',
        realName: '',
        subjectName: '',
        schoolName: '',
    }
    token = Cookies.get('token')

    @action async getUserInfo() {
        if (!this.userInfoReady) {
            try {
                const res = await api.user.getUserInfo()
                if (res.success) {
                    this.userInfo = res.data
                    this.userInfoReady = true
                }
            } catch (error) {}
        }
    }
    @action async logOut() {
        try {
            const res = await api.auth.logOut()
            if (res.success) {
                Cookies.remove('token')
                Cookies.remove('uploadToken')
                window.location.href =
                    process.env.NODE_ENV === 'production' ? 'https://www.likeyun.net' : 'http://localhost:1234'
            }
        } catch (error) {}
    }
    @action async getCaptcha() {
        this.captchaReady = false
        try {
            const res = await api.auth.getCaptcha()
            if (res.success) {
                this.captcha = res.data
                this.captchaReady = true
            }
        } catch (e) {}
    }

    @action async doChangePasswd(data: IPasswdReset) {
        this.isChangingPassword = true
        try {
            const res = await api.auth.passwordReset(data)
            if (res.success) {
                this.isChangingPassword = false
                Toast.success('修改成功')
                return Promise.resolve('ok')
            }
        } catch (e) {
            this.getCaptcha()
        }
    }
}

export const userStore = new UserStore()
