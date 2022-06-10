import "../styles/header.css"

function Header() {
    return (
        <header>
            <ul>
                <li>Logo</li>
                <li>Home</li>
                <li>Faq</li>
            </ul>
            <div className="search">
                <input type="text" className="search-input"/>
                <button>Search</button> 
            </div>
        </header>
    )
}

export default Header