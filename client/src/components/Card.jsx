import React from "react";
import styled from "styled-components";

const DivCard = styled.div`
margin-top: 3%;
background-color: #ffffffd8;
border-radius: 10px;
border: solid 2px;
display: inline-block;
border: solid 1px;
border-color: gray;
&:hover{
background-color: #fffffff9;
border-radius: 10px;
border: solid 2px;
display: inline-block;
border: solid 3px;
border-color: black;
}
`

const Imgcard = styled.img`
display: flex;
justify-content: center;
border-radius: 10%;
border: solid 1px;
border-color: gray;
border-width: 1.5px;
&:hover{
display: flex;
justify-content: center;
border-radius: 10%;
border: solid 1px;
border-color: black;
border-width: 3px;
   -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
    -o-transform: scale(1.1);
    -ms-transform: scale(1.1);
    transform: scale(1.1)
}
`
const H2styled = styled.h2`
display: flex;
justify-content: center;
color: #080a0c;
text-decoration-line: none;
&:hover{
display: flex;
justify-content: center;
color: #246fbb;
text-decoration-line: none;
font-style: oblique;
font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
`
const H4styled = styled.h4`
display: flex;
justify-content: center;
color: #586879;
text-decoration-line: none;
&:hover{
display: flex;
justify-content: center;
color: #14181d;
text-decoration-line: none;
font-style: oblique;
font-family: 'Times New Roman', Times, serif;
}
`

export default function Card({ image, name, genres, rating }){
    const genresShow = genres.length && genres.join(", ");
    return(
        <DivCard>
            <div>
                <H2styled>{name}</H2styled>
                {!genres[0].id?<H4styled>{genresShow}</H4styled>:genres?.map((ele,key) => <h4 key={key}>{ele.name}</h4>)}
                <h6>{rating} ⭐</h6>
                <Imgcard src={image} width="300px" height="180px"/>
            </div>
        </DivCard>
    )
}