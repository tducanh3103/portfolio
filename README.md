# portfolio

Portfolio của Trương Đức Anh. HTML/CSS/JS thuần, không build step, deploy bằng Cloudflare Workers (static assets, thư mục `public/`).

## Việc cần làm trước khi push

Thay địa chỉ tạm trong thẻ SEO (canonical, og:image, sitemap, robots) bằng địa chỉ thật của site:

```bash
grep -rl "portfolio.YOUR-SUBDOMAIN.workers.dev" public | xargs sed -i '' 's#https://portfolio.YOUR-SUBDOMAIN.workers.dev#https://DIA-CHI-THAT#g'
```

Còn lại: ảnh thật thay các ô giữ chỗ, link LinkedIn / Instagram / Facebook và file CV PDF (xem mục cuối).

## Link chờ bổ sung

Link LinkedIn, Instagram, Facebook (footer, trang Contact) và nút CV (trang About) đang hiện với `href="#"`. Khi có link thật, tìm `href="#"` trong `public/` và thay bằng link thật.
