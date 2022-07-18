import "./PaginationStyles.css"

import { Link } from "react-router-dom"
import {Fragment} from "react"

function Pagination({pagination, order, additionalParams}) {
    function hasPrevious() {
        return pagination.pageable.pageNumber !== 0
    }
    function currentPage() {
        return pagination.pageable.pageNumber
    }
    function hasNext() {
        return pagination.pageable.pageNumber + 1 < pagination.totalPages
    }
    
    return (
        <nav aria-label="Page navigation">
            <ul className="pagination">
                {hasPrevious() && 
                    <li>
                        <Link to={"?page=" + (currentPage() - 1) + "&order=" + order + (additionalParams || '')}>
                            <span aria-hidden="true">«</span>
                        </Link>
                    </li>
                }
                {Array.from(Array(pagination.totalPages), (e, i) => (
                    <Fragment key={i}>
                        {(i > currentPage() - 2 && i < currentPage() + 2) &&
                            <>
                                {currentPage() === i
                                ?
                                    <li>
                                        <Link to={"#"} className={"current-page"}>{i + 1}</Link>
                                    </li>
                                :
                                    <li>
                                        <Link to={"?page="+i + "&order=" + order + (additionalParams || '')}>{i + 1}</Link>

                                    </li>
                                }
                            </>
                        }
                    </Fragment>
                ))}
                {hasNext() &&
                    <li>
                        <Link to={"?page=" + (currentPage() + 1) + "&order=" + order + (additionalParams || '')}>
                            <span aria-hidden="true">»</span>
                        </Link>
                    </li>
                }
            </ul>
        </nav>
    )
}

export default Pagination