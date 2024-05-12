import { useParams } from "react-router-dom";
import BoardComponent from "../components/BoardComponent";
import { useEffect } from "react";

const BoardEdit = () => {

    const { seq } = useParams();
    
    return (
        <BoardComponent isEdit={true} seq={seq}/>
    )
};

export default BoardEdit;