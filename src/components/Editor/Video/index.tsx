import React, { useState, useEffect, useRef, FC } from 'react'
import styled from '@emotion/styled'
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons'
import { RenderBlockProps } from 'slate-react'

import ArrowBox from '../ArrowBox'
// import Player from '../../Video'

const Container = styled.div<{ showBorder: boolean; showLine: boolean }>`
    position: relative;
    width: 100%;
    margin-bottom: 10px;
    box-sizing: border-box;
    /* background-color: #ccc; */
    border: 1px solid transparent;
    border-left-width: 3px;
    border-color: ${props => (props.showBorder ? 'rgba(66, 88, 99, 0.4)' : 'transparent')};
    border-left-color: ${props => (props.showLine ? '#777' : 'transparent')};
    /* font-family: 'Noto Serif'; */
    &:hover {
        border-left-color: ${props => (props.showLine ? '#777' : '#e2e4e7')};
    }
`
const Content = styled.div`
    position: relative;
    min-height: 228px;
    flex-grow: 1;
    box-sizing: border-box;
    padding: 14px;
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
const Default = styled.div`
    background-color: #f3f3f4;
    height: 200px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`
const Title = styled.div`
    display: flex;
    align-items: center;
`
const TitleTag = styled.div`
    margin-right: 10px;
    font-size: 26px;
`
const TitleText = styled.div``
const SelectButton = styled.div`
    height: 30px;
    width: 100px;
    line-height: 30px;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #ccc;
    font-size: 14px;
    cursor: pointer;
    user-select: none;
`
const VideoInput = styled.input`
    position: absolute;
    z-index: -1;
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
const Button = styled.div<{ active: boolean }>`
    height: 30px;
    width: 30px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 30px;
    text-align: center;
    border: 1px solid transparent;
    box-sizing: border-box;
    border-radius: 3px;
    color: ${props => (props.active ? '#fff' : '#555d66')};
    background-color: ${props => (props.active ? '#555d66' : '#fff')};
    cursor: pointer;
    &:hover {
        border-color: #777;
    }
`

interface IProps {
    url: string
}

const Video: FC<RenderBlockProps & IProps> = props => {
    const [showBorder, setShowBorder] = useState(false)
    const [showLable, setShowLabel] = useState(false)
    const [showArrowBox, setShowArrowBox] = useState(false)
    const [showLine, setShowLine] = useState(false)
    const [showToolBox, setShowToolBox] = useState(false)
    const handleMouseEnter = () => {
        if (!props.isFocused) {
            setShowLabel(true)
        }
        setShowArrowBox(true)
    }
    const handleMouseLeave = () => {
        setShowLabel(false)
        if (!props.isFocused) {
            setShowArrowBox(false)
        }
    }
    useEffect(() => {
        if (props.isFocused) {
            if (props.url) {
                setShowToolBox(true)
            }
            setShowLine(true)
            setShowArrowBox(true)
            setShowBorder(true)
            setShowLabel(false)
        } else {
            setShowLine(false)
            setShowArrowBox(false)
            setShowBorder(false)
            setShowToolBox(false)
        }
    }, [props.isFocused, props.url])
    useEffect(() => {
        if (props.url && props.isFocused) {
            setShowToolBox(true)
        }
    }, [props.url, props.isFocused])
    const VideoInputRef = useRef<HTMLInputElement>(null)
    const handleSelectVideo = () => {
        props.editor.moveToStartOfNode(props.node)
        props.editor.focus()
        VideoInputRef.current && VideoInputRef.current.click()
    }
    const handleUpload = () => {
        const url = 'https://upload-z2.qiniup.com'
        let body = new FormData()
        if (VideoInputRef.current && VideoInputRef.current.files) {
            body.append('file', VideoInputRef.current.files[0])
        }
        body.append('token', Cookies.get('uploadToken') + '')
        body.append('key', new Date().getTime() + '')
        fetch(url, {
            method: 'POST',
            body: body,
        })
            .then(res => res.json())
            .then(data => {
                props.editor.setNodeByKey(props.node.key, {
                    type: 'video',
                    data: { url: `https://img2.heartdynamic.cn/${data.key}` },
                })
            })
    }
    const handleClick = () => {
        props.editor.moveToStartOfNode(props.node)
        props.editor.focus()
    }
    const handleClickExchange = () => {
        props.editor.setNodeByKey(props.node.key, {
            type: 'video',
            data: { url: '' },
        })
    }
    return (
        <Container
            showBorder={showBorder}
            showLine={showLine}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <VideoInput type='file' accept='video/*' ref={VideoInputRef} onChange={handleUpload} />
            {showArrowBox && <ArrowBox />}
            {showToolBox && (
                <ToolBox>
                    <Button onClick={handleClickExchange} active={true}>
                        <FontAwesomeIcon icon={faExchangeAlt} />
                    </Button>
                </ToolBox>
            )}
            {showLable && <Lable>video</Lable>}
            {props.url ? (
                <Content>{/* <Player url={props.url} onClick={handleClick} /> */}</Content>
            ) : (
                <Default>
                    <Title>
                        <TitleTag>
                            <i className='far fa-image' />
                        </TitleTag>
                        <TitleText>Video</TitleText>
                    </Title>
                    <SelectButton onClick={handleSelectVideo}>select video</SelectButton>
                </Default>
            )}
        </Container>
    )
}

export default Video
