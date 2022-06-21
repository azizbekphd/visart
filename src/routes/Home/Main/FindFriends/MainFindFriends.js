import "./MainFindFriends.css"

function MainFindFriends() {
    return <div>
        <img
            style={{flex: 1}}
            src={process.env.PUBLIC_URL + "/img/find-friends.jpg"}
        />
        <div className="main__page__data">
            <h2
                style={{marginLeft: "10px"}}
                className="main__page__title"
            >Find Friends and Work</h2>
            <p
                style={{marginLeft: "10px"}}
                className="main__page__description"
            >Gain popularity and get job offers</p>
        </div>
    </div>
}

export default MainFindFriends;