import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
function Banner() {
  return (
    <div className="relative">
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div className="h-10">
          <img
            loading="lazy"
            src="https://i.gadgets360cdn.com/large/amazon_great_indian_festival_sale_2021_image_1_1633097531416.jpg"
            alte=""
          />
        </div>
        <div>
          <img loading="lazy" src="https://links.papareact.com/gi1" alte="" />
        </div>
        <div>
          <img loading="lazy" src="https://links.papareact.com/6ff" alte="" />
        </div>
        <div>
          <img loading="lazy" src="https://links.papareact.com/7ma" alte="" />
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;
