import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";

const HomeSlider = () => {
  return (
    <div className="homeslider py-7 pt-4 ">
      <div className="container">
        <Swiper
          spaceBetween={10}
          pagination={true}
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className="sliderHome"
        >
          <SwiperSlide>
            <div className="item rounded-[20px] overflow-hidden">
              <img
                src="https://whirlpoolindia.vtexassets.com/assets/vtex.file-manager-graphql/images/62ad2ebc-b2d0-4b7a-a1ef-6b0dbb845ef6___499c806dfba0a64a0fde66350db9c92e.gif "
                alt="Banner 1"
                className="w-full h-[300px]"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item  rounded-[20px]  overflow-hidden">
              <img
                src="https://whirlpoolindia.vtexassets.com/assets/vtex.file-manager-graphql/images/a508045a-d741-4b64-8a03-2c734cb63c68___a84518a6645a5f91f454c5f5e8dbf9cf.jpg"
                alt="Banner 2"
                className="w-full h-[300px]"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item  rounded-[20px] overflow-hidden">
              <img
                src="https://www.reliancedigital.in/medias/MW-Banner-D.jpg?context=bWFzdGVyfGltYWdlc3wxNTY4NjV8aW1hZ2UvanBlZ3xpbWFnZXMvaGY4L2g2Zi8xMDI1MTE1NzE0MzU4Mi5qcGd8ZGZhZTlhNDkzOWE3NTBhZDBmYjIzNmFmYjUwOWRkNjNlNmY3YmVjNzFmMzZhNjEyZTAxZmZlMzQ1Y2MxZjlmNw"
                alt="Banner 5"
                className="w-full h-[300px]"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item  rounded-[20px] overflow-hidden">
              <img
                src="https://whirlpoolindia.vtexassets.com/assets/vtex.file-manager-graphql/images/c71e5395-3c88-4933-a9c7-020f39ffeea6___673c0500aea3c8291138a213cd1f8dcc.jpg"
                alt="Banner 3"
                className="w-full h-[300px]"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item  rounded-[20px] overflow-hidden">
              <img
                src="https://www.reliancedigital.in/medias/App-D.jpg?context=bWFzdGVyfGltYWdlc3wxMjMwOTN8aW1hZ2UvanBlZ3xpbWFnZXMvaDBhL2g0Ny8xMDI1MTE1Njc1MDM2Ni5qcGd8NDIwOTY3Y2I0ZjUwMGMzMTZhMjQyYWYxNzA5ZDkyZDQ3MzcxMmYwYzgyNzM3NDM3ZWM1MWUzNTBlOTJhM2FlNQ"
                alt="Banner 6"
                className="w-full h-[300px]"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item  rounded-[20px] overflow-hidden">
              <img
                src="https://whirlpoolindia.vtexassets.com/assets/vtex.file-manager-graphql/images/b71e750b-d306-4855-a4b9-3cf1aa74b135___12469bf38aa56d52bda9260886d2acc2.jpg"
                alt="Banner 4"
                className="w-full h-[300px]"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item  rounded-[20px] overflow-hidden">
              <img
                src="https://www.reliancedigital.in/medias/Water-Heater-Home-Page-Banner.jpg?context=bWFzdGVyfGltYWdlc3w5NDk0MHxpbWFnZS9qcGVnfGltYWdlcy9oNWQvaGZmLzkzNjQ1NDk4NjE0MDYuanBnfDU2ODY5ODA5ZDgwYmI0YWI1ZjY3YTc4NTM1NmRkMTc3MGFmMWQ3OTdiZDg5OTExNzhiYmQ1OGNkZjI4MTU2NjU"
                alt="Banner 4"
                className="w-full h-[300px]"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default HomeSlider;
