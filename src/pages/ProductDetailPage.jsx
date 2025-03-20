import {
  Button,
  Carousel,
  Image,
  Input,
  InputNumber,
  message,
  Table,
  ConfigProvider,
} from "antd";
import { Segmented } from "antd";

import { FaShoppingCart, FaCommentDots, FaShieldAlt } from "react-icons/fa";
import { FaQrcode } from "react-icons/fa6";

import { useMemo } from "react";
import CommentList from "../components/commentsData";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import CartDrawer from "../components/CartDrawer";
import ProductCard from "../components/ProductCard";
import default_image from "../assets/default_image.png";
import Breadcrumb from "../components/BreadcrumbNav";
// import { addManyToCart } from "../redux/slices/cartSlice";
import useSessionStorage from "../custom hooks/useSessionStorage";
// import {
//   fetchProductDetail,
//   fetchSaleProductList,
// } from "../redux/slices/productSlice";

// import RatingModal from "../components/RateModal/RateModal";
// import { fetchSizesByProductId } from "../redux/slices/sizeSlice";
const carouselResponsiveSetting = [
  {
    breakpoint: 640,
    settings: {
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      dots: false,
    },
  },
];

const QuantityEditor = ({ max, min, onChange }) => {
  const [value, setValue] = useState(0);

  const handleIncrease = () => {
    if (value < max) {
      setValue(value + 1);
      onChange(value + 1);
    }
  };

  const handleDecrease = () => {
    if (value > min) {
      setValue(value - 1);
      onChange(value - 1);
    }
  };

  return (
    <div className="flex flex-row items-center justify-center gap-1">
      <InputNumber
        readOnly
        className="text-center w-28"
        min={min}
        max={max}
        value={value}
        onChange={(val) => {
          setValue(val);
          onChange(val);
        }}
      />
      <Button
        type="primary"
        shape="circle"
        icon={<FaPlus />}
        onClick={handleIncrease}
        disabled={value >= max}
      />
      <Button
        type="primary"
        shape="circle"
        icon={<FaMinus />}
        onClick={handleDecrease}
        disabled={value <= min}
      />
    </div>
  );
};

function CustomArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        background: "#3498db",
        borderRadius: "10px",
        padding: "5px",
      }}
      onClick={onClick}
    />
  );
}

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [selected, setSelected] = useState("6 tháng");

  const [viewedProducts, setViewedProducts] = useSessionStorage(
    "viewedProducts",
    []
  );

  // const dispatch = useDispatch();
  //   const product = useSelector(
  //     (state) => state.products?.productDetails?.product
  //   );
  //   const sizeByProduct = useSelector((state) => state.size?.sizeListByIdProduct);
  //   const saleProducts = useSelector((state) => state.products?.saleProductList);
  //   const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated);
  //   const loading = useSelector((state) => state.products?.loading);
  const loading = null;
  const product = useMemo(
    () => ({
      id: 4,
      name: "Nâng cấp Zoom Pro 100 người 3 tháng - Chính chủ",
      price: "597.000",
      image: default_image,
      description:
        "Gói nâng cấp Zoom Pro 100 người sử dụng trong 3 tháng, chính chủ.",
    }),
    []
  );
  const sizeByProduct = null;
  const saleProducts = null;
  const isAuthenticated = true;
  const dataSource = null;
  // const dataSource = sizeByProduct?.map((item, index) => ({
  //   ...item,
  //   key: `${index}`,
  //   count: 0,
  // }));

  // console.log("sizeByProduct   ", sizeByProduct);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [cart, setCart] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(
    product?.image ?? "src/assets/default_image.png"
  );

  const handleImageClick = (url) => {
    setSelectedImage(url);
  };

  const error = () => {
    messageApi.open({
      type: "error",
      content: "Bạn chưa chọn sản phẩm!",
    });
  };

  const showDrawer = () => {
    setDrawerOpen(true);
  };
  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  useEffect(() => {
    // dispatch(fetchProductDetail(productId));
    // dispatch(fetchSizesByProductId(productId));
  }, [productId]);

  useEffect(() => {
    if (product) {
      setSelectedImage(product?.image?.url);
      // console.log("Updated selectedImage:", product.images[0]?.url);
    }
  }, [product]);

  //check viewed product
  // useEffect(() => {
  //   if (product) {
  //     setViewedProducts((prevViewedProducts) => {
  //       const isProductViewed = prevViewedProducts.some(
  //         (p) => p?.id === product?.id
  //       );
  //       if (!isProductViewed) {
  //         return [...prevViewedProducts, product];
  //       }

  //       return prevViewedProducts;
  //     });
  //   }
  // }, [product]);

  const handleQuantityChange = (RowItem, newCount) => {
    const key = RowItem.key;
    // console.log("rowitem   ", RowItem.sizeName);
    const existingItem = cart.find((item) => item.key === key);

    if (existingItem) {
      const updatedCart = cart
        .map((item) =>
          item.key === key
            ? {
                ...item,
                product: product,
                count: newCount,
                size: RowItem.sizeName,
              }
            : item
        )
        .filter((item) => item.count > 0);
      setCart(updatedCart);
    } else {
      const newItem = {
        key,
        count: newCount,
        product: product,
        size: RowItem.sizeName,
      };
      const updatedCart = [...cart, newItem].filter((item) => item.count > 0);
      setCart(updatedCart);
    }
  };

  const addToCart = () => {
    showDrawer();
    if (cart && cart?.length > 0) {
      // console.log("cart   ", cart);
      // dispatch(addManyToCart({ products: cart }));
      // dispatch(fetchCartData());
      showDrawer();
      // dispatch(fetchCartData());

      // console.log("cart: ", cart);
    } else {
      error();
    }
  };

  const columns = [
    {
      title: "Sản phẩm",
      width: 120,
      dataIndex: "sizeName",
      align: "center",
      key: "size",
    },
    {
      title: "Tồn kho",
      dataIndex: "quantity",
      width: 150,
      align: "center",
      key: "quantity",
    },
    {
      title: "Số lượng",
      dataIndex: "count",
      width: 150,
      align: "center",
      key: "count",
      render: (text, record) => (
        <QuantityEditor
          min={0}
          max={record.quantity}
          value={record.count}
          onChange={(newCount) => handleQuantityChange(record, newCount)}
        />
      ),
    },
  ];
  const options = ["1 tháng", "3 tháng", "6 tháng", "9 tháng", "12 tháng"];

  const getProductListSale = (page) => {
    // dispatch(
    //   fetchSaleProductList({
    //     currentPage: page,
    //     pageSize: 5,
    //   })
    // );
  };

  useEffect(() => {
    const loadInitialProducts = async () => {
      getProductListSale(1);
    };
    loadInitialProducts();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0.2, scale: 0.1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col gap-10 justify-center w-5/6 mx-auto"
    >
      <div className="relative">
        <div className="absolute top-0 left-0 z-50">
          <Breadcrumb />
        </div>
      </div>
      {contextHolder}
      {!loading && !product ? (
        <div>Không có sản phẩm này!</div>
      ) : (
        <>
          <div className="flex flex-col justify-between sm:flex-row">
            <motion.div
              className="relative flex flex-col items-center flex-1 w-full h-full sm:flex-row sm:justify-center"
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-row items-center  h-96 w-full justify-center lg:justify-start">
                <div className="flex flex-col w-2/5 space-y-5 scale-110 p-4 hidden  xl:block">
                  <div className="flex flex-row items-start gap-3">
                    <FaShoppingCart className="text-blue-400" />
                    Cam kết chính hãng
                  </div>
                  <div className="flex flex-row items-start gap-3">
                    <FaCommentDots className="text-blue-400" />
                    Liên hệ với chúng tôi
                  </div>
                  <div className="flex flex-row items-start gap-3">
                    <FaShieldAlt className="text-blue-400" />
                    Chính xách bảo hành
                  </div>
                  <div className="flex flex-row items-start gap-3">
                    <FaQrcode className="text-blue-400" />
                    Hướng dẫn mua hàng
                  </div>
                </div>
                {/* Hình ảnh lớn */}
                <div className=" md:w-full h-[300px] sm:w-full  sm:h-[800px] md:h-[400px] overflow-hidden flex items-center justify-center">
                  <Image
                    className="object-contain w-full h-full sm:max-h-[700px] md:max-h-[800px] xl:max-h-[900px] max-w-full rounded-xl"
                    // src={selectedImage}
                    src={product?.image}
                    alt={product?.name || "Product Image"}
                  />
                </div>
              </div>
              {/* Thumbnail hình ảnh nhỏ */}
              {/* {product?.images?.length > 1 && (
                <div className="absolute bottom-2 left-0 right-0 flex sm:flex-col sm:flex-wrap gap-2 sm:w-auto sm:justify-center">
                  {product?.images?.map((image, index) => (
                    <div
                      key={index}
                      className="w-16 h-16 sm:w-24 sm:h-24 flex-shrink-0 rounded-xl border border-gray-200 overflow-hidden cursor-pointer"
                      onClick={() => handleImageClick(image?.url)}
                    >
                      <Image
                        className="w-full h-full object-cover"
                        src={image?.url}
                        alt={`Thumbnail ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
              )} */}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col flex-1 w-full sm:ml-9 gap-4 sm:mt-24 justify-center items-center md:mt-0"
            >
              <div className="flex items-center justify-start gap-4">
                <span className="text-2xl font-semibold">{product?.name}</span>
                {/* <ClothingRoom
                  imageList={product?.images || []}
                  productId={product?.id || 0}
                /> */}
              </div>
              {/* <RatingModal productId={productId} /> */}
              <span className="text-green-500 text-lg font-quicksand">
                {isAuthenticated ? (
                  product?.sale ? (
                    <div>
                      <span className="line-through">
                        {`Giá: ${product?.price?.toLocaleString() || "N/A"}đ`}
                      </span>
                      <br />
                      <span className="text-green-500">
                        {`Giá khuyến mãi: ${
                          product?.salePrice?.toLocaleString() || "N/A"
                        }đ`}
                      </span>
                    </div>
                  ) : (
                    `Giá: ${product?.price?.toLocaleString() || "N/A"}đ`
                  )
                ) : (
                  "Đăng nhập để xem giá"
                )}
              </span>
              <ConfigProvider
                theme={{
                  components: {
                    Segmented: {
                      itemActiveBg: "rgba(22, 119, 255, 0.2)", // Màu nền khi active
                      itemColor: "#000", // Màu chữ bình thường
                      itemHoverBg: "rgba(22, 119, 255, 0.1)", // Màu nền khi hover
                      itemHoverColor: "#1677ff", // Màu chữ khi hover
                      itemSelectedBg: "#1677ff", // Màu nền khi chọn
                      itemSelectedColor: "#fff", // Màu chữ khi chọn
                      trackBg: "#f0f0f0", // Màu nền container
                      trackPadding: 5, // Padding container
                      borderRadius: 5,
                    },
                  },
                }}
              >
                <Segmented
                  options={options}
                  value={selected}
                  onChange={setSelected}
                />
              </ConfigProvider>
              <span>
                <span className="text-green-500 text-lg font-quicksand">
                  {" "}
                  SẢN PHẨM ĐÃ CHỌN:{" "}
                </span>
                {product?.name} {selected} – Chính chủ
              </span>

              <div className="flex flex-row items-center gap-1">
                <div className="flex flex-row items-center justify-center gap-1">
                  <Button
                    type="primary"
                    shape="circle"
                    icon={<FaPlus />}
                    // onClick={handleIncrease}
                    // disabled={value >= max}
                  />
                  <InputNumber
                    readOnly
                    className="text-center w-28"
                    min={1}
                    max={99999}
                    value={1}
                    onChange={(val) => {
                      // setValue(val);
                      // onChange(val);
                    }}
                  />

                  <Button
                    type="primary"
                    shape="circle"
                    icon={<FaMinus />}
                    // onClick={handleDecrease}
                    // disabled={value <= min}
                  />
                </div>
              </div>
              {isAuthenticated && (
                <>
                  {/* <Table
                    columns={columns}
                    dataSource={dataSource}
                    bordered
                    pagination={false}
                  /> */}
                  <div className="z-40 flex flex-row items-center justify-center w-full gap-2 bottom-20">
                    <Button
                      onClick={addToCart}
                      className="w-full !border-2 !border-blue-500 !p-5 !bg-blue-300"
                    >
                      <div className="flex flex-col text-black">
                        <span>Thêm vào giỏ</span>
                        <span className="pb-1 text-xs">
                          và mua sản phẩm khác
                        </span>
                      </div>
                    </Button>
                    {/* <Button
                      className="w-full"
                      type="primary"
                      danger
                      size="large"
                    >
                      <div className="flex flex-col">
                        <span>Đặt ngay</span>
                        <span className="pb-1 text-xs">Thanh toán ngay</span>
                      </div>
                    </Button> */}
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </>
      )}
      <div className="flex flex-col justify-center bg-sky-200 rounded-lg p-7 items-center lg:mx-60 w-full lg:w-3/5">
        <div className="">
          <h1>LƯU Ý TRƯỚC KHI MUA HÀNG</h1>
          <div>
            <span className="font-bold text-slate-700">
              • Hạn sử dụng sản phẩm:
              <br />
            </span>
            <span className="font-bold text-slate-700 ml-3">
              Đối với hình thức thuê tài khoản / thuê phòng:
            </span>{" "}
            Không được cộng dồn
            <br />
            <span className="font-bold text-slate-700 ml-3">
              Đối với các gói nâng cấp:
            </span>{" "}
            Được cộng dồn khi mua nhiều lần <br />
          </div>
          <span className=" text-slate-700">
            • Các đơn hàng sẽ được xử lý trong vòng 2 phút - 1 tiếng. Shop sẽ cố
            gắng xử lý đơn hàng nhanh nhất có thể. <br />
          </span>
          <span className=" text-green-500">
            Cảm ơn quý khách đã tin tưởng lựa chọn dịch vụ!
          </span>
        </div>
      </div>
      <div className=" flex flex-col items-center justify-center mx-auto w-full">
        <div className="flex flex-col justify-between w-full gap-5 sm:flex-row">
          <div className="flex flex-col basis-2/3">
            <div className="flex justify-start w-full p-3 bg-[#0F67B1] rounded-t-lg sm:block">
              <span className="text-lg font-semibold text-white">
                Mô tả sản phẩm
              </span>
            </div>

            <span className="p-2 bg-white">{product?.description}</span>
          </div>
          <div className="flex flex-col rounded-lg shadow-lg sm:w-1/3 basis-1/3">
            <span className="p-3 text-center text-white bg-[#0F67B1] rounded-t-lg">
              Sản phẩm đã xem
            </span>
            <div className="flex flex-col gap-2 p-6 overflow-auto bg-white">
              {Array.isArray(viewedProducts)
                ? [...viewedProducts].reverse().map((item, index) => (
                    <Link key={item?.id || index} to={`/product/${item?.id}`}>
                      <div
                        key={item?.id || index}
                        className="flex flex-row items-start gap-2"
                      >
                        {/* <img className="w-20 h-auto" src={item?.images[0]} alt="" /> */}
                        <div className="flex flex-col">
                          <span className="text-slate-700">{item?.name}</span>
                          <span className="text-base font-semibold text-green-500">
                            {isAuthenticated
                              ? `Giá: ${
                                  item?.price?.toLocaleString() || "N/A"
                                }đ`
                              : "Đăng nhập để xem giá"}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))
                : null}
            </div>
          </div>
        </div>

        <div className="flex flex-col bg-[#0F67B1] rounded-lg shadow-lg w-full">
          <span className="p-4 text-lg font-semibold text-white border-b border-blue-300">
            Bình luận của sản phẩm
          </span>
          <div className="p-6 bg-white rounded-b-lg">
            {/* Thêm class Tailwind để chỉnh sửa nội dung */}
            <CommentList className="w-full" />
          </div>
        </div>

        <div className="flex flex-col bg-[#0F67B1] rounded-lg">
          <span className="p-2 text-lg font-semibold text-white">
            SẢN PHẨM SALE
          </span>
          <Carousel
            responsive={carouselResponsiveSetting}
            ref={carouselRef}
            // beforeChange={handleBeforeChange}
            className="w-full h-auto p-2 bg-white"
            autoplay
            arrows
            infinite={true}
            speed={1000}
            dots={false}
            slidesToShow={4}
            slidesToScroll={1}
            nextArrow={<CustomArrow />}
            prevArrow={<CustomArrow />}
            initialSlide={currentSlide}
          >
            {saleProducts?.map((item, index) => (
              <div key={item.id || index} className="flex justify-center py-4">
                <ProductCard key={item.id || index} product={item} />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
      <CartDrawer open={drawerOpen} onClose={closeDrawer} />
    </motion.div>
  );
};
ProductDetailPage.displayName = "ProductDetailPage";
export default ProductDetailPage;
