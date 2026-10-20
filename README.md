# portfolio

Portfolio của Trương Đức Anh. HTML/CSS/JS thuần, không build step, deploy bằng Cloudflare Workers (static assets, thư mục `public/`).

## Việc cần làm trước khi push

Thay địa chỉ tạm trong thẻ SEO (canonical, og:image, sitemap, robots) bằng địa chỉ thật của site:

```bash
grep -rl "portfolio.YOUR-SUBDOMAIN.workers.dev" public | xargs sed -i '' 's#https://portfolio.YOUR-SUBDOMAIN.workers.dev#https://DIA-CHI-THAT#g'
```

Còn lại: link LinkedIn, Instagram, Facebook (đang là `#`), file CV PDF trên trang About, ảnh thật thay các ô giữ chỗ.
