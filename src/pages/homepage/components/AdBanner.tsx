import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import media from '../../../styles/media';
import promotion1 from '../../../assets/homePage/promotion1.svg';
import promotion2 from '../../../assets/homePage/promotion2.svg';
import promotion3 from '../../../assets/homePage/promotion3.svg';

function AdBanner() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 2000,
    centerMode: false,
    cssEase: 'ease-in-out',
    fade: false,
    arrows: true,
    responsive: [
      {
        breakpoint: 744,
        settings: {
          arrows: false,
        },
      },
      {
        breakpoint: 390,
        settings: {
          arrows: false,
          dots: false,
        },
      },
    ],
  };

  return (
    <Wrapper>
      <Slider {...settings}>
        <div>
          <AdBox>
            <AdImage src={promotion1} alt="프로모션 1" />
          </AdBox>
        </div>
        <div>
          <AdBox>
            <AdImage src={promotion2} alt="프로모션 2" />
          </AdBox>
        </div>
        <div>
          <AdBox>
            <AdImage src={promotion3} alt="프로모션 3" />
          </AdBox>
        </div>
      </Slider>
    </Wrapper>
  );
}

export default AdBanner;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1000px;
  height: 400px;
  margin: 39px auto 61px auto;
  box-sizing: border-box;
  background-color: white;
  position: relative;

  .slick-slider {
    width: 100%;
    height: 100%;
  }

  .slick-list {
    width: 100%;
    height: 100%;
  }

  .slick-track {
    display: flex;
    align-items: center;
  }

  .slick-slide {
    display: flex !important;
    justify-content: center;
    align-items: center;
    height: 400px;
  }

  .slick-slide > div {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .slick-dots {
    bottom: -30px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;

    li {
      margin: 0 4px;
    }

    .slick-active button::before {
      color: #c908ff;
      font-size: 12px;
      opacity: 1;
    }

    button::before {
      color: rgba(201, 8, 255, 0.3);
      font-size: 12px;
      opacity: 1;
    }
  }

  .slick-prev,
  .slick-next {
    width: 40px;
    height: 40px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    z-index: 10;
    
    &:hover {
      background-color: rgba(255, 255, 255, 1);
    }
    
    &:before {
      color: #c908ff;
      font-size: 20px;
    }
  }

  .slick-prev {
    left: -60px;
  }

  .slick-next {
    right: -60px;
  }

  ${media.medium`
    max-width: 100%;
    margin: 39px 0 61px 0;
    
    .slick-prev,
    .slick-next {
      display: none !important;
    }
  `}
`;

const AdBox = styled.div`
  width: 950px;
  height: 369px;
  flex-shrink: 0;
  margin: 0 auto;
  border-radius: 31px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f8f8;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
  }

  ${media.medium`
    width: 90%;
    height: 300px;
    border-radius: 15px;
    margin: 0 auto;
  `}
`;

const AdImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 31px;
  
  ${media.medium`
    border-radius: 15px;
  `}
`;
