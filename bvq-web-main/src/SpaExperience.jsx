import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, CalendarDays, Check, Clock3, Flower2, Menu, Phone, Play, Send, X } from 'lucide-react';
import './spa-experience.css';

const A = '/assets/an-nhien';

const treatments = [
  { number: '01', name: 'Thư giãn sâu', time: '90 phút', image: `${A}/spa-06.jpg`, copy: 'Massage trị liệu nhẹ nhàng, giúp cơ thể thả lỏng và phục hồi.' },
  { number: '02', name: 'Hơi thở thiên nhiên', time: '75 phút', image: `${A}/spa-04.jpg`, copy: 'Liệu trình kết hợp hương thơm, nhiệt ấm và những chuyển động chậm.' },
  { number: '03', name: 'Nghi thức An Nhiên', time: '120 phút', image: `${A}/spa-02.jpg`, copy: 'Một hành trình chăm sóc toàn diện cho cơ thể và tâm trí.' },
];

const packages = [
  { name: 'An tĩnh', time: '60 phút', price: '690.000đ', detail: 'Massage thư giãn toàn thân, hương thơm trị liệu.' },
  { name: 'Thở sâu', time: '90 phút', price: '990.000đ', detail: 'Massage trị liệu kết hợp đá ấm và nghi thức thở.' },
  { name: 'Trở về', time: '120 phút', price: '1.390.000đ', detail: 'Nghi thức chăm sóc toàn diện cho cơ thể và tâm trí.' },
];

function SpaHeader({ open, setOpen }) {
  return (
    <header className="spa-header">
      <a className="spa-wordmark" href="#spa-top" aria-label="An Nhiên - về đầu trang">AN NHIÊN<span>Wellness sanctuary</span></a>
      <nav className={open ? 'is-open' : ''} aria-label="Điều hướng An Nhiên">
        <a href="#spa-top" onClick={() => setOpen(false)}>Trang chủ</a>
        <a href="#lieu-trinh" onClick={() => setOpen(false)}>Liệu trình</a>
        <a href="#khong-gian" onClick={() => setOpen(false)}>Không gian</a>
        <a href="#bang-gia" onClick={() => setOpen(false)}>Bảng giá</a>
        <a href="#cau-chuyen" onClick={() => setOpen(false)}>Về An Nhiên</a>
        <a className="spa-nav-book" href="#dat-lich" onClick={() => setOpen(false)}>Đặt lịch</a>
      </nav>
      <button className="spa-menu" type="button" onClick={() => setOpen(!open)} aria-label={open ? 'Đóng menu' : 'Mở menu'}>{open ? <X /> : <Menu />}</button>
    </header>
  );
}

