import { observable, action } from 'mobx'

import api from '../api'

interface ITestProblemDetail {
    id: number
    problemId: number
    studentId: number
    subjectId: number
    type: number
    topic: any
    option: any
    answer: any
    solution: any
    studentAnswer: any
    loreList: { id: number; name: string }[]
}

export interface IPractiseStore {
    gettingDailyProblem: boolean
    dailyProblemReady: boolean
    dailyProblem: ITestProblemDetail
    getDailyProblem(): Promise<void>
    postDailyProblem(data: { id: number; studentAnswer: string }): Promise<void>
}

class PractiseStore implements IPractiseStore {
    @observable gettingDailyProblem = false
    @observable dailyProblemReady = false
    @observable dailyProblem: ITestProblemDetail = {
        id: 0,
        problemId: 0,
        studentId: 0,
        subjectId: 0,
        type: 0,
        topic: {},
        option: [],
        answer: '',
        solution: {},
        studentAnswer: '',
        loreList: [],
    }

    //题目详情
    @action async getDailyProblem() {
        this.gettingDailyProblem = true
        const res = await api.practise.getDailyProblem()
        if (res.success) {
            res.data.topic = JSON.parse(res.data.topic)
            res.data.studentAnswer = res.data.studentAnswer || ''
            res.data.solution = res.data.solution && JSON.parse(res.data.solution)
            if (res.data.option) {
                res.data.option = JSON.parse(res.data.option)
                let letter = ['A', 'B', 'C', 'D', 'E', 'F', 'I']
                let studentAnswer: any = []
                res.data.option.map((item: any, index: number) => {
                    item.isSelected = false
                    if (res.data.type === 2) {
                        if (res.data.studentAnswer) {
                            studentAnswer = res.data.studentAnswer.split(',')
                            studentAnswer.map((t: string) => {
                                if (t === letter[index]) {
                                    item.isSelected = true
                                }
                                return t
                            })
                        }
                    } else {
                        if (letter[index] === res.data.studentAnswer) {
                            item.isSelected = true
                        }
                    }
                    return item
                })
            }

            this.gettingDailyProblem = false
            this.dailyProblem = res.data
            this.dailyProblemReady = true
        }
    }

    //题目提交
    @action async postDailyProblem(data: { id: number; studentAnswer: string }) {
        this.gettingDailyProblem = true
        const res = await api.practise.postDailyProblem(data)
        if (res.success) {
            if (typeof res.data.solution === 'string') {
                res.data.solution = JSON.parse(res.data.solution)
            }
            this.dailyProblem = { ...this.dailyProblem, ...res.data }
        }
    }
}

export const practiseStore = new PractiseStore()
