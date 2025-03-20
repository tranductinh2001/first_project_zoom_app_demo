import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { useLocation, Link } from "react-router-dom";

const BreadcrumbNav = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((item) => item);

  return (
    <Breadcrumb
      style={{ margin: "25px 0" }}
      iconFontSize={30}
      className="text-lg font-semibold"
    >
      {/* Trang chủ */}
      <Breadcrumb.Item className="drop-shadow-md">
        <Link to="/">
          <HomeOutlined /> Trang chủ
        </Link>
      </Breadcrumb.Item>

      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        return (
          <Breadcrumb.Item key={routeTo}>
            <Link to={routeTo}>{decodeURIComponent(name)}</Link>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default BreadcrumbNav;
