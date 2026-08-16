import { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  Award,
  Building2,
  CarFront,
  Clock3,
  Flower2,
  MapPinned,
  Menu,
  Shirt,
  Sparkles,
  Star,
  Users,
  UtensilsCrossed,
  X,
} from 'lucide-react';
import { assetRegistry, pricing, process, worlds } from './content';
import { ProductPage, productSlugs } from './ProductPage';
import { SpaExperience } from './SpaExperience';
import { TravelPage } from './TravelPage';
import { RestaurantPage } from './RestaurantPage';
import { RealEstatePage } from './RealEstatePage';
import { AutomotiveExperience } from './AutomotiveExperience';
import { FashionExperience } from './FashionExperience';

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="Về đầu trang">
      <span className="brand-name">Bách Vân Quán</span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [['Trang chủ', '#top'], ['Về tôi', '#tu-duy'], ['Dịch vụ', '#showroom'], ['Dự án', '#showroom'], ['Quy trình', '#quy-trinh'], ['Liên hệ', '#lien-he']];
  return (
    <header className="header">
      <Brand />
      <nav className={open ? 'nav is-open' : 'nav'} aria-label="Điều hướng chính">
        {links.map(([label, href], index) => <a className={index === 0 ? 'active' : ''} key={`${href}-${label}`} href={href} onClick={() => setOpen(false)}>{label}</a>)}
      </nav>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? 'Đóng menu' : 'Mở menu'} aria-expanded={open}>
        {open ? <X /> : <Menu />}
      </button>
    </header>
  );
}

function Hero() {
  const ref = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    assetRegistry.studioHero,
    assetRegistry.spa,
    assetRegistry.travel,
    assetRegistry.restaurant,
    assetRegistry.automotive,
    assetRegistry.realEstate,
    assetRegistry.fashion,
  ];

  useEffect(() => {
    const node = ref.current;
    const move = (event) => {
      const rect = node.getBoundingClientRect();
      node.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width - 0.5) * 2}`);
      node.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height - 0.5) * 2}`);
    };
    node.addEventListener('pointermove', move);
    return () => node.removeEventListener('pointermove', move);
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return undefined;

    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  const scrollToShowroom = () => {
    document.querySelector('#showroom')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="hero" id="top" ref={ref} style={{ '--hero': `url(${slides[activeSlide]})` }}>
      <div className="hero-grain" />
      <div className="hero-copy reveal">
        <h1>Kiến tạo trải nghiệm<br /><em>Chạm đến cảm xúc</em></h1>
        <p className="hero-description">Tôi thiết kế những trải nghiệm số độc đáo cho 6 lĩnh vực<br className="desktop-break" /> giúp thương hiệu của bạn nổi bật và kết nối sâu sắc với khách hàng.</p>
        <div className="hero-actions">
          <a className="button hero-button" href="#showroom">Khám phá dự án <ArrowRight size={17} /></a>
        </div>
      </div>
      <button className="scroll-cue" type="button" onClick={scrollToShowroom} aria-label="Cuộn xuống phần lĩnh vực">
        <span><ArrowDown size={16} /></span>Kéo xuống
      </button>
      <div className="hero-index" aria-label={`Slide ${activeSlide + 1} trên ${slides.length}`}>
        {slides.map((slide, index) => (
          <button
            className={index === activeSlide ? 'active' : ''}
            key={slide}
            type="button"
            onClick={() => setActiveSlide(index)}
            aria-label={`Hiển thị ảnh hero ${index + 1}`}
            aria-current={index === activeSlide ? 'true' : undefined}
          />
        ))}
      </div>
    </section>
  );
}

function Showroom() {
  const icons = [Flower2, MapPinned, UtensilsCrossed, CarFront, Building2, Shirt];
  const statIcons = [Star, Users, Award, Clock3];
  const stats = [['200+', 'Dự án hoàn thành'], ['95%', 'Phản hồi tích cực'], ['6', 'Lĩnh vực chuyên sâu'], ['5+', 'Năm kinh nghiệm']];
  return (
    <section className="showroom" id="showroom">
      <div className="showroom-main">
        <div className="showroom-intro">
          <h2>Lĩnh vực của tôi</h2>
          <span className="gold-rule" />
          <p>Mỗi lĩnh vực là một câu chuyện,<br />mỗi thiết kế là một hành trình cảm xúc.</p>
          <a className="button projects-button" href="#tu-duy">Xem tất cả dự án <ArrowRight size={15} /></a>
        </div>
        <div className="field-grid">
          {worlds.map((world, index) => {
            const Icon = icons[index];
            return (
              <a className="field-card" href={`/san-pham/${world.id}`} key={world.id} style={{ '--field-image': `url(${world.image})` }}>
                <span className="field-shade" />
                <span className="field-label"><i><Icon size={17} /></i>{world.title}</span>
              </a>
            );
          })}
        </div>
      </div>
      <div className="showroom-stats" aria-label="Một vài con số của studio">
        {stats.map(([value, label], index) => {
          const Icon = statIcons[index];
          return <div key={label}><i><Icon size={17} /></i><p><strong>{value}</strong><span>{label}</span></p></div>;
        })}
      </div>
    </section>
  );
}

