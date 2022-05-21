import './Home.css';
import { useContext, useEffect, useState } from 'react';
import User from '../../models/User';
import { Routes, Route, Link } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';

function Home({ history }) {
    const { user, setUser } = useContext(UserContext);
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState("home");
    const menuItems = [
        {
            id: "theater",
            icon: "theater_comedy",
        },
        {
            id: "new_post",
            icon: "add_box",
        },
        {
            id: "pictures",
            icon: "brush",
        },
    ]

    useEffect(() => {
        setDrawerIsOpen(document.location.href.includes("#drawer"));
    }, [])

    useEffect(() => {
        return history.listen((location) => {
            setDrawerIsOpen(document.location.href.includes("#drawer"));
        })
    }, [history])

    return (
        <>
            <div className={"App"} onClick={(e) => {
                if (e.target.id !== "drawer-button" && !document.querySelector("#drawer-button").contains(e.target) && document.location.href.endsWith("#drawer")) {
                    history.back();
                }
            }}>
                <header className="App-header">
                    <div className="header__leading">
                        <button id="drawer-button" onClick={() => {
                            if (document.location.href.endsWith("#drawer")) {
                                history.back();
                            } else {
                                history.push("#drawer");
                            }
                        }}>
                            <div>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </button>
                    </div>
                    <h1>
                        visart
                    </h1>
                </header>
                <main>
                    <Routes>
                        <Route path="/"></Route>
                    </Routes>
                </main>
                <nav className="bottomNavigationMenu">
                    {
                        menuItems.map((item) => {
                            return <div key={item.id}>
                                <input
                                    type="radio"
                                    className="bottomNavigationMenu__item"
                                    id={item.id}
                                    checked={selectedMenuItem === item.id}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            setSelectedMenuItem(item.id);
                                        }
                                    }} />
                                <label htmlFor={item.id} >
                                    <span className={selectedMenuItem === item.id ? "material-icons" : "material-icons-outlined"}>
                                        {selectedMenuItem === item.id ? item.icon_selected ?? item.icon : item.icon}
                                    </span>
                                </label>
                            </div>
                        })
                    }
                </nav>
                <aside id="drawer" className={drawerIsOpen ? "opened" : ""}></aside>
            </div>
        </>
    );
}

export default Home;
