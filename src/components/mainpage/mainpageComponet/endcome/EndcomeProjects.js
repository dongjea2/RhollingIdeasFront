import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './EndcomeProjects.module.css'
import ProjectMini from '../../../project/ProjectMini';
import ProjectCarecel from "../../../project/ProjectCarecel";


export default function EndcomeProjects({projectList}) {

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
<span className={styles.listTitle}>마감임박! 마지막 기회</span>

<div className={styles.itemRapper}>
    <Slider {...settings}>

    {projectList && projectList.map((project) => (
    <div className={styles.item} key={project.projectNo}>
        <ProjectCarecel project={project}/>
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
