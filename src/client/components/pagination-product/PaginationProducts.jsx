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
            // showSizeChanger={true}
            // pageSizeOptions={props.pageSizeOptions}
            // onShowSizeChange={props.onShowSizeChange}
            />
        </div>
    )
}

export default PaginationProducts