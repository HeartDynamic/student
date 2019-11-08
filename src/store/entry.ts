import { observable, action } from 'mobx'
import { navigate } from '@reach/router'

import api from '../api'
import Toast from '../components/Toast'

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
    unFinishFillingProblems: number
    unFinishShortAnswerProblems: number
}
interface IPreparation {
    id: number
    content: string
}

interface IGetTestProblem {
    id: number
    url: string
}

interface ITestsEntering {
    id: number
    studentTestId: number
    getFraction: number
    fractionList: string
    isTrue: number
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
    loreList: ILoreList[]
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
interface ITestProblemUnentering {
    id: number
}

export interface IEntryStore {
    gettingTestProblem: boolean
    testProblemReady: boolean
    testProblemData: ITestProblem
    getTestProblemEntering(data: IGetTestProblem): Promise<void>

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
    getTestsEntering(data: ITestsEntering): Promise<void>
    getTestsStatu(id: number): Promise<void>
    getTestProblemUnentering(id: number): Promise<void>
    saveEndEntering(id: number): Promise<void>
}

class EntryStore implements IEntryStore {
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
            unFinishFillingProblems: 0,
            unFinishShortAnswerProblems: 0,
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
        getFraction: 0,
        loreList: [],
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

    @observable gettingTestsStatu = false
    @observable testsStatuReady = false
    @observable testsStatuData: ITestsStatu = {
        courseId: 0,
        preparationClassId: null,
        testList: [],
    }

    //题目数量
    @action async getTestProblemEntering(data: IGetTestProblem) {
        this.gettingTestProblem = true
        const res = await api.answer.getTestProblemEntering(data.id)

        if (res.success) {
            if ((res.data.status === 1 || res.data.status === 2) && res.data.testStatus === 1) {
                navigate('/')
            } else if (res.data.status === 3 && res.data.testStatus === 1) {
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
            // this.getTestsStatu(data.state.courseId)
            this.gettingTestProblem = false
            this.testProblemData = res.data
            this.testProblemReady = true
        }
    }

    //题目详情
    @action async getTestProblemDetail(data: IProblemDetailId) {
        this.gettingTestProblemDetail = true
        const res = await api.answer.getTestProblemAnswer({
            id: data.id,
            testId: data.testId,
        })
        if (res.success) {
            let problemType1 = [1, 2]
            let problemType2 = [4, 5]
            res.data.topic = JSON.parse(res.data.topic)
            res.data.solution = JSON.parse(res.data.solution)
            if (problemType1.includes(res.data.problemType)) {
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
            }
            if (problemType2.includes(res.data.problemType)) {
                res.data.answer = JSON.parse(res.data.answer)
                if (typeof res.data.fractionList === 'string') {
                    res.data.fractionList = JSON.parse(res.data.fractionList)
                }
                if (res.data.studentAnswer && res.data.studentAnswer.length > 0) {
                    res.data.studentAnswer = JSON.parse(res.data.studentAnswer)
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
        //         type: data.type,
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

    //学生录入试题
    @action async getTestsEntering(data: ITestsEntering) {
        const res = await api.answer.getTestsEntering(data)
        if (res.success) {
            Toast.success('录入成功')
            this.testProblemData.key = res.data
            ;(this.testProblemData as any)[this.currentProblemDetailData.type][
                this.currentProblemDetailData.number - 1
            ].ifEntering = 1
        }
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

    //录入时查询没录入的测试题目
    @action async getTestProblemUnentering(id: number) {
        let typeArr = ['choiceProblems', 'checkboxProblems', 'judgeProblems', 'fillingProblems', 'shortAnswerProblems']
        const res = await api.answer.getTestProblemUnentering(id)
        if (res.success) {
            this.testProblemData.key.unFinishFillingProblems = res.data.unFinishFillingProblems
            this.testProblemData.key.unFinishShortAnswerProblems = res.data.unFinishShortAnswerProblems
            if (
                this.currentProblemDetailData.type === res.data.type &&
                this.currentProblemDetailData.number === res.data.number
            ) {
                Toast.warning('已在当前未录入题目')
                return
            }
            sessionStorage.setItem(
                'sessionCurrentType',
                JSON.stringify({ id: typeArr.indexOf(res.data.type), type: res.data.type, number: res.data.number })
            )
            this.currentProblemDetailData = {
                id: typeArr.indexOf(res.data.type),
                number: res.data.number,
                type: res.data.type,
            }

            this.getTestProblemDetail({
                id: (this.testProblemData as any)[res.data.type][res.data.number - 1].id,
                testId: this.testProblemData.id,
            })
        }
    }
    //完成录入
    @action async saveEndEntering(id: number) {
        const res = await api.answer.saveEndEntering(id)
        if (res.success) {
            navigate(`/complete/${this.testProblemData.id}`, {
                state: { courseId: entryStore.testsStatuData.courseId.toString() },
            })
        }
    }
}

export const entryStore = new EntryStore()
