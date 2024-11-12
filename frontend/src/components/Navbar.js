import React from "react";

function Header(){

    return(
        <div>
            <nav className ="navbar navbar-expand-lg bg-light">
            <div className="container-fluid" style={{backgroundColor:'#e3f2fd'}}>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/" style={{color: "blue"}}>ToDo</a>
                </li>
                </ul>
                <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/status/complete" style={{color: "blue"}}>Completed Tasks</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/status/incomplete" style={{color: "blue"}}>Incomplete Tasks</a>
                </li>
                </ul>
            </div>
            </div>
            </nav>
         </div>
    )
}

export default Header;