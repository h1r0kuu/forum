import { Link } from "react-router-dom"

function Pagination({pagination, order}) {
    
    function hasNext() {
        return pagination.pageable.pageNumber + 1 < pagination.totalPages
    }

    function currentPage() {
        return pagination.pageable.pageNumber
    }

    function hasPrevious() {
        return pagination.pageable.pageNumber !== 0
    }

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination">
                {hasPrevious() && 
                <li>
                    <Link to={"?page=" + (currentPage() - 1) + "&order=" + order}><span aria-hidden="true">«</span></Link>
                </li>
                }
                {Array.from(Array(pagination.totalPages), (e, i) => (
                    <>
                        {(i > currentPage() - 2 && i < currentPage() + 2) &&
                            <>
                            {currentPage() === i
                            ?
                                <li>
                                    <Link to={"#"} className={"current-page"}>{i + 1}</Link>
                                </li>
                            :
                                <li>
                                    <Link to={"?page="+i + "&order=" + order}>{i + 1}</Link>

                                </li>
                            }
                            </>
                        }
                    </>
                ))}
                {hasNext() &&
                <li>
                    <Link to={"?page=" + (currentPage() + 1) + "&order=" + order}><span aria-hidden="true">»</span></Link>
                </li>
                }
            </ul>
        </nav>
    )
}

export default Pagination