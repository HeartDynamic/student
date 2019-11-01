import React from 'react'
import styled from '@emotion/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle, faInfo, faCheckCircle, faExclamationCircle, faSpinner } from '@fortawesome/free-solid-svg-icons'

const NoticeWrap = styled.div`
    display: flex;
    align-items: center;
    background-color: #ffffff;
    padding: 10px 16px;
    margin: 8px auto;
    box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.1);
    border-radius: 6px;
    color: #454545;
    svg {
        color: ${props => props.color};
    }
`
const Font = styled.div`
    width: 20px;
    text-align: center;
`
const Span = styled.span`
    height: 20px;
    line-height: 20px;
    flex: 1;
    text-align: center;
    margin-left: 8px;
`

const Notice = props => {
    const { type, content } = props
    const icons = {
        info: { font: faInfo, color: '#1890ff' },
        success: { font: faCheckCircle, color: '#52c41a' },
        warning: { font: faExclamationCircle, color: '#faad14' },
        error: { font: faTimesCircle, color: '#f74a53' },
        loading: { font: faSpinner, color: '#1890ff' },
    }

    return (
        <NoticeWrap color={icons[type].color}>
            <Font>
                <FontAwesomeIcon icon={icons[type].font}></FontAwesomeIcon>
            </Font>
            <Span>{content}</Span>
        </NoticeWrap>
    )
}

export default Notice
