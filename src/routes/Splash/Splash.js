import './Splash.css';

function Splash() {
    return <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
    }}>
        <img src="/logo.png" alt="visart" height={256}/>
    </div>
}

export default Splash;