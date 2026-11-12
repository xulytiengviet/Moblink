# Moblink — Trang giới thiệu tiếng Việt

> **Moblink** là bản phân nhánh của [plainhub/plain-app (PlainApp)](https://github.com/plainhub/plain-app). Ứng dụng gốc là phần mềm mã nguồn mở dành cho Android cho phép quản lý điện thoại từ trình duyệt máy tính trên cùng mạng nội bộ.

## 🌐 Website

Mã nguồn trang tiếng Việt được đặt độc lập trong **[docs/index.html](docs/index.html)**:

- `docs/index.html`: cấu trúc nội dung, SEO, hướng dẫn, bộ ảnh minh họa.
- `docs/style.css`: giao diện responsive sáng/tối, phong cách trang giới thiệu dự án mã nguồn mở.
- `docs/app.js`: tìm kiếm tính năng không dấu, menu di động, chuyển chủ đề, thư viện ảnh phóng lớn.
- Hình ảnh được tham chiếu trực tiếp từ thư mục `screenshots/` thuộc repository này thông qua `raw.githubusercontent.com`.

Trang giới thiệu là HTML/CSS/JavaScript tĩnh, **không** kết nối hoặc yêu cầu quyền truy cập điện thoại của khách truy cập. Chỉ app Android trên điện thoại mới có thể cung cấp dashboard thực tế.

### Xem thử cục bộ

Có thể mở `docs/index.html` bằng trình duyệt. Để kiểm tra qua HTTP:

```sh
python -m http.server 8080 --directory docs
```

Mở http://localhost:8080

### Xuất bản bằng GitHub Pages

1. Mở **Settings → Pages** trong repository `xulytiengviet/Moblink`.
2. Chọn **Build and deployment → Source: Deploy from a branch**.
3. Chọn **Branch: main**, **Folder: /docs**, sau đó **Save**.
4. Sau khi GitHub Pages triển khai thành công, địa chỉ mặc định dự kiến là **https://xulytiengviet.github.io/Moblink/**.

> GitHub Pages có thể đang tắt mặc định; tạo mã nguồn trong `docs/` không đồng nghĩa website đã được xuất bản. Cần kiểm tra trạng thái tại Settings → Pages.

## 📱 Hướng dẫn kết nối Android

1. Cài PlainApp từ [F-Droid](https://f-droid.org/packages/com.ismartcoding.plain/), [Google Play](https://play.google.com/store/apps/details?id=com.ismartcoding.plain) hoặc [GitHub Releases của dự án gốc](https://github.com/plainhub/plain-app/releases/latest).
2. Mở chức năng **Web on PC** trên điện thoại, bật máy chủ web và cấp quyền Android cần dùng.
3. Kết nối điện thoại và máy tính vào cùng mạng Wi-Fi đáng tin cậy.
4. Trên máy tính, nhập **địa chỉ HTTPS do ứng dụng điện thoại hiển thị** vào trình duyệt và hoàn tất xác thực theo hướng dẫn của ứng dụng.

**Cảnh báo an toàn:** Không mở cổng quản lý ra Internet; không sử dụng trên Wi-Fi công cộng; chỉ cấp quyền đọc SMS, danh bạ, ghi màn hình khi thực sự cần. Mã hóa đường truyền không tự động đồng nghĩa mọi cấu hình mạng đều an toàn.

## 🧩 Nguồn gốc và ghi nhận tác giả

- **Dự án gốc:** [plainhub/plain-app](https://github.com/plainhub/plain-app)
- **Website và tài liệu gốc:** [plainapp.app](https://plainapp.app)
- **Bản fork:** [xulytiengviet/Moblink](https://github.com/xulytiengviet/Moblink)
- **Trang tham khảo về cách trình bày dự án:** [Hysen Labs — PlainApp](https://hysenlabs.com/projects/plainhub-plain-app)
- **Giấy phép phần mềm gốc:** [GNU Affero General Public License v3.0 (AGPL-3.0)](https://www.gnu.org/licenses/agpl-3.0.html)

Trang giới thiệu này sử dụng nội dung được viết lại bằng tiếng Việt và hình ảnh có sẵn trong repository. Không sử dụng thương hiệu Hysen Labs để tạo cảm giác có quan hệ chính thức. Nếu phân phối phần mềm phái sinh, cần tuân thủ đầy đủ AGPL-3.0 và điều kiện ghi nhận nguồn đi kèm.

> **Lưu ý về trạng thái:** Website này không chứng minh rằng Moblink có một APK được phát hành hoặc đã kiểm thử độc lập. Các liên kết tải ứng dụng trên trang dẫn đến nguồn phát hành PlainApp chính thức.
