import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getVideogames, getGenres, getPlatforms, sortVideogames } from '../actions/index';
import styled from "styled-components";

const BotonColor = styled.button`
height: 40px;
width: 90px;
color:white;
background-color: red;
border-radius: 12%;
font-size: medium;
&:hover{
color:white;
background-color: #f14646;
border-radius: 12%;
font-size: x-large;
}
`
const H1styled = styled.h1`
display: flex;
justify-content: center;
color: #164681;
font-style: oblique;
font-family: 'Times New Roman', Times, serif;
`

const DivStyle = styled.div`
margin-top: 3%;
background-color: #ffffffcc;
border-radius: 10px;
border: solid 0px;
display: block;

    /* poner un fondo trasparente para el boton enter */
`
const DivCard = styled.div`
margin-top: 3%;
background-color: #fffffff9;
border-radius: 10px;
border: solid 0px;
display: block;

`

export default function LandingPage(){
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPlatforms())
    }, [dispatch])

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch])

    useEffect(() => {
        dispatch(getVideogames())
    }, [dispatch])

    function handleSortVideogames(event){
        dispatch(sortVideogames('asc'))
    }

    return (
        <DivStyle>
            <DivCard>
                <H1styled>Welcome to my Videogame Page</H1styled>
            </DivCard>
            <Link to = '/home'>
            <BotonColor onClick={handleSortVideogames}>Enter</BotonColor>
            </Link>
        </DivStyle>
    )
}