import { Alert } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { getProvincesWithDetail } from "vietnam-provinces";
import Select from "react-select";
import { Input } from "antd";
import { motion } from "framer-motion";
// import { register } from "../redux/slices/authSlice";
import { useRef } from "react";
// import { setCreatedAccount } from "../redux/slices/authSlice";

export default function Testa({ isFormRegisterVisibleParam }) {
  // const isLoading = useSelector((state) => state.auth.isLoading);
  const isLoading = false;

  const [isFormRegisterVisible, setisFormRegisterVisible] = useState(
    isFormRegisterVisibleParam
  );

  const toggleOpenFormResgister = () => {
    setisFormRegisterVisible(false);
  };
  // const errorRegisterMessages = useSelector(
  //   (state) => state.auth.errorRegisterMessages
  // );
  const errorRegisterMessages = null;
  // const success = useSelector((state) => state.auth.createdAccountSuccess);
  const success = false;

  const navigate = useNavigate();
  // const dispatch = useDispatch();
  const location = useLocation();

  const [dataProvinces, setDataProvinces] = useState({});

  const [valueProvince, setValueProvicce] = useState(null);
  const [valueDistrict, setValueDistrict] = useState(null);
  const [valueWard, setValueWard] = useState(null);

  const [address, setAddress] = useState("");
  const [optionsProvices, setOptionsProvices] = useState([]);
  const [optionsDistricts, setOptionsDistricts] = useState([]);
  const [optionsWards, setOptionsWards] = useState([]);

  const [error, setError] = useState("");

  const [payload, setPayload] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    last_name: "",
    number_phone: "",
    address: "",
    dob: "",
    username: "",
  });

  // useEffect(() => {
  //   if (success == true) {
  //     navigate("/login");
  //     dispatch(setCreatedAccount());
  //   }
  // }, [success]);

  const containerRef = useRef(null);

  const handleFocus = (e) => {
    const inputTop = e.target.getBoundingClientRect().top;
    const viewportHeight = window.innerHeight;
    const keyboardHeight = 300; // điều chỉnh thông số bàn phím nha thầy

    if (inputTop > viewportHeight - keyboardHeight) {
      const offset = inputTop - (viewportHeight - keyboardHeight) + 20;
      containerRef.current.style.transform = `translateY(-${offset}px)`;
    }
  };

  const handleBlur = () => {
    containerRef.current.style.transform = "translateY(0)";
  };

  const setValueAddress = () => {
    setPayload((prevState) => ({
      ...prevState,
      address:
        address +
        " ," +
        valueWard?.label +
        ", " +
        valueDistrict?.label +
        ", " +
        valueProvince?.label,
    }));
  };

  useEffect(() => {
    setPayload((prevState) => ({
      ...prevState,
      address:
        address +
        " ," +
        valueWard?.label +
        ", " +
        valueDistrict?.label +
        ", " +
        valueProvince?.label,
    }));
  }, [address, valueWard, valueDistrict, valueProvince]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log("form ", payload);
    const { confirmPassword, ...payloadWithoutConfirmPassword } = {
      ...payload,
    };
    // console.log("form ", payloadWithoutConfirmPassword);
    // dispatch(register(payloadWithoutConfirmPassword));
  };

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await getProvincesWithDetail();
        setDataProvinces(response);

        const provincesArray = Object.values(response);
        const formattedOptions = provincesArray.map((province) => ({
          value: province.code,
          label: province.name,
        }));

        setOptionsProvices(formattedOptions);
      } catch (error) {
        console.error("Failed to fetch provinces:", error);
      }
    };

    fetchProvinces();
  }, []);

  useEffect(() => {
    if (valueProvince) {
      const selectedProvince = dataProvinces[valueProvince.value];
      const districtsArray = selectedProvince?.districts
        ? Object.values(selectedProvince.districts)
        : [];

      const formattedDistricts = districtsArray.map((district) => ({
        value: district.code,
        label: district.name,
      }));

      setOptionsDistricts(formattedDistricts);
      setOptionsWards([]);
    }
  }, [valueProvince, dataProvinces]);

  useEffect(() => {
    if (valueDistrict) {
      const selectedProvince = dataProvinces[valueProvince.value];
      const selectedDistrict = selectedProvince?.districts[valueDistrict.value];
      const wardsArray = selectedDistrict?.wards
        ? Object.values(selectedDistrict.wards)
        : [];

      const formattedWards = wardsArray.map((ward) => ({
        value: ward.code,
        label: ward.name,
      }));

      setOptionsWards(formattedWards);
    }
    setValueAddress();
  }, [valueDistrict, dataProvinces, valueProvince]);

  useEffect(() => {
    if (
      payload.confirmPassword != payload.password &&
      payload.confirmPassword
    ) {
      setError("Mật khẩu và xác nhận mật khẩu không khớp");
    } else {
      setError("");
    }
  }, [payload.confirmPassword, payload.password]);

  useEffect(() => {
    setPayload((prevState) => ({
      ...prevState,
      username: payload.first_name + " " + payload.last_name,
    }));
  }, [payload.first_name, payload.last_name]);

  const changeHandlerProvice = (selectedOption) => {
    setValueProvicce(selectedOption);
    setValueDistrict(null);
    setValueWard(null);
    setValueAddress();
  };

  const changeHandlerDistric = (selectedOption) => {
    setValueDistrict(selectedOption);
    setValueWard(null);
  };

  const changeHandlerWard = (selectedOption) => {
    setValueWard(selectedOption);
  };

  return (
    <div className="fixed z-50 flex flex-col">
      {isFormRegisterVisible && (
        <>
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50 h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={toggleOpenFormResgister}
          />
          {/* <div className="z-50 fixed inset-0 bg-slate-700 bg-opacity-55 rounded-3xl "> */}
          <div className="min-h-screen w-full flex items-center justify-center rounded-full">
            <motion.div
              className="flex justify-center items-center fixed rounded-2xl bg-gray-100 shadow-xl z-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* <img src={AI_bg_login} alt="Background" className=" asulute" /> */}

              <div className="bg-gray-200 h-full flex items-center justify-center relative rounded-2xl">
                {isLoading && (
                  <div className="bg-gray-500 bg-opacity-50 flex items-center justify-center z-10">
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="w-8 h-8 text-gray-600 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                )}
                <div className="flex bg-white shadow-lg rounded-3xl flex-col justify-center px-6 py-6 lg:px-8 w-full max-w-full">
                  <div className="sm:mx-auto sm:w-full sm:max-w-sm min-w-full flex flex-col items-center">
                    <Link to="/" className="hover:opacity-50">
                      <img
                        src={logo}
                        alt=""
                        className="h-28 hover:rotate-3 duration-300"
                      />
                    </Link>
                    <h2 className="mb-6 text-center text-4xl font-bold leading-9 tracking-tight text-gray-900">
                      Đăng ký
                    </h2>
                  </div>

                  <form
                    className="flex bg-white shadow-lg rounded-3xl flex-col justify-center  w-full"
                    onSubmit={handleSubmit}
                  >
                    <div className="grid grid-cols-2 gap-4 h-1/2">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-lg font-medium leading-6 text-gray-900"
                        >
                          Địa chỉ Email
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            name="email"
                            type="text"
                            autoComplete="email"
                            required
                            placeholder="Nhập email"
                            value={payload.email}
                            onChange={(e) => {
                              setPayload((prevState) => ({
                                ...prevState,
                                email: e.target.value,
                              }));
                            }}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            className="block w-full h-12 pl-4 focus:outline-none rounded-md border-2 border-gray-300 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500"
                          />
                          {errorRegisterMessages && (
                            <p style={{ color: "red" }}>
                              {errorRegisterMessages?.message}
                            </p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="password"
                          className="block text-lg font-medium leading-6 text-gray-900"
                        >
                          Mật khẩu
                        </label>
                        <div className="mt-2">
                          <Input.Password
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            placeholder="Nhập mật khẩu"
                            value={payload.password}
                            onChange={(e) => {
                              setPayload((prevState) => ({
                                ...prevState,
                                password: e.target.value,
                              }));
                            }}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            className="h-12 rounded-md text-gray-900 placeholder:text-gray-400 text-lg border-2"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="confirmPassword"
                          className="block text-lg font-medium leading-6 text-gray-900"
                        >
                          Nhập lại mật khẩu
                        </label>
                        <div className="mt-2">
                          <Input.Password
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            required
                            placeholder="Xác nhận mật khẩu"
                            value={payload.confirmPassword}
                            onChange={(e) => {
                              setPayload((prevState) => ({
                                ...prevState,
                                confirmPassword: e.target.value,
                              }));
                            }}
                            className="h-12 rounded-md text-gray-900 placeholder:text-gray-400 text-lg border-2 font-medium"
                          />
                          {error && <p style={{ color: "red" }}>{error}</p>}
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="last_name"
                          className="block text-lg font-medium leading-6 text-gray-900"
                        >
                          Họ
                        </label>
                        <div className="mt-2">
                          <input
                            id="last_name"
                            name="last_name"
                            type="text"
                            autoComplete="family-name"
                            required
                            placeholder="Nhập họ của bạn"
                            value={payload.last_name}
                            onChange={(e) => {
                              setPayload((prevState) => ({
                                ...prevState,
                                last_name: e.target.value,
                              }));
                            }}
                            className="block w-full h-12 pl-4 focus:outline-none rounded-md border-2 border-gray-300 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="first_name"
                          className="block text-lg font-medium leading-6 text-gray-900"
                        >
                          Tên
                        </label>
                        <div className="mt-2">
                          <input
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            id="first_name"
                            name="first_name"
                            type="text"
                            autoComplete="given-name"
                            required
                            placeholder="Nhập tên của bạn"
                            value={payload.first_name}
                            onChange={(e) => {
                              setPayload((prevState) => ({
                                ...prevState,
                                first_name: e.target.value,
                              }));
                            }}
                            className="block w-full h-12 pl-4 focus:outline-none rounded-md border-2 border-gray-300 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="dob"
                          className="block text-lg font-medium leading-6 text-gray-900"
                        >
                          Ngày sinh
                        </label>
                        <div className="mt-2">
                          <input
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            id="dob"
                            name="dob"
                            type="date"
                            autoComplete="given-name"
                            required
                            placeholder="Nhập ngày sinh của bạn"
                            value={payload.dob}
                            onChange={(e) => {
                              setPayload((prevState) => ({
                                ...prevState,
                                dob: e.target.value,
                              }));
                            }}
                            className="block w-full h-12 pl-4 focus:outline-none rounded-md border-2 border-gray-300 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="number_phone"
                          className="block text-lg font-medium leading-6 text-gray-900"
                        >
                          Số điện thoại
                        </label>
                        <div className="mt-2">
                          <input
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            id="number_phone"
                            name="number_phone"
                            type="text"
                            autoComplete="tel"
                            required
                            placeholder="Nhập số điện thoại"
                            value={payload.number_phone}
                            onChange={(e) => {
                              setPayload((prevState) => ({
                                ...prevState,
                                number_phone: e.target.value,
                              }));
                            }}
                            className="block w-full h-12 pl-4 focus:outline-none rounded-md border-2 border-gray-300 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="col-span-2">
                        <label
                          htmlFor="address"
                          className="block text-lg font-medium leading-6 text-gray-900"
                        >
                          Địa chỉ
                        </label>
                        <div className="mt-2">
                          <input
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            id="address"
                            name="address"
                            type="text"
                            autoComplete="street-address"
                            required
                            placeholder="Nhập địa chỉ của bạn"
                            value={address}
                            onChange={(e) => {
                              setAddress(e.target.value);
                            }}
                            className="block w-full h-12 pl-4 focus:outline-none rounded-md border-2 border-gray-300 py-2 text-gray-900 placeholder:text-gray-400 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="city"
                          className="block text-lg font-medium leading-6 text-gray-900"
                        >
                          Tỉnh / Thành phố
                        </label>
                        <div className="mt-2">
                          <Select
                            options={optionsProvices}
                            value={valueProvince}
                            onChange={changeHandlerProvice}
                            placeholder={"chọn tỉnh"}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="district"
                          className="block text-lg font-medium leading-6 text-gray-900"
                        >
                          Quận / Huyện
                        </label>
                        <div className="mt-2">
                          <Select
                            options={optionsDistricts}
                            value={valueDistrict}
                            onChange={changeHandlerDistric}
                            isDisabled={!valueProvince}
                            placeholder={"chọn quận huyện"}
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="ward"
                          className="block text-lg font-medium leading-6 text-gray-900"
                        >
                          Phường / Xã
                        </label>
                        <div className="mt-2">
                          <Select
                            options={optionsWards}
                            value={valueWard}
                            onChange={changeHandlerWard}
                            isDisabled={!valueDistrict}
                            placeholder={"chọn phường xã"}
                          />
                        </div>
                      </div>
                    </div>

                    {errorRegisterMessages &&
                      errorRegisterMessages?.errors?.length > 0 && (
                        <Alert
                          message={
                            <ul>
                              {errorRegisterMessages?.errors?.map(
                                (err, index) => (
                                  <li key={index}>{err}</li>
                                )
                              )}
                            </ul>
                          }
                          type="error"
                        />
                      )}

                    <div className="mt-4">
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-blue-500 py-2 px-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                      >
                        Đăng ký
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
          {/* </div> */}
        </>
      )}
    </div>
  );
}
