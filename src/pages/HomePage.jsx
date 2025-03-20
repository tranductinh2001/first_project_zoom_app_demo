import React, { useEffect, lazy, Suspense } from "react";
import _Carousel from "../components/Carousel";
import AdsCard from "../components/AdsCard";
import { CiMedal } from "react-icons/ci";
import CategoryDropdown from "../components/CategoryDropdown";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Tag, Table } from "antd";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import img_1 from "../assets/introl_image/img_1.png";
import img_2 from "../assets/introl_image/img_2.png";
import img_3 from "../assets/introl_image/img_3.png";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

// import { fetchProductListAll } from "../redux/slices/productSlice";
import { useState } from "react";
const columns = [
  {
    title: "DỊCH VỤ",
    dataIndex: "service",
    key: "service",
    width: 200,

    render: (text) => <strong>{text}</strong>,
  },
  {
    title: "THUÊ PHÒNG ZOOM",
    dataIndex: "rentRoom",
    key: "rentRoom",
    align: "center",
    onCell: () => ({
      style: { whiteSpace: "normal", wordBreak: "break-word" },
    }),
  },
  {
    title: "THUÊ TÀI KHOẢN ZOOM",
    dataIndex: "rentAccount",
    key: "rentAccount",
    align: "center",
    onCell: () => ({
      style: { whiteSpace: "normal", wordBreak: "break-word" },
    }),
  },
  {
    title: "NÂNG CẤP ZOOM CHÍNH CHỦ",
    dataIndex: "upgrade",
    key: "upgrade",
    align: "center",
    onCell: () => ({
      style: { whiteSpace: "normal", wordBreak: "break-word" },
    }),
  },
];

const data = [
  {
    key: "1",
    service: "HÌNH THỨC SỬ DỤNG",
    rentRoom: (
      <div>
        Nhận Link + mã Host <br /> Không cần tài khoản
      </div>
    ),
    rentAccount: (
      <div>
        Nhận tài khoản từ <strong>muazoom.com</strong> <br />
        (Email được cấp)
      </div>
    ),
    upgrade: (
      <div>
        Sở hữu tài khoản chính chủ <br />
        (Email cá nhân)
      </div>
    ),
  },
  {
    key: "2",
    service: "CLOUD RECORD",
    rentRoom: (
      <Tag icon={<CloseCircleOutlined />} color="red">
        Không có Cloud Record
      </Tag>
    ),
    rentAccount: (
      <Tag icon={<CheckCircleOutlined />} color="green">
        Có Cloud Record
      </Tag>
    ),
    upgrade: (
      <Tag icon={<CheckCircleOutlined />} color="green">
        Có Cloud Record
      </Tag>
    ),
  },
  {
    key: "3",
    service: "QUYỀN QUẢN LÝ",
    rentRoom: (
      <div>
        Chỉ điều khiển cuộc họp <br /> Không quản lý tài khoản
      </div>
    ),
    rentAccount: "Toàn quyền quản lý và đổi thông tin",
    upgrade: "Toàn quyền quản lý và đổi thông tin",
  },
];
const products = [
  {
    id: 1,
    name: "Thuê phòng Zoom Pro 100 người",
    price: "9.000 ₫ - 979.000",
    image: "url_to_image_1",
    description: "Dịch vụ thuê phòng Zoom Pro dành cho 100 người.",
  },
  {
    id: 2,
    name: "Thuê phòng Zoom Pro 300 người",
    price: "49.000 ₫ - 1.790.000",
    image: "url_to_image_2",
    description: "Dịch vụ thuê phòng Zoom Pro dành cho 300 người.",
  },
  {
    id: 3,
    name: "Thuê tài khoản Zoom Pro 100 người",
    price: "15.000 ₫ - 1.340.000",
    image: "url_to_image_3",
    description: "Dịch vụ thuê tài khoản Zoom Pro 100 người.",
  },
  {
    id: 4,
    name: "Nâng cấp Zoom Pro 100 người 3 tháng - Chính chủ",
    price: "597.000",
    image: "url_to_image_4",
    description:
      "Gói nâng cấp Zoom Pro 100 người sử dụng trong 3 tháng, chính chủ.",
  },
  {
    id: 5,
    name: "Nâng cấp Zoom Pro 300 người 3 tháng - Chính chủ",
    price: "987.000",
    image: "url_to_image_5",
    description:
      "Gói nâng cấp Zoom Pro 300 người sử dụng trong 3 tháng, chính chủ.",
  },
  {
    id: 6,
    name: "Nâng cấp Zoom Pro 500 người 3 tháng - Chính chủ",
    price: "3.570.000",
    image: "url_to_image_6",
    description:
      "Gói nâng cấp Zoom Pro 500 người sử dụng trong 3 tháng, chính chủ.",
  },
];

