import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
      country : "us",
      pageSize: 8,
      category:"general"
  }

  static propTypes = {
    country : PropTypes.string,
    pageSize : PropTypes.number,
    category: PropTypes.string,
  }

  constructor(){
    super();
    this.state ={
      articles : [],
      loading : false,
      page: 1
    }
  }
  async componentDidMount(){
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=13ce683ee28644b0ab2ee43f6d8a7c27&page=1&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading:false})
  }

  

  handlePrevClick =async()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=13ce683ee28644b0ab2ee43f6d8a7c27&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
        page: this.state.page-1,
        articles: parsedData.articles,
        loading:false
    })
  }

  handleNextClick = async()=>{
    if(this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)){}
      else{
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=13ce683ee28644b0ab2ee43f6d8a7c27&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        page: this.state.page+1,
        articles: parsedData.articles,
        loading:false
      })
    }
      
  }

  render() {
    
    return (
      <div className='container my-3'>
        <h2 className='text-center' style={{margin:'55px 0px 30px'}} >Free News- Top Headlines</h2>
        
        {this.state.loading && <Spinner/>}
        <div className='row'>
          {!this.state.loading && this.state.articles.map((element)=>{
              return <div className='col-md-3' key={element.url}>
              <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url}/>
            </div>
          })}
          
        </div>
        <div className='container d-flex justify-content-between my-3'>
        <button disabled={this.state.page<=1} onClick={this.handlePrevClick} type="button" class="btn btn-dark">&larr; Previous</button>
        <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize)} onClick={this.handleNextClick} type="button" class="btn btn-dark">Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
// 
// 