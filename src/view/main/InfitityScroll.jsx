//无限滚动 --留着之后实现
import React, { useEffect, useContext, useState, useRef } from 'react'
import styled from '@emotion/styled'
import { useObserver } from 'mobx-react-lite'

import { IStore } from '../../store'

const ScrollbarWrap = styled.div`
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: calc(100% - 46px);
    overflow-y: auto;
    padding-right: 30px;
    padding-top: 20px;
    &::-webkit-scrollbar-button {
        background-color: #fff;
    }
    &::-webkit-scrollbar {
        background-color: #fff;
        width: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: rgba(66, 88, 99, 0.4);
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: #ddd;
    }
`

const Ul = styled.ul`
    margin: 0;
    position: absolute;
    list-style-type: none;
    top: ${props => props.ulTop};
    width: 100%;
    box-sizing: border-box;
    padding: 0;
`
const Li = styled.li`
    background-color: yellow;
    margin-left: 10;
    margin-right: 10;
    height: ${props => props.liHeight};
    margin-top: ${props => props.liMarginTop};
`

// 模拟100条数据
let count = 1
let list = Array.from({ length: 30 }, () => {
    return count++
})

let liHeight = 100, // 单个li高度
    liMarginTop = 10, // li的marginTop
    viewHeight = 200, // 视口高度
    viewWidth = 200, // 视口宽度
    showLiCount = 10 // 视口内盛放的li个数

const InfitityScroll = () => {
    const [nowList, setNowList] = useState(list.slice(0, showLiCount))
    const [ulTop, setUlTop] = useState(0) // 内部第二个ul距离容器的距离
    const [ulHeight, setUlHeight] = useState(list.length * liHeight + (list.length + 1) * liMarginTop) // 计算所有li的总的高度
    const ulContainer = useRef(null)

    const handleScroll = () => {
        let nowTop = ulContainer.current.scrollTop
        setUlTop(nowTop - (nowTop % (liHeight + liMarginTop)))
        let start = parseInt(nowTop / (liHeight + liMarginTop))
        console.log(nowTop, start + 1, nowTop, liHeight, liMarginTop)
        setNowList(list.slice(start, start + showLiCount))
    }
    return useObserver(() => (
        <ScrollbarWrap ref={ulContainer} onScroll={handleScroll}>
            <ul style={{ margin: 0, padding: 0, height: ulHeight + 'px' }}></ul>
            <Ul ulTop={ulTop + 'px'}>
                {nowList.map((item, index) => (
                    <Li key={index} liHeight={liHeight + 'px'} liMarginTop={liMarginTop + 'px'}>
                        {item}
                    </Li>
                ))}
            </Ul>
        </ScrollbarWrap>
    ))
}

export default InfitityScroll
