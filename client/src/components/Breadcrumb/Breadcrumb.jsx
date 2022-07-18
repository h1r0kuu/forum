import "./BreadcrumbStyles.css"

function Breadcrumb(props) {
    return (
        <section className="header-breadcrumb">
            <div className="container">
                <h3>{props.title}</h3>
                <ol className="breadcrumb breadcrumb-style">
                    {props.children}
                </ol>
            </div>
        </section>
    )
}

export default Breadcrumb