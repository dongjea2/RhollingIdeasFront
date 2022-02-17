import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './PopularProjects.module.css'
import ProjectMini from '../project/ProjectMini';
import items from '../../api/mock/projectMock.json';


export default function PopularProjects() {

    const settings = {
      dots: true,
      infinite: true,
      speed: 499,
      slidesToShow: 3,
      slidesToScroll: 1,
      draggble: false,
      arrows: true,
    // nextArrow: <SampleNextArrow />,
    //   prevArrow: <SamplePrevArrow />
    };


    return(
<div className={styles.fundingList}>
<span className={styles.listTitle}>주목할만한 프로젝트</span>
<span class={styles.listDate}>2021년 12월 15일 기준</span>

<div className={styles.itemRapper}>
    <Slider {...settings}>

    {items.map((item) => (
    <div className={styles.item} key={item.id}>
        <ProjectMini item={item}/>
    </div>
    ))}


    </Slider>
</div>
</div>
    );
}

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red",
    paddingBottom:'420px'}}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  console.log({className})
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "seashell",
    paddingBottom:'420px'}}
      onClick={onClick}
    />
  );
}
