/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-constructor */
/* eslint-disable react/style-prop-object */
import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title,description,imageUrl,newsUrl} = this.props;
    return (
    <div className='my-3'>
         <div className="card">
                <img src={!imageUrl?"https://bsmedia.business-standard.com/_media/bs/img/article/2021-10/22/full/1634863836-6218.jpg":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <a href={newsUrl} rel= "noreferrer" target= "_blank"className="btn btn-sm btn-dark">Read more</a>
            </div>
        </div>
    </div>
    )
  }
}

export default NewsItem