# Danh sách hiệu ứng (khảo sát ngày 17/10/2026)

Nguồn: **Wix** = bản Wix cũ (ducanh3103.wixsite.com/my-site-1, chỉ trang Home), **walnuuut** = walnuuut.com (trang chủ), **Figma** = ảnh trong design-refs/.
Thông số (thời gian, khoảng cách) đọc từ trình duyệt bằng DevTools, chỉ để học ý tưởng. Mọi đoạn mã sẽ tự viết lại, không chép.

Độ khó: **dễ** = chỉ CSS · **vừa** = CSS + vài dòng JS · **khó** = JS nhiều hoặc phải tinh chỉnh nhiều.

## A. Khi tải trang

| # | Hiệu ứng & vị trí | Kích hoạt | Chuyển động | Nguồn | Cách dựng lại | Độ khó |
|---|---|---|---|---|---|---|
| A1 | **Ảnh hero trượt vào** (khung ảnh lớn đầu Home) | Tải trang | Mờ → rõ, trượt từ trái sang khoảng 60px (Wix, 1,2s) / 200px (walnuuut, 1,6s), chậm dần cuối | Cả hai | `@keyframes` CSS (opacity + translateX), easing kiểu "ease-out" | dễ |
| A2 | **Ô "what's new" nổi lên** (ô trắng đè góc dưới phải ảnh hero) | Tải trang, trễ 0,2s | Mờ → rõ, đi lên 60px, 0,8s | Wix (walnuuut có ô tương tự, hiện bằng A5) | CSS keyframes + `animation-delay` | dễ |
| A3 | **Dòng mô tả dưới hero trượt vào** ("ux design, photograph…") | Tải trang, trễ 0,4s | Mờ → rõ, trượt từ phải sang 20–60px, 1,5s (Wix) / 2,7s trễ 1s (walnuuut) | Cả hai | CSS keyframes | dễ |
| A4 | **Toàn trang hiện dần** | Tải trang | Nội dung chính và chân trang mờ → rõ, hạ từ trên xuống 20px, 2s | walnuuut | CSS keyframes trên `main`, `footer` | dễ |
| A5 | **Tiêu đề hiện từng chữ** (tiêu đề các khối trên Home) | Tải trang | Mỗi ký tự hiện lần lượt, cách nhau 70ms, như đang gõ | walnuuut | JS tách chữ thành `<span>`, CSS `transition-delay` tăng dần. Nên đổi sang chạy khi cuộn tới (walnuuut chạy lúc tải nên khối dưới không ai thấy) | vừa |

## B. Khi cuộn

| # | Hiệu ứng & vị trí | Kích hoạt | Chuyển động | Nguồn | Cách dựng lại | Độ khó |
|---|---|---|---|---|---|---|
| B1 | **Nổi lên khi cuộn tới** (gần như mọi khối: chữ, ảnh, nút "view more", khối contact) | Phần tử đi vào màn hình (chạy 1 lần) | Mờ → rõ, đi lên 60px trong 0,7–0,8s (Wix) / 35px trong 1s (walnuuut), easing mềm | Cả hai | `IntersectionObserver` thêm class `.is-in`, CSS transition. Chạy nhanh, không cần thư viện | vừa |
| B2 | **Lần lượt từng thẻ** (4 ảnh work, 3 ảnh lens, 4 thẻ journal) | Như B1 | Thẻ sau trễ hơn thẻ trước 0,2s | Wix (walnuuut trễ 60ms khi tải) | Biến CSS `--i` cho từng thẻ → `transition-delay: calc(var(--i) * .2s)` | dễ |
| B3 | **Tiêu đề lộ dần trái → phải** ("problems", "lens", "journal") | Cuộn tới | Chữ được "kéo màn" từ trái sang phải trong 0,8s | Wix | CSS `clip-path: inset(0 100% 0 0)` → `inset(0 0 0 0)` khi có `.is-in` | dễ |
| B4 | **Màn trắng kéo qua ảnh** (khung slider "my works") | Tải/cuộn tới | Lớp trắng phủ ảnh trượt sang phải, lộ ảnh, 1,5s trễ 0,4s | walnuuut | Pseudo-element `::before` nền trắng, `transform: translateX(100%)` khi `.is-in` | dễ |
| B5 | **Header dính trên cùng** | Cuộn | Header luôn ở trên cùng. walnuuut thêm class khi cuộn quá ~105px, nhưng **chưa xác nhận** class đó đổi gì về giao diện | Cả hai | `position: sticky; top: 0` + nền trắng | dễ |
| B6 | Cuộn mượt khi bấm link trong trang | Bấm link neo | Cuộn mượt, chừa chiều cao header | walnuuut | CSS `scroll-behavior: smooth` + `scroll-margin-top` | dễ |

## C. Khi rê chuột (chỉ máy tính; trên điện thoại sẽ tắt hoặc thay bằng trạng thái nhấn)