function Thinking() {
  const steps = ['Doanh nghiệp', 'Khách hàng', 'Trải nghiệm', 'Sản phẩm'];

  return (
    <section className="thinking section" id="tu-duy" style={{ '--thinking-image': `url(${assetRegistry.productThinking})` }}>
      <div className="thinking-image" aria-hidden="true" />
      <div className="thinking-shade" aria-hidden="true" />
      <div className="thinking-content">
        <div className="section-kicker">Tư duy sản phẩm</div>
        <div className="statement">
          <p>Tôi không bắt đầu bằng</p>
          <h2>template.</h2>
        </div>
      </div>
      <div className="thinking-flow">
        {steps.map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong>{index < steps.length - 1 && <ArrowRight />}</div>)}
      </div>
      <p className="thinking-note">Công nghệ đến sau cùng. Trước hết là hiểu điều gì khiến một người quan tâm, tin tưởng và hành động.</p>
    </section>
  );
}

function Difference() {
  return (
    <section className="difference section">
      <div className="difference-copy">
        <div className="section-kicker">Khác biệt</div>
        <h2>Chi phí thấp hơn.<br /><em>Không phải tiêu chuẩn thấp hơn.</em></h2>
        <p>AI, tự động hóa và hệ thống sản xuất tinh gọn giúp loại bỏ phần chi phí không tạo ra giá trị — nhưng không cắt giảm tư duy, thiết kế hay chất lượng.</p>
      </div>
      <div className="engine">
        {['AI', 'Tự động hóa', 'Hệ thống', 'Sản xuất trực tiếp'].map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}
        <p><Sparkles size={18} /> Hiệu quả hơn ở cách sản xuất, không rẻ hơn vì chất lượng thấp.</p>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="process section" id="quy-trinh">
      <div className="section-kicker">Quy trình</div>
      <div className="process-head"><h2>Từ một vấn đề<br />đến một <em>sản phẩm.</em></h2><p>Bốn chặng rõ ràng. Một người chịu trách nhiệm xuyên suốt.</p></div>
      <div className="process-line">
        {process.map(([number, title, copy]) => <article key={number}><span>{number}</span><div className="process-dot" /><h3>{title}</h3><p>{copy}</p></article>)}
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section className="pricing section" id="chi-phi" style={{ '--pricing-image': `url(${assetRegistry.pricing})` }}>
      <div className="pricing-image" aria-hidden="true" />
      <div className="pricing-shade" aria-hidden="true" />
      <div className="price-intro">
        <div className="section-kicker">Khả năng tiếp cận</div>
        <h2>Sản phẩm số tốt<br />không nên là <em>đặc quyền.</em></h2>
        <p>999.000 VNĐ là mức khởi điểm cho một website được thiết kế riêng. Chi phí thực tế phụ thuộc vào phạm vi và chức năng của sản phẩm.</p>
      </div>
      <div className="price-focus"><span>Giá khởi điểm</span><strong>999.000<small> VNĐ</small></strong><a className="button button-primary" href="#lien-he">Trao đổi về dự án <ArrowRight size={17} /></a></div>
      <div className="price-list">{pricing.map(([name, price]) => <div key={name}><span>{name}</span><strong>{price}</strong></div>)}</div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer section" id="lien-he">
      <div className="footer-orbit"><span /></div>
      <p className="eyebrow"><span /> Một cuộc trò chuyện là đủ để bắt đầu</p>
      <h2>Chúng ta nên<br /><em>xây gì?</em></h2>
      <p>Hãy kể cho tôi về doanh nghiệp, ý tưởng hoặc vấn đề bạn muốn giải quyết.</p>
      <a className="button button-primary button-large" href="mailto:hello@motstudio.vn">Bắt đầu một dự án <ArrowRight /></a>
      <div className="footer-bottom"><Brand /><span>© 2026 — Được thiết kế và xây dựng bởi một người.</span><a href="#top">Trở về đầu trang ↑</a></div>
    </footer>
  );
}

export function App() {
  // Dedicated product experiences live one level below the product overview.
  // Keep the parent slugs available for the shared product landing page.
  if (/^\/san-pham\/nha-hang\/kham-pha\/?$/.test(window.location.pathname)) {
    return <RestaurantPage />;
  }

  if (/^\/san-pham\/du-lich\/kham-pha\/?$/.test(window.location.pathname)) {
    return <TravelPage />;
  }

  if (/^\/san-pham\/bat-dong-san\/kham-pha\/?$/.test(window.location.pathname)) {
    return <RealEstatePage />;
  }

  if (/^\/san-pham\/spa\/(?:kham-pha|khampha)\/?$/.test(window.location.pathname)) {
    return <SpaExperience />;
  }

  if (/^\/san-pham\/o-to\/kham-pha\/?$/.test(window.location.pathname)) {
    return <AutomotiveExperience />;
  }

  if (/^\/san-pham\/thoi-trang\/kham-pha\/?$/.test(window.location.pathname)) {
    return <FashionExperience />;
  }

  const productMatch = window.location.pathname.match(/^\/san-pham\/([^/]+)\/?$/);
  if (productMatch && productSlugs.includes(productMatch[1])) {
    return <ProductPage slug={productMatch[1]} />;
  }

  return <><Header /><main><Hero /><Showroom /><Thinking /><Difference /><Process /><Pricing /></main><Footer /></>;
}
