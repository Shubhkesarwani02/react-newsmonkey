/* eslint-disable react/no-typos */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import propTypes from 'prop-types'

export class News extends Component {

  static defaultProps = {
    country : "in",
    pageSize : 9,
    category : "general",
  }
  static propTypes = {
    country : propTypes.string,
    pageSize : propTypes.number,
    category : propTypes.string,

  }
     
     
    constructor(){
        super();
        
        this.state = {
            articles : [],
            loading : false,
            page:1

        }
    }

    async componentDidMount(){
       
       let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=9742076d3db1408ea12899ac6763b848&page=1&pageSize=${this.props.pageSize}`;
       this.setState({loading : true})

       let data = await fetch(url);
       let parsedData = await data.json();
       console.log(parsedData);

       this.setState({articles : parsedData.articles , 
         totalResults: this.state.totalResults ,
         loading : false
        })
    }

    handlePrevClick = async ()=>{
      console.log("previous");

      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&${this.props.category}&apiKey=9742076d3db1408ea12899ac6763b848&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading : true})
         
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      // this.setState({articles : parsedData.articles})

      this.setState({
        page : this.state.page - 1 ,
        articles : parsedData.articles,
        loading : false
      });
      }
      
  
    handleNextClick = async ()=>{
      console.log("next");
      if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)){
            //math.ceil gives the next largest integer and (total num of pages)
         //since we have only two pages , next button wont show any other page 
      }
      else{

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&${this.props.category}&apiKey=9742076d3db1408ea12899ac6763b848&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`; //items per page
        this.setState({loading : true})

        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        // this.setState({articles : parsedData.articles})
  
        this.setState({
          page : this.state.page + 1 ,
          articles : parsedData.articles,
          loading : false
        });
      }
    
    }

  render() {
    
    return (
    <div className='container my-3'>
      <h1 className="text-center" style={{margin :" 30px 0px"}}>NewsMonkey - Top Headlines.</h1>
        {/* <h1>NewsMonkey - Top Headlines.</h1> */}
        {this.state.loading && <Spinner/>}
        <div className="row">
            {!this.state.loading && this.state.articles.map((element)=>{
              return   <div className="col-md-4" key={element.url}>
              <NewsItem  title={element.title?element.title.slice(0,45):""} description={element.description?element.description.slice(0,85):""} imageUrl={element.urlToImage}
                newsUrl= {element.url}/>
              </div>
          })}
        </div>

        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Preview</button>
          {/* <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>  */}
          <button disabled={this.state.page > 4} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      

    </div>
    )
  }
}

export default News