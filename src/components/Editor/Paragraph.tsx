import React, { useState, useEffect, MouseEventHandler, MouseEvent, FC } from 'react'
import { Editor } from 'slate'
import { RenderBlockProps } from 'slate-react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBold, faItalic, faUnderline, faUndo, faRedo } from '@fortawesome/free-solid-svg-icons'
import BlockSelector from './BlockSelector'
import ArrowBox from './ArrowBox'

const Container = styled.div<{ showBorder: boolean; showLine: boolean }>`
    position: relative;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid transparent;
    border-left-width: 3px;
    border-color: ${props => (props.showBorder ? 'rgba(66, 88, 99, 0.4)' : 'transparent')};
    border-left-color: ${props => (props.showBorder ? '#777' : props.showLine ? '#e2e4e7' : 'transparent')};
    &:hover {
        border-left-color: ${props => (props.showBorder ? '#777' : props.showLine ? '#e2e4e7' : 'transparent')};
    }
`
const Content = styled.div`
    height: 30px;
    padding: 15px 15px;
    display: flex;
    align-items: center;
`
const Lable = styled.div`
    position: absolute;
    top: -20px;
    background-color: #e2e4e7;
    color: #191e23;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    left: -3px;
    padding-left: 5px;
    padding-right: 5px;
`
const ToolBox = styled.div`
    position: absolute;
    top: -36px;
    box-sizing: border-box;
    border: 1px solid rgba(66, 88, 99, 0.4);
    border-left-width: 3px;
    border-left-color: #777;
    color: #191e23;
    height: 36px;
    left: -3px;
    display: flex;
    background-color: #fff;
    justify-content: space-between;
    align-items: center;
`
const Button = styled.div`
    height: 30px;
    width: 30px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 30px;
    text-align: center;
    border: 1px solid transparent;
    box-sizing: border-box;
    border-radius: 3px;
    color: #555d66;
    cursor: pointer;
    &:hover {
        border-color: #777;
    }
`

const MyButton = styled.button`
    position: absolute;
    right: 0;
    top: -86px;
    box-sizing: border-box;
    display: block;
    width: 120px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 8px;
    font-size: 16px;
    font-family: PingFang-SC-Medium;
    font-weight: 600;
    color: #fff;
    border: 1px solid #fff;
    background-color: #3a93df;
    padding: 0px 16px;
    outline: none;
    cursor: pointer;
    &:hover {
        background-color: #418ccc;
    }
`
interface IProps {
    showVacancy?: any
}

const Paragraph: FC<RenderBlockProps & IProps> = props => {
    const [showBlockSelector, setShowBlockSelector] = useState(false)
    const [showLabel, setShowLable] = useState(false)
    const [showLine, setShowLine] = useState(false)
    const [showBorder, setShowBorder] = useState(false)
    const [isVoid, setIsVoid] = useState(true)
    const [showToolBox, setShowToolBox] = useState(false)
    const [showArrowBox, setShowArrowBox] = useState(false)
    // const [vacancy, setVacancy] = useState([])
    const clickImg: MouseEventHandler = e => {
        console.log('aaa')
        props.editor.setNodeByKey(props.node.key, {
            type: 'image',
            data: { url: '', height: 0, align: 'center' },
        })
    }
    const clickVideo: MouseEventHandler = e => {
        console.log('aaa')
        props.editor.setNodeByKey(props.node.key, {
            type: 'video',
            data: { url: '' },
        })
    }
    const wrapLink = (editor: Editor, href: string) => {
        editor.wrapInline({
            type: 'link',
            data: { href: '' },
        })

        editor.moveToEnd()
    }

    useEffect(() => {
        if (props.node.text) {
            setIsVoid(false)
            setShowBlockSelector(false)
            setShowBorder(true)
            setShowToolBox(true)
            setShowArrowBox(true)
        } else {
            setIsVoid(true)
            setShowBlockSelector(true)
            setShowBorder(false)
            setShowToolBox(false)
            setShowLine(false)
            setShowArrowBox(false)
        }
    }, [props.node.text])
    useEffect(() => {
        if (props.isFocused) {
            if (!isVoid) {
                setShowBorder(true)
                setShowLable(false)
                setShowToolBox(true)
                setShowArrowBox(true)
            } else {
                setShowBlockSelector(true)
            }
        } else {
            setShowBorder(false)
            setShowLine(false)
            setShowBlockSelector(false)
            setShowToolBox(false)
            setShowArrowBox(false)
            setShowLable(false)
        }
    }, [props.isFocused, isVoid])

    const handleMouseEnter = () => {
        if (!props.isFocused) {
            if (isVoid) {
                setShowBlockSelector(true)
            } else {
                setShowLable(true)
                setShowLine(true)
                setShowArrowBox(true)
            }
        }
    }
    const handleMouseLeave = () => {
        if (!props.isFocused) {
            setShowLable(false)
            setShowBlockSelector(false)
            setShowArrowBox(false)
            setShowLine(false)
        }
    }

    //插入空位
    const handleMouseDownLink: MouseEventHandler = e => {
        e.preventDefault()
        const { editor } = props
        editor
            .insertText('_________')
            .moveFocusBackward('_________'.length)
            .command(wrapLink)
    }
    //字体样式
    const handleMouseDown = (e: MouseEvent, text: string) => {
        props.editor.toggleMark(text)
        e.preventDefault()
    }
    //上一步
    const handleMouseUndo: MouseEventHandler = e => {
        e.preventDefault()
        props.editor.undo()
    }
    //下一步
    const handleMouseRedo: MouseEventHandler = e => {
        e.preventDefault()
        props.editor.redo()
    }
    return (
        <Container
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            showLine={showLine}
            showBorder={showBorder}
        >
            {showBlockSelector && <BlockSelector clickImg={clickImg} clickVideo={clickVideo} />}
            {showLabel && <Lable>paragraph</Lable>}
            {showToolBox && (
                <ToolBox>
                    <Button onMouseDown={event => handleMouseDown(event, 'bold')} title='粗体'>
                        <FontAwesomeIcon icon={faBold} />
                    </Button>
                    <Button onMouseDown={event => handleMouseDown(event, 'italic')} title='斜体'>
                        <FontAwesomeIcon icon={faItalic} />
                    </Button>
                    <Button onMouseDown={event => handleMouseDown(event, 'underlined')} title='下划线'>
                        <FontAwesomeIcon icon={faUnderline} />
                    </Button>
                    <Button onMouseDown={handleMouseUndo} title='上一步'>
                        <FontAwesomeIcon icon={faUndo} />
                    </Button>
                    <Button onMouseDown={handleMouseRedo} title='下一步'>
                        <FontAwesomeIcon icon={faRedo} />
                    </Button>
                </ToolBox>
            )}
            {showArrowBox && <ArrowBox />}
            {showToolBox && props.showVacancy === 4 && (
                <MyButton onMouseDown={event => handleMouseDownLink(event)} title='插入空位'>
                    插入空位
                </MyButton>
            )}
            <Content>{props.children}</Content>
        </Container>
    )
}

export default Paragraph
