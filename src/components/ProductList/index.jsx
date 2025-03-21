import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
// import {
//   fetchProductList,
//   fetchProductListWithSearch,
//   fetchProductListWithSortOrTitle,
//   setActiveFilter,
//   setActiveListProduct,
// } from "../../redux/slices/productSlice";
import ProductCard from "../ProductCard/";

function ProductList({ sortParam, titleParam, searchParam }) {
  // console.log("ProductList -==========");

  // const dispatch = useDispatch();
  // const productListByPage = useSelector(
  //   (state) => state.products?.combinedProductList
  // );
  // const error = useSelector((state) => state.products?.error);
  //  const totalProductItems = useSelector(
  //     (state) => state.products?.totalProductItems
  //   );
  const totalProductItems = 10;
  const productListByPage = React.useMemo(
    () => [
      {
        id: 1,
        name: "iPhone 15 Pro Max",
        price: 32990000,
        sale_price: 29990000,
        is_sale: true,
        brand: { name: "Apple" },
        sizeList: [
          { sizeName: "128GB" },
          { sizeName: "256GB" },
          { sizeName: "512GB" },
        ],
      },
      {
        id: 2,
        name: "Samsung Galaxy S23 Ultra",
        price: 28990000,
        sale_price: 25990000,
        is_sale: true,
        brand: { name: "Samsung" },
        sizeList: [{ sizeName: "256GB" }, { sizeName: "512GB" }],
      },
      {
        id: 3,
        name: "Xiaomi 13 Pro",
        price: 19990000,
        sale_price: 17990000,
        is_sale: true,
        brand: { name: "Xiaomi" },
        sizeList: [{ sizeName: "128GB" }, { sizeName: "256GB" }],
      },
      {
        id: 4,
        name: "Google Pixel 7 Pro",
        price: 23990000,
        sale_price: 21990000,
        is_sale: true,
        brand: { name: "Google" },
        sizeList: [{ sizeName: "128GB" }, { sizeName: "256GB" }],
      },
      {
        id: 5,
        name: "OnePlus 11",
        price: 17990000,
        sale_price: 15990000,
        is_sale: true,
        brand: { name: "OnePlus" },
        sizeList: [{ sizeName: "256GB" }, { sizeName: "512GB" }],
      },
      {
        id: 6,
        name: "Sony Xperia 1 V",
        price: 24990000,
        sale_price: 22990000,
        is_sale: true,
        brand: { name: "Sony" },
        sizeList: [{ sizeName: "256GB" }],
      },
      {
        id: 7,
        name: "Nothing Phone 2",
        price: 14990000,
        sale_price: 13990000,
        is_sale: true,
        brand: { name: "Nothing" },
        sizeList: [{ sizeName: "128GB" }, { sizeName: "256GB" }],
      },
    ],
    []
  );

  const error = false;

  const [hasMore, setHasMore] = useState(true);
  // const pageSize = useSelector((state) => state.products?.pageSize) || 3;
  const pageSize = 5;

  const [currentPage, setCurrentPage] = useState(0);
  //console.log("productListByPage ", productListByPage);
  // Fetch products when filters or currentPage change
  useEffect(() => {
    setCurrentPage(1);
    // dispatch(setActiveFilter({ title: titleParam, sort: sortParam }));
    // dispatch(setActiveListProduct());
    getProductList(1);
  }, [sortParam, titleParam, searchParam]);

  useEffect(() => {
    // console.log("   product list     loading còn không nèF");
    if (productListByPage?.length >= totalProductItems) {
      // console.log("  false  ");
      setHasMore(false);
    } else {
      // console.log("  true  ");
      setHasMore(true);
    }
  }, [totalProductItems, productListByPage?.length]);

  const fetchMoreData = () => {
    // dispatch(setActiveFilter({ title: titleParam, sort: sortParam }));
    if (productListByPage?.length <= totalProductItems) {
      setCurrentPage((prevPage) => {
        const nextPage = prevPage + 1;
        getProductList(nextPage);
        return nextPage;
      });
      // console.log("crrent page ", currentPage)
    } else {
      setHasMore(false);
    }
  };

  const getProductList = (page) => {
    // console.log("Fetching product list for page", page);
    if (sortParam) {
      if (
        titleParam === "Hot" ||
        titleParam === "Sale" ||
        titleParam === "brand" ||
        titleParam === "category"
      ) {
        // dispatch(
        //   fetchProductListWithSortOrTitle({
        //     sortParam,
        //     titleParam,
        //     currentPage: page,
        //     pageSize,
        //   })
        // );
      } else {
        // dispatch(
        //   fetchProductListWithSortOrTitle({
        //     sortParam,
        //     titleParam: "",
        //     currentPage: page,
        //     pageSize,
        //   })
        // );
      }
    } else if (searchParam) {
      // console.log("fetchProductListWithSearch  -====");
      // dispatch(
      //   fetchProductListWithSearch({
      //     searchParam,
      //     currentPage: page,
      //     pageSize,
      //   })
      // );
    } else {
      // console.log("fetchProductList");
      // dispatch(
      //   fetchProductList({
      //     sortParam: "",
      //     titleParam: "",
      //     searchParam: "",
      //     currentPage: page,
      //     pageSize,
      //   })
      // );
    }
  };

  return (
    <div className="p-4 md:p-2 w-80% ">
      {productListByPage === 0 ? (
        <p className="p-5 text-sm text-center">
          Không có sản phẩm nào trong danh sách.
        </p>
      ) : (
        <InfiniteScroll
          dataLength={productListByPage?.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={
            <div className="flex items-center justify-center w-full">
              Loading...
            </div>
          }
          endMessage={
            <p className="p-5 text-sm text-center">
              Bạn đã xem hết danh sách sản phẩm
            </p>
          }
        >
          <div className="grid items-center justify-center w-full grid-cols-1 gap-y-6 md:grid-cols-4 lg:grid-cols-5 mx-4">
            {Array.isArray(productListByPage) &&
              productListByPage?.map((product, index) => (
                <ProductCard
                  // key={product.id || index}
                  key={`${product?.id}-${index}`} // Kết hợp ID và index để đảm bảo key duy nhất
                  product={product}
                  displayQuantity={true}
                />
              ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}

ProductList.propTypes = {
  sortParam: PropTypes.string,
  titleParam: PropTypes.string,
  searchParam: PropTypes.string,
};

export default React.memo(ProductList);
