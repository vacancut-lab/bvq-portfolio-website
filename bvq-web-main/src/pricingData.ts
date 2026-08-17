// Pricing Page Data
// Centralised data for the /pricing route. No JSX, no markup — pure data.

export const PACKAGES = [
  {
    id: 'start',
    name: 'START',
    price: '999.000đ',
    priceValue: 999000,
    tagline: 'Đủ để bắt đầu.',
    description: 'Dành cho cá nhân, hộ kinh doanh và doanh nghiệp nhỏ cần một website chuyên nghiệp.',
    image: null,
    features: [
      '1 trang website',
      'Responsive PC / Mobile',
      'Thiết kế theo ngành',
      'Hero section',
      'Giới thiệu',
      'Dịch vụ / sản phẩm',
      'CTA',
      'Form liên hệ',
      'Deploy website',
      'Tối ưu cơ bản',
    ],
    cta: 'CHỌN START',
    timeline: '1–2 ngày',
    highlight: false,
  },
  {
    id: 'business',
    name: 'BUSINESS',
    badge: 'PHỔ BIẾN NHẤT',
    price: '2.990.000đ',
    priceValue: 2990000,
    tagline: 'Đủ để chuyên nghiệp.',
    description: 'Dành cho doanh nghiệp muốn có một website hoàn chỉnh, có cá tính thương hiệu và trải nghiệm tốt.',
    imageKey: 'business',
    features: [
      '5–7 sections',
      'Custom UI',
      'Responsive',
      'Animation cơ bản',
      'Gallery',
      'Form',
      'Google Maps',
      'Social integration',
      'SEO cơ bản',
      'Performance optimization',
      'Deploy',
      '1 vòng chỉnh sửa',
    ],
    cta: 'CHỌN BUSINESS',
    timeline: '3–5 ngày',
    highlight: true,
  },
  {
    id: 'experience',
    name: 'EXPERIENCE',
    price: '5.990.000đ',
    priceValue: 5990000,
    tagline: 'Đủ để khác biệt.',
    description: 'Dành cho thương hiệu cần một digital experience được thiết kế riêng.',
    imageKey: 'experience',
    features: [
      'UI / UX custom',
      'Art direction',
      'Animation nâng cao',
      'Scroll storytelling',
      'Video integration',
      'Interactive sections',
      'Gallery',
      'Product / service exploration',
      'Mobile optimization',
      'SEO cơ bản',
      'Analytics',
      'Deploy',
      '2 vòng chỉnh sửa',
    ],
    cta: 'CHỌN EXPERIENCE',
    timeline: '5–10 ngày',
    highlight: false,
  },
  {
    id: 'custom',
    name: 'CUSTOM',
    price: 'TỪ 9.990.000đ',
    priceValue: 9990000,
    tagline: 'Cho những bài toán riêng.',
    description: 'Dành cho những dự án cần hệ thống hoặc trải nghiệm riêng.',
    imageKey: 'custom',
    features: [
      'UX research',
      'Brand system',
      'CMS',
      'Booking',
      'E-commerce',
      'API',
      'AI',
      'Dashboard',
      'Configurator',
      'Membership',
      'Custom interaction',
    ],
    cta: 'TRAO ĐỔI DỰ ÁN',
    timeline: 'Theo phạm vi dự án',
    highlight: false,
  },
];

export const RECOMMENDATION_OPTIONS = [
  { label: 'TÔI CHỈ CẦN WEBSITE CƠ BẢN', packageId: 'start' },
  { label: 'TÔI CẦN WEBSITE CHUYÊN NGHIỆP', packageId: 'business' },
  { label: 'TÔI MUỐN MỘT TRẢI NGHIỆM KHÁC BIỆT', packageId: 'experience' },
  { label: 'TÔI CÓ MỘT BÀI TOÁN RIÊNG', packageId: 'custom' },
];

export const INDUSTRIES = [
  { id: 'spa', name: 'SPA & WELLNESS', packages: ['BUSINESS', 'EXPERIENCE'], slug: 'spa' },
  { id: 'du-lich', name: 'DU LỊCH', packages: ['BUSINESS', 'EXPERIENCE'], slug: 'du-lich' },
  { id: 'nha-hang', name: 'NHÀ HÀNG', packages: ['START', 'BUSINESS'], slug: 'nha-hang' },
  { id: 'o-to', name: 'Ô TÔ', packages: ['EXPERIENCE', 'CUSTOM'], slug: 'o-to' },
  { id: 'bat-dong-san', name: 'BẤT ĐỘNG SẢN', packages: ['BUSINESS', 'EXPERIENCE'], slug: 'bat-dong-san' },
  { id: 'thoi-trang', name: 'THỜI TRANG', packages: ['EXPERIENCE'], slug: 'thoi-trang' },
];

