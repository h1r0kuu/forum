import "../assets/css/loader.css"
import Sidebar from "./layout/Sidebar/Sidebar"

function Loader() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-9">
                    <div id="main">
                        <div className="loader">
                            <div class="lds-roller">
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                </div>
                <Sidebar/>
            </div>
        </div>
    )
}

export default Loader