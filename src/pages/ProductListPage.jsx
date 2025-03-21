import { FloatButton, Button } from "antd";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import BreadcrumbNav from "../components/BreadcrumbNav";
import Loading from "../components/Loading";
import { lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MenuOutlined,
} from "@ant-design/icons";
// import {
//   setActiveFilter,
//   setActiveListProduct,
// } from "../redux/slices/productSlice";

const ProductList = lazy(() => import("../components/ProductList"));
const ProductFilter = lazy(() => import("../components/ProductFilter"));
const className =
  "py-3 duration-200 border-b-2 border-transparent hover:text-blue-500 hover:opacity-100 hover:font-semibold hover:border-blue-500";
const activeClassName =
  "text-blue-500 opacity-100 font-semibold duration-200 border-b-2 border-blue-500 py-3";

const FilterOption = [
  {
    title: "New",
    sort: "createdAt:1",
  },
  {
    title: "Sale",
    sort: "true",
  },
  {
    title: "Hot",
    sort: "true",
  },
  {
    title: "Giá Thấp",
    sort: "price:1",
  },
  {
    title: "Giá cao",
    sort: "price:2",
  },
];

export default function ProductPage() {
  // console.log("======== ProductPage   ")
  // const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const sortParam = searchParams.get("sort");
  const titleParam = searchParams.get("title");
  const search = searchParams.get("search");

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  // console.log("search   ",search)
  const handleFilterChange = (item, index) => {
    //lưu id button
    // dispatch(setActiveFilter({ title: titleParam, sort: sortParam }));
    // dispatch(setActiveListProduct());
    setActiveButton(index);
    setSearchParams(item);
  };

  return (
    <motion.div
      className=""
      initial={{ opacity: 0, x: window.innerHeight }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="sticky z-50 flex flex-col justify-start top-28 bg-white h-full">
        <div className="flex justify-start items-center max-h-10">
          <BreadcrumbNav title={"Sản phẩm"}></BreadcrumbNav>
        </div>
        <div className="sticky z-50 flex justify-center gap-5 pt-2 mb-3 text-xs bg-white border-b-2 top-28 md:top-60 md:gap-10 sm:text-base">
          <div className="md:hidden">
            <Button
              type="primary"
              onClick={toggleCollapsed}
              style={{ marginBottom: 16 }}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
          </div>
          <span className="hidden py-3 ml-1 sm:block">Sắp xếp theo</span>
          {FilterOption.map((item, index) => {
            return (
              <button
                key={index}
                onClick={() => handleFilterChange(item, index)}
                className={`${
                  activeButton === index ? `${activeClassName}` : `${className}`
                }`}
              >
                {item.title}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className={`position max-h-full  top-96 flex flex-col justify-start ${
          collapsed ? "" : ""
        }md:flex-row w-full`}
      >
        <div
          className={`fixed w-1/4 min-w-[250px] flex flex-col justify-center items-center bg-white shadow-lg p-1 ${
            collapsed ? "block" : "hidden"
          } md:block h-[calc(100vh-1000px)]`}
        >
          <ProductFilter />
        </div>

        {/* Nội dung chính */}
        <div className="flex-1 p-1 3/ ml-[10%] md:ml-[25%]">
          {/* Danh sách sản phẩm */}
          <Suspense fallback={<Loading />}>
            <ProductList sortParam="" titleParam="" searchParam="" />
          </Suspense>
        </div>
      </div>

      <FloatButton.BackTop type="primary" />
    </motion.div>
  );
}
