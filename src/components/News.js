import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
  constructor(){
    super();
    this.state ={
      articles : [],
      loading : false,
      page: 1
    }
  }
  async componentDidMount(){
      let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=13ce683ee28644b0ab2ee43f6d8a7c27";
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults})
  }

  

  handlePrevClick =async()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=13ce683ee28644b0ab2ee43f6d8a7c27&page=${this.state.page-1}&pageSize=20`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
        page: this.state.page-1,
        articles: parsedData.articles
    })
  }

  handleNextClick = async()=>{
    if(this.state.page +1 > Math.ceil(this.state.totalResults/20)){}
      else{
      let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=13ce683ee28644b0ab2ee43f6d8a7c27&page=${this.state.page+1}&pageSize=20`;
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        page: this.state.page+1,
        articles: parsedData.articles
      })
    }
      
  }

  render() {
    
    return (
      <div className='container my-3'>
        <h2 className='my-5'>Free News- Top Headlines</h2>
        <div className='row'>
          {this.state.articles.map((element)=>{
              return <div className='col-md-3' key={element.url}>
              <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url}/>
            </div>
          })}
          
        </div>
        <div className='container d-flex justify-content-between my-3'>
        <button disabled={this.state.page<=1} onClick={this.handlePrevClick} type="button" class="btn btn-dark">&larr; Previous</button>
        <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/20)} onClick={this.handleNextClick} type="button" class="btn btn-dark">Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
// 
// 