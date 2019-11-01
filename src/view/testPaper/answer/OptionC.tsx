import React, { useContext } from 'react'
import styled from '@emotion/styled'
import { MobXProviderContext } from 'mobx-react'
import { useObserver } from 'mobx-react-lite'
import { Value } from 'slate'

import { IStore } from '../../../store'
import Editor from '../../../components/EditorX'

const OptionItem = styled.div`
    box-sizing: border-box;
    min-height: 60px;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 2px 4px 0px rgba(31, 122, 171, 0.2);
    border-radius: 4px;
    margin-top: 8px;
    margin-bottom: 8px;
    border-radius: 4px;
    font-size: 14px;
    display: flex;
    justify-content: flex-start;
    align-items: stretch;
`
const RichTextWrap = styled.div`
    box-sizing: border-box;
    width: 100%;
    align-items: center;
    padding: 0 20px;
    font-size: 14px;
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: rgba(51, 51, 51, 1);
`
const ItemIndex = styled.div`
    height: 1;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: #072979;
    border-right: 1px solid #f5f5f5;
`
interface IProps {
    data: any
}
const OptionC = (props: IProps) => {
    const { answerStore } = useContext<IStore>(MobXProviderContext)

    //选项
    const handleChangeOption = (value: Value) => {
        answerStore.handleChangeAnswer({ value, id: props.data.index })
    }

    return useObserver(() => {
        return (
            <OptionItem>
                <ItemIndex>{props.data.index + 1}</ItemIndex>
                <RichTextWrap>
                    <Editor value={Value.fromJSON(props.data.value)} onChange={handleChangeOption} />
                </RichTextWrap>
            </OptionItem>
        )
    })
}

export default OptionC