export const ADDONS = [
  { id: 'ai-image', label: 'AI IMAGE PACK', price: 500000, priceLabel: '+500.000đ' },
  { id: 'ai-video', label: 'AI VIDEO PACK', price: 1000000, priceLabel: '+1.000.000đ' },
  { id: 'motion', label: 'MOTION UPGRADE', price: 1000000, priceLabel: '+1.000.000đ' },
  { id: 'content', label: 'CONTENT PACK', price: 500000, priceLabel: '+500.000đ' },
  { id: 'booking', label: 'BOOKING SYSTEM', price: 1000000, priceLabel: '+1.000.000đ' },
  { id: 'cms', label: 'CMS', price: 1500000, priceLabel: '+1.500.000đ' },
  { id: 'ecommerce', label: 'E-COMMERCE', price: 3000000, priceLabel: 'TỪ +3.000.000đ' },
];

export const PROCESS_STEPS = [
  { number: '01', title: 'BRIEF', description: 'Hiểu doanh nghiệp, khách hàng và mục tiêu.' },
  { number: '02', title: 'DIRECTION', description: 'Xác định visual, structure và experience.' },
  { number: '03', title: 'BUILD', description: 'Thiết kế, code, animation và responsive.' },
  { number: '04', title: 'LAUNCH', description: 'Deploy, test và hoàn thiện.' },
];

export const FAQ_ITEMS = [
  { question: 'Website 999K có gì?', answer: 'Gói START bao gồm 1 trang website responsive, thiết kế theo ngành, hero section, giới thiệu, dịch vụ/sản phẩm, CTA, form liên hệ, deploy và tối ưu cơ bản. Đủ để bắt đầu chuyên nghiệp.' },
  { question: 'Tôi có thể cung cấp ảnh của mình không?', answer: 'Hoàn toàn được. Bạn có thể gửi ảnh, video và nội dung sẵn có. Chúng tôi sẽ tích hợp vào thiết kế. Nếu chưa có, chúng tôi hỗ trợ AI image pack hoặc art direction.' },
  { question: 'Nếu tôi chưa có nội dung thì sao?', answer: 'Chúng tôi có CONTENT PACK (+500.000đ) để hỗ trợ viết nội dung phù hợp với ngành và thương hiệu của bạn. Hoặc bạn có thể gửi nội dung thô, chúng tôi sẽ biên tập lại.' },
  { question: 'Có hỗ trợ domain và hosting không?', answer: 'Chúng tôi hỗ trợ hướng dẫn mua domain và hosting phù hợp. Chi phí domain/hosting do bạn thanh toán trực tiếp với nhà cung cấp. Chúng tôi hỗ trợ deploy miễn phí.' },
  { question: 'Có thể chỉnh sửa website sau khi hoàn thành không?', answer: 'Có. Mỗi gói đều có vòng chỉnh sửa (START: 0, BUSINESS: 1, EXPERIENCE: 2). Sau đó, bạn có thể yêu cầu chỉnh sửa thêm với chi phí thoả thuận.' },
  { question: 'Có thể thêm booking không?', answer: 'Có. BOOKING SYSTEM là add-on (+1.000.000đ) có thể bổ sung vào bất kỳ gói nào. Phù hợp cho spa, nhà hàng, du lịch và các dịch vụ đặt lịch.' },
  { question: 'Có thể bán hàng online không?', answer: 'Có. E-COMMERCE là add-on (từ +3.000.000đ) hoặc nằm trong gói CUSTOM. Tuỳ quy mô sản phẩm và nhu cầu thanh toán, chúng tôi sẽ tư vấn giải pháp phù hợp.' },
  { question: 'Có thể làm website riêng hoàn toàn không?', answer: 'Có. Gói CUSTOM dành cho những dự án cần hệ thống hoặc trải nghiệm riêng: CMS, API, AI, dashboard, configurator, membership... Trao đổi trực tiếp để xác định phạm vi.' },
  { question: 'Website có responsive không?', answer: 'Tất cả các gói đều responsive trên PC, tablet và mobile. Responsive là tiêu chuẩn mặc định, không phải tính năng thêm.' },
  { question: 'Tôi có một tính năng riêng thì sao?', answer: 'Hãy chọn gói CUSTOM hoặc trao đổi trực tiếp. Chúng tôi sẽ đánh giá phạm vi và báo giá dựa trên yêu cầu thực tế của bạn.' },
];

export const CONSULTATION_NEEDS = [
  'Website cơ bản',
  'Website doanh nghiệp',
  'Digital Experience',
  'Website bán hàng',
  'Tính năng riêng',
];

export const CONSULTATION_BUDGETS = [
  '999K – 3M',
  '3M – 6M',
  '6M – 10M',
  '10M+',
];
