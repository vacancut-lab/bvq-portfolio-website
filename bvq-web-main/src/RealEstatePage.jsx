import { useEffect, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import './real-estate.css';

const base = '/assets/bat-dong-san/';
const images = {
  hero: `${base}HERO  CĂN HỘ CAO CẤP NHÌN RA SÔNG.jpg`,
  exterior: `${base}EXTERIOR  TÒA NHÀ.jpg`,
  interior: `${base}INTERIOR  PHÒNG KHÁCH.jpg`,
  lifestyle: `${base}FAMILY LIFESTYLE  KHÔNG GIAN SỐNG.jpg`,
  pool: `${base}TIỆN ÍCH  HỒ BƠI.jpg`,
  city: `${base}VỊ TRÍ  CITY LIFESTYLE.jpg`,
  penthouse: `${base}PENTHOUSE  VIEW.jpg`,
  value: `${base}INVESTMENT  BẤT ĐỘNG SẢN.jpg`,
};

const amenities = [
  ['Hồ bơi tràn bờ', 'Một khoảng lặng mở ra giữa đường chân trời.', images.pool],
  ['Private lounge', 'Dành cho những cuộc gặp gỡ được chọn lọc.', images.interior],
  ['Rooftop garden', 'Không gian xanh dành riêng cho nhịp sống trên cao.', images.penthouse],
];

const residences = [
  ['01', 'Căn hộ hai phòng ngủ', '98 m²', 'Ban công toàn cảnh', images.interior],
  ['02', 'Căn hộ ba phòng ngủ', '142 m²', 'Không gian sinh hoạt mở', images.lifestyle],
  ['03', 'Penthouse', '286 m²', 'Tầm nhìn thành phố & sông', images.penthouse],
];

function HomePopup({ close }) {
  return <div className="ae-modal" role="dialog" aria-modal="true" aria-labelledby="ae-home-title" onMouseDown={close}>
    <div className="ae-home-modal" onMouseDown={(event) => event.stopPropagation()}>
      <button className="ae-modal-close" type="button" onClick={close} aria-label="Đóng popup"><X size={19} /></button>
      <p>Rời khỏi trải nghiệm</p>
      <h2 id="ae-home-title">Trở về trang chính?</h2>
      <span>Bạn sẽ rời khỏi The Aurelia và quay về portfolio Một Người Một Studio.</span>
      <div><button type="button" onClick={close}>Ở lại đây</button><a href="/">Về trang chính <ArrowRight size={16} /></a></div>
    </div>
  </div>;
}

export function RealEstatePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [homePopup, setHomePopup] = useState(false);
  const [consulted, setConsulted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.title = 'THE AURELIA | Luxury Residences';
  }, []);

  useEffect(() => {
    const dismiss = (event) => { if (event.key === 'Escape') { setHomePopup(false); setMenuOpen(false); } };
    window.addEventListener('keydown', dismiss);
    return () => window.removeEventListener('keydown', dismiss);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  return <main className="aurelia-page" id="dau-trang">
    <header className="ae-nav">
      <button className="ae-wordmark" type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>THE AURELIA<small>Luxury residences</small></button>
      <nav className={menuOpen ? 'is-open' : ''} aria-label="Điều hướng The Aurelia">
        {[['Kiến trúc', '#kien-truc'], ['Không gian', '#can-ho'], ['Tiện ích', '#tien-ich'], ['Vị trí', '#vi-tri'], ['Giá trị', '#gia-tri']].map(([label, href]) => <a href={href} key={href} onClick={closeMenu}>{label}</a>)}
        <a className="ae-mobile-consult" href="#tu-van" onClick={closeMenu}>Nhận tư vấn</a>
      </nav>
      <div className="ae-nav-actions"><button type="button" className="ae-home" onClick={() => setHomePopup(true)}>Trang chính</button><a className="ae-consult" href="#tu-van">Nhận tư vấn</a><button className="ae-menu" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button></div>
    </header>

    <section className="ae-hero">
      <img src={images.hero} alt="Căn hộ The Aurelia nhìn ra sông và thành phố" />
      <div className="ae-hero-shade" />
      <div className="ae-hero-copy"><p>THE AURELIA</p><h1>Nơi kiến trúc<br />trở thành <em>lối sống.</em></h1><span>Một không gian sống được kiến tạo cho những người trân trọng sự riêng tư, chất lượng và giá trị lâu dài.</span><div><a className="ae-primary" href="#kien-truc">Khám phá dự án <ArrowRight size={16} /></a><a className="ae-text-link" href="#can-ho">Xem không gian sống</a></div></div>
      <div className="ae-hero-stats"><div><small>Vị trí</small><strong>Trung tâm thành phố</strong></div><div><small>Chiều cao</small><strong>40 tầng</strong></div><div><small>Loại hình</small><strong>Residences</strong></div><div><small>Số lượng</small><strong>168 căn</strong></div></div>
    </section>

    <section className="ae-architecture ae-section" id="kien-truc"><div className="ae-section-copy"><p className="ae-kicker">Triết lý kiến trúc</p><h2>Kiến trúc<br />của sự <em>tĩnh lặng.</em></h2><p>Không gian được tạo nên không chỉ để nhìn, mà để sống. Ánh sáng, vật liệu và thiên nhiên cùng tạo nên một trải nghiệm cân bằng qua từng khoảnh khắc.</p><a className="ae-text-link dark" href="#can-ho">Khám phá kiến trúc <ArrowRight size={16} /></a></div><div className="ae-architecture-image"><img src={images.exterior} alt="Kiến trúc tòa nhà The Aurelia" loading="lazy" /><span>01 / Một đường nét vững chãi giữa nhịp sống thành phố.</span></div></section>

    <section className="ae-residence ae-section" id="can-ho"><div className="ae-residence-image"><img src={images.interior} alt="Không gian phòng khách The Aurelia" loading="lazy" /></div><div className="ae-residence-copy"><p className="ae-kicker">The residence</p><h2>Không gian<br />thuộc về <em>bạn.</em></h2><span className="ae-residence-type">Căn hộ hai phòng ngủ</span><div className="ae-details"><span>98 m²</span><span>2 phòng ngủ</span><span>2 phòng tắm</span><span>Ban công toàn cảnh</span></div><p>Một bố cục nhẹ nhàng và rộng mở, nơi sự riêng tư gặp gỡ tầm nhìn thoáng đãng của thành phố.</p><a className="ae-text-link" href="#residences">Khám phá căn hộ <ArrowRight size={16} /></a></div></section>

    <section className="ae-lifestyle"><img src={images.lifestyle} alt="Gia đình tận hưởng không gian sống tại The Aurelia" loading="lazy" /><div><p className="ae-kicker">Một ngày tại The Aurelia</p><h2>Một nhịp sống<br /><em>được chọn lựa.</em></h2><ol><li><b>07:00</b><span>Bình minh trên cao</span></li><li><b>08:30</b><span>Cà phê tại lounge</span></li><li><b>18:30</b><span>Hoàng hôn trên ban công</span></li><li><b>21:00</b><span>Thành phố lên đèn</span></li></ol></div></section>

    <section className="ae-amenities ae-section" id="tien-ich"><div className="ae-heading-row"><div><p className="ae-kicker">Tiện ích</p><h2>Một chuẩn sống<br /><em>khác biệt.</em></h2></div><p>Mọi tiện ích được đặt để vừa đủ, tạo điều kiện cho những khoảng thời gian thực sự thuộc về riêng bạn.</p></div><div className="ae-amenity-grid">{amenities.map(([title, copy, image], index) => <article key={title}><img src={image} alt="" loading="lazy" /><div><small>0{index + 1}</small><h3>{title}</h3><p>{copy}</p></div></article>)}</div></section>

    <section className="ae-city" id="vi-tri"><img src={images.city} alt="Nhịp sống thành phố quanh The Aurelia" loading="lazy" /><div><p className="ae-kicker">Vị trí</p><h2>Sống giữa nhịp độ<br />của <em>thành phố.</em></h2><p>Một vị trí không chỉ được đo bằng khoảng cách, mà bằng những gì nó mở ra trong mỗi ngày.</p><a className="ae-text-link" href="#gia-tri">Khám phá vị trí <ArrowRight size={16} /></a></div></section>

    <section className="ae-value ae-section" id="gia-tri"><div><p className="ae-kicker">Giá trị</p><h2>Được kiến tạo<br />theo <em>thời gian.</em></h2><p>Giá trị bền vững đến từ sự giao thoa của vị trí, chất lượng kiến trúc, cộng đồng và tiêu chuẩn sống được duy trì lâu dài.</p><dl><div><dt>Vị trí</dt><dd>Gắn với nhịp phát triển của thành phố.</dd></div><div><dt>Kiến trúc</dt><dd>Được xây dựng cho sự bền vững và riêng tư.</dd></div><div><dt>Tiêu chuẩn sống</dt><dd>Cân bằng giữa tiện nghi và khoảng lặng.</dd></div><div><dt>Giá trị dài hạn</dt><dd>Một tài sản có chiều sâu theo thời gian.</dd></div></dl></div><img src={images.value} alt="Chi tiết kiến trúc và giá trị của The Aurelia" loading="lazy" /></section>

    <section className="ae-residences ae-section" id="residences"><div className="ae-heading-center"><p className="ae-kicker">Khám phá các căn hộ</p><h2>Một không gian<br /><em>mang dấu ấn riêng.</em></h2></div><div className="ae-residence-grid">{residences.map(([number, title, area, view, image]) => <article key={number}><img src={image} alt={title} loading="lazy" /><div><small>{number}</small><h3>{title}</h3><p>{area} <i /> {view}</p><a href="#tu-van">Xem chi tiết <ArrowRight size={15} /></a></div></article>)}</div></section>

    <section className="ae-consultation" id="tu-van"><img src={images.penthouse} alt="Tầm nhìn penthouse The Aurelia khi thành phố lên đèn" loading="lazy" /><div><p className="ae-kicker">Tư vấn riêng</p><h2>Tìm một không gian<br /><em>thuộc về bạn.</em></h2><p>Để lại thông tin và đội ngũ tư vấn sẽ giúp bạn khám phá những lựa chọn phù hợp.</p><form onSubmit={(event) => { event.preventDefault(); setConsulted(true); }}><input required aria-label="Họ tên" placeholder="Họ tên" /><input required type="tel" aria-label="Số điện thoại" placeholder="Số điện thoại" /><button type="submit">{consulted ? 'Đã nhận thông tin' : 'Nhận tư vấn riêng'} <ArrowRight size={16} /></button></form></div></section>

    <footer className="ae-footer"><div><strong>THE AURELIA</strong><span>Luxury residences</span></div><p>Thông tin dự án là dữ liệu demo.</p><button type="button" onClick={() => setHomePopup(true)}>Về trang chính <ArrowRight size={15} /></button></footer>
    {homePopup && <HomePopup close={() => setHomePopup(false)} />}
  </main>;
}
