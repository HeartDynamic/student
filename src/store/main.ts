import { observable, action } from 'mobx'
import dayjs from 'dayjs'

import api from '../api'

export interface IAllTestList {
    id: number
    courseId: number
    subjectId: number
    testId: number
    testVolumesName: string
    testType: number
    status: number
    testStatus: number
    color: string
    shadow: string
    subjectName: string
    testName: string
    createTime: number
    createTimeName: string
    createTimeWeek: string
}
export interface IAllTestPage {
    keyword: null | string
    offset: number
    limit: number
    page: number
    total: number
}

interface IAllTestListData {
    data: IAllTestList[]
    page: IAllTestPage
}

export interface IMainStore {
    getTingAllTestList: boolean
    getAllTestListReady: boolean
    allTestListData: IAllTestListData
    getAllTestList(data: object): Promise<void>
    getTingTaskTestList: boolean
    getTaskTestListReady: boolean
    taskTestListData: IAllTestListData
    getTaskTestList(data: object): Promise<void>
}

// interface IAlways<T, K> {
//     (x: T, y: K): T;
// }
// function always<T, K>(x: T, y: K) : T {
//     return x
// }
// const alwaysNumber : IAlways<number, string> = always

class MainStore implements IMainStore {
    @observable getTingAllTestList = false
    @observable getAllTestListReady = false
    @observable allTestListData = {
        data: [],
        page: {
            keyword: null,
            offset: 0,
            limit: 0,
            page: 0,
            total: 0,
        },
    }

    @observable getTingTaskTestList = false
    @observable getTaskTestListReady = false
    @observable taskTestListData = {
        data: [],
        page: {
            keyword: null,
            offset: 0,
            limit: 0,
            page: 0,
            total: 0,
        },
    }

    @action async getAllTestList(data: object) {
        this.getTingAllTestList = true
        try {
            const res = await api.main.getAllTestList(data)
            if (res.success) {
                let dataArr = [
                    {
                        color: '#419AF1',
                        name: '随堂测',
                        subjectName: '数学',
                        shadow: '0px 4px 7px 0px rgba(65,154,241,1)',
                    },
                    {
                        color: '#419AF1',
                        name: '作业',
                        subjectName: '物理',
                        shadow: '0px 4px 7px 0px rgba(65,154,241,1)',
                    },
                    {
                        color: '#FD289B',
                        name: '考试',
                        subjectName: '化学',
                        shadow: '0px 4px 7px 0px rgba(253,40,155,0.53)',
                    },
                    {
                        color: '#FEA33C',
                        name: '预习',
                        subjectName: '生物',
                        shadow: '0px 4px 7px 0px rgba(254,163,60,0.55)',
                    },
                ]
                let weekArr = ['一', '二', '三', '四', '五', '六', '日']
                res.data.map((item: IAllTestList, index: number) => {
                    item.color = dataArr[item.testType - 1].color
                    item.shadow = dataArr[item.testType - 1].shadow
                    item.testName = dataArr[item.testType - 1].name
                    item.subjectName = dataArr[item.subjectId - 1].subjectName
                    item.createTimeName = dayjs(item.createTime * 1000).format('YYYY-MM-DD')
                    item.createTimeWeek = weekArr[Number(dayjs(item.createTime * 1000).format('d')) - 1]
                    return item
                })
                this.allTestListData = res
                this.getTingAllTestList = false
                this.getAllTestListReady = true
            }
        } catch (error) {}
    }

    @action async getTaskTestList(data: object) {
        this.getTingTaskTestList = true
        try {
            const res = await api.main.getTaskTestList(data)
            if (res.success) {
                let dataArr = [
                    { color: '#419AF1', name: '随堂测', subjectName: '数学' },
                    { color: '#419AF1', name: '作业', subjectName: '物理' },
                    { color: '#FD289B', name: '考试', subjectName: '化学' },
                    { color: '#FEA33C', name: '预习', subjectName: '生物' },
                ]
                let weekArr = ['一', '二', '三', '四', '五', '六', '日']
                res.data.map((item: IAllTestList, index: number) => {
                    item.color = dataArr[item.testType - 1].color
                    item.testName = dataArr[item.testType - 1].name
                    item.subjectName = dataArr[item.subjectId - 1].subjectName
                    item.createTimeName = dayjs(item.createTime * 1000).format('YYYY-MM-DD')
                    item.createTimeWeek = weekArr[Number(dayjs(item.createTime * 1000).format('d')) - 1]
                    return item
                })
                this.taskTestListData = res
                this.getTingTaskTestList = false
                this.getTaskTestListReady = true
            }
        } catch (error) {}
    }
}

export const mainStore = new MainStore()
