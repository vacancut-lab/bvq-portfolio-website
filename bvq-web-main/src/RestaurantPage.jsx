import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, CalendarDays, ChevronDown, Menu, Play, X } from 'lucide-react';
import './restaurant.css';

const base = '/assets/nha-hang/';
const images = {
  hero: `${base}gpt-image-2_Create_a_premium_restaurant_website_hero_image_for_a_sophisticated_Vietnamese_re-0_5c55dae1-e727-406f-b043-b4e429207f9e.jpg`,
  food: `${base}gpt-image-2_Create_a_premium_editorial_food_photograph_of_a_signature_contemporary_Vietnames-0_c9d67214-8caa-4135-8886-24fcfff25130.jpg`,
  chef: `${base}gpt-image-2_Create_a_premium_editorial_photograph_of_a_Vietnamese_chef_preparing_a_signature-0_27826bff-590f-424b-9e63-3d96f87f0ef1.jpg`,
  dining: `${base}gpt-image-2_Create_a_premium_lifestyle_photograph_showing_the_dining_experience_at_a_contemp-0_6c7d3687-ea64-4846-8c94-c326513576ae.jpg`,
  interior: `${base}gpt-image-2_Create_a_cinematic_interior_photograph_of_a_contemporary_Vietnamese_fine-dining_-0_df487896-1d9f-45dd-99bc-77ee7a5bf95e.jpg`,
  stillLife: `${base}gpt-image-2_Create_a_sophisticated_editorial_still-life_photograph_representing_contemporary-0_75af05bc-5ef5-46d9-9d1c-cc0ef31a313e.jpg`,
};
const videos = {
  hero: `${base}hailuo-2_3_Create_a_cinematic_luxury_restaurant_video_for_a_contemporary_Vietnamese_fine-di-0_997fa26a-ba04-4044-8f2d-b2db1b82ded9.mp4`,
  chef: `${base}hailuo-2_3_Create_a_cinematic_commercial_video_showing_a_Vietnamese_chef_preparing_a_signat-0_e3191c70-95d7-48e1-b601-dba950187d78.mp4`,
  dining: `${base}hailuo-2_3_Create_a_cinematic_luxury_hospitality_video_showing_an_authentic_dining_experien-0_67e0d213-7e41-4f1f-ad46-dcae5b97b4fb.mp4`,
  interior: `${base}hailuo-2_3_Create_a_cinematic_architectural_video_of_a_sophisticated_contemporary_Vietnames-0_45b587c9-bfeb-423e-8815-d88080adb58d.mp4`,
};

const discovery = [
  ['Thực đơn', 'Khám phá tinh hoa món ăn', images.food, '#thuc-don'],
  ['Bộ sưu tập rượu', 'Tuyển chọn hoàn hảo', images.stillLife, '#ruou'],
  ['Không gian', 'Ấm cúng và tinh tế', images.interior, '#khong-gian'],
  ['Trải nghiệm đặc biệt', 'Dành riêng cho bạn', images.dining, '#trai-nghiem'],
  ['Ưu đãi', 'Một buổi tối dành riêng', images.chef, '#dat-ban'],
];
const dishes = [
  ['Món khai vị', 'Gỏi cá mùa nước nổi', 'Cá tươi, rau thơm và vị chua thanh của trái giác.', images.food],
  ['Món chính', 'Vịt quay sốt me rừng', 'Lớp da giòn, thịt mềm, cân bằng cùng hương me rừng.', images.chef],
  ['Tráng miệng', 'Dừa non & cacao', 'Một kết thúc nhẹ nhàng với dừa, cacao và muối biển.', images.stillLife],
];
const experiences = [
  ['Bữa tối lãng mạn', 'Không gian riêng tư cho những khoảnh khắc đặc biệt.', images.dining],
  ['Tiệc & sự kiện', 'Một bàn tiệc được thiết kế theo dịp đáng nhớ.', images.interior],
  ['Thực đơn hành trình', 'Khám phá các tầng hương vị qua từng món ăn.', images.food],
  ['Dùng bữa riêng tư', 'Một trải nghiệm dành riêng cho nhịp điệu của bạn.', images.chef],
];

function TextArrow({ children, href = '#dat-ban', onClick }) {
  return <a className="la-text-arrow" href={href} onClick={onClick}>{children}<ArrowRight size={16} /></a>;
}

