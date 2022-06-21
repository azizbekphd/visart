import "./MainCreateArt.css"

function MainCreateArt() {
    return <div>
        <img
            src={process.env.PUBLIC_URL + "/img/create-art.jpg"}
        />
        <div className="main__page__data">
            <h2
                style={{marginLeft: "10px"}}
                className="main__page__title"
            >Create Art</h2>
            <p
                style={{marginLeft: "10px"}}
                className="main__page__description"
            >Share your work as videos or images</p>
        </div>
    </div>
}

export default MainCreateArt;