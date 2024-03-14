import React,{Component} from 'react';
// import {movies} from './getMovies';
import axios from 'axios';


export default class Movies extends Component{
    constructor(){
        super();
        this.state={
            hover:'',
            parr:[1],
            currPage:1,
            movies:[],
            favourites:[]
        }
    }

    async componentDidMount(){
        const res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currPage}`);
        let data=res.data;
        this.setState({
            movies:[...data.results]
        })

        // let downloadkapromise=axios.get(https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=1)
        // downloadkapromise.then(function(response){
        //     let data=response.data;
        //     this.setState({
        //             movies:[...data.results]
        //         }).catch(function(error){
        //             console.log(error);
        //         });
        // })
    }


    changeMovies=async()=>{
        const res=await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=${this.state.currPage}`);
        let data=res.data;
        this.setState({
            movies:[...data.results]
        })
    }

    handleRight=()=>{
    let tempArr=[];
    for(let i=1;i<=this.state.parr.length+1;i++){
        tempArr.push(i);
    }
    this.setState({
        parr:[...tempArr],
        currPage:this.state.currPage+1
    },this.changeMovies)
    }


    handleLeft=()=>{
        if(this.state.currPage !==1){
            this.setState({
                currPage:this.state.currPage-1
            },this.changeMovies)
        }
    }

    handleClick=(value)=>{
        if(value !== this.state.currPage){
            this.setState({
                currPage:value
            },this.changeMovies)
        }
    }

    handleFavourites=(movie)=>{
    let oldData=JSON.parse(localStorage.getItem('movies-app')||'[]');
    if(this.state.favourites.includes(movie.id)){
        oldData=oldData.filter((m)=>m.id!==movie.id);
    }
    else
    {
        oldData.push(movie);
    }
    localStorage.setItem("movies-app",JSON.stringify(oldData));
    this.handleFavouriteState();
    }

    handleFavouriteState=()=>{
        let oldData=JSON.parse(localStorage.getItem('movies-app')||'[]');
        let temp=oldData.map((movie)=>movie.id);
        this.setState({
            favourites:[...temp]
        })
    }

    render(){
        return(
            <div>
                {
                this.state.movies.length===0?
                <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
                </div>
                :
                <div>
                <h3 className="text-centre" style={{marginLeft:"40rem" , fontSize:"1.8rem"}}><strong>Trending</strong></h3>
                <div className='movies-list'>
                {
                    this.state.movies.map((movieObj)=>(
                        <div class="card movies-card" onMouseEnter={()=>this.setState({hover:movieObj.id})} onMouseLeave={()=>this.setState({hover:''})}>
                        <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} style={{height:"40vh", width:"20vw"}} alt={movieObj.title} class="card-img-top movies-img" />
                        <h5 class="card-title movies-title">{movieObj.original_title}</h5>
                        <div class='button-wrapper' style={{display:'flex', width:'100%', justifyContent:'center'}}>
                        {
                            this.state.hover===movieObj.id &&
                            <a className="btn btn-primary movies-button" onClick={()=>this.handleFavourites(movieObj)} >{this.state.favourites.includes(movieObj.id)?"Remove from Favourites":"Add to Favourites"}</a>
                        }
                        </div>
                        </div>
                    ))
                }
                </div>
        
                <div style={{display:'flex',justifyContent:"center"}}>
                <nav aria-label="Page navigation example">
                <ul className="pagination">
                <li className="page-item"><a className="page-link" onClick={this.handleLeft}>Previous</a></li>
                {
                    this.state.parr.map((value)=>(
                        <li className="page-item"><a className="page-link" onClick={()=>this.handleClick(value)}>{value}</a></li>
                    ))
                }
                <li className="page-item"><a className="page-link" onClick={this.handleRight}>Next</a></li>
                </ul>
                </nav>
                </div>
                </div>
            }
            </div>
        )
    }
}