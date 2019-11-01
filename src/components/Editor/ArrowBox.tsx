import React, { FC, MouseEventHandler } from 'react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons'

const Container = styled.div`
    top: 0;
    left: -28px;
    height: 50px;
    width: 25px;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
`
const ArrowWrap = styled.div`
    height: 20px;
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #777;
    border: 1px solid transparent;
    border-radius: 2px;
    cursor: pointer;
    &:hover {
        border-color: #e2e4e7;
    }
`
interface IProps {
    moveUp?: MouseEventHandler
    moveDown?: MouseEventHandler
}

const ArrowBox: FC<IProps> = props => {
    return (
        <Container>
            <ArrowWrap onMouseDown={props.moveUp}>
                <FontAwesomeIcon icon={faAngleUp} />
            </ArrowWrap>
            <ArrowWrap onMouseDown={props.moveDown}>
                <FontAwesomeIcon icon={faAngleDown} />
            </ArrowWrap>
        </Container>
    )
}

export default ArrowBox
