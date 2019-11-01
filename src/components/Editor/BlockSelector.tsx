import React, { useState, FC, MouseEventHandler } from 'react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faParagraph, faHeading, faListUl, faFilm, faMusic, faSquareRootAlt } from '@fortawesome/free-solid-svg-icons'
import { faPlusSquare, faImage } from '@fortawesome/free-regular-svg-icons'

// import Button from '../Button'

const Container = styled.div`
    position: absolute;
    left: -30px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    height: 100%;
    width: 30px;
`
const Tag = styled.div`
    cursor: pointer;
    color: #aaa;
    height: 30px;
    width: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 18px;
    &:hover {
        color: #777;
    }
`
const PanelWrap = styled.div`
    position: absolute;
    width: 280px;
    height: 280px;
    background-color: #fff;
    top: 45px;
    left: -90px;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 8px 12px;
    box-shadow: rgba(16, 36, 94, 0.4) 0px 2px 6px 0px;
    display: flex;
    flex-direction: column;
`
const PanelTitle = styled.div`
    font-size: 14px;
    height: 30px;
    width: 100%;
    line-height: 30px;
    color: #777;
    border-bottom: 1px solid #ccc;
    text-indent: 10px;
    margin-bottom: 5px;
`
const PanelContent = styled.div`
    flex-grow: 1;
    /* background-color: #ccc; */
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    justify-items: center;
    align-items: center;
`
const PanelButton = styled.div`
    height: 70px;
    width: 70px;
    /* background-color: #00a6f3; */
    color: #777;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    font-size: 18px;
    border-radius: 3px;
    &:hover {
        box-shadow: rgba(16, 36, 94, 0.4) 0px 2px 6px 0px;
    }
`
const ButtonText = styled.div`
    font-size: 12px;
`

const Panel: FC<IProps> = props => {
    return (
        <PanelWrap onMouseDown={e => e.preventDefault()}>
            <PanelTitle>模块列表</PanelTitle>
            <PanelContent>
                <PanelButton>
                    <FontAwesomeIcon icon={faParagraph} />
                    <ButtonText>段落</ButtonText>
                </PanelButton>
                <PanelButton>
                    <FontAwesomeIcon icon={faHeading} />
                    <ButtonText>标题</ButtonText>
                </PanelButton>
                <PanelButton>
                    <FontAwesomeIcon icon={faListUl} />
                    <ButtonText>列表</ButtonText>
                </PanelButton>
                <PanelButton onClick={props.clickImg}>
                    <FontAwesomeIcon icon={faImage} />
                    <ButtonText>图片</ButtonText>
                </PanelButton>
                <PanelButton>
                    <FontAwesomeIcon icon={faMusic} />
                    <ButtonText>音频</ButtonText>
                </PanelButton>
                <PanelButton onClick={props.clickVideo}>
                    <FontAwesomeIcon icon={faFilm} />
                    <ButtonText>视频</ButtonText>
                </PanelButton>
                <PanelButton>
                    <FontAwesomeIcon icon={faSquareRootAlt} />
                    <ButtonText>公式</ButtonText>
                </PanelButton>
            </PanelContent>
        </PanelWrap>
    )
}

interface IProps {
    clickImg: MouseEventHandler
    clickVideo: MouseEventHandler
}

const BlockSelector: FC<IProps> = props => {
    const [showPanel, setShowPanel] = useState(false)
    const handleClick = () => {
        setShowPanel(!showPanel)
    }
    return (
        <Container>
            {showPanel && <Panel clickImg={props.clickImg} clickVideo={props.clickVideo} />}
            <Tag onMouseDown={handleClick}>
                <FontAwesomeIcon icon={faPlusSquare} />
            </Tag>
        </Container>
    )
}

export default BlockSelector
