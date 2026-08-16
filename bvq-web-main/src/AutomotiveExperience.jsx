import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, ChevronDown, Menu, Play, X } from 'lucide-react';
import './automotive-experience.css';

const assetRoot = '/assets/o-to';
const automotiveAssets = {
  hero: `${assetRoot}/HERO.jpg`,
  heroFilm: `${assetRoot}/HERO  THE DRIVE.mp4`,
  front: `${assetRoot}/FRONT 34.jpg`,
  side: `${assetRoot}/SIDE PROFILE.jpg`,
  rear: `${assetRoot}/REAR.jpg`,
  detail: `${assetRoot}/HERO DETAIL.jpg`,
  wheel: `${assetRoot}/WHEEL  PERFORMANCE DETAIL.jpg`,
  performance: `${assetRoot}/PERFORMANCE  ĐƯỜNG CAO TỐC.jpg`,
  interior: `${assetRoot}/MASTER CAR.jpg`,
  dashboard: `${assetRoot}/DASHBOARD  TECHNOLOGY.jpg`,
  technology: `${assetRoot}/TECHNOLOGY.jpg`,
  coastal: `${assetRoot}/COASTAL ROAD  ESCAPE.jpg`,
  city: `${assetRoot}/CITY LIFESTYLE.jpg`,
  showroom: `${assetRoot}/SHOWROOM.jpg`,
  service: `${assetRoot}/SERVICE  AFTER-SALES.jpg`,
};

const models = [
  { id: 'm8', name: 'M8', category: 'Luxury Coupe', price: 'Từ 8,90 tỷ', power: '625 HP', sprint: '4,2 s', type: 'coupe', drive: 'hybrid', image: automotiveAssets.front },
  { id: 'x7', name: 'X7', category: 'Luxury SUV', price: 'Từ 7,40 tỷ', power: '540 HP', sprint: '4,8 s', type: 'suv', drive: 'petrol', image: automotiveAssets.side },
  { id: 'e5', name: 'E5', category: 'Electric Grand Tourer', price: 'Từ 6,80 tỷ', power: '510 HP', sprint: '4,6 s', type: 'electric', drive: 'electric', image: automotiveAssets.coastal },
  { id: 's6', name: 'S6', category: 'Performance Sedan', price: 'Từ 5,90 tỷ', power: '585 HP', sprint: '4,4 s', type: 'sedan', drive: 'hybrid', image: automotiveAssets.city },
];

const specs = [
  ['Hiệu năng', [['Công suất cực đại', '625 HP'], ['Mô-men xoắn', '780 Nm'], ['0 - 100 km/h', '4,2 giây'], ['Tốc độ tối đa', '305 km/h']]],
  ['Kích thước', [['Dài x Rộng x Cao', '4.860 x 1.920 x 1.360 mm'], ['Chiều dài cơ sở', '2.860 mm'], ['Dung tích khoang hành lý', '420 lít']]],
  ['Hệ truyền động', [['Động cơ', 'V8 Twin-Turbo Hybrid'], ['Hộp số', '8 cấp thể thao'], ['Phạm vi vận hành', '650 km']]],
];

function AutomotiveHeader({ open, setOpen }) {
  const links = [['Dòng xe', '#dong-xe'], ['Thiết kế', '#thiet-ke'], ['Hiệu năng', '#hieu-nang'], ['Công nghệ', '#cong-nghe'], ['Trải nghiệm', '#trai-nghiem']];
  return <header className="auto-header">
    <a className="auto-mark" href="#auto-top">AURELIA<span>MOTORS</span></a>
    <nav className={open ? 'is-open' : ''} aria-label="Điều hướng AURELIA">{links.map(([label, href]) => <a href={href} key={href} onClick={() => setOpen(false)}>{label}</a>)}<a className="auto-nav-cta" href="#lai-thu" onClick={() => setOpen(false)}>Đăng ký lái thử</a></nav>
    <button className="auto-menu" type="button" onClick={() => setOpen(!open)} aria-label={open ? 'Đóng menu' : 'Mở menu'}>{open ? <X /> : <Menu />}</button>
  </header>;
}

