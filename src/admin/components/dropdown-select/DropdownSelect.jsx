import React from 'react'
import './dropdownSelect.scss'
import { CaretDownOutlined } from '@ant-design/icons'
import { useState } from 'react'

const DropdownSelect = (props) => {
    console.log(props.dataList);
    const [isOpen, setIsOpen] = useState(false)
    const hanleOpen = () => {
        if(isOpen) {
            setIsOpen(false)
        } else {
            setIsOpen(true)
        }
    }
    const [value, setValue] = useState()
    const [text, setText] = useState()
    const getValue = (e) => {
        setValue(e.target.value)
        setText(e.target.textContent)
    }
    console.log(value);
    return (
        <div className='dropdown-continer' onClick={hanleOpen}>
            <div className='dropdown-select'>
                <span className='select'>{text ? text : 'Lựa chọn'}</span>
                <CaretDownOutlined />
            </div>

            <div className='dropdown-list' style={{display: `${isOpen ? 'block' : 'none'}`}}>
                {
                    (props.dataList).map((item) => 
                    <li className='dropdown-list__item' key={item.id} value={item.id} onClick={getValue}>{item.name}</li>)
                }
            </div>
        </div>
    )
}

export default DropdownSelect