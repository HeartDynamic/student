import React, { FC } from 'react'
import styled from '@emotion/styled'

interface IOptions {
    width?: string
    height?: string
    border?: string
    radius?: string
    color?: string
    bgColor?: string
    HColor?: string
    HBorder?: string
    HbgColor?: string
    shadow?: string
}

interface IButton {
    title?: string
    disabled?: boolean
    options?: IOptions
    onClick?(): void
}

const MyButton = styled.button<{ option: IOptions }>`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${props => props.option.width || ''};
    height: ${props => props.option.height || '40px'};
    border: ${props => props.option.border || '1px solid transparent'};
    border-radius: ${props => props.option.radius || '4px'};
    background-color: ${props => props.option.bgColor || '#1890ff'};
    color: ${props => props.option.color || '#fff'};
    box-shadow: ${props => props.option.shadow || '0px 7px 7px 0px rgba(149, 220, 235, 0.22)'};
    padding: 0px 16px;
    outline: none;
    cursor: pointer;

    &:hover {
        background-color: ${props => props.option.HbgColor || '#40a9ff'};
        border: ${props => props.option.HBorder || '1px solid transparent'};
        color: ${props => props.option.HColor || ''};
    }
    :disabled {
        pointer-events: none;
        cursor: not-allowed;
    }
`

const Button: FC<IButton> = props => {
    const handleClick = () => {
        props.onClick && props.onClick()
    }
    return (
        <MyButton
            type='button'
            title={props.title}
            onClick={handleClick}
            option={props.options || {}}
            disabled={props.disabled}
        >
            {props.children}
        </MyButton>
    )
}
export default Button
