import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description,imageUrl,newsUrl} = this.props;
    return (
      <div>
        <div className="card">
        <img src={imageUrl?imageUrl:"https://cdn.benzinga.com/files/images/story/2024/10/14/Betting-Big-On-Elon-Musks-Startups.jpeg?width=1200&height=800&fit=crop"} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}...</p>
          <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read more</a>
        </div>
      </div>
      </div>
    )
  }
}

export default NewsItem
