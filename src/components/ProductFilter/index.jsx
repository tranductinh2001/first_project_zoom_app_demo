import React, { useState } from "react";
import { Slider, Checkbox, Select, Button } from "antd";
import { FilterOutlined, ReloadOutlined } from "@ant-design/icons";

const { Option } = Select;

const ProductFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    price: [9000, 500000000],
    categories: [],
    users: [],
    cycle: [],
  });

  const handlePriceChange = (value) => {
    setFilters({ ...filters, price: value });
    onFilterChange({ ...filters, price: value });
  };

  const handleCategoryChange = (checkedValues) => {
    setFilters({ ...filters, categories: checkedValues });
    onFilterChange({ ...filters, categories: checkedValues });
  };

  const handleUserChange = (checkedValues) => {
    setFilters({ ...filters, users: checkedValues });
    onFilterChange({ ...filters, users: checkedValues });
  };

  const handleCycleChange = (value) => {
    setFilters({ ...filters, cycle: value });
    onFilterChange({ ...filters, cycle: value });
  };

  const resetFilters = () => {
    const defaultFilters = {
      price: [9000, 500000000],
      categories: [],
      users: [],
      cycle: [],
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <div className=" px-4 w-full bg-white rounded-lg shadow-md border-spacing-2">
      <h2 className="text-lg font-semibold mb-3 flex items-center">
        <FilterOutlined className="mr-2" /> Bộ lọc sản phẩm
      </h2>

      {/* Lọc theo giá */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Lọc theo giá</h3>
        <Slider
          range
          min={9000}
          max={500000000}
          defaultValue={filters.price}
          onChange={handlePriceChange}
        />
        <p>
          Giá: {filters.price[0].toLocaleString()}₫ -{" "}
          {filters.price[1].toLocaleString()}₫
        </p>
      </div>

      {/* Lọc theo loại tài khoản */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Loại tài khoản</h3>
        <Checkbox.Group
          options={["Nâng cấp chính chủ", "Thuê phòng", "Thuê tài khoản"]}
          onChange={handleCategoryChange}
          value={filters.categories}
        />
      </div>

      {/* Lọc theo số lượng người */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Số lượng người</h3>
        <Checkbox.Group
          options={["100 người", "300 người", "500 người", "1000 người"]}
          onChange={handleUserChange}
          value={filters.users}
        />
      </div>

      {/* Chu kỳ thanh toán */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Chu kỳ thanh toán</h3>
        <Select
          mode="multiple"
          placeholder="Chọn chu kỳ"
          className="w-full"
          onChange={handleCycleChange}
          value={filters.cycle}
        >
          {["3 giờ", "6 giờ", "1 ngày", "1 tuần", "1 tháng", "6 tháng"].map(
            (cycle) => (
              <Option key={cycle} value={cycle}>
                {cycle}
              </Option>
            )
          )}
        </Select>
      </div>

      {/* Nút reset */}
      <Button
        type="primary"
        icon={<ReloadOutlined />}
        onClick={resetFilters}
        block
      >
        Đặt lại bộ lọc
      </Button>
    </div>
  );
};

export default ProductFilter;
