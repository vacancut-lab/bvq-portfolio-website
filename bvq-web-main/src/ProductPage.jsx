import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Box,
  Building2,
  CalendarDays,
  CircleGauge,
  CookingPot,
  Flower2,
  Gauge,
  Images,
  MapPin,
  MapPinned,
  Menu,
  Settings2,
  ShoppingBag,
  Shirt,
  Ticket,
  Waves,
  X,
} from 'lucide-react';
import { assetRegistry } from './content';
import './product.css';

const products = [
  {
    slug: 'spa',
    number: '01',
    title: 'SPA &\nWELLNESS',
    navTitle: 'SPA & WELLNESS',
    tagline: 'Thư giãn. Phục hồi. Cân bằng.',
    description: 'Chúng tôi thiết kế website spa giúp bạn truyền tải không gian thư giãn, dịch vụ chuyên nghiệp và trải nghiệm chăm sóc trọn vẹn đến khách hàng.',
    image: assetRegistry.spa,
    tone: 'spa',
    quote: 'Cơ thể được chăm sóc. Tâm trí được thả lỏng. Bạn trở về với chính mình.',
    location: 'TP. Hồ Chí Minh, Việt Nam',
    locationNote: 'Trải nghiệm tại spa thực tế',
    cta: 'Khám phá trải nghiệm',
    benefits: [
      [Flower2, 'Không gian thư giãn', 'Hình ảnh và chuyển động mang lại cảm giác bình yên, giảm căng thẳng.'],
      [Waves, 'Dịch vụ nổi bật', 'Giới thiệu liệu trình rõ ràng, giúp khách hàng dễ dàng lựa chọn.'],
      [CalendarDays, 'Đặt lịch dễ dàng', 'Tích hợp đặt lịch nhanh, nhận ưu đãi và nhắc lịch tự động.'],
    ],
  },
  {
    slug: 'du-lich',
    number: '02',
    title: 'DU LỊCH',
    navTitle: 'DU LỊCH',
    tagline: 'Khám phá thế giới, mở rộng những trải nghiệm.',
    description: 'Chúng tôi thiết kế website du lịch truyền cảm hứng, giúp khách hàng khám phá điểm đến, lên kế hoạch và đặt hành trình dễ dàng.',
    image: assetRegistry.travel,
    tone: 'travel',
    quote: 'Mỗi hành trình bắt đầu từ một khoảnh khắc khiến bạn muốn lên đường.',
    location: 'Vịnh Lan Hạ',
    locationNote: 'Việt Nam',
    cta: 'Khám phá điểm đến',
    benefits: [
      [MapPinned, 'Truyền cảm hứng', 'Hình ảnh sống động, câu chuyện đánh thức mong muốn khám phá.'],
      [CalendarDays, 'Lên kế hoạch dễ dàng', 'Lịch trình rõ ràng, thông tin đầy đủ giúp khách hàng chuẩn bị tự tin.'],
      [Ticket, 'Đặt hành trình thuận tiện', 'Quy trình đặt tour, dịch vụ nhanh gọn, minh bạch và an toàn.'],
    ],
  },
  {
    slug: 'nha-hang',
    number: '03',
    title: 'NHÀ HÀNG',
    navTitle: 'NHÀ HÀNG',
    tagline: 'Không gian hương vị. Trải nghiệm đáng nhớ.',
    description: 'Chúng tôi thiết kế website nhà hàng giúp truyền tải đúng tinh thần thương hiệu, kích thích vị giác và thúc đẩy đặt bàn hiệu quả.',
    image: assetRegistry.restaurant,
    tone: 'restaurant',
    quote: 'Mỗi món ăn đều kể một câu chuyện. Chúng tôi giúp bạn kể câu chuyện đó đẹp hơn.',
    location: 'Sài Gòn, Việt Nam',
    locationNote: 'Ẩm thực hiện đại',
    cta: 'Trải nghiệm nhà hàng',
    benefits: [
      [CookingPot, 'Kích thích vị giác', 'Hình ảnh sống động, bố cục tinh tế đánh thức cảm xúc qua từng món ăn.'],
      [CalendarDays, 'Đặt bàn dễ dàng', 'Quy trình đặt bàn nhanh gọn, thuận tiện cho mọi thiết bị.'],
      [MapPin, 'Thông tin rõ ràng', 'Hiển thị đầy đủ thực đơn, giờ mở cửa, địa chỉ và thông tin liên hệ.'],
    ],
  },
  {
    slug: 'o-to',
    number: '04',
    title: 'Ô TÔ',
    navTitle: 'Ô TÔ',
    tagline: 'Sức mạnh. Công nghệ. Hiệu suất.',
    description: 'Chúng tôi thiết kế website ô tô mang đến trải nghiệm chân thực, giúp khách hàng khám phá, cấu hình và cảm nhận giá trị từng chi tiết của chiếc xe.',
    image: assetRegistry.automotive,
    tone: 'automotive',
    quote: 'Thiết kế không chỉ để nhìn. Nó phải khiến bạn muốn lái.',
    location: 'TP. Hồ Chí Minh, Việt Nam',
    locationNote: 'Trải nghiệm tại showroom',
    cta: 'Khám phá chiếc xe',
    benefits: [
      [Gauge, 'Khám phá chi tiết', 'Hiển thị trọn vẹn thiết kế, hiệu năng và công nghệ một cách ấn tượng.'],
      [Settings2, 'Cấu hình linh hoạt', 'Cho phép tùy chọn màu sơn, nội thất, mâm xe và các tính năng.'],
      [CircleGauge, 'Trải nghiệm lái', 'Giao diện mượt mà, chuyển động chuẩn xác, truyền tải cảm giác lái thực.'],
    ],
  },
  {
    slug: 'bat-dong-san',
    number: '05',
    title: 'BẤT ĐỘNG SẢN',
    navTitle: 'BẤT ĐỘNG SẢN',
    tagline: 'Không gian sống. Giá trị bền vững.',
    description: 'Chúng tôi thiết kế website bất động sản giúp khách hàng hiểu rõ dự án, khám phá không gian và đưa ra quyết định một cách tự tin.',
    image: assetRegistry.realEstate,
    tone: 'real-estate',
    quote: 'Một ngôi nhà không chỉ là nơi để ở, mà là nơi bắt đầu những giá trị tốt đẹp.',
    location: 'TP. Hồ Chí Minh, Việt Nam',
    locationNote: 'Trải nghiệm dự án thực tế',
    cta: 'Khám phá dự án',
    benefits: [
      [Building2, 'Hiểu rõ dự án', 'Trình bày thông tin dự án rõ ràng, khoa học và dễ hiểu.'],
      [Box, 'Khám phá không gian', 'Trải nghiệm mặt bằng và hình ảnh chân thực giúp khách hàng dễ hình dung.'],
      [MapPinned, 'Kết nối giá trị', 'Trang bị đầy đủ công cụ để khách hàng liên hệ, đặt lịch và nhận tư vấn.'],
    ],
  },
  {
    slug: 'thoi-trang',
    number: '06',
    title: 'THỜI TRANG',
    navTitle: 'THỜI TRANG',
    tagline: 'Cá tính. Phong cách. Tuyên ngôn.',
    description: 'Chúng tôi thiết kế website thời trang mang đậm tinh thần thương hiệu, giúp bạn kể câu chuyện qua hình ảnh, chuyển động và trải nghiệm mua sắm tinh tế.',
    image: assetRegistry.fashion,
    tone: 'fashion',
    quote: 'Thời trang không chỉ là quần áo. Đó là cách bạn thể hiện con người mình.',
    location: 'TP. Hồ Chí Minh, Việt Nam',
    locationNote: 'Trải nghiệm cửa hàng thời trang',
    cta: 'Khám phá bộ sưu tập',
    benefits: [
      [Shirt, 'Kể chuyện thương hiệu', 'Truyền tải tinh thần thương hiệu qua bố cục, hình ảnh và chuyển động đầy cảm xúc.'],
      [Images, 'Trình diễn bộ sưu tập', 'Trải nghiệm lookbook sống động, hiệu ứng chuyển cảnh tinh tế và cuốn hút.'],
      [ShoppingBag, 'Trải nghiệm mua sắm', 'Giao diện tinh giản, tối ưu hành trình mua hàng từ khám phá đến thanh toán.'],
    ],
  },
];

