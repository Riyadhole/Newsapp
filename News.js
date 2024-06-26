import PropTypes from 'prop-types';
import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsItem from './NewsItem';
import { Spinner } from './Spinner';

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize:PropTypes.number,
    category: PropTypes.string
  }
  
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props){
    super(props);
    console.log("Hello I am Constructor from News component");
    this.state={
            articles:[],
            loading: true,
            page : 1,
            totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NEWS App`;
}

async updateNews(){
  this.props.setProgress(10);
  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3b7bfa1ed8d441bb834684db288b805a&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  this.setState({loading:true});
  let data = await fetch(url);
  this.props.setProgress(30);
  let parsedData= await data.json()
  console.log (parsedData);
  this.props.setProgress(70);
  this.setState({
    articles: parsedData.articles, totalResults: parsedData.totalResults, loading:false
  })
  this.props.setProgress(100);
}

async componentDidMount(){
  this.updateNews();
}

handlePrevClick= async () => {
  console.log("Previous");
  this.setState({page: this.state.page - 1});
  this.updateNews();
}

handleNextClick= async () => {
  console.log("Next");
this.setState({page: this.state.page + 1});
this.updateNews();
}

fetchMoreData = async() => {
  this.setState({page: this.state.page +1})
  const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3b7bfa1ed8d441bb834684db288b805a&page=${this.state.page}&pageSize=${this.props.pageSize}`;
  let data = await fetch(url);
  let parsedData= await data.json()
  console.log (parsedData);
  this.setState({articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults})
};
  
  render() {
    return (
    <>
        <h1 className='text-center' style={{margin: '35px 5px'}}>NEWS APP - TOP {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner/>}

        <InfiniteScroll
        dataLength ={this.state.articles.length}
        next={this.fetchMoreData}
        hasMore={this.state.articles.length !== this.state.totalResults}
        loader={<Spinner/>}
          >
            <div className="container">
        <div className='row'>
          {this.state.articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
            <NewsItem title={element.title?element.title.slice(0, 45):""} description={element.description?element.description.slice(0, 88):""} imageUrl = {element.urlToImage?element.urlToImage:"images.jpeg"} newsUrl={element.url} author={element.author} date={element.publishedAt}/>
            </div>
          })}
      </div>
      </div>

      </InfiniteScroll>
      </>
      
    )
  }
}

export default News
