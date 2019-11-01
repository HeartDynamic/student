import { observable, action } from 'mobx'
import { Value } from 'slate'
import api from '../api'

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
interface IState {
    courseId: number
    key: string
}

interface IGetTestProblem {
    id: number
    url: string
    state: IState
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

interface ITestList {
    id: number
    type: number
    testId: number
    status: number
}
interface ITestsStatu {
    courseId: number
    preparationClassId: number | null
    testList: ITestList[]
}

export interface ISubmitStore {
    gettingTestProblem: boolean
    testProblemReady: boolean
    testProblemData: ITestProblem
    getTestProblem(id: number): Promise<void>

    gettingTestProblemDetail: boolean
    testProblemDetailReady: boolean
    testProblemDetailData: ITestProblemDetail
    getTestProblemDetail(data: IProblemDetailId): Promise<void>
    setTestProblemDetail(data: IProblemDetail): Promise<void>

    setAnswer: ISetAnswer
    typeArr: ITypeArr[]
    currentProblemDetailData: ICurrentProblemDetail
    handleClickNext(): void

    gettingTestsStatu: boolean
    testsStatuReady: boolean
    testsStatuData: ITestsStatu
    getTestsStatu(id: number): Promise<void>
}

class SubmitStore implements ISubmitStore {
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
        option: {},
        answer: {},
        solution: {},
        fraction: 0,
        studentTestProblemId: 0,
        mark: 0,
        studentAnswer: '',
    }

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

    @observable gettingTestsStatu = false
    @observable testsStatuReady = false
    @observable testsStatuData: ITestsStatu = {
        courseId: 0,
        preparationClassId: null,
        testList: [],
    }

    //题目数量
    @action async getTestProblem(id: number) {
        this.gettingTestProblem = true
        const res = await api.answer.getTestProblem(id)
        if (res.success) {
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
            let answerOption = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
            res.data.topic = JSON.parse(res.data.topic)
            if (res.data.problemType === 1) {
                let answer = res.data.studentAnswer
                res.data.option = JSON.parse(res.data.option)
                res.data.option.map((item: any, index: number) => {
                    item.statu = false
                    if (answer === answerOption[index]) {
                        item.statu = true
                    }
                    return item
                })
            } else if (res.data.problemType === 2) {
                res.data.option = JSON.parse(res.data.option)
                let answer = res.data.studentAnswer.split(',')
                res.data.option.map((item: any, index: number) => {
                    item.statu = false
                    answer.map((t: string) => {
                        if (answerOption[index] === t) {
                            item.statu = true
                        }
                        return t
                    })
                    return item
                })
            } else if (res.data.problemType === 4) {
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

    //题目类型
    @action async setTestProblemDetail(data: IProblemDetail) {
        // if (data.key) {
        //     this.currentProblemDetailData = {
        //         id: data.testId,
        //         number: data.number,
        //         type: data.key,
        //     }
        // }
    }

    //题目下一题
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

    //查询一节课中的试卷
    @action async getTestsStatu(id: number) {
        this.gettingTestsStatu = true
        const res = await api.answer.getTestsStatu(id)
        if (res.success) {
            res.data.testList = res.data.testList.filter((item: ITestList) => item.id)
            this.gettingTestsStatu = false
            this.testsStatuData = res.data
            this.testsStatuReady = true
        }
    }
}

export const submitStore = new SubmitStore()