export const productSlugs = products.map((product) => product.slug);

function ProductMenu({ open, onClose }) {
  return (
    <div className={open ? 'product-menu is-open' : 'product-menu'} aria-hidden={!open}>
      <button type="button" onClick={onClose} aria-label="Đóng menu"><X /></button>
      <a href="/">Trang chủ</a>
      <a href="/#showroom">Sản phẩm</a>
      <a href="/#quy-trinh">Quy trình</a>
      <a href="/#chi-phi">Báo giá</a>
      <a href="/#lien-he">Liên hệ</a>
    </div>
  );
}

export function ProductPage({ slug }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const index = Math.max(0, products.findIndex((product) => product.slug === slug));
  const product = products[index];
  const previous = products[(index - 1 + products.length) % products.length];
  const next = products[(index + 1) % products.length];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${product.navTitle} — Một Người Một Studio`;
  }, [product.navTitle]);

  return (
    <main
      className={`product-page product-${product.tone}`}
      style={{ '--product-image': `url(${product.image})` }}
    >
      <div className="product-backdrop" aria-hidden="true" />
      <div className="product-vignette" aria-hidden="true" />

      <header className="product-header">
        <nav aria-label="Điều hướng trang sản phẩm">
          <a className="active" href="/#showroom">Sản phẩm</a>
          <a href="/#quy-trinh">Quy trình</a>
          <a href="/#tu-duy">Về studio</a>
          <a href="/#chi-phi">Báo giá</a>
          <a href="/#lien-he">Liên hệ</a>
        </nav>
        <div className="product-counter"><strong>{product.number}</strong><span>/ 06</span></div>
        <button className="product-menu-button" type="button" onClick={() => setMenuOpen(true)} aria-label="Mở menu"><Menu /></button>
      </header>

      <ProductMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <section className="product-content">
        <div className="product-copy">
          <div className="product-number"><span>{product.number}</span><i /></div>
          <h1>{product.title.split('\n').map((line) => <span key={line}>{line}</span>)}</h1>
          <p className="product-tagline">{product.tagline}</p>
          <p className="product-description">{product.description}</p>

          <div className="product-benefits" id="benefits">
            {product.benefits.map(([Icon, title, description]) => (
              <article key={title}>
                <Icon aria-hidden="true" />
                <h2>{title}</h2>
                <p>{description}</p>
              </article>
            ))}
          </div>

          <a
            className="product-cta"
            href={['spa', 'du-lich', 'nha-hang', 'bat-dong-san', 'o-to', 'thoi-trang'].includes(product.slug)
              ? `/san-pham/${product.slug}/kham-pha`
              : `mailto:hello@motstudio.vn?subject=${encodeURIComponent(product.navTitle)}`}
          >
            {product.cta}<ArrowRight />
          </a>
        </div>

        <aside className="product-aside">
          <blockquote><span>“</span>{product.quote}</blockquote>
          <p className="quote-author">— Triết lý thiết kế</p>
          <div className="product-location"><MapPin /><p><strong>{product.location}</strong><span>{product.locationNote}</span></p></div>
          <a href="#benefits">Xem thêm <ArrowRight /></a>
        </aside>
      </section>

      <nav className="product-switcher" aria-label="Chuyển lĩnh vực">
        <div className="product-tabs">
          {products.map((item) => (
            <a className={item.slug === product.slug ? 'active' : ''} href={`/san-pham/${item.slug}`} key={item.slug} aria-current={item.slug === product.slug ? 'page' : undefined}>
              <span>{item.number}</span><strong>{item.navTitle}</strong>
            </a>
          ))}
        </div>
        <div className="product-arrows">
          <a href={`/san-pham/${previous.slug}`} aria-label={`Lĩnh vực trước: ${previous.navTitle}`}><ArrowLeft /></a>
          <a href={`/san-pham/${next.slug}`} aria-label={`Lĩnh vực tiếp theo: ${next.navTitle}`}><ArrowRight /></a>
        </div>
      </nav>
    </main>
  );
}
