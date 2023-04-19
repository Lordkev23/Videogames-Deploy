import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getVideogamesId } from "../actions";
import styled from "styled-components";

const DivCard = styled.div`
margin-top: 3%;
background-color: #ffffffa7;
border-radius: 10px;
border: solid 2px;
display: inline-block;
&:hover{
background-color: #ffffffef;
border-radius: 10px;
border: solid 2px;
display: inline-block;
}
`
const BotonColor = styled.button`
height: 30px;
width: 80px;
color:white;
background-color: #35aedf;
border-radius: 5%;
font-size: medium;
&:hover{
color:white;
background-color: #b5cdd4;
border-radius: 5%;
font-size: large;
}
`

export default function Detail(props){
    const dispatch = useDispatch()
// console.log(props);
    useEffect(()=>{
        dispatch(getVideogamesId(props.match.params.id))
    }, [dispatch])

    const detailes = useSelector(state => state.details_Global)
    
    const genres = detailes.genres&&detailes.genres.filter(i=>i.id).length?detailes.genres.map(i=>i.name):detailes.genres
    
    const date =  detailes.released&&detailes.released.length?detailes.released:detailes.release_date

    console.log(date,' hola');
    return(
        <DivCard>
            <div>
                <div>
                    
                    <Link to='/home'>
                        <BotonColor>Home</BotonColor>
                    </Link>
                    <h2>{detailes.name} Details</h2>
                </div>
                <img src={detailes.image} alt='No imagen found' width='250px' height='300px'></img>
                <h3>Description</h3>
                <h5>{detailes.description}</h5>
                <div>
                    <h4>{`Rating: ${detailes.rating}`}</h4>
                </div>
                <div>
                    <h4>{`Released Date: ${date}`}</h4>
                    
                </div>
                <h4>{`Platforms: ${detailes.platforms}`}</h4>
                {detailes.genres&&<h4>Geners:{genres.join()}</h4>}
            </div>
        </DivCard>
    )
}