export default function HomePage() {
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // const productListAll = useSelector((state) => state.products?.productListAll);

  const isAuthenticated = null;
  const productListAll = products;
  const [latestProducts, setLatestProducts] = useState([]);

  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchProductListAll());
  // }, [dispatch]);
  // console.log("productListAll  ", productListAll);

  useEffect(() => {
    if (productListAll?.length > 0) {
      // Sắp xếp danh sách theo ngày tạo mới nhất
      const sortedProducts = [...productListAll].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      // Lấy 10 sản phẩm đầu tiên
      setLatestProducts(sortedProducts.slice(0, 10));
    }
  }, [productListAll]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -window.innerHeight }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* <div className="grid w-full justify-center gap-4"> */}
      {/* <div className="flex flex-col order-1 w-full col-span-1 gap-2 md:col-span-2 md:order-2">
          <CategoryDropdown isbordered={true} className="hidden md:block" />
          <img src={homeImage1} alt="" className="h-full rounded-lg" />
        </div> */}

      <div className="flex flex-col gap-6 items-center justify-around rounded-3xl w-full md:w-full h-4/5 md:h-full md:col-span-8">
        <_Carousel />
      </div>

      {/* <div className="order-3 w-full h-full col-span-1 md:col-span-2">
          <img src={homeImage2} alt="" className="w-full h-full rounded-lg" />
        </div> */}
      {/* </div> */}

      <div className="flex items-center w-full mt-7 mb-5">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-lg font-bold tracking-widest">
          TẠI SAO CHỌN MUAZOOM.COM?
        </span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>
      <div className="flex justify-center items-center w-full">
        <div className="flex justify-center gap-4 w-5/6">
          <div className="">
            <img
              src={img_1}
              alt=""
              className="rounded-2xl shadow-lg shadow-gray-700 hover:-translate-y-4 transition duration-300"
            />
          </div>
          <div>
            <img
              src={img_2}
              alt=""
              className="rounded-2xl shadow-lg shadow-gray-700 hover:-translate-y-4 transition duration-300"
            />
          </div>
          <div>
            <img
              src={img_3}
              alt=""
              className="rounded-2xl shadow-lg shadow-gray-700 hover:-translate-y-4 transition duration-300"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full gap-6 my-1">
        <div className="flex items-center w-full mt-5">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-2 text-lg font-bold tracking-widest py-6">
            SẢN PHẨM NỔI BẬT
          </span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 w-full">
          {Array.isArray(latestProducts) &&
            latestProducts
              .slice(0, 6)
              .map((product, index) => (
                <ProductCard
                  className="w-[120px] h-[180px]"
                  key={product.id || index}
                  product={product}
                  displayQuantity={true}
                />
              ))}
        </div>
      </div>
      <div className="flex items-center w-full mt-7 mb-5">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-lg font-bold tracking-widest">
          MÔ TẢ NGẮN SẢN PHẨM
        </span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      <div className="flex flex-col items-center justify-center w-full gap-4 my-10">
        <div className="flex flex-col items-center justify-center w-full gap-3 sm:flex-row sm:items-stretch">
          {/* {zoomServices?.map((item, index) => (
            <AdsCard
              key={index}
              Icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))} */}
          <Table
            className="w-2/4 mx-7"
            columns={columns}
            dataSource={data}
            // pagination={false}
            pagination={false}
          />
        </div>
      </div>

      {!isAuthenticated ? (
        <div className="my-2">
          <div className="flex flex-col items-center gap-5 p-10 bg-gradient-to-r from-red-500 to-slate-400">
            <span className="text-3xl text-center text-white drop-shadow-lg">
              Đăng ký, đăng nhập để mua hàng sỉ
            </span>
            <div className="flex gap-5">
              <Link to="login">
                <Button type="primary" size={"large"}>
                  Đăng nhập
                </Button>
              </Link>
              <Link to="register">
                <Button type="primary" danger size={"large"}>
                  Đăng ký
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </motion.div>
  );
}
