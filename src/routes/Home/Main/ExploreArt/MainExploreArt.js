import "./MainExploreArt.css"

function MainExploreArt() {
    return <div>
        <img
            style={{flex: 1}}
            src={process.env.PUBLIC_URL + "/img/explore-art.jpg"}
        />
        <div className="main__page__data">
            <h2
                style={{marginLeft: "10px"}}
                className="main__page__title"
            >Explore Art</h2>
            <p
                style={{marginLeft: "10px"}}
                className="main__page__description"
            >Explore the work of artists from around the world</p>
        </div>
    </div>
}

export default MainExploreArt;