export function SpaExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const dialogRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'An Nhiên Spa — Chạm vào sự tĩnh lặng';
  }, []);

  useEffect(() => {
    if (videoOpen) dialogRef.current?.focus();
  }, [videoOpen]);

  return (
    <main className="spa-site" id="spa-top">
      <SpaHeader open={menuOpen} setOpen={setMenuOpen} />

      <section className="spa-hero">
        <video autoPlay muted loop playsInline poster={`${A}/hero-poster.jpg`} aria-hidden="true">
          <source src={`${A}/spa-ambient.mp4`} type="video/mp4" />
        </video>
        <div className="spa-hero-shade" />
        <div className="spa-hero-copy">
          <p className="spa-overline">Chốn riêng dành cho bạn</p>
          <h1>AN NHIÊN<small>Chạm vào sự tĩnh lặng.</small></h1>
          <p>Một khoảng dừng dành cho cơ thể, tâm trí và chính bạn.</p>
          <div className="spa-actions">
            <a className="spa-button spa-button-light" href="#lieu-trinh">Khám phá liệu trình <ArrowRight /></a>
            <a className="spa-button spa-button-line" href="#dat-lich">Đặt lịch</a>
          </div>
        </div>
        <button className="spa-open-film" type="button" onClick={() => setVideoOpen(true)}><span><Play /></span>Mở không gian</button>
        <a className="spa-scroll" href="#lieu-trinh" aria-label="Đi tới liệu trình"><ArrowDown /></a>
      </section>
      <a className="spa-home-float" href="/" aria-label="Trở về trang chính"><ArrowLeft /><span>Trang chính</span></a>

      <section className="spa-treatments" id="lieu-trinh">
        <div className="spa-section-heading"><h2>Liệu trình</h2><p>“Những khoảng thời gian được thiết kế để bạn trở về với chính mình.”</p></div>
        <div className="treatment-grid">
          {treatments.map((item) => (
            <article className="treatment" key={item.number}>
              <div className="treatment-image"><img src={item.image} alt={`Không gian liệu trình ${item.name}`} loading="lazy" /></div>
              <div className="treatment-copy"><span>{item.number}</span><h3>{item.name}</h3><p className="treatment-time"><Clock3 /> {item.time}</p><p>{item.copy}</p><a href="#dat-lich">Khám phá <ArrowRight /></a></div>
            </article>
          ))}
        </div>
      </section>

      <section className="spa-space" id="khong-gian">
        <img src={`${A}/philosophy.jpg`} alt="Không gian thư giãn An Nhiên" loading="lazy" />
        <div className="spa-space-shade" />
        <div className="spa-space-title"><span>Không gian</span><h2>Một nơi để<br />thở chậm lại.</h2></div>
        <p>Không gian được tạo nên từ ánh sáng, vật liệu tự nhiên và những khoảng lặng.</p>
        <div className="spa-materials"><span>Đá tự nhiên</span><span>Gỗ ấm</span><span>Hương thơm</span><span>Ánh sáng tự nhiên</span></div>
      </section>

      <section className="spa-story" id="cau-chuyen">
        <div><Flower2 /><h2>Đôi khi, điều bạn cần<br />là một khoảng dừng.</h2></div>
        <p>An Nhiên tin rằng chăm sóc bản thân không phải một điều xa xỉ, mà là cách chúng ta trở về với nhịp sống cân bằng hơn.</p>
      </section>

      <section className="spa-pricing" id="bang-gia">
        <div className="spa-pricing-intro"><p className="spa-overline">Chọn nhịp nghỉ ngơi của bạn</p><h2>Liệu trình &<br />bảng giá</h2><p>Mỗi liệu trình có thể được điều chỉnh theo thể trạng và mong muốn riêng. Giá đã bao gồm trà thảo mộc sau trị liệu.</p></div>
        <div className="spa-package-list">{packages.map((item, index) => <article key={item.name}><span>0{index + 1}</span><div><h3>{item.name}</h3><p>{item.detail}</p></div><p className="spa-package-time"><Clock3 /> {item.time}</p><strong>{item.price}</strong><a href="#tu-van" aria-label={`Tư vấn liệu trình ${item.name}`}><ArrowRight /></a></article>)}</div>
      </section>

      <section className="spa-consultation" id="tu-van">
        <div className="spa-consult-copy"><p className="spa-overline">Tư vấn riêng</p><h2>Hãy để An Nhiên<br />lắng nghe bạn.</h2><p>Để lại vài thông tin, đội ngũ của chúng tôi sẽ liên hệ để gợi ý liệu trình và khung giờ phù hợp nhất.</p><a href="tel:0900000000"><Phone /> 0900 000 000</a></div>
        <form className="spa-consult-form" onSubmit={(event) => event.preventDefault()}><label>Họ và tên<input name="name" autoComplete="name" required /></label><label>Số điện thoại<input name="phone" type="tel" autoComplete="tel" required /></label><label>Liệu trình quan tâm<select name="treatment"><option>An tĩnh - 60 phút</option><option>Thở sâu - 90 phút</option><option>Trở về - 120 phút</option><option>Tôi cần tư vấn thêm</option></select></label><label>Lời nhắn<textarea name="note" rows="3" placeholder="Khung giờ bạn mong muốn hoặc điều cần chia sẻ" /></label><button className="spa-button spa-button-dark" type="submit">Gửi yêu cầu <Send /></button><small><Check /> Thông tin của bạn chỉ được dùng để tư vấn lịch hẹn.</small></form>
      </section>

      <section className="spa-booking" id="dat-lich">
        <img src={`${A}/booking.jpg`} alt="Nghi thức chăm sóc tại An Nhiên" loading="lazy" />
        <div className="spa-booking-shade" />
        <div><span>Dành một khoảng thời gian cho chính mình</span><h2>Bạn đã sẵn sàng<br />cho một khoảng dừng?</h2></div>
        <a className="spa-button spa-button-light" href="mailto:hello@motstudio.vn?subject=Đặt lịch trải nghiệm An Nhiên Spa"><CalendarDays /> Đặt lịch trải nghiệm</a>
      </section>

      <footer className="spa-footer"><a className="spa-wordmark" href="#spa-top">AN NHIÊN<span>Wellness sanctuary</span></a><p>© 2026 An Nhiên. Một khoảng dừng dành cho bạn.</p><a href="/san-pham/spa">SPA & Wellness <ArrowRight /></a></footer>

      {videoOpen && (
        <div className="spa-film" role="dialog" aria-modal="true" aria-label="Phim không gian An Nhiên" tabIndex="-1" ref={dialogRef} onKeyDown={(event) => event.key === 'Escape' && setVideoOpen(false)}>
          <button type="button" onClick={() => setVideoOpen(false)} aria-label="Đóng phim"><X /></button>
          <video controls autoPlay playsInline poster={`${A}/hero-poster.jpg`}><source src={`${A}/spa-ritual.mp4`} type="video/mp4" /></video>
        </div>
      )}
    </main>
  );
}
