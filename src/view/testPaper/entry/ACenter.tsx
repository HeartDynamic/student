import React, { FC, useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { IStore } from '../../../store'

import { RouteComponentProps } from '@reach/router'
import ProblemWrap from './ProblemWrap'
import ReadEdit from './ReadEdit'

interface ITypeArr {
    name: string
    type: number
    typeName: string
}

interface IColor {
    isColor: boolean
}

export interface IProblems {
    id: number
    problemType: number
    number: number
    mark: number
    studentAnswer: number
    index: number
}

const Container = styled.div`
    width: 100%;
    height: 100%;
`

const HeaderWrap = styled.div`
    width: 100%;
    display: flex;
`
const TypeWrap = styled.div`
    flex: 1;
    box-sizing: border-box;
    padding: 24px;
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 7px 0px rgba(232, 91, 82, 0.15);
    border-radius: 10px;
`
const TypeName = styled.span<IColor>`
    display: inline-block;
    width: 34px;
    height: 34px;
    line-height: 34px;
    text-align: center;
    margin-right: 42px;
    color: ${props => (props.isColor ? '#fff' : '#333')};
    background-color: ${props => (props.isColor ? '#3B8DF2' : '#fff')};
    box-shadow: 0px 2px 4px 0px rgba(65, 145, 243, 0.2);
    border-radius: 50%;
    cursor: pointer;
    :hover {
        background-color: #3b8df2;
        color: #fff;
    }
`

const ACenter: FC<RouteComponentProps> = props => {
    const { entryStore } = useContext<IStore>(MobXProviderContext)

    //题目类型
    const handleClickTypeName = (data: ITypeArr) => {
        if (data.type === entryStore.currentProblemDetailData.id) {
            return
        }
        sessionStorage.setItem('sessionCurrentType', JSON.stringify({ id: data.type, type: data.typeName, number: 1 }))
        entryStore.currentProblemDetailData = {
            id: data.type,
            number: 1,
            type: data.typeName,
        }

        entryStore.getTestProblemDetail({
            id: (entryStore.testProblemData as any)[entryStore.currentProblemDetailData.type][0].id,
            testId: entryStore.testProblemData.id,
        })

        // entryStore.setTestProblemDetail({
        //     testId: entryStore.testProblemData.id,
        //     number: entryStore.currentProblemDetailData.number,
        //     type: data.typeName,
        // })
    }

    //下一题
    // const handleClickNext = () => {
    // entryStore.handleClickNext()
    // props.history.push({
    //     pathname: `${props.match.url}/${entryStore.currentProblemDetailData.id}`,
    //     state: {
    //         key: entryStore.currentProblemDetailData.key,
    //         courseId: entryStore.currentProblemDetailData.courseId,
    //     },
    // })
    // }

    // const paperPlaneOption = {
    //     width: '150px',
    //     height: '50px',
    //     size: '18px',
    //     family: 'PingFangSC-Medium',
    //     weight: '500',
    //     bgColor: '#fff',
    //     color: '#3f8cea',
    //     border: '2px solid #fff',
    //     shadow: '0px 2px 4px 0px rgba(13,109,177,0.25)',
    //     HColor: '#fff',
    //     HbgColor: '#3f8cea',
    // }

    return useObserver(() => {
        return (
            <Container>
                <HeaderWrap>
                    <TypeWrap>
                        {entryStore.testProblemData.problemTypeIsExit.map(item => (
                            <TypeName
                                key={item.type}
                                isColor={item.typeName === entryStore.currentProblemDetailData.type}
                                onClick={() => handleClickTypeName(item)}
                            >
                                {item.name.slice(0, 1)}
                            </TypeName>
                        ))}
                        <ProblemWrap />
                    </TypeWrap>
                    {/* <FunctWrap>
                        <Button options={paperPlaneOption} onClick={handleClickNext}>
                            <FontAwesomeIcon icon={faPaperPlane} />
                            <ButtonName>下一题</ButtonName>
                        </Button>
                    </FunctWrap> */}
                </HeaderWrap>
                <ReadEdit data={entryStore.testProblemDetailData}></ReadEdit>
            </Container>
        )
    })
}

export default ACenter
