import React,{Component} from 'react';
import axios from 'axios';

export default class Banner extends Component{

  constructor(){
    super();
    this.state={
        movie:''
    }
}

  async componentDidMount(){
    const response=await axios.get('https://api.themoviedb.org/3/movie/popular?api_key=5540e483a20e0b20354dabc2d66a31c9&language=en-US&page=1');
    let data=response.data;
    let movies=[...data.results];
    this.setState({
        movie:movies[0]
    })
}

render(){
    return(
      <div>
      {
        this.state.movie===''?<div className="spinner-border text-primary" role="status">
        <span className="sr-only">Loading...</span>
        </div>:
        <div>
      <div className="card banner-card">
      <img src={`https://image.tmdb.org/t/p/original${this.state.movie.backdrop_path}`} alt={this.state.movie.title} className="card-img-top banner-img" />
        <h1 className="card-title banner-title" style={{fontSize:"2rem"}}>{this.state.movie.original_title}</h1>
        <p className="card-text banner-text">{this.state.movie.overview}</p>
    </div>
    </div>
      }
      </div>
    )
}
}