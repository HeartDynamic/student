import { observable, action } from 'mobx'
import { Value } from 'slate'
import { navigate } from '@reach/router'

import api from '../api'
import Toast from '../components/Toast'

export interface IProblems {
    id: number
    problemType: number
    number: number
    mark: number
    ifStudentAnswer: number
}

export interface ITypeArr {
    id: number
    key: string
    name: string
    long: number
}

interface IKeyType {
    id: number
    type: string
}
interface IPreparation {
    id: number
    content: string
}

interface IProblemTypeIsExit {
    name: string
    type: number
    typeName: string
}

interface ITestProblem {
    id: number
    name: string
    status: number
    testId: number
    courseId: number
    choiceProblems: IProblems[]
    checkboxProblems: IProblems[]
    judgeProblems: IProblems[]
    fillingProblems: IProblems[]
    shortAnswerProblems: IProblems[]
    problemTypeIsExit: IProblemTypeIsExit[]
    key: IKeyType
    preparation: IPreparation
    finishedProblemCount: number
    totalProblem: number
}

interface ITestProblemDetail {
    id: number
    volumeId: number
    problemType: number
    number: number
    topic: any
    option: any
    answer: any
    solution: any
    fraction: number
    studentTestProblemId: number
    mark: number
    studentAnswer: any
}

interface IProblemDetailId {
    id: number
    testId: number
}

interface IProblemDetail {
    testId: number
    number: number
    type: string | undefined
}

interface IStudentAnswer {
    id: number
    studentAnswer: string
}

interface ISetAnswer {
    studentTestId: number
    testVolumesProblemId: number
    studentAnswer: any
    type: string
}

interface ICurrentProblemDetail {
    id: number
    number: number
    type: string
}

export interface IAnswerStore {
    gettingTestProblem: boolean
    testProblemReady: boolean
    testProblemData: ITestProblem
    getTestProblem(id: number): Promise<void>

    gettingTestProblemDetail: boolean
    testProblemDetailReady: boolean
    testProblemDetailData: ITestProblemDetail
    getTestProblemDetail(data: IProblemDetailId): Promise<void>
    setTestProblemDetail(data: IProblemDetail): Promise<void>

    gettingProblemMark: boolean
    problemMarkReady: boolean
    problemMarkData: string
    addProblemMark(): Promise<void>

    addTingDoProblem: boolean
    doProblemReady: boolean
    doProblemData: string
    addDoProblem(): Promise<void>
    setAnswer: ISetAnswer
    handleClickOption(data: any): void
    handleClickJudge(data: any): void
    handleChangeAnswer(data: any): void
    handleBlurAnswer(): void
    typeArr: ITypeArr[]
    currentProblemDetailData: ICurrentProblemDetail
    handleClickNext(): void

    saveTingTestSubmit: boolean
    saveTestSubmitReady: boolean
    saveTestSubmitData: string
    saveTestSubmit(): Promise<void>
}

class AnswerStore implements IAnswerStore {
    @observable gettingTestProblem = false
    @observable testProblemReady = false
    @observable testProblemData: ITestProblem = {
        status: 0,
        preparation: { id: 0, content: '' },
        finishedProblemCount: 0,
        totalProblem: 0,
        id: 0,
        courseId: 0,
        name: '',
        testId: 0,
        choiceProblems: [],
        checkboxProblems: [],
        judgeProblems: [],
        fillingProblems: [],
        shortAnswerProblems: [],
        problemTypeIsExit: [],
        key: {
            id: 0,
            type: '',
        },
    }

    @observable gettingTestProblemDetail = false
    @observable testProblemDetailReady = false
    @observable testProblemDetailData: ITestProblemDetail = {
        id: 0,
        volumeId: 0,
        problemType: 0,
        number: 0,
        topic: {},
        option: [],
        answer: {},
        solution: {},
        fraction: 0,
        studentTestProblemId: 0,
        mark: 0,
        studentAnswer: '',
    }

    @observable gettingProblemMark = false
    @observable problemMarkReady = false
    @observable problemMarkData = ''

    @observable addTingDoProblem = false
    @observable doProblemReady = false
    @observable doProblemData = ''
    @observable setAnswer: ISetAnswer = {
        studentTestId: 0,
        testVolumesProblemId: 0,
        studentAnswer: [],
        type: '',
    }

    @observable typeArr: ITypeArr[] = []
    @observable currentProblemDetailData: ICurrentProblemDetail = {
        id: 0,
        number: 1,
        type: 'choiceProblems',
    }

    @observable saveTingTestSubmit = false
    @observable saveTestSubmitReady = false
    @observable saveTestSubmitData = ''

