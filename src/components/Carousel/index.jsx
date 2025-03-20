import { Carousel } from "antd";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import carousel1 from "../../assets/carousel1.jpg";
import carousel2 from "../../assets/carousel2.jpg";
import carousel3 from "../../assets/carousel3.jpg";

function CustomArrow({ className, style, onClick, direction }) {
  return (
    <div
      className={`${className} group`}
      style={{
        ...style,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "40px",
        height: "40px",
        background: "rgba(0, 0, 0, 0.5)",
        borderRadius: "50%",
        cursor: "pointer",
        zIndex: 10,
      }}
      onClick={onClick}
    >
      {direction === "left" ? (
        <FaChevronLeft className="text-xl text-white group-hover:text-red-500" />
      ) : (
        <FaChevronRight className="text-xl text-white group-hover:text-red-500" />
      )}
    </div>
  );
}

export default function _Carousel() {
  return (
    <div className="h-full w-full">
      <Carousel
        className="w-full h-full"
        arrows
        autoplay={{ dotDuration: true }}
        autoplaySpeed={2000}
        pauseOnHover
        // nextArrow={<CustomArrow direction="right" />}
        // prevArrow={<CustomArrow direction="left" />}
        fade
        customPaging={(i) => {
          return (
            <div className="flex items-center justify-center w-full h-full">
              <img
                className="object-cover w-20 h-10 border border-gray-200 rounded-xl"
                src={`/src/assets/carousel${i + 1}.jpg`}
                alt={`Slide ${i + 1}`}
              />
            </div>
          );
        }}
      >
        <div key="1" className="flex items-center justify-center bg-red-100">
          <img
            src={carousel1}
            alt=""
            className="object-cover w-full rounded-xl h-full"
          />
        </div>
        <div key="2" className="flex items-center justify-center bg-red-100">
          <img
            src={carousel2}
            alt=""
            className="object-cover w-full rounded-xl h-full"
          />
        </div>
        <div key="3" className="flex items-center justify-center bg-red-100">
          <img
            src={carousel3}
            alt=""
            className="object-cover w-full rounded-xl h-full"
          />
        </div>
      </Carousel>
    </div>
  );
}
