import { Link } from "react-router-dom"
import Pagination from "../../Pagination"
import Sidebar from "../Sidebar/Sidebar"

function UserListTemplate({users, pagination, order, store}) {
    return (
        <>
        <div className="container">
            <div className="row">
                <div className="col-md-9">
                    <div id="main">
                        <Link to={`?page=0&order=comments`} className="tab">Most Response</Link>
                        <section id="content">
                            {users.map(user=>(
                                <>
                                {user.username}
                                </>
                            ))}
                            {pagination && pagination.pageable &&
                                <Pagination pagination={pagination} order={order} />
                            }
                        </section>
                    </div>
                </div>
                <Sidebar store={store} />
            </div>
        </div>
        </>
    )
}

export default UserListTemplate