function RestaurantNavigation({ open, setOpen, onHome }) {
  const links = [['Trang chủ', '#dau-trang'], ['Thực đơn', '#thuc-don'], ['Trải nghiệm', '#trai-nghiem'], ['Không gian', '#khong-gian'], ['Bộ sưu tập', '#ruou'], ['Về chúng tôi', '#cau-chuyen']];
  return <header className="la-nav"><button type="button" className="la-wordmark" onClick={onHome}>L&apos;ARTISAN</button><nav className={open ? 'is-open' : ''} aria-label="Điều hướng nhà hàng">{links.map(([label, href]) => <a href={href} key={href} onClick={() => setOpen(false)}>{label}</a>)}<a className="la-nav-book mobile-book" href="#dat-ban" onClick={() => setOpen(false)}>Đặt bàn</a></nav><div className="la-nav-actions"><button type="button" className="la-language" aria-label="Ngôn ngữ hiện tại: tiếng Việt">VI <span>/ EN</span></button><button type="button" className="la-home-button" onClick={onHome}>Trang chính</button><a className="la-nav-book" href="#dat-ban">Đặt bàn</a><button type="button" className="la-menu" onClick={() => setOpen(!open)} aria-label={open ? 'Đóng menu' : 'Mở menu'} aria-expanded={open}>{open ? <X /> : <Menu />}</button></div></header>;
}

function ReservationBar() {
  const [submitted, setSubmitted] = useState(false);
  return <form className="la-reservation" id="dat-ban" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><div><label htmlFor="la-date">Ngày</label><input id="la-date" type="date" aria-label="Chọn ngày" /></div><div><label htmlFor="la-time">Giờ</label><select id="la-time" defaultValue=""><option value="" disabled>Chọn giờ</option><option>18:00</option><option>19:00</option><option>20:00</option><option>21:00</option></select></div><div><label htmlFor="la-guests">Số khách</label><select id="la-guests" defaultValue="2"><option>2 khách</option><option>3 khách</option><option>4 khách</option><option>5+ khách</option></select></div><div><label htmlFor="la-area">Khu vực</label><select id="la-area" defaultValue="any"><option value="any">Khu vực bất kỳ</option><option>Không gian chung</option><option>Phòng riêng</option><option>Quầy bếp</option></select></div><button type="submit">{submitted ? 'Đã nhận yêu cầu' : 'Đặt bàn'}<ArrowRight size={17} /></button></form>;
}

function VideoFrame({ source, poster, className = '' }) {
  return <video className={className} muted loop playsInline autoPlay preload="none" poster={poster}><source src={source} type="video/mp4" /></video>;
}

