export const swiperStyles = `
  :host {
    display: block;
    --swiper-theme-color: #007aff;
    --swiper-navigation-size: 44px;
    --swiper-navigation-color: #007aff;
  }
  
  .swiper {
    width: 100%;
    height: 100%;
  }
  
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`