    //题目数量
    @action async getTestProblem(id: number) {
        this.gettingTestProblem = true
        const res = await api.answer.getTestProblem(id)
        if (res.success) {
            if (res.data.status === 3 && res.data.testStatus === 1) {
                navigate('/')
                return
            } else if (
                (res.data.status === 1 || res.data.status === 2 || res.data.status === 3) &&
                res.data.testStatus === 3
            ) {
                navigate('/')
                return
            } else if (res.data.status === 4 && res.data.testStatus === 3) {
                navigate('/')
                return
            }
            let sessionCurrentType = sessionStorage.getItem('sessionCurrentType')
            if (sessionCurrentType) {
                let datas = JSON.parse(sessionCurrentType)
                if ((res.data as any)[datas.type][datas.number - 1]) {
                    let id = (res.data as any)[datas.type][datas.number - 1].id
                    this.getTestProblemDetail({ id, testId: res.data.id })
                    this.currentProblemDetailData = {
                        id: datas.id,
                        number: datas.number,
                        type: datas.type,
                    }
                } else {
                    this.getTestProblemDetail({
                        id: res.data.key.id,
                        testId: res.data.id,
                    })
                }
            } else {
                this.getTestProblemDetail({ id: res.data.key.id, testId: res.data.id })
                this.currentProblemDetailData = {
                    id: res.data.key.id,
                    number: 1,
                    type: res.data.key.type,
                }
            }
            this.gettingTestProblem = false
            this.testProblemData = res.data
            this.testProblemReady = true
        }
    }

