import React, { FC, useContext } from 'react'
import styled from '@emotion/styled'
import { useObserver } from 'mobx-react-lite'
import { MobXProviderContext } from 'mobx-react'
import { RouteComponentProps, navigate } from '@reach/router'
import { FaReply } from 'react-icons/fa'

import { IStore } from '../../../store'
import frequently from '../../../utils/frequently'
import Button from '../../../components/Button'

// interface ITestList {
//     id: number
//     type: number
//     testId: number
//     status: number
// }

// interface IOptions {
//     currenState: boolean
// }

const Container = styled.div`
    width: 160px;
    margin-right: 30px;
`

// const TestWrap = styled.div`
//     box-sizing: border-box;
//     margin-top: 26px;
//     width: 100%;
//     box-shadow: 0px 9px 8px 0px rgba(232, 91, 82, 0.12);
//     border-radius: 11px;
//     padding: 8px;
// `

// const Test = styled.div<{ option: IOptions }>`
//     width: 147px;
//     height: 48px;
//     text-align: center;
//     line-height: 48px;
//     font-size: 20px;
//     font-family: PingFangSC-Regular;
//     font-weight: 400;
//     background-color: ${props => (props.option.currenState ? '#3B8DF2' : '')};
//     color: ${props => (props.option.currenState ? '#fff' : '')};
//     border-radius: 10px;
//     margin-bottom: 4px;
//     :hover {
//         background-color: rgba(59, 141, 242, 1);
//         color: #fff;
//         cursor: pointer;
//     }
// `
const EntryTextWrap = styled.div`
    text-align: center;
    margin: 30px 0;
`
const TextProblem = styled.span`
    display: inline-block;
    font-size: 12px;
    font-family: PingFangSC;
    font-weight: 500;
    color: rgba(130, 130, 130, 1);
    letter-spacing: 1px;
    :last-of-type {
        margin-top: 20px;
    }
`
const Amount = styled.span`
    display: inline-block;
    width: 40px;
    color: #e95c53;
    text-align: center;
`

const TimeWrap = styled.div`
    box-sizing: border-box;
    width: 160px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: rgba(233, 92, 83, 1);
    box-shadow: 0px 2px 4px 0px rgba(31, 122, 171, 0.2);
    border-radius: 10px;
    color: #fff;
    cursor: pointer;
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
    // const [typeArr] = useState([
    //     { id: 1, name: '随堂测' },
    //     { id: 2, name: '作业' },
    //     { id: 3, name: '测试' },
    //     { id: 4, name: '预习' },
    // ])
    const { entryStore } = useContext<IStore>(MobXProviderContext)

    //切换类型
    // const handleClickTestType = (data: ITestList) => {
    // if (entryStore.testProblemData.id === data.id) return
    // entryStore.testProblemData.id = data.id
    // props.history.push({
    //     pathname: `/entry/${data.id}`,
    //     state: {
    //         courseId: entryStore.testsStatuData.courseId.toString(),
    //     },
    // })
    // }

    //返回首页
    const handleClickLink = () => {
        sessionStorage.removeItem('sessionCurrentType')
        navigate(`/`)
    }

    //完成录入/去录入
    const handleClickFulfil = () => {
        let throttle = frequently(_log, 1000)
        function _log() {
            if (
                entryStore.testProblemData.key.unFinishShortAnswerProblems === 0 &&
                entryStore.testProblemData.key.unFinishFillingProblems === 0
            ) {
                entryStore.saveEndEntering(entryStore.testProblemData.id)
            } else {
                entryStore.getTestProblemUnentering(entryStore.testProblemData.id)
            }
        }
        throttle()
    }

    return useObserver(() => (
        <Container>
            <ButtonWrap>
                <Button onClick={handleClickLink}>
                    <FaReply></FaReply>
                    <RutemName>返回首页</RutemName>
                </Button>
            </ButtonWrap>
            {/* <TestWrap>
                {entryStore.testsStatuData.testList.map((item: ITestList) => (
                    <Test
                        key={item.id}
                        option={{ currenState: entryStore.testProblemData.id === item.id }}
                        onClick={() => handleClickTestType(item)}
                    >
                        {typeArr[item.type - 1].name}
                    </Test>
                ))}
            </TestWrap> */}
            <EntryTextWrap>
                <TextProblem>
                    填空题还有<Amount>{entryStore.testProblemData.key.unFinishFillingProblems}</Amount>题需录入
                </TextProblem>
                <TextProblem>
                    解答题还有<Amount>{entryStore.testProblemData.key.unFinishShortAnswerProblems}</Amount>题需录入
                </TextProblem>
            </EntryTextWrap>
            <TimeWrap onClick={handleClickFulfil}>
                {entryStore.testProblemData.key.unFinishShortAnswerProblems === 0 &&
                entryStore.testProblemData.key.unFinishFillingProblems === 0
                    ? '完成录入'
                    : '去录入'}
            </TimeWrap>
        </Container>
    ))
}

export default ALeft
