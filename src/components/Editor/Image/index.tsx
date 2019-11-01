import React, { useState, useEffect, useRef, FC, MouseEventHandler } from 'react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAlignLeft, faAlignCenter, faAlignRight } from '@fortawesome/free-solid-svg-icons'
import Cookies from 'js-cookie'
import { Resizable, ResizeCallback } from 're-resizable'
import { RenderBlockProps } from 'slate-react'

import ArrowBox from '../ArrowBox'
import Right from './Right'
import Left from './Left'
import Bottom from './Bottom'

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
const ImageInput = styled.input`
    position: absolute;
    z-index: -1;
`
const ImgWrap = styled.div<{ align: string }>`
    display: flex;
    align-items: center;
    justify-content: ${props =>
        props.align === 'center' ? 'center' : props.align === 'left' ? 'flex-start' : 'flex-end'};
`
const Img = styled.img`
    height: 100%;
`

interface IProps {
    align: string
    url: string
    height: number
}

const Image: FC<RenderBlockProps & IProps> = props => {
    const [align, setAlign] = useState(props.align)
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
        // eslint-disable-next-line
    }, [props.isFocused])
    useEffect(() => {
        if (props.url && props.isFocused) {
            setShowToolBox(true)
        }
        // eslint-disable-next-line
    }, [props.url])
    const handleAlignLeft: MouseEventHandler = e => {
        e.preventDefault()
        setAlign('left')
        props.editor.setNodeByKey(props.node.key, {
            type: 'image',
            data: {
                ...props.node.toJSON().data,
                align: 'left',
            },
        })
    }
    const handleAlignCenter: MouseEventHandler = e => {
        e.preventDefault()
        setAlign('center')
        props.editor.setNodeByKey(props.node.key, {
            type: 'image',
            data: {
                ...props.node.toJSON().data,
                align: 'center',
            },
        })
    }
    const handleAlignRight: MouseEventHandler = e => {
        e.preventDefault()
        setAlign('right')
        props.editor.setNodeByKey(props.node.key, {
            type: 'image',
            data: {
                ...props.node.toJSON().data,
                align: 'right',
            },
        })
    }
    const ImageInputRef = useRef<HTMLInputElement>(null)
    const handleSelectImage: MouseEventHandler = () => {
        props.editor.moveToStartOfNode(props.node)
        props.editor.focus()
        ImageInputRef.current && ImageInputRef.current.click()
    }
    const handleUpload = () => {
        const url = 'https://upload-z2.qiniup.com'
        let body = new FormData()
        if (ImageInputRef.current && ImageInputRef.current.files) {
            body.append('file', ImageInputRef.current.files[0])
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
                    type: 'image',
                    data: { url: `https://img2.heartdynamic.cn/${data.key}`, height: 0, align: 'center' },
                })
            })
    }
    const handleClickImg = () => {
        props.editor.moveToStartOfNode(props.node)
        props.editor.focus()
    }
    const handleResize: ResizeCallback = (event, direction, refToElement, delta) => {
        console.log(delta)
        props.editor.setNodeByKey(props.node.key, {
            type: 'image',
            data: {
                ...props.node.toJSON().data,
                height: delta.height + props.height,
            },
        })
    }
    return (
        <Container
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            showBorder={showBorder}
            showLine={showLine}
        >
            <ImageInput type='file' accept='image/*' ref={ImageInputRef} onChange={handleUpload} />
            {showArrowBox && <ArrowBox />}
            {showToolBox && (
                <ToolBox>
                    <Button onMouseDown={handleAlignLeft} active={align === 'left'}>
                        <FontAwesomeIcon icon={faAlignLeft} />
                    </Button>
                    <Button onMouseDown={handleAlignCenter} active={align === 'center'}>
                        <FontAwesomeIcon icon={faAlignCenter} />
                    </Button>
                    <Button onMouseDown={handleAlignRight} active={align === 'right'}>
                        <FontAwesomeIcon icon={faAlignRight} />
                    </Button>
                </ToolBox>
            )}
            {showLable && <Lable>Image</Lable>}
            {props.url ? (
                <Content>
                    <ImgWrap align={align}>
                        <Resizable
                            lockAspectRatio
                            maxWidth='100%'
                            minHeight={200}
                            handleComponent={{
                                right: <Right />,
                                left: <Left />,
                                bottom: <Bottom />,
                            }}
                            enable={
                                !props.isFocused
                                    ? {
                                          top: false,
                                          right: false,
                                          bottom: false,
                                          left: false,
                                          topRight: false,
                                          bottomRight: false,
                                          bottomLeft: false,
                                          topLeft: false,
                                      }
                                    : align === 'center'
                                    ? {
                                          top: false,
                                          right: true,
                                          bottom: true,
                                          left: true,
                                          topRight: false,
                                          bottomRight: false,
                                          bottomLeft: false,
                                          topLeft: false,
                                      }
                                    : align === 'left'
                                    ? {
                                          top: false,
                                          right: true,
                                          bottom: true,
                                          left: false,
                                          topRight: false,
                                          bottomRight: false,
                                          bottomLeft: false,
                                          topLeft: false,
                                      }
                                    : {
                                          top: false,
                                          right: false,
                                          bottom: true,
                                          left: true,
                                          topRight: false,
                                          bottomRight: false,
                                          bottomLeft: false,
                                          topLeft: false,
                                      }
                            }
                            defaultSize={{
                                width: 'auto',
                                height: props.height + 200,
                            }}
                            onResizeStop={handleResize}
                        >
                            <Img src={props.url} onClick={handleClickImg} />
                        </Resizable>
                    </ImgWrap>
                </Content>
            ) : (
                <Content>
                    <Default>
                        <Title>
                            <TitleTag>
                                <i className='far fa-image' />
                            </TitleTag>
                            <TitleText>Image</TitleText>
                        </Title>
                        <SelectButton onClick={handleSelectImage}>select image</SelectButton>
                    </Default>
                </Content>
            )}
        </Container>
    )
}

export default Image