| # | Hiệu ứng & vị trí | Kích hoạt | Chuyển động | Nguồn | Cách dựng lại | Độ khó |
|---|---|---|---|---|---|---|
| C1 | **Gạch chân menu** (about, work…) | Rê chuột vào mục menu | Wix: vạch kẻ trượt ngang vào dưới chữ, 0,2s. walnuuut: vạch 1px mọc từ trái sang phải, 0,3s. Mục đang mở có gạch chân cố định; "contact" màu vàng có gạch vàng | Cả hai | `::after` với `transform: scaleX(0→1)`, `transform-origin: left` | dễ |
| C2 | **Link chữ có gạch dưới** ("my profile", "view more", "read more") | Rê chuột | Chữ đen → xám (#767676), vạch dưới trượt sang trái 18px, 0,4s (Wix). walnuuut: mờ đi (opacity), 0,2s | Cả hai | CSS transition màu + `transform` của `::after` | dễ |
| C3 | **Ảnh phóng to trong khung** (thẻ journal, ảnh album/work) | Rê chuột vào thẻ | Ảnh to lên 1,08 lần (Wix, 0,5s) / 1,1 lần (walnuuut, 0,8s), khung giữ nguyên | Cả hai | `overflow: hidden` ở khung, `transform: scale()` ở ảnh | dễ |
| C4 | **Nút "read more" hiện trên thẻ journal** | Rê chuột vào thẻ | Nút mờ → rõ, 0,4s | Wix | `opacity` + `:hover`/`:focus-within` | dễ |
| C5 | **Nút "click here for inquiries" có bóng sọc chéo** (khối contact cuối mọi trang) | Rê chuột | Bóng sọc chéo nằm lệch dưới phải nút. Khi rê: chữ chuyển xám, ảnh nền nút đổi (**chưa xác nhận** đổi thành gì vì Wix dùng ảnh PNG) | Wix + Figma | Bóng sọc vẽ bằng CSS `repeating-linear-gradient` ở `::after`, không dùng ảnh. Đề xuất khi rê: nút dịch về phía bóng 3–4px như được "nhấn" | vừa |
| C6 | Mục trong ô "what's new" | Rê chuột | Nền ô hơi sáng lên | Wix | CSS `:hover` | dễ |

## D. Khi bấm / tự chạy

| # | Hiệu ứng & vị trí | Kích hoạt | Chuyển động | Nguồn | Cách dựng lại | Độ khó |
|---|---|---|---|---|---|---|
| D1 | **Slideshow ảnh hero** | Tự chạy | Ảnh chuyển kiểu mờ dần chồng lên nhau (crossfade). walnuuut: 0,8s, mỗi ảnh 5s. Wix: 13 ảnh, **chưa xác nhận** thời gian mỗi ảnh | Cả hai | Ảnh xếp chồng, JS đổi class mỗi 5s, CSS transition opacity. Dừng khi tab ẩn hoặc người dùng bật "giảm chuyển động" | vừa |
| D2 | **Menu mobile** | Bấm nút ☰ | Nút ☰ biến thành ✕. Lớp phủ trắng toàn màn hình hiện mờ dần (walnuuut 0,2s), các mục menu xếp giữa màn hình | Cả hai (Figma có nút ☰) | `<button aria-expanded>` + CSS transition; khóa cuộn trang khi mở | vừa |
| D3 | Slider "my works" có mũi tên trái/phải và đánh số 01, 02 | Bấm mũi tên / tự chạy 13s | Crossfade 0,8s | walnuuut | Không đưa vào: Figma của Anh dùng lưới 4 thẻ thay vì slider | — |
| D4 | Chuyển trang kiểu trượt ngang | Bấm link sang trang khác | **Chưa xác nhận**: có đoạn CSS "SlideHorizontal" trong mã Wix nhưng không thấy chạy vì các trang con bị lỗi | Wix? | Nếu muốn: View Transitions API (CSS thuần, trình duyệt không hỗ trợ thì chuyển trang bình thường) | vừa |

## E. Chi tiết tĩnh cần giữ (không động nhưng là "chữ ký" của thiết kế)

- Tiêu đề trang nằm trong khung viền đen dày (~4px), chữ Montserrat Alternates giãn chữ rộng + dòng phụ nhỏ bên cạnh ("about · something boring").
- Tiêu đề kiểu "w e i r d / m e": chữ cách rất rộng, xuống dòng, có chấm vàng nhỏ phía trên. Wix dùng **ảnh** cho chữ này; bản mới sẽ dùng chữ thật (tốt cho SEO và đổi ngôn ngữ).
- Vạch kẻ ngang chạy từ mép trái màn hình tới sát tiêu đề khối ("problems", "lens").
- Logo có chấm vàng trên chữ cái đầu.
- Mục "contact" trên menu màu vàng.
- Khối contact nền xám nhạt, tiêu đề "contact" lớn đè lên mép trên khối.
- Toàn bộ chữ viết thường.

## F. Những chỗ mình đề xuất thay đổi (để chạy tốt trên mobile / tải nhanh)

1. Tôn trọng cài đặt "giảm chuyển động" của máy (`prefers-reduced-motion`): tắt trượt/nổi, chỉ giữ hiện mờ ngắn, slideshow đứng yên.
2. Hiệu ứng rê chuột (C1–C6) chỉ bật trên thiết bị có chuột (`@media (hover: hover)`). Trên điện thoại, "read more" của thẻ (C4) luôn hiện.
3. Nội dung không bị ẩn nếu JS lỗi: chỉ ẩn phần tử chờ hiệu ứng khi JS đã chạy.
4. Ảnh hero: tải ảnh đầu ngay, các ảnh sau tải chậm (lazy). Ảnh dùng định dạng WebP/AVIF, nhiều kích cỡ.
5. Khoảng cách trượt trên mobile giảm còn ~30px để đỡ giật.