    //题目详情
    @action async getTestProblemDetail(data: IProblemDetailId) {
        this.gettingTestProblemDetail = true
        const res = await api.answer.getTestProblemDetail({
            id: data.id,
            testId: data.testId,
        })
        if (res.success) {
            let problemType = [1, 2]
            res.data.topic = JSON.parse(res.data.topic)
            if (problemType.includes(res.data.problemType)) {
                res.data.option = JSON.parse(res.data.option)
                let letter = ['A', 'B', 'C', 'D', 'E', 'F', 'I']
                let studentAnswer: any = []
                res.data.option.map((item: any, index: number) => {
                    item.isSelected = false
                    if (res.data.problemType === 2) {
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
            } else if (res.data.problemType === 4) {
                // res.data.answer = JSON.parse(res.data.answer)
                if (res.data.studentAnswer && res.data.studentAnswer.length > 0) {
                    res.data.studentAnswer = JSON.parse(res.data.studentAnswer)
                } else {
                    const valueInit: any = []
                    for (let i = 0; i < res.data.answerCount; i++) {
                        valueInit.push({
                            id: i + 1,
                            value: Value.fromJSON({
                                document: {
                                    nodes: [
                                        {
                                            object: 'block',
                                            type: 'paragraph',
                                            nodes: [],
                                        },
                                    ],
                                },
                            }),
                        })
                    }
                    res.data.studentAnswer = valueInit
                }
            } else if (res.data.problemType === 5) {
                if (res.data.studentAnswer && res.data.studentAnswer.length > 0) {
                    res.data.studentAnswer = Value.fromJSON(JSON.parse(res.data.studentAnswer))
                } else {
                    res.data.studentAnswer = Value.fromJSON({
                        document: {
                            nodes: [
                                {
                                    object: 'block',
                                    type: 'paragraph',
                                    nodes: [],
                                },
                            ],
                        },
                    })
                }
            }
            this.gettingTestProblemDetail = false
            this.testProblemDetailData = res.data
            this.testProblemDetailReady = true
            this.setAnswer = {
                studentTestId: this.testProblemData.id,
                testVolumesProblemId: res.data.id,
                studentAnswer: res.data.studentAnswer,
                type: this.currentProblemDetailData.type,
            }
        }
    }

    //设置详情
    @action async setTestProblemDetail(data: IProblemDetail) {
        let typeArr = [1, 2, 3]
        if (data.type) {
            this.currentProblemDetailData = {
                id: data.testId,
                number: data.number,
                type: data.type,
            }
        }
        if (typeArr.includes(this.testProblemDetailData.problemType)) {
            if (this.setAnswer.studentAnswer !== this.testProblemDetailData.studentAnswer) {
                this.addDoProblem()
            }
        }
    }

    //学生标记
    @action async addProblemMark() {
        this.gettingProblemMark = true
        const res = await api.answer.addDoProblemMark(this.testProblemDetailData.studentTestProblemId)
        if (res.success) {
            this.gettingProblemMark = false
            this.problemMarkData = res.data
            this.problemMarkReady = true
            if (this.testProblemDetailData.mark === 1) {
                this.testProblemDetailData.mark = 0
                Toast.success('取消标记成功')
            } else {
                this.testProblemDetailData.mark = 1
                Toast.success('标记成功')
            }
            ;(this.testProblemData as any)[this.currentProblemDetailData.type].filter((item: IProblems) => {
                if (item.number === this.currentProblemDetailData.number) {
                    item.mark = item.mark === 1 ? 0 : 1
                }
                return item
            })
        }
    }

    //学生做题
    @action async addDoProblem() {
        this.addTingDoProblem = true
        let studentAnswer: any = ''
        if (this.setAnswer.studentAnswer === '') {
            studentAnswer = null
        } else {
            if (typeof this.setAnswer.studentAnswer === 'string') {
                studentAnswer = this.setAnswer.studentAnswer
            } else {
                studentAnswer = JSON.stringify(this.setAnswer.studentAnswer)
            }
        }
        const res = await api.answer.addDoProblem({
            id: this.testProblemDetailData.studentTestProblemId,
            studentTestId: this.testProblemData.id,
            studentAnswer,
        })
        if (res.success) {
            answerStore.testProblemData.finishedProblemCount = res.data
            this.addTingDoProblem = false
            this.doProblemData = res.data
            this.doProblemReady = true
        }
    }

    //单多做题答案
    @action async handleClickOption(data: IStudentAnswer) {
        let studentAnswer: any = []
        let letter = ['A', 'B', 'C', 'D', 'E', 'F', 'I']
        this.testProblemDetailData.option.map((item: any, index: number) => {
            if (this.testProblemDetailData.problemType === 1) {
                if (data.id === item.id) {
                    item.isSelected = true
                    studentAnswer = data.studentAnswer
                } else {
                    item.isSelected = false
                }
                return item
            } else if (this.testProblemDetailData.problemType === 2) {
                if (data.id === item.id) {
                    item.isSelected = !item.isSelected
                }
            }
            if (item.isSelected) {
                studentAnswer.push(letter[index])
            }
            return item
        })
        ;(this.testProblemData as any)[this.currentProblemDetailData.type].filter((item: IProblems) => {
            if (item.number === this.currentProblemDetailData.number) {
                item.ifStudentAnswer = 1
            }
            return item
        })

        this.setAnswer = {
            studentTestId: this.testProblemData.id,
            testVolumesProblemId: this.testProblemDetailData.id,
            studentAnswer: studentAnswer.toString(),
            type: this.currentProblemDetailData.type,
        }
    }

    //判断做题答案
    @action async handleClickJudge(studentAnswer: string) {
        ;(this.testProblemData as any)[this.currentProblemDetailData.type].filter((item: IProblems) => {
            if (item.number === this.currentProblemDetailData.number) {
                item.ifStudentAnswer = 1
            }
            return item
        })
        this.setAnswer = {
            studentTestId: this.testProblemData.id,
            testVolumesProblemId: this.testProblemDetailData.id,
            studentAnswer: studentAnswer,
            type: this.currentProblemDetailData.type,
        }
    }

    //填空简答做题答案
    @action async handleChangeAnswer(data: any) {
        this.testProblemDetailData.studentAnswer.map((item: any, index: number) => {
            if (index === data.id) {
                item.value = data.value
            }
            return item
        })
        this.setAnswer = {
            studentTestId: this.testProblemData.id,
            testVolumesProblemId: this.testProblemDetailData.id,
            studentAnswer: JSON.stringify(this.testProblemDetailData.studentAnswer),
            type: this.currentProblemDetailData.type,
        }
    }

    //填空做题答案
    @action async handleBlurAnswer() {
        ;(this.testProblemData as any)[this.currentProblemDetailData.type].filter((item: IProblems) => {
            if (item.number === this.currentProblemDetailData.number) {
                item.ifStudentAnswer = 1
            }
            return item
        })
        this.setAnswer = {
            studentTestId: this.testProblemData.id,
            testVolumesProblemId: this.testProblemDetailData.id,
            studentAnswer: JSON.stringify(this.testProblemDetailData.studentAnswer),
            type: this.currentProblemDetailData.type,
        }
    }

    //下一题
    @action handleClickNext() {
        // let id = 0
        // let key = ''
        // let long = 0
        // if (this.currentProblemDetailData.number + 1 > this.currentProblemDetailData.long) {
        //     this.currentProblemDetailData.number = 1
        //     this.typeArr.map((item: any, index: number) => {
        //         if (item.key === this.currentProblemDetailData.key) {
        //             let idx = index + 1 >= this.typeArr.length ? 0 : index + 1
        //             id = this.typeArr[idx].id
        //             long = this.typeArr[idx].long
        //             key = this.typeArr[idx].key
        //         }
        //         return item
        //     })
        //     this.currentProblemDetailData.id = id
        //     this.currentProblemDetailData.key = key
        //     this.currentProblemDetailData.long = long
        // } else {
        //     this.currentProblemDetailData.number = this.currentProblemDetailData.number + 1
        // }
        // ;(this.testProblemData as any)[this.currentProblemDetailData.key].map((item: any) => {
        //     if (item.number === this.currentProblemDetailData.number) {
        //         this.currentProblemDetailData.id = item.id
        //     }
        //     return item
        // })
    }

    //交卷
    @action async saveTestSubmit() {
        this.addDoProblem()
        this.saveTingTestSubmit = true
        const res = await api.answer.saveTestSubmit(this.testProblemData.id)
        if (res.success) {
            this.saveTingTestSubmit = false
            this.saveTestSubmitData = res.data
            this.saveTestSubmitReady = true
            sessionStorage.removeItem('sessionCurrentType')
            navigate(`/submit/${this.testProblemData.id}`, {
                state: { courseId: this.testProblemData.courseId.toString() },
            })
        }
    }
}

export const answerStore = new AnswerStore()
