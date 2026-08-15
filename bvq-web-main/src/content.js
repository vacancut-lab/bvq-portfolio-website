export const assetRegistry = {
  studioHero: '/assets/studio-hero.png',
  spa: '/assets/spa.png',
  travel: '/assets/du-lich.png',
  restaurant: '/assets/nha-hang.png',
  automotive: '/assets/o-to.png',
  realEstate: '/assets/bat-dong-san.png',
  fashion: '/assets/thoi-trang.png',
  productThinking: '/assets/tu-duy-san-pham.png',
  pricing: '/assets/bang-gia.jpg',
};

export const worlds = [
  { id: 'spa', number: '01', title: 'Spa', verb: 'Lơ lửng', description: 'Một nhịp thở chậm, riêng tư và dịu dàng dẫn đến quyết định đặt lịch.', image: assetRegistry.spa, cta: 'Bước vào tĩnh lặng' },
  { id: 'du-lich', number: '02', title: 'Du lịch', verb: 'Khám phá', description: 'Cảnh quan mở dần theo hành trình, khơi gợi mong muốn được lên đường.', image: assetRegistry.travel, cta: 'Mở một chân trời' },
  { id: 'nha-hang', number: '03', title: 'Nhà hàng', verb: 'Bước vào', description: 'Ánh sáng, chất liệu và không khí biến một bữa ăn thành một điểm đến.', image: assetRegistry.restaurant, cta: 'Bước qua cánh cửa' },
  { id: 'o-to', number: '04', title: 'Ô tô', verb: 'Tăng tốc', description: 'Sức nặng, độ chính xác và khát khao cầm lái được nén trong từng khung hình.', image: assetRegistry.automotive, cta: 'Khởi động trải nghiệm' },
  { id: 'bat-dong-san', number: '05', title: 'Bất động sản', verb: 'Mở ra', description: 'Không gian được kể bằng ánh sáng, tỷ lệ và cảm giác mình có thể sống ở đây.', image: assetRegistry.realEstate, cta: 'Khám phá không gian' },
  { id: 'thoi-trang', number: '06', title: 'Thời trang', verb: 'Dòng chảy', description: 'Một thế giới biên tập nơi cá tính chuyển động qua hình ảnh, vải và nhịp điệu.', image: assetRegistry.fashion, cta: 'Xem bộ sưu tập' },
];

export const process = [
  ['01', 'Tìm hiểu', 'Hiểu doanh nghiệp, khách hàng và vấn đề thực sự cần giải quyết.'],
  ['02', 'Định hình', 'Biến chiến lược thành hành trình, thông tin và ngôn ngữ trải nghiệm.'],
  ['03', 'Xây dựng', 'Thiết kế và phát triển một sản phẩm nhanh, chính xác, có hệ thống.'],
  ['04', 'Ra mắt', 'Đưa sản phẩm vào vận hành, đo lường và tiếp tục hoàn thiện.'],
];

export const pricing = [
  ['Khởi đầu', '999K+'],
  ['Doanh nghiệp', '1.999M+'],
  ['Signature', '3.999M+'],
  ['Tùy chỉnh', '6.999M+'],
  ['Web app', '9.999M+'],
];
