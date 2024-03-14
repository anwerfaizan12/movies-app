import React,{Component} from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component{
    render(){
     return(
        <div style={{display:'flex',padding:'2.5'}}>
        <Link to="/" style={{textDecoration:"none"}}> <h1 style={{fontSize:'2rem',fontWeight:'20rem'}}>Movies</h1></Link>
       <Link to="/favourites" style={{textDecoration:"none"}}> <h2 style={{fontSize:'1.5rem',marginLeft:'2rem',marginTop:'0.5rem'}}>Favourites</h2></Link>
        </div>
     )
     }
}