export function RestaurantPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [galleryImage, setGalleryImage] = useState(null);
  const [homePopup, setHomePopup] = useState(false);
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); document.title = "L'Artisan — Ẩm thực là nghệ thuật"; }, []);
  return <main className="lartisan-page" id="dau-trang"><RestaurantNavigation open={menuOpen} setOpen={setMenuOpen} onHome={() => setHomePopup(true)} />
    <section className="la-hero"><VideoFrame source={videos.hero} poster={images.hero} className="la-hero-video" /><div className="la-hero-shade" /><div className="la-hero-copy la-reveal"><p className="la-kicker">Tinh tế trong từng trải nghiệm</p><h1>Ẩm thực là<br /><em>nghệ thuật.</em></h1><p>L&apos;Artisan mang đến những món ăn được chế tác từ nguyên liệu tuyển chọn, kết hợp cùng kỹ thuật tinh tế để đánh thức mọi giác quan.</p><div className="la-hero-actions"><a className="la-primary-cta" href="#dat-ban"><CalendarDays size={16} /> Đặt bàn ngay <ArrowRight size={16} /></a><TextArrow href="#thuc-don">Khám phá thực đơn</TextArrow><button type="button" onClick={() => setVideoOpen(true)}><Play size={15} fill="currentColor" /> Xem thước phim</button></div></div><a className="la-hero-scroll" href="#cau-chuyen">Cuộn để khám phá <span /></a><div className="la-hero-dots"><i className="active" /><i /><i /></div></section>
    <ReservationBar />
    <section className="la-discovery la-section"><div className="la-section-lead"><p className="la-kicker">Bắt đầu hành trình</p><h2>Khám phá L&apos;Artisan<br />qua từng <em>lớp trải nghiệm.</em></h2></div><div className="la-discovery-grid">{discovery.map(([title, copy, image, href], index) => <a href={href} className={`la-discovery-card card-${index + 1}`} key={title}><img src={image} alt="" loading="lazy" /><span><small>0{index + 1}</small><strong>{title}</strong><em>{copy}</em><ArrowRight size={17} /></span></a>)}</div></section>
    <section className="la-story la-section" id="cau-chuyen"><div className="la-story-copy"><p className="la-kicker">Câu chuyện của chúng tôi</p><h2>Đam mê tạo nên<br /><em>sự khác biệt.</em></h2><p>L&apos;Artisan được thành lập với niềm đam mê ẩm thực và khát khao mang đến những trải nghiệm đáng nhớ cho thực khách.</p><p>Mỗi món ăn là một tác phẩm, mỗi khoảnh khắc tại L&apos;Artisan là một kỷ niệm.</p><TextArrow href="#dau-bep">Tìm hiểu thêm</TextArrow></div><div className="la-story-media"><VideoFrame source={videos.chef} poster={images.chef} /><span>Được nuôi dưỡng từ ký ức,<br />được kể bằng ngôn ngữ hôm nay.</span></div></section>
    <section className="la-dishes la-section" id="thuc-don"><div className="la-heading-center"><p className="la-kicker">Tinh hoa trong từng món ăn</p><h2>Những hương vị<br /><em>có câu chuyện riêng.</em></h2><p>Nguyên liệu, kỹ thuật và cảm hứng của người đầu bếp hội tụ trong từng phần ăn.</p></div><div className="la-dish-grid">{dishes.map(([category, title, copy, image], index) => <article className="la-dish-card" key={title}><div className="la-dish-image"><img src={image} alt={title} loading="lazy" /><span>0{index + 1}</span></div><p>{category}</p><h3>{title}</h3><div className="la-dish-detail"><span>{copy}</span><TextArrow href="#dat-ban">Khám phá</TextArrow></div></article>)}</div></section>
    <section className="la-chef la-section" id="dau-bep"><div className="la-chef-image"><img src={images.chef} alt="Bếp trưởng Nguyễn Minh An đang chuẩn bị món ăn" loading="lazy" /></div><div className="la-chef-copy"><p className="la-kicker">Người đứng sau mỗi hương vị</p><span>Bếp trưởng</span><h2>Nguyễn<br /><em>Minh An.</em></h2><blockquote>“Ẩm thực không chỉ là món ăn. Đó là ký ức, nguyên liệu và cách chúng ta kết nối với nhau.”</blockquote><TextArrow href="#dat-ban">Gặp gỡ đầu bếp</TextArrow></div></section>
    <section className="la-experiences la-section" id="trai-nghiem"><div className="la-section-lead"><p className="la-kicker">Trải nghiệm</p><h2>Không chỉ là<br /><em>một bữa tối.</em></h2></div><div className="la-experience-grid">{experiences.map(([title, copy, image]) => <article key={title}><img src={image} alt="" loading="lazy" /><div><h3>{title}</h3><p>{copy}</p><TextArrow href="#dat-ban">Khám phá</TextArrow></div></article>)}</div></section>
    <section className="la-film"><VideoFrame source={videos.dining} poster={images.dining} /><div><p className="la-kicker">Một buổi tối đáng nhớ</p><h2>Những khoảnh khắc<br />được <em>giữ lại.</em></h2><TextArrow href="#dat-ban">Khám phá trải nghiệm</TextArrow></div></section>
    <section className="la-gallery la-section" id="khong-gian"><div className="la-section-lead"><p className="la-kicker">Không gian</p><h2>Một không gian<br /><em>để ghi nhớ.</em></h2><p>Từ ánh sáng, gỗ tối đến từng chi tiết gốm thủ công, mọi thứ được đặt để cho một nhịp tối trọn vẹn.</p></div><div className="la-gallery-grid">{[images.interior, images.dining, images.stillLife, images.food].map((image, index) => <button type="button" key={image} onClick={() => setGalleryImage(image)} className={`gallery-${index + 1}`}><img src={image} alt={`Không gian L'Artisan ${index + 1}`} loading="lazy" /></button>)}</div></section>
    <section className="la-wine la-section" id="ruou"><div className="la-wine-art"><img src={images.stillLife} alt="Bộ sưu tập rượu vang tại L'Artisan" loading="lazy" /></div><div><p className="la-kicker">Bộ sưu tập rượu</p><h2>Chai rượu phù hợp<br />cho mỗi <em>câu chuyện.</em></h2><p>Tuyển chọn những chai rượu đồng hành cùng từng tầng hương vị, từ một cuộc trò chuyện dài đến thực đơn hành trình.</p><ul><li>Vang đỏ</li><li>Vang trắng</li><li>Champagne</li><li>Rượu kết hợp món ăn</li></ul><TextArrow href="#dat-ban">Khám phá bộ sưu tập</TextArrow></div></section>
    <section className="la-journal la-section"><div className="la-heading-center"><p className="la-kicker">Câu chuyện từ bếp</p><h2>Những điều nhỏ<br /><em>làm nên dấu ấn.</em></h2></div><div className="la-journal-grid">{['Nguyên liệu Việt Nam trong ẩm thực đương đại', 'Điều gì tạo nên một thực đơn hành trình?', 'Đằng sau một món ăn mang chữ ký riêng'].map((title, index) => <article key={title}><span>Ghi chép / 0{index + 1}</span><h3>{title}</h3><TextArrow href="#dau-trang">Đọc câu chuyện</TextArrow></article>)}</div></section>
    <section className="la-final-cta"><img src={images.interior} alt="Nhà hàng L'Artisan vào buổi tối" loading="lazy" /><div><p className="la-kicker">L&apos;Artisan chờ đón bạn</p><h2>Một bàn ăn.<br />Một câu chuyện.<br /><em>Một kỷ niệm.</em></h2><p>Hãy để chúng tôi chuẩn bị một buổi tối đáng nhớ cho bạn.</p><TextArrow href="#dat-ban">Đặt bàn ngay</TextArrow></div></section>
    <footer className="la-footer"><div><a className="la-wordmark" href="#dau-trang">L&apos;ARTISAN</a><p>Ẩm thực Việt Nam được kể lại bằng ngôn ngữ đương đại.</p></div><div><span>Địa chỉ</span><p>12 Nguyễn Huệ, Quận 1<br />TP. Hồ Chí Minh</p></div><div><span>Giờ mở cửa</span><p>Thứ 2 – Chủ nhật<br />11:30 – 22:30</p></div><div><span>Liên hệ</span><p>+84 28 1234 5678<br />hello@lartisan.vn</p></div><div className="la-footer-bottom"><span>© 2026 L&apos;Artisan. Dữ liệu demo.</span><a href="#dau-trang">Trở về đầu trang ↑</a></div></footer>
    {videoOpen && <div className="la-modal" role="dialog" aria-modal="true" aria-label="Thước phim về L'Artisan" onMouseDown={() => setVideoOpen(false)}><div onMouseDown={(event) => event.stopPropagation()}><button type="button" onClick={() => setVideoOpen(false)} aria-label="Đóng video"><X /></button><video src={videos.hero} controls autoPlay playsInline poster={images.hero} /></div></div>}
    {galleryImage && <div className="la-modal" role="dialog" aria-modal="true" aria-label="Ảnh không gian L'Artisan" onMouseDown={() => setGalleryImage(null)}><div className="la-lightbox" onMouseDown={(event) => event.stopPropagation()}><button type="button" onClick={() => setGalleryImage(null)} aria-label="Đóng ảnh"><X /></button><img src={galleryImage} alt="Không gian L'Artisan" /></div></div>}
    {homePopup && <div className="la-modal" role="dialog" aria-modal="true" aria-label="Trở về trang chính" onMouseDown={() => setHomePopup(false)}><div className="la-home-modal" onMouseDown={(event) => event.stopPropagation()}><button type="button" onClick={() => setHomePopup(false)} aria-label="Đóng popup"><X /></button><p className="la-kicker">Rời khỏi trải nghiệm</p><h2>Trở về trang chính?</h2><p>Bạn sẽ rời demo L&apos;Artisan và quay về portfolio Một Người Một Studio.</p><div><button type="button" className="la-modal-stay" onClick={() => setHomePopup(false)}>Ở lại đây</button><a className="la-primary-cta" href="/">Về trang chính <ArrowRight size={16} /></a></div></div></div>}
  </main>;
}
