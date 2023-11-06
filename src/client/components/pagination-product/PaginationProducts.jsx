import { Pagination } from 'antd'
import React from 'react'
import './paginationProducts.scss'

const PaginationProducts = (props) => {
    return (
        <div className='pagination'>
            <Pagination 
            current={props.currentPage} 
            total={props.total}
            pageSize={props.pageSize} 
            onChange={props.handlePageChange}
            />
        </div>
    )
}

export default PaginationProducts