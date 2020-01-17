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
const OptionWrap = styled.td`
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

interface IProps {
    data: {
        arr: any
        typeName: string
    }
}

const myMap = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
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
                                    <Editor readonly={true} value={Value.fromJSON(JSON.parse(item.topic))}></Editor>
                                </Topic>
                            </TopicWrap>
                        </Td>
                    </Tr>
                    {props.data.typeName === '单选题' || props.data.typeName === '多选题' ? (
                        <Tr>
                            <OptionWrap>
                                {JSON.parse(item.option).map((t: any, i: number) => (
                                    <Option key={i} data={{ index: myMap[i], value: t.value }}></Option>
                                ))}
                            </OptionWrap>
                        </Tr>
                    ) : null}
                </Fragment>
            ))}
        </>
    )
}

export default VolumeTopic
