import { useEffect, useState } from "react";
import MainCreateArt from "./CreateArt/MainCreateArt";
import MainExploreArt from "./ExploreArt/MainExploreArt";
import MainFindFriends from "./FindFriends/MainFindFriends";
import "./Main.css"

function Main({...props}){
    const pagesCount = 3;
    const [page, setPage] = useState(0)

    useEffect(()=>{
        let animation = setInterval(()=>{
            console.log("Tick")
            setPage((page+1)%pagesCount)
        }, 10000)
        return ()=>{
            clearInterval(animation)
        }
    },[page])

    function returnPrev(index){
        return index > 0 ? index - 1 : pagesCount - 1;
    }

    return <div className="main-content">
        <div className="main__pages">
            {[
                <MainExploreArt/>,
                <MainCreateArt/>,
                <MainFindFriends/>,
            ].map((item, index)=>{
                return <div
                    className={["main__page",
                        index === page ? "visible"
                            : index === returnPrev(page) ? "previous"
                                : ""].join(" ")
                    }
                    key={index.toString()}
                >
                    {item}
                </div>
            })}
        </div>
    </div>
}

export default Main;