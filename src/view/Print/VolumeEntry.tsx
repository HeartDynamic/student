import React, { FC, Fragment } from 'react'
import styled from '@emotion/styled'
import { Value } from 'slate'

import Editor from '../../components/EditorX'
import Option from '../../components/QuestionType/Option'

const Tr = styled.tr``
const Td = styled.td``
const Type = styled.div`
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    margin-bottom: 10px;
`
const TopicWrap = styled.div`
    display: flex;
`

const Answer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 60px;
`
const TagWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    width: 50px;
    height: 50px;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(31, 122, 171, 0.2);
    border-radius: 4px;
    opacity: 0.8178;
    margin: 14px 10px 14px 0;
`
const Index = styled.div`
    color: #072979;
    font-size: 20px;
`
const Fraction = styled.div`
    border-top: 1px solid #e2eef4;
    font-size: 12px;
    font-family: PingFangSC-Light, sans-serif;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
`
const Topic = styled.div`
    display: flex;
    align-items: center;
    margin: 14px 0;
    flex: 1;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC, sans-serif;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
`
const RichTextWrap = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 8px 8px 20px;
    font-size: 14px;
    font-family: PingFangSC-Light, sans-serif;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
`
const SolutionWrap = styled.div`
    background-color: rgba(216, 216, 216, 0.37);
    border-radius: 4px;
    border: 1px solid rgba(151, 151, 151, 0);
    margin-bottom: 20px;
`
const Analysis = styled.div`
    box-sizing: border-box;
    border-bottom: 1px solid #dfdfdf;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC, sans-serif;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    padding: 8px 0px 8px 20px;
`

interface IProps {
    data: {
        arr: any
        typeName: string
    }
}

const VolumeTopic: FC<IProps> = props => {
    return (
        <>
            {props.data.arr.map((item: any, index: number) => (
                <Fragment key={item.id}>
                    <Tr>
                        <Td>
                            {index === 0 && <Type>{props.data.typeName}</Type>}
                            <TopicWrap>
                                <TagWrap>
                                    <Index>{index + 1}</Index>
                                    <Fraction>{item.fraction}</Fraction>
                                </TagWrap>
                                <Topic>
                                    {props.data.typeName === '单选题' || props.data.typeName === '多选题' ? (
                                        <div>{item.answer}</div>
                                    ) : props.data.typeName === '判断题' ? (
                                        <div>{item.answer}</div>
                                    ) : props.data.typeName === '填空题' ? (
                                        <Answer>
                                            {JSON.parse(item.answer).map((t: any, i: number) => (
                                                <Option key={i} data={{ index: i + 1, value: t.value }}></Option>
                                            ))}
                                        </Answer>
                                    ) : (
                                        <Editor
                                            readonly={true}
                                            value={Value.fromJSON(JSON.parse(item.answer))}
                                        ></Editor>
                                    )}
                                </Topic>
                            </TopicWrap>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>
                            <SolutionWrap>
                                <Analysis>解析</Analysis>
                                <RichTextWrap>
                                    <Editor readonly={true} value={Value.fromJSON(JSON.parse(item.solution))}></Editor>
                                </RichTextWrap>
                            </SolutionWrap>
                        </Td>
                    </Tr>
                </Fragment>
            ))}
        </>
    )
}

export default VolumeTopic