function Number({ value, label }) { return <div><strong>{value}</strong><span>{label}</span></div>; }

export function AutomotiveExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filmOpen, setFilmOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [config, setConfig] = useState({ color: 'Graphite', wheel: '21 inch', interior: 'Tan' });
  const [comparison, setComparison] = useState(['m8', 's6']);
  const [submitted, setSubmitted] = useState(false);
  const [openSpec, setOpenSpec] = useState(0);

  useEffect(() => { window.scrollTo(0, 0); document.title = 'AURELIA M8 - Quiet performance'; }, []);
  const visibleModels = useMemo(() => models.filter((model) => filter === 'all' || model.type === filter || model.drive === filter), [filter]);
  const compared = comparison.map((id) => models.find((model) => model.id === id));
  const updateConfig = (key, value) => setConfig((current) => ({ ...current, [key]: value }));

  return <main className="auto-site" id="auto-top">
    <AutomotiveHeader open={menuOpen} setOpen={setMenuOpen} />
    <a className="auto-home" href="/" aria-label="Trở về trang chính"><ArrowLeft /><span>Portfolio</span></a>

    <section className="auto-hero">
      <video autoPlay muted loop playsInline poster={automotiveAssets.hero} aria-hidden="true"><source src={automotiveAssets.heroFilm} type="video/mp4" /></video><div className="auto-hero-shade" />
      <div className="auto-hero-copy"><p className="auto-kicker">AURELIA M8 / GRAND TOURING COUPE</p><h1>Thiết kế cho<br /><em>những hành trình</em><br />khác biệt.</h1><p>Một grand touring coupe được tạo nên cho những người không xem hành trình chỉ là điểm đến.</p><div className="auto-actions"><a href="#thiet-ke" className="auto-button auto-button-solid">Khám phá M8 <ArrowRight /></a><button className="auto-film-trigger" type="button" onClick={() => setFilmOpen(true)}><Play /> Xem phim</button></div></div>
      <div className="auto-spec-strip"><Number value="625 HP" label="Công suất" /><Number value="4,2 S" label="0 - 100 km/h" /><Number value="305 KM/H" label="Tốc độ tối đa" /><Number value="650 KM" label="Phạm vi vận hành" /></div>
    </section>

    <section className="auto-design" id="thiet-ke"><div className="auto-section-intro"><p className="auto-kicker">01 / DESIGN</p><h2>Thiết kế<br />của <em>chuyển động.</em></h2><p>Mỗi đường nét được tạo ra để chuyển hóa khí động học thành cảm xúc.</p></div><div className="auto-design-gallery"><figure className="design-front"><img src={automotiveAssets.front} alt="AURELIA M8 nhìn từ phía trước" /><figcaption>01 / Presence</figcaption></figure><figure className="design-side"><img src={automotiveAssets.side} alt="AURELIA M8 nhìn ngang" /><figcaption>02 / Proportion</figcaption></figure><figure className="design-rear"><img src={automotiveAssets.rear} alt="AURELIA M8 nhìn từ phía sau" /><figcaption>03 / Signature</figcaption></figure></div></section>

    <section className="auto-details"><div className="auto-detail-image"><img src={automotiveAssets.detail} alt="Chi tiết thân xe AURELIA M8" /></div><div className="auto-detail-copy"><p className="auto-kicker">CRAFTED SURFACES</p><h2>Nhìn gần hơn.<br /><em>Cảm nhận sâu hơn.</em></h2><div className="auto-detail-list"><span>LED thích ứng</span><span>Khí động học chủ động</span><span>Mâm forged 21 inch</span><span>Bề mặt điêu khắc</span></div></div></section>

    <section className="auto-performance" id="hieu-nang"><img src={automotiveAssets.performance} alt="AURELIA M8 trên đường cao tốc" /><div className="auto-performance-shade" /><div className="auto-performance-copy"><p className="auto-kicker">PERFORMANCE / V8 HYBRID</p><h2>Hiệu năng<br />không cần <em>khoe mình.</em></h2><div className="auto-performance-numbers"><Number value="625" label="HP" /><Number value="4,2" label="GIÂY / 0 - 100" /><Number value="305" label="KM/H" /></div></div></section>

    <section className="auto-interior" id="trai-nghiem"><div className="auto-interior-copy"><p className="auto-kicker">THE INTERIOR</p><h2>Không gian<br />thuộc về <em>người lái.</em></h2><p>Mọi điểm chạm được đặt đúng nơi trực giác tìm đến. Công nghệ hiện diện vừa đủ để mỗi khoảnh khắc sau vô lăng vẫn là của riêng bạn.</p><a className="auto-text-link" href="#cong-nghe">Khám phá cockpit <ArrowRight /></a></div><div className="auto-interior-media"><img src={automotiveAssets.interior} alt="Không gian nội thất AURELIA M8" /><span>COCKPIT / 01</span></div></section>

    <section className="auto-tech" id="cong-nghe"><div className="auto-tech-media"><img src={automotiveAssets.dashboard} alt="Bảng điều khiển kỹ thuật số" /></div><div className="auto-tech-copy"><p className="auto-kicker">INTELLIGENT EXPERIENCE</p><h2>Công nghệ<br />phục vụ <em>trải nghiệm.</em></h2><div className="auto-tech-list">{[['01', 'Digital cockpit', 'Thông tin cần thiết, hiển thị đúng thời điểm.'], ['02', 'Intelligent drive', 'Hỗ trợ tinh tế trên từng hành trình dài.'], ['03', 'Connected experience', 'Chiếc xe luôn thấu hiểu nhịp sống của bạn.'], ['04', 'Adaptive performance', 'Điều chỉnh phản hồi theo cách bạn muốn lái.']].map(([number, title, copy]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div></section>

    <section className="auto-models" id="dong-xe"><div className="auto-models-head"><div><p className="auto-kicker">AURELIA COLLECTION</p><h2>Khám phá<br /><em>dòng xe.</em></h2></div><div className="auto-filter" aria-label="Lọc dòng xe">{[['all', 'Tất cả'], ['coupe', 'Coupe'], ['suv', 'SUV'], ['sedan', 'Sedan'], ['electric', 'Điện']].map(([key, label]) => <button className={filter === key ? 'active' : ''} type="button" onClick={() => setFilter(key)} key={key}>{label}</button>)}</div></div><div className="auto-model-grid">{visibleModels.map((model) => <article className="auto-model" key={model.id}><img src={model.image} alt={`AURELIA ${model.name}`} loading="lazy" /><div className="auto-model-shade" /><div className="auto-model-copy"><span>{model.category}</span><h3>{model.name}</h3><p>{model.price}</p><div><b>{model.power}</b><b>{model.sprint}</b><button type="button" onClick={() => setComparison(['m8', model.id === 'm8' ? 's6' : model.id])} aria-label={`So sánh M8 với ${model.name}`}><ArrowRight /></button></div></div></article>)}</div></section>

    <section className="auto-config"><div className="auto-config-visual"><img src={automotiveAssets.side} alt="AURELIA M8 cấu hình Graphite" /><div className={`auto-paint paint-${config.color.toLowerCase()}`} /></div><div className="auto-config-control"><p className="auto-kicker">M8 / CONFIGURATOR</p><h2>Tạo nên<br /><em>phiên bản của bạn.</em></h2>{[['color', 'Màu ngoại thất', ['Graphite', 'White', 'Silver', 'Red']], ['wheel', 'Mâm xe', ['19 inch', '20 inch', '21 inch']], ['interior', 'Nội thất', ['Black', 'Tan', 'Ivory']]].map(([key, label, values]) => <fieldset key={key}><legend>{label}</legend><div>{values.map((value) => <button type="button" className={config[key] === value ? 'active' : ''} onClick={() => updateConfig(key, value)} key={value}>{value}</button>)}</div></fieldset>)}<div className="auto-config-summary"><span>M8 / {config.color} / {config.wheel} / {config.interior}</span><strong>8,90 tỷ VNĐ</strong></div><a className="auto-button auto-button-outline" href="#lai-thu">Lưu cấu hình <ArrowRight /></a></div></section>

    <section className="auto-compare"><div><p className="auto-kicker">COMPARE MODELS</p><h2>Chọn theo<br /><em>cách bạn lái.</em></h2><p>Đặt hai cá tính cạnh nhau để nhận ra chiếc xe dành cho hành trình của bạn.</p></div><div className="auto-compare-table"><div className="auto-compare-selects">{[0, 1].map((index) => <label key={index}>Mẫu xe<select value={comparison[index]} onChange={(event) => setComparison((current) => current.map((value, i) => i === index ? event.target.value : value))}>{models.map((model) => <option value={model.id} key={model.id}>{model.name}</option>)}</select></label>)}</div>{[['Giá khởi điểm', 'price'], ['Công suất', 'power'], ['0 - 100 km/h', 'sprint'], ['Kiểu thân xe', 'category']].map(([label, key]) => <div className="auto-compare-row" key={key}><span>{label}</span><b>{compared[0][key]}</b><b>{compared[1][key]}</b></div>)}</div></section>

    <section className="auto-specs"><div><p className="auto-kicker">M8 / TECHNICAL DATA</p><h2>Mọi chi tiết<br />đều có <em>lý do.</em></h2></div><div className="auto-spec-list">{specs.map(([title, values], index) => <article className={openSpec === index ? 'open' : ''} key={title}><button type="button" onClick={() => setOpenSpec(openSpec === index ? -1 : index)} aria-expanded={openSpec === index}><span>0{index + 1}</span><strong>{title}</strong><ChevronDown /></button><div>{values.map(([label, value]) => <p key={label}><span>{label}</span><b>{value}</b></p>)}</div></article>)}</div></section>

    <section className="auto-test-drive" id="lai-thu"><img src={automotiveAssets.showroom} alt="Không gian trải nghiệm AURELIA" /><div className="auto-test-shade" />{submitted ? <div className="auto-confirm"><Check /><p className="auto-kicker">YÊU CẦU ĐÃ ĐƯỢC GHI NHẬN</p><h2>Hẹn gặp bạn<br />trên <em>cung đường.</em></h2><button className="auto-button auto-button-solid" type="button" onClick={() => setSubmitted(false)}>Gửi yêu cầu khác</button></div> : <div className="auto-test-content"><div><p className="auto-kicker">EXPERIENCE AURELIA</p><h2>Cảm nhận<br />trên cung đường <em>của bạn.</em></h2></div><form onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><label>Họ và tên<input name="name" required autoComplete="name" /></label><label>Số điện thoại<input name="phone" required type="tel" autoComplete="tel" /></label><label>Email<input name="email" required type="email" autoComplete="email" /></label><label>Mẫu xe<select name="model"><option>AURELIA M8</option><option>AURELIA X7</option><option>AURELIA E5</option></select></label><button className="auto-button auto-button-solid" type="submit">Đăng ký lái thử <ArrowRight /></button></form></div>}</section>
    <footer className="auto-footer"><a className="auto-mark" href="#auto-top">AURELIA<span>MOTORS</span></a><p>Quiet performance. Thiết kế cho những hành trình khác biệt.</p><a href="/san-pham/o-to">Ô tô <ArrowRight /></a></footer>
    {filmOpen && <div className="auto-film" role="dialog" aria-modal="true" aria-label="Phim AURELIA M8"><button type="button" onClick={() => setFilmOpen(false)} aria-label="Đóng phim"><X /></button><video autoPlay controls playsInline poster={automotiveAssets.hero}><source src={automotiveAssets.heroFilm} type="video/mp4" /></video></div>}
  </main>;
}
