import Stats from "./Bars/Stats"
import LoginBar from "./Bars/LoginBar"
import RecentPosts from "./Bars/RecentPosts"

function Sidebar({store}) {
    return (
        <aside className="col-md-3 sidebar97239">
            <Stats />
            {!store.isAuth &&
                <LoginBar />
            }
            {/* <div className="highest-part302">
                <h4>Highest Points</h4>
                <div className="pints-wrapper">
                <div className="left-user3898">
                    <a href="#">
                    <img src="image/images.png" alt="Image"/>
                    </a>
                    <div className="imag-overlay39">
                    <a href="#">
                        <i className="fa fa-plus" aria-hidden="true"></i>
                    </a>
                    </div>
                </div>
                <span className="points-details938">
                    <a href="#">
                    <h5>Ahmed Hasan</h5>
                    </a>
                    <a href="#" className="designetion439">Pundit</a>
                    <p>206 points</p>
                </span>
                </div>
                <hr/>
                <div className="pints-wrapper">
                <div className="left-user3898">
                    <a href="#">
                    <img src="image/images.png" alt="Image"/>
                    </a>
                    <div className="imag-overlay39">
                    <a href="#">
                        <i className="fa fa-plus" aria-hidden="true"></i>
                    </a>
                    </div>
                </div>
                <span className="points-details938">
                    <a href="#">
                    <h5>Ahmed Hasan</h5>
                    </a>
                    <a href="#" className="designetion439">Pundit</a>
                    <p>206 points</p>
                </span>
                </div>
                <hr/>
                <div className="pints-wrapper">
                <div className="left-user3898">
                    <a href="#">
                    <img src="image/images.png" alt="Image"/>
                    </a>
                    <div className="imag-overlay39">
                    <a href="#">
                        <i className="fa fa-plus" aria-hidden="true"></i>
                    </a>
                    </div>
                </div>
                <span className="points-details938">
                    <a href="#">
                    <h5>Ahmed Hasan</h5>
                    </a>
                    <a href="#" className="designetion439">Pundit</a>
                    <p>206 points</p>
                </span>
                </div>
                <hr/>
                <div className="pints-wrapper">
                <div className="left-user3898">
                    <a href="#">
                    <img src="image/images.png" alt="Image"/>
                    </a>
                    <div className="imag-overlay39">
                    <a href="#">
                        <i className="fa fa-plus" aria-hidden="true"></i>
                    </a>
                    </div>
                </div>
                <span className="points-details938">
                    <a href="#">
                    <h5>Ahmed Hasan</h5>
                    </a>
                    <a href="#" className="designetion439">Pundit</a>
                    <p>206 points</p>
                </span>
                </div>
                <hr/>
                <div className="pints-wrapper">
                <div className="left-user3898">
                    <a href="#">
                    <img src="image/images.png" alt="Image"/>
                    </a>
                    <div className="imag-overlay39">
                    <a href="#">
                        <i className="fa fa-plus" aria-hidden="true"></i>
                    </a>
                    </div>
                </div>
                <span className="points-details938">
                    <a href="#">
                    <h5>Ahmed Hasan</h5>
                    </a>
                    <a href="#" className="designetion439">Pundit</a>
                    <p>206 points</p>
                </span>
                </div>
            </div> */}
            <RecentPosts />
        </aside>
    )
}

export default Sidebar