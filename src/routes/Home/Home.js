import './Home.css';
import { useContext, useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import Gallery from './Gallery/Gallery';
import Theater from './Theater/Theater';
import NewPost from './NewPost/NewPost';

function Home({ history, defaultRoute }) {
    const { user, setUser } = useContext(UserContext);
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState(defaultRoute ?? document.location.pathname.split("/")[1] ?? "new_post");
    const navigate = useNavigate();
    const menuItems = [
        {
            id: "theater",
            path: "theater",
            icon: "movie",
            element: Theater,
        },
        {
            id: "new_post",
            path: "new_post",
            icon: "add_box",
            element: NewPost,
        },
        {
            id: "gallery",
            path: "gallery",
            icon: "image",
            element: Gallery,
        },
    ]

    useEffect(() => {
        history.listen((location) => {
            setDrawerIsOpen(document.location.href.includes("#drawer"));
        })
    }, [])

    useEffect(() => {
        setDrawerIsOpen(document.location.href.includes("#drawer"));
    }, [history])

    return (
        <>
            <div className={"App"} onClick={(e) => {
                if (e.target.id !== "drawer-button" &&
                    !document.querySelector("#drawer-button").contains(e.target) &&
                    document.location.href.endsWith("#drawer") &&
                    !document.querySelector(".drawer-content").contains(e.target)) {
                    navigate(-1);
                }
            }}>
                <header className="App-header">
                    <div className="header__leading">
                        <button id="drawer-button" onClick={() => {
                            if (document.location.href.endsWith("#drawer")) {
                                navigate(-1);
                            } else {
                                navigate("#drawer");
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
                        <Route path="/" element={<div className=''></div>} />
                        {menuItems.map((menuItem) => {
                            return <Route
                                key={menuItem.id}
                                path={menuItem.path}
                                element={<menuItem.element />} />
                        })}
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
                                            navigate(item.path)
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
                <aside id="drawer" className={drawerIsOpen ? "opened" : ""}>
                    <div className="drawer-content">

                    </div>
                </aside>
            </div>
        </>
    );
}

export default Home;
