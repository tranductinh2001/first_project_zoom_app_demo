import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="text-gray-600 bg-white border-t">
      <div className="container px-4 py-8 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg font-bold">Về chúng tôi</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-[#0F67B1]">
                  Giới thiệu Muazoon.com
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-[#0F67B1]">
                  Tuyển dụng
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#0F67B1]">
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[#0F67B1]">
                  Chính sách bảo mật
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">Hỗ trợ khách hàng</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="hover:text-[#0F67B1]">
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-[#0F67B1]">
                  Chính sách vận chuyển
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-[#0F67B1]">
                  Chính sách đổi trả
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#0F67B1]">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">Danh mục tài khoản</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/phones" className="hover:text-[#0F67B1]">
                  Giỏ hàng
                </Link>
              </li>
              <li>
                <Link href="/category/tablets" className="hover:text-[#0F67B1]">
                  Sản phẩm đã mua
                </Link>
              </li>
              <li>
                <Link
                  href="/category/accessories"
                  className="hover:text-[#0F67B1]"
                >
                  Khuyến mãi
                </Link>
              </li>{" "}
              <li>
                <Link
                  href="/category/accessories"
                  className="hover:text-[#0F67B1]"
                >
                  Tin tức
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-bold">Kết nối với chúng tôi</h3>
            <div className="flex mb-4 space-x-4">
              <a
                href="https://zalo.me/2378578783874331652"
                className="text-gray-400 hover:text-[#0F67B1]"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://zalo.me/2378578783874331652"
                className="text-gray-400 hover:text-[#0F67B1]"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://zalo.me/2378578783874331652"
                className="text-gray-400 hover:text-[#0F67B1]"
              >
                <Twitter size={24} />
              </a>
            </div>
            <p className="mb-2">Hotline: 123456789</p>
            <p>Email: 123456789@gmail.com</p>
          </div>
        </div>
      </div>
      <div className="bottom-0 flex items-center justify-center w-full p-2 py-4 border-t">
        © {new Date().getFullYear()} Muazoom.com
      </div>
    </footer>
  );
}
