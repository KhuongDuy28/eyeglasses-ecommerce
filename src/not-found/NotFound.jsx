import React from 'react'
import './notFound.scss'
import Image4040 from './4040/4040.png'

const NotFound = () => {
  return (
    <div className='not-page'>
        <img src={Image4040} alt="" />
        <p>Chúng tôi không tìm thấy trang bạn muốn tìm kiếm!</p>
        <p>Hoặc đây có thể là một chức năng mà chúng tôi đang trong quá trình phát triển.</p>
    </div>
  )
}

export default NotFound