import { observable, action } from 'mobx'
import { Value } from 'slate'
import { navigate } from '@reach/router'

import api from '../api'

export interface IProblems {
    id: number
    ifEntering: number
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
    testName: string
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
    finishedProblemCount: number
    totalProblem: number
}

// interface ITestProblem {
//     id: number
//     testName: string
//     choiceProblems: IProblems[]
//     checkboxProblems: IProblems[]
//     judgeProblems: IProblems[]
//     fillingProblems: IProblems[]
//     shortAnswerProblems: IProblems[]
//     key: IKeyType
// }

interface IProblemAccuracy {
    accuracy: number
    type: string
}
interface ITestAccuracy {
    getTotalScore: number
    problemAccuracy: IProblemAccuracy[]
    testTotalProblem: number
    testTotalScore: number
    totalAccuracy: number
}

interface ILoreList {
    id: number
    name: string
}
interface IFractionList {
    fraction: string
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
    getFraction: number
    isTrue: number
    loreDTOList: ILoreList[]
    fractionList: IFractionList[]
    studentTestProblemId: number
    mark: number
    studentAnswer: any
}
interface IProblemDetailId {
    id: number
    testId: number
}

interface IProblemDetail {
    id: number
    testId: number
    number: number
    long: number
    key: string | undefined
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

export interface ICompleteStore {
    gettingTestProblem: boolean
    testProblemReady: boolean
    testProblemData: ITestProblem
    testAccuracy: ITestAccuracy
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
}

class CompleteStore implements ICompleteStore {
    @observable gettingTestProblem = false
    @observable testProblemReady = false
    @observable testProblemData: ITestProblem = {
        status: 0,
        finishedProblemCount: 0,
        totalProblem: 0,
        id: 0,
        courseId: 0,
        testName: '',
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
    @observable testAccuracy: ITestAccuracy = {
        getTotalScore: 0,
        problemAccuracy: [],
        testTotalProblem: 0,
        testTotalScore: 0,
        totalAccuracy: 0,
    }

    @observable gettingTestProblemDetail = false
    @observable testProblemDetailReady = false
    @observable testProblemDetailData: ITestProblemDetail = {
        id: 0,
        volumeId: 0,
        problemType: 0,
        number: 0,
        isTrue: 0,
        topic: {},
        option: {},
        answer: {},
        solution: {},
        fraction: 0,
        getFraction: 0,
        loreDTOList: [],
        fractionList: [],
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

    //题目数量
    @action async getTestProblem(id: number) {
        this.gettingTestProblem = true
        const res = await api.answer.getStudentTest(id)

        if (res.success) {
            if ((res.data.status === 1 || res.data.status === 2) && res.data.testStatus === 1) {
                navigate('/')
            } else if (res.data.status === 3 && res.data.testStatus === 1) {
                navigate('/')
            } else if (
                (res.data.status === 1 || res.data.status === 2 || res.data.status === 3) &&
                res.data.testStatus === 3
            ) {
                navigate('/')
                return
            }

            let sessionCurrentType = sessionStorage.getItem('sessionCurrentType')
            if (sessionCurrentType) {
                let datas = JSON.parse(sessionCurrentType)
                if ((res.data.studentVolume as any)[datas.type][datas.number - 1]) {
                    let id = (res.data.studentVolume as any)[datas.type][datas.number - 1].id
                    this.getTestProblemDetail({ id, testId: res.data.studentVolume.id })
                    this.currentProblemDetailData = {
                        id: datas.id,
                        number: datas.number,
                        type: datas.type,
                    }
                } else {
                    this.getTestProblemDetail({
                        id: res.data.studentVolume.key.id,
                        testId: res.data.studentVolume.id,
                    })
                }
            } else {
                this.getTestProblemDetail({ id: res.data.studentVolume.key.id, testId: res.data.studentVolume.id })
                this.currentProblemDetailData = {
                    id: res.data.studentVolume.key.id,
                    number: 1,
                    type: res.data.studentVolume.key.type,
                }
            }
            this.gettingTestProblem = false
            this.testProblemData = res.data.studentVolume
            this.testAccuracy = res.data.testAccuracy
            this.testProblemReady = true
        }
    }

    //题目详情
    @action async getTestProblemDetail(data: IProblemDetailId) {
        this.gettingTestProblemDetail = true
        const res = await api.answer.getStudentTestProblem({
            id: data.id,
            testId: data.testId,
        })
        if (res.success) {
            let problemType = [1, 2]
            res.data.topic = JSON.parse(res.data.topic)
            res.data.solution = JSON.parse(res.data.solution)
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
                res.data.answer = JSON.parse(res.data.answer)
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
                res.data.answer = JSON.parse(res.data.answer)
                if (res.data.studentAnswer && res.data.studentAnswer.length > 0) {
                    res.data.studentAnswer = JSON.parse(res.data.studentAnswer)
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
        //         text: data.text,
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
}

export const completeStore = new CompleteStore()
