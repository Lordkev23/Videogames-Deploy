import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import getVideogameName from '../actions/index';
import styled from 'styled-components';

const Search = styled.div`
   border-width: 80%;
   text-align: center;
   display: inline-block;
`
const Boton = styled.button`
   background-color: #efb810;
   color: white;
   width: 80px;
   height: 33px;
   border-radius: 5%;
   font-size: medium;
   font-family: 'Times New Roman', Times, serif;
   
   &:hover{
color:white;
background-color: #ddfc31;
width: 80px;
height: 33px;
border-radius: 5%;
font-size: large;
font-family: 'Times New Roman', Times, serif;
}
`
const Input = styled.input`
   padding: 5px;
   width: 240px;
   height: 20px;
   border-width: 100%;
   background-color: #f1d47b;
   color: black;
   border-radius: 5px;
   font-size: 13px;
   margin: 0px 10px 0px 0px;
   &:hover{
      padding: 5px;
   width: 240px;
   height: 20px;
   border-width: 100%;
background-color: #f1d37bcf;
color: black;
   border-radius: 5px;
   font-size: 13px;
   margin: 0px 10px 0px 0px;
   }
`

export default function SearchBar() {
    const dispatch = useDispatch()
    const [searchVideogame, setSearchVideogame] = useState('')
   
   function handleInputChange(event){
    event.preventDefault()
    setSearchVideogame(event.target.value);
   }
   
   function handleSubmit(event){
        event.preventDefault()
        dispatch(getVideogameName(searchVideogame))
        setSearchVideogame('')
   }

   return (
      <Search>
         <Input onChange={(event) => handleInputChange(event)} type="text" placeholder="Search by word or name..." value={searchVideogame} />
         <Boton onClick={(event) => handleSubmit(event)} type='submit'>Search</Boton> 
      </Search>
   );
}