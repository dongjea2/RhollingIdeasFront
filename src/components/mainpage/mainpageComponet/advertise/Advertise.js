import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Advertise.css'


import items from '../../../../api/mock/projectMock.json';

export default function Advertise() {


    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      draggble: false,
      arrows: true
    };

    return (
      <div>
        <Slider {...settings}>
            <Ad item={items[1]}/>          
            <Ad item={items[2]}/>          
            <Ad item={items[3]}/>          
        </Slider>
      </div>
    );

}



function Ad({item}){
    const {  id ,imgUrl, category,maker, title, ahciveRate , brief} = item;
  return(
            <div className="slickDiv"> 
                <img className ='slickImg'src={imgUrl}/> 
                <div className="textArea">
                  <div className="titles">{title}</div>
                  <div className="adBrief">{brief}</div>
                </div>
            </div>
  );
}