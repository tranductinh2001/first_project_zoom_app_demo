import { Badge, Button } from "antd";
import { motion } from "framer-motion";
import { default as React, useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import placeholder from "../../assets/playholder.png";
import useSessionStorage from "../../custom hooks/useSessionStorage";
//thuộc tính displayQuantity = true : hiển thị số lượng tồn kho của sản phẩm

const ProductCard = React.memo(function ProductCard({
  product,
  displayQuantity,
}) {
  const [viewedProduct, setViewedProduct] = useSessionStorage(
    "viewedProducts",
    []
  );

  const addViewedProduct = () => {
    setViewedProduct(product);
    // console.log(viewedProduct);
    navigate(`/product/${product?.id}`);
  };

  const navigate = useNavigate();
  let isSale = product?.is_sale;
  // let islogIN = useSelector((state) => state.auth.isAuthenticated);
  let islogIN = true;
  // const imageUrl = product?.images[0] ? product?.images[0] : placeholder;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      // animate={{ opacity: 1, scale: 1, x: 1 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.1 }}
      whileHover={{ y: -10 }}
      viewport={{ once: true }}
      className="inline-flex flex-row max-w-56 scale-50 origin-top items-center h-96 gap-2 p-3 text-center duration-500 bg-white shadow-md hover:shadow-black rounded-xl ring-1 ring-gray-300 ring-opacity-50 overflow-hidden"
    >
      <div className="flex flex-col w-full gap-2 grow-2 ">
        <div className="relative block w-full h-1/4 basis-2/4">
          <img
            id="img-product"
            src={
              product?.images?.length > 0
                ? product?.images[0]?.url
                : "/src/assets/default_image.png"
            }
            className={`max-w-full h-52 duration-500 shadow-neutral-500 transition-transform rounded-md object-contain flex-shrink-0`}
            alt={product?.name}
          />

          {isSale && (
            // <img
            //   id="img-product "
            //   src={saletag}
            //   className="absolute bottom-0 right-0 w-16 h-16 transition-transform duration-1000"
            // />
            <Badge.Ribbon
              className="absolute duration-500 -top-10"
              text="Sale"
              color="red"
              placement="end"
            />
          )}
        </div>
        {/* Divider */}
        <div className="border-b"></div>
        <div className="flex flex-col gap-1 basis-2/4">
          <div className="flex flex-wrap items-center justify-start gap-2">
            {product?.sizeList?.map((item, index) => (
              <span
                key={index}
                className="px-2 font-semibold text-left bg-gray-300 rounded-md w-fit"
              >
                {item.sizeName}
              </span>
            ))}
          </div>

          <div className="text-base text-left truncate w-52">
            {product?.name} - {product?.brand?.name.toUpperCase()}
          </div>

          <div className="max-h-6">
            {islogIN ? (
              isSale ? (
                <div className="text-sm font-semibold text-left text-red-500">
                  <span className="text-red-500 line-through">Giá gốc:</span>{" "}
                  <span className="text-red-400 line-through">
                    {product?.price?.toLocaleString()}₫
                  </span>
                  {product?.is_sale && (
                    <span className="block text-sm font-semibold text-left">
                      {product?.sale_price?.toLocaleString()}₫
                    </span>
                  )}
                </div>
              ) : (
                <div className="text-lefmax-h-6">
                  <span className="text-left">
                    Giá gốc: {product?.price?.toLocaleString()}₫
                  </span>
                </div>
              )
            ) : (
              <p className="text-sm font-semibold text-left text-red-500">
                Đăng nhập để xem giá
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col w-full min-h-16  mb-1 justify-end items-end ">
          <Button className="self-end" onClick={addViewedProduct}>
            Xem chi tiết
          </Button>
        </div>
      </div>
    </motion.div>
  );
});

export default ProductCard;
