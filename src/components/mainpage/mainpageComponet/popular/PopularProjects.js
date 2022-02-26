import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './PopularProjects.module.css'
import ProjectMini from '../../../project/ProjectMini';
import moment from "momnet";


export default function PopularProjects({projectList}) {
  const [time , setTime] =useState('');


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

    useEffect(()=> {
      setTime(moment().format('YYYY년M월DD일 기준'));
    }, []);
    return(
<div className={styles.fundingList}>
<span className={styles.listTitle}>인기 프로젝트</span>
<span className={styles.listDate}>{time}</span>

<div className={styles.itemRapper}>
    <Slider {...settings}>

    {projectList && projectList.map((project) => (
    <div className={styles.item} key={project.projectNo}>
        <ProjectMini project={project}/>
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
