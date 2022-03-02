import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from 'styled-components';
import Heart from '../../../../images/mainpage/heart2.png'

export default function Advertise({projectList}) {


    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      draggble: false,
      arrows: true
    };

    return (
      <div>
        <Slider {...settings}>
           {projectList && projectList.map( project => 
            <div key={project.projectNo}>
              <Ad project={project}/>
            </div>
            )}

        </Slider>
      </div>
    );

}



function Ad({project}){
  return(
          <AdDiv>
            <AddImg src={ require(`../../../../${project && project.projectImage}`) }/>
            <Adtext>
                  <Title>
                    {project && project.longTitle}
                  </Title>
            </Adtext>
          </AdDiv>
  );
}

const AdDiv = styled.div`
  display: flex;
  flex-direction: row ;
`
const Adtext= styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 60px;
    font-size: 30px;
`
const AddImg= styled.img`
    width: 400px;
    height: 250px;
`

const Title= styled.div`
    font-size: 40px;
    margin-bottom: 10px;
`
const Brief = styled.div`
    font-size: 35px;
    margin-left: 10px;
`
