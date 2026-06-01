import { useState } from 'react';
import { 
  Sparkles, 
  Users, 
  Type, 
  Calendar, 
  Home, 
  HelpCircle, 
  Phone, 
  ArrowUpDown, 
  Search, 
  LogIn, 
  LogOut, 
  CreditCard, 
  Check, 
  X, 
  AlertTriangle, 
  AlertCircle,
  Clock, 
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  Info,
  Globe,
  Camera,
  ArrowRight,
  MessageSquare,
  Image as ImageIcon
} from 'lucide-react';

// --- DATABASE LINKED TO REAL STATIC USER ASSETS ---

const MOCK_GROUPS = [
  { 
    id: 1, 
    name: "กลุ่มบล็อกพาสเทล By Wish", 
    category: "กลุ่มบล็อก", 
    price: 150, 
    rating: "5.0", 
    badge: "Best Seller", 
    image: "/page2/3 บล็อค/1.jpg",
    desc: "คลังตกแต่งบล็อกสีสันน่ารักหวานๆ มีกรอบคำพูดและกล่องข้อความพาสเทลสำหรับแต่งโพสต์สินค้า" 
  },
  { 
    id: 2, 
    name: "กลุ่มการ์ตูน Chibi By Wish", 
    category: "กลุ่มตูน", 
    price: 199, 
    rating: "4.9", 
    badge: "Hot Hit", 
    image: "/page2/1 Toon/2.jpg",
    desc: "รูปลายเส้นการ์ตูนชิบิแก้มป่องสุดคิ้วท์ สำหรับจัดทำคอนเทนต์รีวิวสินค้าและตกแต่งสตอรี่" 
  },
  { 
    id: 3, 
    name: "กลุ่มของตกแต่งมินิมอล", 
    category: "กลุ่มของตกแต่ง", 
    price: 99, 
    rating: "4.8", 
    badge: "", 
    image: "/page2/2 ของตกแต่ง/1.jpg",
    desc: "ไอคอนแต่งรูป กรอบตกแต่งเส้นบางเรียบหรู คุมโทนสีพาสเทลสะอาดตา" 
  },
  { 
    id: 4, 
    name: "กลุ่มบล็อกแม่ค้าออนไลน์", 
    category: "กลุ่มบล็อก", 
    price: 250, 
    rating: "4.9", 
    badge: "Hot Hit", 
    image: "/page2/3 บล็อค/2.jpg",
    desc: "แม่แบบป้ายบัญชี โพสต์ขายของ สำเร็จรูปสไตล์เวทมนตร์ ปรับแก้คำสะดวก" 
  },
  { 
    id: 5, 
    name: "กลุ่มตกแต่งเทศกาลประจำปี", 
    category: "กลุ่มของตกแต่ง", 
    price: 120, 
    rating: "4.7", 
    badge: "", 
    image: "/page2/2 ของตกแต่ง/2.jpg",
    desc: "รวมเซ็ทของตกแต่งเทศกาลต่างๆ ปีใหม่ คริสต์มาส ฮาโลวีน สงกรานต์ สไตล์น่ารัก" 
  },
  { 
    id: 6, 
    name: "กลุ่มการ์ตูนสัตว์เลี้ยงน่ารัก", 
    category: "กลุ่มตูน", 
    price: 180, 
    rating: "4.8", 
    badge: "Best Seller", 
    image: "/page2/1 Toon/3.jpg",
    desc: "ตัวการ์ตูนหมา แมว กระต่าย ลายเส้นกลมมน สำหรับเป็นบัดดี้ตกแต่งรูปภาพ" 
  }
];

const MOCK_FONTS = [
  { id: 1, name: "Wish Candy (ฟอนต์ลูกอมหวาน)", fontClass: "font-preview-mitr", category: "ขายดี", price: 89, bestSeller: true, desc: "ฟอนต์หัวกลม ตัวอ้วนกลมน่ารัก อ่านง่าย เหมาะสำหรับตกแต่งรีวิวทั่วไป" },
  { id: 2, name: "Wish TikTok Cover (ฟอนต์หน้าปก TikTok)", fontClass: "font-preview-itim", category: "ฟอนต์หน้าปกtiktok", price: 129, bestSeller: true, desc: "ตัวหนาเด่น ชัดเจนในระยะไกล เหมาะกับการทำข้อความหน้าปกคลิปยอดวิวหลักล้าน" },
  { id: 3, name: "Wish Elegant Charm (ฟอนต์พรีเมียมเรียบหรู)", fontClass: "font-preview-charm", category: "ฟอนต์มินิมอล", price: 159, bestSeller: false, desc: "ฟอนต์ลายมือพลิ้วไหว เขียนมือสุดหรูหรา เหมาะกับงานแต่งงานและบทความซึ้งๆ" },
  { id: 4, name: "Wish Sriracha Cute (ฟอนต์วัยรุ่นลายมือ)", fontClass: "font-preview-sriracha", category: "ฟอนต์น่ารัก", price: 79, bestSeller: false, desc: "ลายเส้นแบบปากกาเขียน ลายมือธรรมชาติวัยรุ่นนุ่มนิ่ม เอาไว้ทำโน้ตสรุปน่าอ่าน" },
  { id: 5, name: "Wish Basic Kanit (ฟอนต์พื้นฐานสายแต่งภาพ)", fontClass: "font-preview-kanit", category: "ฟอนต์มินิมอล", price: 69, bestSeller: false, desc: "เรียบร้อย ทางการนิดๆ สุภาพแต่ยังดูสวยงามทันสมัย อ่านง่ายทุกแพลตฟอร์ม" }
];

const MOCK_RENTALS = [
  { id: 1, name: "เช่าสิทธิ์กลุ่มบล็อกพรีเมียม (Wish Block System)", category: "ปล่อยเช่าบล็อก", price: 29, rateDesc: "ถาวรตลอดชีพ", desc: "เข้าถึงคลังของตกแต่งบล็อกทุกประเภท พร้อมอัปเดตใหม่ๆ ตลอดสัปดาห์" },
  { id: 2, name: "เช่าสิทธิ์ฟอนต์ใช้งานส่วนตัวยกเซ็ต", category: "ปล่อยเช่าแนวฟอนต์", price: 89, rateDesc: "ถาวรตลอดชีพ", desc: "เช่าลิขสิทธิ์ฟอนต์ Wish ทุกแบบไปใช้งานออกแบบส่วนตัวได้นาน 1 เดือนเต็ม" },
  { id: 3, name: "เช่าเหมาคลังกลุ่มตูน + ของตกแต่ง", category: "ปล่อยเช่าบล็อก", price: 59, rateDesc: "ถาวรตลอดชีพ", desc: "แพ็กเกจสุดคุ้มสำหรับครีเอเตอร์สายแต่งภาพ ดึงรูปไปแต่งรีวิวสะใจครึ่งเดือน" },
  { id: 4, name: "VIP All-Access Unlimited Pass", category: "แพ็กเกจปล่อยเช่าถาวร", price: 499, rateDesc: "ถาวรตลอดชีพ", desc: "ที่สุดแห่งความคุ้มค่า! ปล่อยเช่าลิขสิทธิ์ทุกอย่างในเครือ Wish ถาวรตลอดชีพ" }
];

const MOCK_PARTNER_HOUSES = {
  "บ้านส้ม (SweetHouse)": [
    { id: 101, name: "ฟอนต์ส้มเชื่อม (Orange Glaze)", price: 99, desc: "ลายเส้นกลมน่ารัก ดุ๊กดิ๊กขี้เล่น" },
    { id: 102, name: "ฟอนต์น้ำผึ้งป่า (Wild Honey)", price: 120, desc: "ตัวบางมีสไตล์ ลายเส้นวัยรุ่นเก๋ๆ" }
  ],
  "บ้านฟ้า (PlayfulFonts)": [
    { id: 201, name: "ฟอนต์เด็กซน (Naughty Kid)", price: 79, desc: "ลายเส้นโย้เย้สุดน่ารักแบบลายมือเด็กประถม" },
    { id: 202, name: "ฟอนต์ดินสอไม้ (Wood Pencil)", price: 89, desc: "ฟอนต์บาง สไตล์ภาพวาดระบายสี สบายตา" }
  ],
  "บ้านชมพู (SimpleStudio)": [
    { id: 301, name: "ฟอนต์เส้นด้าย (Cute Thread)", price: 110, desc: "ตัวบางเรียวสวย มินิมอลเหมาะกับคาเฟ่" },
    { id: 302, name: "ฟอนต์ขอบเรียบ (Clean Border)", price: 95, desc: "ตัวกลมหนา ไม่มีหัว สไตล์โมเดิร์นป๊อป" }
  ]
};

// --- MULTIPLE MOCK FILES FROM THE USER FOLDERS FOR RICH GALLERIES ---
const PORTFOLIO_IMAGES_PAGE1 = [
  "/page1/ไม่มีชื่อ 1292_20260326195333.jpg",
  "/page1/ไม่มีชื่อ 1292_20260326213329.jpg",
  "/page1/ไม่มีชื่อ 1293_20260326212152.jpg",
  "/page1/ไม่มีชื่อ 1294_20260326213014.png",
  "/page1/IMG_3599.PNG"
];

const TOON_GALLERY = [
  "/page2/1 Toon/1.png",
  "/page2/1 Toon/2.jpg",
  "/page2/1 Toon/3.jpg",
  "/page2/1 Toon/4.jpg",
  "/page2/1 Toon/5.png",
  "/page2/1 Toon/6.jpg"
];

const DECOR_GALLERY = [
  "/page2/2 ของตกแต่ง/1.jpg",
  "/page2/2 ของตกแต่ง/2.jpg",
  "/page2/2 ของตกแต่ง/3.jpg",
  "/page2/2 ของตกแต่ง/4.jpg",
  "/page2/2 ของตกแต่ง/5.jpg",
  "/page2/2 ของตกแต่ง/6.jpg"
];

const BLOCK_GALLERY = [
  "/page2/3 บล็อค/1.jpg",
  "/page2/3 บล็อค/2.jpg",
  "/page2/3 บล็อค/3.jpg",
  "/page2/3 บล็อค/4.jpg",
  "/page2/3 บล็อค/5.jpg",
  "/page2/3 บล็อค/6.jpg"
];

const HEADER_TUTORIALS = [
  "/page2/4 สอนทำหัวป้าย/01.jpg",
  "/page2/4 สอนทำหัวป้าย/02.jpg",
  "/page2/4 สอนทำหัวป้าย/03.jpg",
  "/page2/4 สอนทำหัวป้าย/04.jpg",
  "/page2/4 สอนทำหัวป้าย/05.jpg",
  "/page2/4 สอนทำหัวป้าย/06.jpg"
];

const RATE_CARDS = [
  "/page2/กรอบเรท/1.jpg",
  "/page2/กรอบเรท/2.jpg",
  "/page2/กรอบเรท/3.jpg",
  "/page2/กรอบเรท/4.jpg",
  "/page2/กรอบเรท/5.jpg",
  "/page2/กรอบเรท/6.jpg"
];

function App() {
  const getAssetUrl = (path) => {
    if (!path) return '';
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    return import.meta.env.BASE_URL + cleanPath;
  };

  const [activeTab, setActiveTab] = useState(1);
  
  // --- MOCK AUTHENTICATION SYSTEM STATE ---
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('bywish_user');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        console.error("Error loading user", e);
      }
    }
    return null;
  });
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isCreditOpen, setIsCreditOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  // --- TOP-UP CREDIT STATE ---
  const [topUpAmount, setTopUpAmount] = useState(100);
  const [simulatedSlip, setSimulatedSlip] = useState(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // --- FILTERS & SEARCHES ---
  // Page 2 Filters
  const [p2Category, setP2Category] = useState("ทั้งหมด");
  const [p2Sort, setP2Sort] = useState("default"); // 'default', 'low-to-high', 'high-to-low'
  const [p2Search, setP2Search] = useState("");
  const [p2SubView, setP2SubView] = useState("groups"); // 'groups', 'gallery', 'rates'

  // Page 3 Filters & Live Tester
  const [p3Category, setP3Category] = useState("ทั้งหมด");
  const [p3Sort, setP3Sort] = useState("default");
  const [p3Search, setP3Search] = useState("");
  const [p3TextTest, setP3TextTest] = useState("ทดลองพิมพ์ข้อความเพื่อทดสอบฟอนต์ลายมือของร้านที่นี่");
  const [p3FontSize, setP3FontSize] = useState(24);

  // Page 4 Calculator
  const [selectedRental, setSelectedRental] = useState(() => {
    return MOCK_RENTALS.length > 0 ? MOCK_RENTALS[0] : null;
  });


  // Page 6 Urgent Modal
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  // Lightbox Modal for Full Image View
  const [lightboxImage, setLightboxImage] = useState(null);

  // Contact Form Simulated State
  const [contactName, setContactName] = useState("");
  const [contactTopic, setContactTopic] = useState("แจ้งเรื่องทั่วไป");
  const [contactMessage, setContactMessage] = useState("");

  const showNotification = (msg, type = 'success') => {
    setNotification({ text: msg, type });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  // --- AUTH ACTIONS ---
  const handleRegister = (e) => {
    e.preventDefault();
    if (!authEmail || !authPassword) {
      showNotification("กรุณากรอกข้อมูลให้ครบถ้วน", "error");
      return;
    }
    
    const newUserData = { email: authEmail, credits: 0 };
    localStorage.setItem('bywish_user', JSON.stringify(newUserData));
    setCurrentUser(newUserData);
    setIsRegisterOpen(false);
    setAuthEmail('');
    setAuthPassword('');
    showNotification("สมัครสมาชิกจำลองสำเร็จ ยินดีต้อนรับเข้าสู่ระบบ", "success");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!authEmail || !authPassword) {
      showNotification("กรุณากรอกข้อมูลให้ครบถ้วน", "error");
      return;
    }
    
    const savedUser = localStorage.getItem('bywish_user');
    let userData = null;
    
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      if (parsed.email === authEmail) {
        userData = parsed;
      }
    }
    
    if (!userData) {
      userData = { email: authEmail, credits: 250 };
      localStorage.setItem('bywish_user', JSON.stringify(userData));
    }
    
    setCurrentUser(userData);
    setIsLoginOpen(false);
    setAuthEmail('');
    setAuthPassword('');
    showNotification(`เข้าสู่ระบบสำเร็จ ยินดีต้อนรับคุณ ${userData.email}`, "success");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('bywish_user');
    showNotification("ออกจากระบบเรียบร้อยแล้ว", "info");
  };

  // --- SIMULATED PAYMENT ACTION ---
  const handleTopUpSubmit = (e) => {
    e.preventDefault();
    if (!currentUser) {
      showNotification("กรุณาเข้าสู่ระบบก่อนเติมเครดิตนะคะ", "error");
      setIsLoginOpen(true);
      setIsCreditOpen(false);
      return;
    }

    setIsProcessingPayment(true);
    
    setTimeout(() => {
      const updatedUser = {
        ...currentUser,
        credits: currentUser.credits + Number(topUpAmount)
      };
      setCurrentUser(updatedUser);
      localStorage.setItem('bywish_user', JSON.stringify(updatedUser));
      setIsProcessingPayment(false);
      setIsCreditOpen(false);
      setSimulatedSlip(null);
      showNotification(`เติมเงินจำลองสำเร็จ ได้รับ +${topUpAmount} เครดิตเรียบร้อย`, "success");
    }, 1500);
  };

  const simulateBuyProduct = (productName, price) => {
    if (!currentUser) {
      showNotification("กรุณาเข้าสู่ระบบก่อนทำรายการสั่งซื้อค่ะ", "error");
      setIsLoginOpen(true);
      return;
    }

    if (currentUser.credits < price) {
      showNotification(`เครดิตไม่เพียงพอ ต้องการ ${price} เครดิต (มียอดคงเหลือ ${currentUser.credits} เครดิต)`, "error");
      setIsCreditOpen(true);
      return;
    }

    const updatedUser = {
      ...currentUser,
      credits: currentUser.credits - price
    };
    setCurrentUser(updatedUser);
    localStorage.setItem('bywish_user', JSON.stringify(updatedUser));

    showNotification(`ทำรายการ "${productName}" สำเร็จ หัก ${price} เครดิต คงเหลือ ${updatedUser.credits} เครดิต`, "success");
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactName || !contactMessage) {
      showNotification("กรุณากรอกข้อมูลชื่อและรายละเอียดข้อความให้ครบถ้วน", "error");
      return;
    }
    showNotification(`ส่งเรื่องในหัวข้อ "${contactTopic}" เรียบร้อยแล้ว กรุณารอการติดต่อกลับภายใน 24 ชม.`, "success");
    setContactName("");
    setContactMessage("");
  };

  // --- FILTER LOGIC ---
  const filteredGroups = MOCK_GROUPS.filter(item => {
    const matchesCat = p2Category === "ทั้งหมด" || item.category === p2Category || (p2Category === "ขายดี (Best Seller)" && item.badge.includes("Best")) || (p2Category === "Hothit" && item.badge.includes("Hot"));
    const matchesSearch = item.name.toLowerCase().includes(p2Search.toLowerCase()) || item.desc.toLowerCase().includes(p2Search.toLowerCase());
    return matchesCat && matchesSearch;
  }).sort((a, b) => {
    if (p2Sort === "low-to-high") return a.price - b.price;
    if (p2Sort === "high-to-low") return b.price - a.price;
    return 0;
  });

  const filteredFonts = MOCK_FONTS.filter(item => {
    const matchesCat = p3Category === "ทั้งหมด" || item.category === p3Category || (p3Category === "ขายดี" && item.bestSeller);
    const matchesSearch = item.name.toLowerCase().includes(p3Search.toLowerCase()) || item.desc.toLowerCase().includes(p3Search.toLowerCase());
    return matchesCat && matchesSearch;
  }).sort((a, b) => {
    if (p3Sort === "low-to-high") return a.price - b.price;
    if (p3Sort === "high-to-low") return b.price - a.price;
    return 0;
  });

  return (
    <div className="phone-mockup-wrapper selection:bg-purple-200">
      
      {/* Toast Notification with subtle pastel background */}
      {notification && (
        <div className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-lg transition-all duration-300 ${
          notification.type === 'success' ? 'bg-indigo-900 text-white' :
          notification.type === 'error' ? 'bg-rose-950 text-rose-200 border border-rose-800' :
          'bg-purple-950 text-purple-200 border border-purple-800'
        }`}>
          <div className="w-1.5 h-1.5 rounded-full animate-ping bg-current"></div>
          <span className="font-semibold text-xs tracking-tight">{notification.text}</span>
        </div>
      )}

      {/* Centered Phone Viewport Frame */}
      <div className="phone-mockup">
        <div className="phone-screen bg-[#fffbf7] relative flex flex-col">
          
          {/* Top Bar Navigation inside the phone screen container */}
          <header className="glass-panel sticky top-0 z-45 px-4 py-3.5 flex items-center justify-between border-b shadow-sm w-full bg-white/95">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab(1)}>
              <div className="w-8 h-8 rounded-lg bg-[#ff8fae] flex items-center justify-center text-white font-medium text-sm shadow-sm animate-pulse flex-shrink-0">
                W
              </div>
              <div className="text-left">
                <h1 className="text-sm font-black tracking-tight m-0 text-[#ff8fae]">
                  By Wish Network
                </h1>
                <p className="text-[7.5px] text-pink-400 tracking-widest font-extrabold uppercase">Magic Amusement Park</p>
              </div>
            </div>

            {/* Member state pill */}
            <div className="flex items-center gap-2">
              {currentUser ? (
                <div className="flex items-center gap-1.5 bg-neutral-100/90 px-2 py-1 rounded-xl border border-sky-100 shadow-sm text-[10px]">
                  <div className="flex flex-col text-left">
                    <span className="font-black text-slate-800 flex items-center gap-0.5">
                      <span>{currentUser.credits}</span> 
                      <span className="text-[7.5px] font-bold text-purple-450">เครดิต</span>
                    </span>
                  </div>
                  <button 
                    onClick={() => { setActiveTab(5); setIsCreditOpen(true); }}
                    className="p-1 bg-[#ff8fae] rounded-md text-white shadow-sm hover:opacity-90 active:scale-95 transition-all flex items-center justify-center border-none"
                    title="เติมเครดิต"
                  >
                    <CreditCard className="w-2.5 h-2.5" />
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="p-1 text-rose-500 hover:bg-rose-50 rounded-md transition-all active:scale-95 flex items-center justify-center border-none"
                    title="ออกจากระบบ"
                  >
                    <LogOut className="w-2.5 h-2.5" />
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => setIsLoginOpen(true)}
                  className="flex items-center gap-1 bg-[#ff8fae] text-white font-bold py-1.5 px-3 rounded-xl transition-all text-[10px] shadow-sm cursor-pointer border-none"
                >
                  <LogIn className="w-2.5 h-2.5" />
                  <span>เข้าสู่ระบบ</span>
                </button>
              )}
            </div>
          </header>

          {/* MAIN PAGE VIEWPORT FOR SCROLLING CONTENT */}
          <main className="flex-grow min-h-0 p-3 pb-28 overflow-y-auto scrollbar-none">
          {activeTab === 1 && (
            <div className="flex flex-col gap-6 text-left animate-fadeIn">
              
              {/* Magic Jumbotron Card */}
              <div className="glass-panel p-8 md:p-10 rounded-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8 shadow-md border-purple-500/35">
                
                {/* Glowing nebulas background inside card */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-pink-400/10 rounded-full blur-3xl -z-10"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-sky-400/10 rounded-full blur-3xl -z-10"></div>

                {/* Portrait avatar - centered for mobile */}
                <div className="w-32 h-32 rounded-2xl bg-[#ff8fae] p-0.75 flex-shrink-0 flex items-center justify-center shadow-lg relative floating-element">
                  <div className="w-full h-full rounded-xl bg-white flex flex-col items-center justify-center relative overflow-hidden">
                    <img 
                      src={getAssetUrl(PORTFOLIO_IMAGES_PAGE1[4])} 
                      alt="By Wish Avatar" 
                      className="w-full h-full object-cover"
                      onClick={() => setLightboxImage(PORTFOLIO_IMAGES_PAGE1[4])}
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-pink-500/80 py-0.5 text-center">
                      <span className="text-[8px] text-white font-bold uppercase tracking-wider">WISH FOUNDER</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2.5 items-center w-full">
                  <span className="bg-pink-100 text-pink-600 border border-pink-200 font-bold px-3 py-1 rounded-full text-[10px] uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    <span>Welcome to Our Space</span>
                  </span>
                  <h2 className="text-xl font-black tracking-tight leading-tight m-0 text-[#ff8fae]">
                    ยินดีต้อนรับสู่ WISH / WITH
                  </h2>
                  <p className="text-[#735c50] text-xs leading-relaxed font-normal max-w-xs">
                    ยินดีที่ได้รู้จักค่ะ! ในฐานะผู้ก่อตั้งและเจ้าของกลุ่มเครือ Wish รวมถึงผู้สร้างสรรค์ฟอนต์ในเครือ With มีความตั้งใจจริงที่อยากจะขับเคลื่อนไอเดียดี ๆ ผ่านงานออกแบบและตัวอักษรสวยงาม
                  </p>
                  
                  <button 
                    onClick={() => setActiveTab(2)}
                    className="w-full bg-[#ff8fae] text-white font-bold py-3 rounded-xl transition-all text-sm shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Users className="w-4 h-4" />
                    <span>Make a WISH, take a ride! ✨</span>
                  </button>
                </div>
              </div>

              {/* Portfolio Showcase - 2 columns for mobile */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-pink-400" />
                  <h3 className="text-sm font-bold text-[#422f25]">คลังผลงานของเรา</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  {PORTFOLIO_IMAGES_PAGE1.slice(0, 4).map((imgUrl, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setLightboxImage(imgUrl)}
                      className="glass-panel p-1 rounded-xl cursor-pointer overflow-hidden shadow-sm group transition-all active:scale-95"
                    >
                      <div className="aspect-[4/5] rounded-lg overflow-hidden relative">
                        <img 
                          src={getAssetUrl(imgUrl)} 
                          alt={`Artwork ${idx+1}`} 
                          className="w-full h-full object-cover group-active:scale-105 transition-all duration-300" 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RECRUITMENT CAMPAIGN BOARD */}
              <div className="glass-panel p-4 rounded-2xl border border-pink-200 shadow-sm flex flex-col gap-4 text-left">
                
                <div className="border-b border-pink-200 pb-3 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                    <h3 className="text-sm font-extrabold text-[#422f25] m-0">เปิดรับตัวแทนจำหน่าย รุ่นที่ 1</h3>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-[#735c50]">WISH & WITH GEN 1 — โอกาสทอง คืนทุนไว!</p>
                    <span className="bg-amber-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide">
                      จำกัด
                    </span>
                  </div>
                </div>

                {/* Group Rep card */}
                <div className="bg-pink-50 rounded-xl p-4 border border-pink-200 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-pink-200 text-pink-700 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">WISH กลุ่ม</span>
                    <span className="text-lg font-black text-amber-600">599 บาท</span>
                  </div>
                  <h4 className="text-sm font-extrabold text-[#422f25] m-0">ตัวแทนเครือกลุ่ม รุ่นที่ 1</h4>
                  <p className="text-xs text-[#735c50] leading-relaxed">
                    ไม่มีการคัดออก เสียค่าสมัครครั้งเดียว มีโบนัสและส่วนแบ่งตั้งแต่ชิ้นแรก!
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-[#735c50]">
                    <Info className="w-3 h-3" />
                    <span>เงื่อนไข: ต้องโพสต์สม่ำเสมอ (สุ่มเช็ค)</span>
                  </div>
                </div>

                {/* Font Rep card */}
                <div className="bg-sky-50 rounded-xl p-4 border border-sky-200 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="bg-sky-200 text-sky-700 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">WITH ฟ้อนต์</span>
                    <span className="text-lg font-black text-pink-500">299 บาท</span>
                  </div>
                  <h4 className="text-sm font-extrabold text-[#422f25] m-0">ตัวแทนเครือฟ้อนต์ รุ่นที่ 1</h4>
                  <p className="text-xs text-[#735c50] leading-relaxed">
                    รับจำกัด 15 คนแรก! ส่วนแบ่งสูงสุด 40% มีฟ้อนต์ใหม่ให้ขายตลอด
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-[#735c50]">
                    <Info className="w-3 h-3" />
                    <span>เงื่อนไข: ต้องโพสต์สม่ำเสมอ (สุ่มเช็ค)</span>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    showNotification("นำไปยังช่องทางติดต่อสมัครงานค่ะ", "success");
                    setActiveTab(7);
                  }}
                  className="w-full bg-[#ff8fae] hover:bg-[#ff7ca2] text-white font-bold py-3 rounded-xl text-sm cursor-pointer shadow-sm transition-all flex items-center justify-center gap-2"
                >
                  <span>✉️ ติดต่อสมัครเป็นตัวแทน</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* --- PAGE 2: GROUPS LIST NETWORK --- */}
          {activeTab === 2 && (
            <div className="flex flex-col gap-4 text-left">
              
              {/* Page Header */}
              <div className="glass-panel p-4 rounded-2xl flex flex-col gap-3 shadow-sm">
                <div>
                  <h2 className="text-base font-bold text-[#422f25] m-0 flex items-center gap-2">
                    <Users className="w-4 h-4 text-pink-400" /> เครือกลุ่ม By Wish
                  </h2>
                  <p className="text-xs text-[#735c50] mt-0.5">กลุ่มของตกแต่งและภาพลายเส้นการ์ตูนสวนสนุกเวทมนตร์</p>
                </div>

                {/* Tab layout switches - full width */}
                <div className="flex bg-pink-50 border border-pink-200 p-1 rounded-xl text-xs gap-1">
                  <button 
                    onClick={() => setP2SubView("groups")}
                    className={`flex-1 px-2 py-2 rounded-lg transition-all cursor-pointer font-bold text-[11px] ${
                      p2SubView === "groups" ? 'bg-[#ff8fae] text-white shadow-sm' : 'text-[#735c50]'
                    }`}
                  >
                    แพ็กเกจ
                  </button>
                  <button 
                    onClick={() => setP2SubView("gallery")}
                    className={`flex-1 px-2 py-2 rounded-lg transition-all cursor-pointer font-bold text-[11px] ${
                      p2SubView === "gallery" ? 'bg-[#ff8fae] text-white shadow-sm' : 'text-[#735c50]'
                    }`}
                  >
                    คลังภาพ
                  </button>
                  <button 
                    onClick={() => setP2SubView("rates")}
                    className={`flex-1 px-2 py-2 rounded-lg transition-all cursor-pointer font-bold text-[11px] ${
                      p2SubView === "rates" ? 'bg-[#ff8fae] text-white shadow-sm' : 'text-[#735c50]'
                    }`}
                  >
                    เรทราคา
                  </button>
                </div>
              </div>

              {/* VIEW 1: PRODUCT LIST */}
              {p2SubView === "groups" && (
                <div className="flex flex-col gap-4">
                  {/* Search and Sorters - compact for mobile */}
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <input 
                          type="text" 
                          placeholder="ค้นหาชื่อกลุ่ม..."
                          value={p2Search}
                          onChange={(e) => setP2Search(e.target.value)}
                          className="glass-input glass-input-search text-xs rounded-xl pl-8 pr-3 py-2.5 w-full"
                        />
                        <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-pink-400" />
                      </div>

                      <div className="flex items-center gap-1 bg-white border border-pink-200 px-2.5 py-2 rounded-xl text-xs text-[#735c50] font-medium cursor-pointer flex-shrink-0">
                        <ArrowUpDown className="w-3 h-3 text-pink-400" />
                        <select 
                          value={p2Sort} 
                          onChange={(e) => setP2Sort(e.target.value)}
                          className="bg-transparent border-none outline-none font-sans font-semibold cursor-pointer text-xs text-[#735c50]"
                        >
                          <option value="default">เรียง</option>
                          <option value="low-to-high">ราคา ↑</option>
                          <option value="high-to-low">ราคา ↓</option>
                        </select>
                      </div>
                    </div>

                    {/* Category filter chips */}
                    <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                      {["ทั้งหมด", "กลุ่มบล็อก", "กลุ่มตูน", "กลุ่มของตกแต่ง"].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setP2Category(cat)}
                          className={`px-3 py-1.5 rounded-full font-bold text-[11px] transition-all whitespace-nowrap cursor-pointer flex-shrink-0 ${
                            p2Category === cat 
                              ? 'bg-[#ff8fae] text-white shadow-sm' 
                              : 'bg-white border border-pink-200 text-[#735c50]'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Grid */}
                  {filteredGroups.length > 0 ? (
                    <div className="flex flex-col gap-3">
                      {filteredGroups.map((item) => (
                        <div 
                          key={item.id} 
                          className="glass-panel p-4 rounded-2xl border border-pink-100 flex gap-3 text-left shadow-sm relative overflow-hidden"
                        >
                          {item.badge && (
                            <div className="absolute top-3 right-3 text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#ff8fae] text-white uppercase tracking-wide shadow-sm z-10">
                              {item.badge}
                            </div>
                          )}

                          {/* Thumbnail - left side */}
                          <div 
                            onClick={() => setLightboxImage(item.image)}
                            className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 cursor-zoom-in bg-pink-50"
                          >
                            <img 
                              src={getAssetUrl(item.image)} 
                              alt={item.name} 
                              className="w-full h-full object-cover" 
                            />
                          </div>

                          {/* Info - right side */}
                          <div className="flex-1 flex flex-col justify-between gap-2 min-w-0">
                            <div className="flex flex-col gap-1">
                              <span className="text-[9px] font-bold uppercase text-pink-500 bg-pink-50 px-2 py-0.5 rounded-full w-fit">
                                {item.category}
                              </span>
                              <h3 className="font-bold text-[#422f25] text-sm m-0 leading-snug">
                                {item.name}
                              </h3>
                              <p className="text-[11px] text-[#735c50] leading-relaxed line-clamp-2">
                                {item.desc}
                              </p>
                            </div>

                            <div className="flex items-center justify-between">
                              <div>
                                <p className="text-[9px] text-[#735c50]">ราคาซื้อสิทธิ์</p>
                                <p className="text-sm font-black text-amber-600">{item.price} เครดิต</p>
                              </div>
                              <button 
                                onClick={() => simulateBuyProduct(item.name, item.price)}
                                className="bg-[#ff8fae] hover:bg-[#ff7ca2] text-white font-bold px-3 py-2 rounded-xl shadow-sm text-xs cursor-pointer flex items-center gap-1"
                              >
                                <ShoppingBag className="w-3 h-3" />
                                <span>เข้าร่วม</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="glass-panel p-12 rounded-2xl text-center text-neutral-400">
                      <AlertTriangle className="w-10 h-10 mx-auto text-purple-350 mb-2 animate-bounce" />
                      <p className="text-xs font-semibold text-purple-200">ไม่พบกลุ่มที่ค้นหาค่ะ</p>
                    </div>
                  )}
                </div>
              )}

              {/* VIEW 2: IMAGE ASSETS PORTFOLIO GRID */}
              {p2SubView === "gallery" && (
                <div className="flex flex-col gap-6">
                  
                  {/* Category 1: TOON GALLERY */}
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xs font-extrabold text-yellow-300 uppercase tracking-widest border-b border-purple-500/30 pb-1.5 flex justify-between items-center">
                      <span>ภาพการ์ตูนจริงในกลุ่ม (Chibi Toon Library)</span>
                      <span className="text-[9px] font-normal text-purple-400 lowercase">6 files</span>
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {TOON_GALLERY.map((imgUrl, idx) => (
                        <div 
                          key={idx}
                          onClick={() => setLightboxImage(imgUrl)}
                          className="rounded-xl cursor-pointer overflow-hidden border border-pink-100 active:scale-95 transition-all"
                        >
                          <div className="aspect-square bg-pink-50 rounded-xl overflow-hidden">
                            <img src={getAssetUrl(imgUrl)} alt={`Toon ${idx+1}`} className="w-full h-full object-cover" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Category 2: DECORATIONS GALLERY */}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xs font-bold text-pink-500 flex items-center gap-1">
                      <span>🌸 ภาพตกแต่งน่ารัก</span>
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {DECOR_GALLERY.map((imgUrl, idx) => (
                        <div 
                          key={idx}
                          onClick={() => setLightboxImage(imgUrl)}
                          className="rounded-xl cursor-pointer overflow-hidden border border-pink-100 active:scale-95 transition-all"
                        >
                          <div className="aspect-square bg-pink-50 rounded-xl overflow-hidden">
                            <img src={getAssetUrl(imgUrl)} alt={`Decor ${idx+1}`} className="w-full h-full object-cover" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Category 3: BLOCKS GALLERY */}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xs font-bold text-sky-500 flex items-center gap-1">
                      <span>📦 กรอบบล็อกข้อความ</span>
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {BLOCK_GALLERY.map((imgUrl, idx) => (
                        <div 
                          key={idx}
                          onClick={() => setLightboxImage(imgUrl)}
                          className="rounded-xl cursor-pointer overflow-hidden border border-sky-100 active:scale-95 transition-all"
                        >
                          <div className="aspect-square bg-sky-50 rounded-xl overflow-hidden">
                            <img src={getAssetUrl(imgUrl)} alt={`Block ${idx+1}`} className="w-full h-full object-cover" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Category 4: HEADER TUTORIALS */}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xs font-bold text-amber-600 flex items-center gap-1">
                      <span>🏷️ สอนทำหัวป้าย</span>
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      {HEADER_TUTORIALS.map((imgUrl, idx) => (
                        <div 
                          key={idx}
                          onClick={() => setLightboxImage(imgUrl)}
                          className="rounded-xl cursor-pointer overflow-hidden border border-amber-100 active:scale-95 transition-all"
                        >
                          <div className="aspect-square bg-amber-50 rounded-xl overflow-hidden">
                            <img src={getAssetUrl(imgUrl)} alt={`Tutorial ${idx+1}`} className="w-full h-full object-cover" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* VIEW 3: RATE CARD LIST */}
              {p2SubView === "rates" && (
                <div className="flex flex-col gap-3">
                  <h3 className="text-sm font-bold text-[#422f25] flex items-center gap-1">💰 กรอบเรทราคาของกลุ่ม/ฟ้อนต์</h3>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {RATE_CARDS.map((imgUrl, idx) => (
                      <div 
                        key={idx}
                        onClick={() => setLightboxImage(imgUrl)}
                        className="rounded-2xl cursor-pointer overflow-hidden shadow-sm border border-pink-100 active:scale-95 transition-all"
                      >
                        <div className="aspect-[3/4] bg-pink-50 overflow-hidden">
                          <img src={getAssetUrl(imgUrl)} alt={`Rate Card ${idx+1}`} className="w-full h-full object-cover" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* --- PAGE 3: FONTS LIST NETWORK & TESTER --- */}
          {activeTab === 3 && (
            <div className="flex flex-col gap-4 text-left">
              
              {/* Header with search */}
              <div className="glass-panel p-4 rounded-2xl flex flex-col gap-3 shadow-sm">
                <div>
                  <h2 className="text-base font-bold text-[#422f25] m-0 flex items-center gap-2">
                    <Type className="w-4 h-4 text-pink-400" /> เครือฟอนต์ By Wish
                  </h2>
                  <p className="text-xs text-[#735c50] mt-0.5">ทดลองฟอนต์ลิขสิทธิ์และเลือกซื้อ</p>
                </div>

                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <input 
                      type="text" 
                      placeholder="ค้นหาชื่อฟอนต์..."
                      value={p3Search}
                      onChange={(e) => setP3Search(e.target.value)}
                      className="glass-input glass-input-search text-xs rounded-xl pl-8 pr-3 py-2.5 w-full"
                    />
                    <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-pink-400" />
                  </div>

                  <div className="flex items-center gap-1 bg-white border border-pink-200 px-2.5 py-2 rounded-xl text-xs text-[#735c50] font-medium cursor-pointer flex-shrink-0">
                    <ArrowUpDown className="w-3 h-3 text-pink-400" />
                    <select 
                      value={p3Sort} 
                      onChange={(e) => setP3Sort(e.target.value)}
                      className="bg-transparent border-none outline-none font-sans font-semibold cursor-pointer text-xs text-[#735c50]"
                    >
                      <option value="default">เรียง</option>
                      <option value="low-to-high">ราคา ↑</option>
                      <option value="high-to-low">ราคา ↓</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Category filter chips - horizontal scroll */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {["ทั้งหมด", "ขายดี", "TikTok", "น่ารัก", "มินิมอล"].map((cat, idx) => {
                  const categories = ["ทั้งหมด", "ขายดี", "ฟอนต์หน้าปกtiktok", "ฟอนต์น่ารัก", "ฟอนต์มินิมอล"];
                  return (
                    <button
                      key={cat}
                      onClick={() => setP3Category(categories[idx])}
                      className={`px-4 py-2 rounded-full font-bold text-xs transition-all whitespace-nowrap cursor-pointer flex-shrink-0 ${
                        p3Category === categories[idx] 
                          ? 'bg-[#ff8fae] text-white shadow-sm' 
                          : 'bg-white border border-pink-200 text-[#735c50]'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* DYNAMIC PASTEL LIVE TESTER BOX */}
              <div className="glass-panel p-5 rounded-2xl border border-pink-500/20 shadow-sm flex flex-col gap-3 bg-pink-50/30">
                <div className="flex items-center justify-between flex-wrap gap-2 border-b border-purple-500/30 pb-2.5">
                  <h3 className="font-bold text-yellow-300 text-xs m-0 flex items-center gap-1">
                    <span>✨</span>
                    <span>กล่องทดสอบฟอนต์สด (Live Font Preview)</span>
                  </h3>
                  <span className="text-[10px] text-pink-300 font-bold bg-pink-900/40 px-2.5 py-0.5 rounded-full border border-pink-500/30">
                    ป้อนข้อความทดลองใช้ที่นี่
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  <input 
                    type="text"
                    value={p3TextTest}
                    onChange={(e) => setP3TextTest(e.target.value)}
                    placeholder="พิมพ์ทดสอบฟอนต์ที่นี่..."
                    className="glass-input p-3 rounded-xl text-xs font-semibold text-white w-full"
                  />
                  
                  <div className="flex items-center gap-3.5 bg-slate-950/60 border border-purple-900/50 px-4 py-2 rounded-lg text-xs text-purple-300">
                    <span className="font-semibold whitespace-nowrap text-[10px] text-purple-200">ขนาดตัวอักษร: {p3FontSize}px</span>
                    <input 
                      type="range" 
                      min="16" 
                      max="60" 
                      value={p3FontSize}
                      onChange={(e) => setP3FontSize(Number(e.target.value))}
                      className="flex-1 accent-purple-400 cursor-pointer h-1 rounded-lg bg-gray-700"
                    />
                  </div>
                </div>
              </div>

              {/* Products Display Grid with Fonts Live Style Output */}
              {filteredFonts.length > 0 ? (
                <div className="flex flex-col gap-5">
                  {filteredFonts.map((item) => (
                    <div 
                      key={item.id} 
                      className="glass-panel glass-panel-hover p-5.5 rounded-2xl border border-purple-500/20 flex flex-col justify-between gap-5 text-left shadow-sm relative"
                    >
                      {item.bestSeller && (
                        <div className="absolute top-4 right-4 text-[9px] font-bold bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2.5 py-0.5 rounded uppercase tracking-wider shadow-sm">
                          ขายดี
                        </div>
                      )}

                      <div className="flex flex-col gap-2.5">
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-bold tracking-wider uppercase text-pink-300 bg-pink-900/50 border border-pink-500/30 px-2 py-0.5 rounded">
                            {item.category}
                          </span>
                          <h3 className="font-bold text-white text-sm m-0">
                            {item.name}
                          </h3>
                        </div>

                        <p className="text-[11px] text-purple-300 leading-relaxed max-w-xl">
                          {item.desc}
                        </p>

                        {/* LIVE TEXT RENDER PANEL */}
                        <div className="w-full bg-white border border-neutral-100 rounded-xl p-5 min-h-[80px] flex items-center justify-center overflow-x-auto shadow-inner">
                          <p 
                            className={`w-full text-center font-normal transition-all text-purple-900 ${item.fontClass}`}
                            style={{ fontSize: `${p3FontSize}px`, lineHeight: '140%', wordBreak: 'break-word' }}
                          >
                            {p3TextTest || "พิมพ์ตัวอย่างข้อความ..."}
                          </p>
                        </div>
                      </div>

                      <div className="border-t border-purple-500/25 pt-3.5 flex items-center justify-between flex-wrap gap-2 text-xs">
                        <div className="text-left">
                          <p className="text-[9px] text-purple-400">ราคาซื้อขาด</p>
                          <p className="font-extrabold text-yellow-300">{item.price} เครดิต</p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => {
                              setP3TextTest("สไตล์ฟอนต์ By Wish สวนสนุกเวทมนตร์แสนวิเศษ");
                            }}
                            className="bg-slate-900/60 hover:bg-slate-900 text-purple-200 font-bold px-3 py-1.5 rounded-lg border border-purple-500/30 transition-all text-[11px] cursor-pointer"
                          >
                            ข้อความแนะนำ
                          </button>
                          
                          <button 
                            onClick={() => simulateBuyProduct(item.name, item.price)}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-4 py-1.5 rounded-lg shadow transition-all text-[11px] cursor-pointer flex items-center gap-1"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            <span>ซื้อลิขสิทธิ์</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="glass-panel p-12 rounded-2xl text-center text-neutral-400">
                  <AlertTriangle className="w-10 h-10 mx-auto text-purple-300 mb-2" />
                  <p className="text-xs font-semibold text-purple-200">ไม่พบฟอนต์ตามเงื่อนไขที่เลือกค่ะ</p>
                </div>
              )}

            </div>
          )}

          {/* --- PAGE 4: RENTAL SERVICES & CALCULATOR --- */}
          {activeTab === 4 && (
            <div className="flex flex-col gap-4 text-left">
              
              <div className="glass-panel p-4 rounded-2xl shadow-sm">
                <h2 className="text-base font-bold text-[#422f25] m-0 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-pink-400" /> สิทธิ์ปล่อยเช่าถาวร
                </h2>
                <p className="text-xs text-[#735c50] mt-0.5">เลือกซื้อสิทธิ์การใช้งานประเภทถาวรตลอดชีพ</p>
              </div>

              {/* Mobile-first: stacked layout */}
              <div className="flex flex-col gap-4">
                
                {/* Selector List */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-xs font-bold text-[#422f25] uppercase tracking-tight">เลือกสิทธิ์ที่ต้องการ</h3>
                  
                  <div className="flex flex-col gap-3">
                    {MOCK_RENTALS.map((rental) => (
                      <div 
                        key={rental.id}
                        onClick={() => setSelectedRental(rental)}
                        className={`glass-panel p-4.5 rounded-xl border transition-all cursor-pointer text-left flex flex-col justify-between gap-3 ${
                          selectedRental?.id === rental.id 
                            ? 'border-pink-400 bg-pink-50/60 shadow-md ring-1 ring-pink-400' 
                            : 'bg-white hover:bg-pink-50/20 border-pink-200'
                        }`}
                      >
                        <div>
                          <div className="flex justify-between items-center gap-2">
                            <span className="text-[9px] font-bold tracking-wider bg-[#9c6bb3] text-white px-2 py-0.5 rounded">
                              {rental.category}
                            </span>
                            <span className="text-[9px] font-semibold bg-[#b86d9a] text-white px-2 py-0.5 rounded">
                              {rental.rateDesc}
                            </span>
                          </div>
                          
                          <h4 className="font-bold text-[#422f25] text-xs mt-2 mb-1.5 leading-snug">
                            {rental.name}
                          </h4>
                          
                          <p className="text-[10px] text-[#735c50] leading-relaxed line-clamp-2">
                            {rental.desc}
                          </p>
                        </div>

                        <div className="flex items-center justify-between border-t border-pink-100 pt-2 text-[10px] text-[#735c50]">
                          <span>ระยะเวลาสิทธิ์:</span>
                          <span className="font-bold text-pink-500">ถาวรตลอดชีพ</span>
                        </div>

                        <div className="flex items-center justify-between border-t border-pink-100 pt-2 text-[10px] text-[#735c50]">
                          <span>ราคาสิทธิ์ถาวร:</span>
                          <span className="font-extrabold text-amber-500 text-xs">{rental.price} เครดิต</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>


                {/* Calculator Panel Box */}
                {selectedRental && (
                  <div className="glass-panel p-5 rounded-2xl border border-pink-300/40 bg-white/95 shadow-md flex flex-col justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 border-b border-pink-100 pb-2.5 mb-3">
                        <Info className="w-4 h-4 text-pink-400" />
                        <h3 className="font-bold text-[#422f25] text-xs m-0">
                          สรุปรายการรับสิทธิ์ถาวร
                        </h3>
                      </div>

                      <div className="flex flex-col gap-3 text-xs text-left">
                        <div>
                          <p className="text-[#735c50] font-semibold mb-0.5">สิทธิ์ถาวรที่เลือก:</p>
                          <p className="font-bold text-[#422f25]">{selectedRental.name}</p>
                        </div>

                        <div>
                          <p className="text-[#735c50] font-semibold mb-0.5">ประเภทสิทธิ์:</p>
                          <p className="font-bold text-pink-500 flex items-center gap-1">
                            <span>🌟</span> สิทธิ์ปล่อยเช่าถาวรตลอดชีพ (Lifetime Lease)
                          </p>
                        </div>

                        <div className="bg-pink-50/50 rounded-xl p-3 border border-pink-100 flex flex-col gap-1">
                          <p className="text-[10px] text-[#735c50] leading-relaxed m-0">
                            เป็นการซื้อขาดสิทธิ์ถาวร ไม่มีวันหมดอายุ ไม่ต้องต่ออายุรายวันหรือรายปี สามารถใช้งานและเข้าถึงทรัพยากรที่กำหนดได้ตลอดชีพ
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-pink-100 pt-3 flex flex-col gap-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-[#735c50] font-semibold">ราคาสิทธิ์ถาวรสุทธิ:</span>
                        <span className="text-lg font-extrabold text-amber-500">
                          {selectedRental.price} เครดิต
                        </span>
                      </div>

                      <button 
                        onClick={() => {
                          simulateBuyProduct(`ซื้อสิทธิ์ถาวร ${selectedRental.name}`, selectedRental.price);
                        }}
                        className="w-full bg-gradient-to-r from-pink-400 to-amber-400 hover:from-pink-500 hover:to-amber-500 text-white font-bold py-2.5 rounded-xl text-xs cursor-pointer shadow-sm transition-all flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>ชำระเงินและรับสิทธิ์ถาวร</span>
                      </button>
                    </div>
                  </div>
                )}

              </div>

            </div>
          )}

          {/* --- PAGE 5: PARTNER BRANDS REPRESENTATIVES --- */}
          {activeTab === 5 && (
            <div className="flex flex-col gap-4 text-left">
              
              <div className="glass-panel p-4 rounded-2xl shadow-sm">
                <h2 className="text-base font-bold text-[#422f25] m-0 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-pink-400" /> ฟอนต์จากบ้านพันธมิตร
                </h2>
                <p className="text-xs text-[#735c50] mt-0.5">ตัวแทนจำหน่ายฟอนต์ลิขสิทธิ์ถูกต้องของบ้านพันธมิตร</p>
              </div>

              {/* Partner cards - single column stack */}
              <div className="flex flex-col gap-4">
                {Object.keys(MOCK_PARTNER_HOUSES).map((houseName) => {
                  const isOrange = houseName.includes("ส้ม");
                  const isBlue = houseName.includes("ฟ้า");
                  
                  const borderClass = isOrange ? "border-t-orange-400" : isBlue ? "border-t-sky-400" : "border-t-pink-400";
                  const buttonBg = isOrange ? "bg-orange-400 hover:bg-orange-500" : isBlue ? "bg-sky-400 hover:bg-sky-500" : "bg-pink-400 hover:bg-pink-500";
                  const itemBg = isOrange ? "bg-orange-50/50 border border-orange-100" : isBlue ? "bg-sky-50/50 border border-sky-100" : "bg-pink-50/50 border border-pink-100";
                  
                  return (
                    <div 
                      key={houseName}
                      className={`glass-panel bg-white/95 p-4.5 rounded-2xl border flex flex-col justify-between gap-4 text-left shadow-sm border-t-4 ${borderClass}`}
                    >
                      <div>
                        <h3 className="font-bold text-[#422f25] text-xs m-0 mb-2.5 flex items-center justify-between">
                          <span>{houseName}</span>
                          <span className="text-[9px] font-bold text-pink-500 uppercase">Partner House</span>
                        </h3>
                        
                        <div className="flex flex-col gap-2">
                          {MOCK_PARTNER_HOUSES[houseName].map((item) => (
                            <div key={item.id} className={`${itemBg} rounded-lg p-2.5 flex flex-col gap-0.5`}>
                              <div className="flex justify-between items-center text-[11px]">
                                <span className="font-semibold text-[#422f25]">{item.name}</span>
                                <span className="font-bold text-amber-500">{item.price} เครดิต</span>
                              </div>
                              <p className="text-[9px] text-[#735c50] leading-normal">{item.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button 
                        onClick={() => {
                          showNotification(`นำคุณมายังช่องทางการติดต่อสั่งซื้อฟอนต์จาก ${houseName}`, "success");
                          setActiveTab(7);
                        }}
                        className={`w-full ${buttonBg} text-white font-bold py-2 rounded-xl text-xs cursor-pointer shadow-sm transition-all flex items-center justify-center gap-0.5 border-none`}
                      >
                        <span>สั่งซื้อฟอนต์บ้านนี้</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* --- PAGE 6: HELP GUIDE --- */}
          {activeTab === 6 && (
            <div className="flex flex-col gap-4 text-left">
              
              <div className="glass-panel p-4 rounded-2xl shadow-sm">
                <h2 className="text-base font-bold text-[#422f25] m-0 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-pink-400" /> แก้ไขกรณีไลน์หลุดกลุ่ม
                </h2>
                <p className="text-xs text-[#735c50] mt-0.5">ขั้นตอนแก้ปัญหาและวิธีแจ้งเรื่องความช่วยเหลือ</p>
              </div>

              {/* Instructions steps card */}
              <div className="glass-panel p-6.5 rounded-2xl flex flex-col gap-5 relative overflow-hidden shadow-sm border-purple-500/20">
                
                <div className="flex flex-col gap-4">
                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded bg-purple-900/60 border border-purple-500/30 flex items-center justify-center font-bold text-purple-200 text-xs flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-xs m-0">ตรวจสอบสถานะแอป LINE</h3>
                      <p className="text-[11px] text-purple-300 leading-relaxed mt-0.5">
                        ตรวจสอบบัญชีไลน์และการเชื่อมต่อเครือข่ายอินเทอร์เน็ตของเครื่องคุณลูกค้าก่อนทำรายการต่อไป
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded bg-purple-900/60 border border-purple-500/30 flex items-center justify-center font-bold text-purple-200 text-xs flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-xs m-0">เตรียมประวัติการสมัครสมาชิกในระบบ</h3>
                      <p className="text-[11px] text-purple-300 leading-relaxed mt-0.5">
                        เตรียมหน้าจอประวัติสมาชิกหรืออีเมลที่คุณกรอกสมัครบัญชีในเว็บบอร์ด เพื่อใช้อ้างอิงตรวจสอบสิทธิ์
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="w-6 h-6 rounded bg-purple-900/60 border border-purple-500/30 flex items-center justify-center font-bold text-purple-200 text-xs flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-xs m-0">คลิกขอบริการติดต่อเพื่อดึงสิทธิ์ด่วน</h3>
                      <p className="text-[11px] text-purple-300 leading-relaxed mt-0.5">
                        กดปุ่มลัดด้านล่างเพื่อเรียกเปิดหน้าต่างกรอกรายงานตรวจสอบความช่วยเหลือในระบบค่ะ
                      </p>
                    </div>
                  </div>
                </div>

                {/* --- EMERGENCY POPUP TRIGGER BUTTON --- */}
                <div className="border-t border-purple-550 pt-5 flex justify-center">
                  <button 
                    onClick={() => setIsHelpModalOpen(true)}
                    className="bg-gradient-to-r from-red-500 via-pink-500 to-purple-600 hover:opacity-95 text-white font-semibold px-6 py-2.5 rounded-lg text-xs shadow transition-all cursor-pointer flex items-center gap-1.5 animate-pulse"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-red-200" />
                    <span>แจ้งเรื่องด่วน: หลุดกลุ่มในเครือ Wish</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* --- PAGE 7: CONTACT & POLICIES --- */}
          {activeTab === 7 && (
            <div className="flex flex-col gap-4 text-left">
              
              <div className="glass-panel p-4 rounded-2xl shadow-sm">
                <h2 className="text-base font-bold text-[#422f25] m-0 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-pink-400" /> ช่องทางติดต่อ
                </h2>
                <p className="text-xs text-[#735c50] mt-0.5">ช่องทางติดต่อและข้อมูลสำคัญของทางร้าน</p>
              </div>

              {/* All content stacked vertically for mobile */}
              <div className="flex flex-col gap-4">
                  
                  {/* Quick Access to Other Pages */}
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      onClick={() => setActiveTab(5)}
                      className="glass-panel p-3.5 rounded-xl border border-purple-500/20 hover:border-purple-400 bg-slate-950/40 text-left flex items-center gap-3 transition-all cursor-pointer group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-all">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-xs m-0">ฟอนต์บ้านอื่นๆ</h4>
                        <p className="text-[9px] text-purple-300 m-0">รวมผลงานบ้านพันธมิตร</p>
                      </div>
                    </button>

                    <button 
                      onClick={() => setActiveTab(6)}
                      className="glass-panel p-3.5 rounded-xl border border-purple-500/20 hover:border-purple-400 bg-slate-950/40 text-left flex items-center gap-3 transition-all cursor-pointer group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-red-500 to-pink-600 flex items-center justify-center text-white flex-shrink-0 group-hover:scale-105 transition-all">
                        <HelpCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-xs m-0">แก้ไขไลน์หลุดกลุ่ม</h4>
                        <p className="text-[9px] text-purple-300 m-0">ขั้นตอนดึงกลับเข้ากลุ่ม</p>
                      </div>
                    </button>
                  </div>

                  {/* WARNING RULES BOARD */}
                  <div className="glass-panel p-5 rounded-2xl border border-rose-500/30 bg-rose-950/20 text-left flex gap-3.5 shadow-sm">
                    <div className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center flex-shrink-0 shadow">
                      <AlertCircle className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <h3 className="font-bold text-rose-350 text-xs m-0">นโยบายการให้บริการ: งดเร่งงดวีนนะคะ</h3>
                      <p className="text-[11px] text-purple-250 leading-relaxed font-semibold">
                        แอดมินดูแลลูกค้าตามลำดับคิวเพื่อความถูกต้องสูงสุดและรักษาสิทธิ์ความเท่าเทียมของสมาชิกทุกคน 
                        **กรุณารอการติดต่อกลับภายใน 12 ถึง 24 ชั่วโมงนะคะ**
                      </p>
                      
                      <div className="mt-1 flex items-center gap-1.5 bg-rose-900/40 text-rose-300 px-3 py-1 rounded-lg text-[10px] w-fit font-bold shadow-sm border border-rose-500/30">
                        <Clock className="w-3 h-3 animate-spin" />
                        <span>เวลาทำการระบบซัพพอร์ต: 09:00 - 22:00 น. (ทุกวัน)</span>
                      </div>
                    </div>
                  </div>

                  {/* EMBED OF REAL CONTACT CARD GRAPHICS FROM USER */}
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xs font-bold text-[#422f25]">📋 การ์ดช่องทางติดต่อหลัก</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div 
                        onClick={() => setLightboxImage("/page2/กรอบคอนแทค/615530562799010103.jpg")}
                        className="glass-panel p-1 rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-400 shadow-sm cursor-zoom-in group"
                      >
                        <div className="aspect-[4/3] rounded-lg bg-slate-900 overflow-hidden relative">
                          <img 
                            src={getAssetUrl("/page2/กรอบคอนแทค/615530562799010103.jpg")} 
                            alt="Contact Banner 1" 
                            className="w-full h-full object-cover group-hover:scale-102 transition-all duration-300"
                          />
                        </div>
                      </div>

                      <div 
                        onClick={() => setLightboxImage("/page2/กรอบคอนแทค/615530671381151868.jpg")}
                        className="glass-panel p-1 rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-400 shadow-sm cursor-zoom-in group"
                      >
                        <div className="aspect-[4/3] rounded-lg bg-slate-900 overflow-hidden relative">
                          <img 
                            src={getAssetUrl("/page2/กรอบคอนแทค/615530671381151868.jpg")} 
                            alt="Contact Banner 2" 
                            className="w-full h-full object-cover group-hover:scale-102 transition-all duration-300"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Social Channel Links Grid */}
                  <div className="grid grid-cols-3 gap-3">
                    
                    <a 
                      href="https://facebook.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="glass-panel p-4 rounded-xl flex flex-col items-center gap-2 hover:bg-slate-900 text-blue-400 transition-all shadow-sm text-center border-blue-500/30"
                    >
                      <Globe className="w-5 h-5 text-blue-400" />
                      <span className="text-[11px] font-bold text-white">Facebook</span>
                      <span className="text-[9px] text-purple-300">By Wish Official</span>
                      <span className="mt-1 text-[9px] bg-blue-900/60 text-blue-200 px-2 py-0.5 rounded flex items-center gap-0.5 font-semibold">
                        ส่งแชท <ExternalLink className="w-2 h-2 text-blue-400" />
                      </span>
                    </a>

                    <a 
                      href="https://line.me" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="glass-panel p-4 rounded-xl flex flex-col items-center gap-2 hover:bg-slate-900 text-emerald-400 transition-all shadow-sm text-center border-emerald-500/30"
                    >
                      <MessageSquare className="w-5 h-5 text-emerald-400" />
                      <span className="text-[11px] font-bold text-white">LINE ID</span>
                      <span className="text-[9px] text-purple-300">@bywish</span>
                      <span className="mt-1 text-[9px] bg-emerald-900/60 text-emerald-250 px-2 py-0.5 rounded flex items-center gap-0.5 font-semibold">
                        เพิ่มเพื่อน <ExternalLink className="w-2 h-2 text-emerald-400" />
                      </span>
                    </a>

                    <a 
                      href="https://instagram.com" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="glass-panel p-4 rounded-xl flex flex-col items-center gap-2 hover:bg-slate-900 text-pink-400 transition-all shadow-sm text-center border-pink-500/30"
                    >
                      <Camera className="w-5 h-5 text-pink-400" />
                      <span className="text-[11px] font-bold text-white">Instagram</span>
                      <span className="text-[9px] text-purple-300">bywish.design</span>
                      <span className="mt-1 text-[9px] bg-pink-900/60 text-pink-250 px-2 py-0.5 rounded flex items-center gap-0.5 font-semibold">
                        ติดตาม <ExternalLink className="w-2 h-2 text-pink-400" />
                      </span>
                    </a>

                  </div>

                  {/* Contact form card */}
                <div className="glass-panel p-4 rounded-2xl border border-pink-100 shadow-sm flex flex-col gap-3">
                  <h3 className="font-bold text-[#422f25] text-sm m-0 flex items-center gap-1.5 border-b border-pink-100 pb-2.5">
                    💌 ฝากข้อความถึงทีมงาน
                  </h3>

                  <form onSubmit={handleContactSubmit} className="flex flex-col gap-3 text-left">
                    <div className="text-[10px]">
                      <label className="block text-purple-300 font-bold mb-1">ชื่อผู้ติดต่อ:</label>
                      <input 
                        type="text" 
                        required
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="กรอกชื่อของคุณ..." 
                        className="glass-input p-2 rounded-lg w-full font-semibold text-white text-xs" 
                      />
                    </div>

                    <div className="text-[10px]">
                      <label className="block text-purple-300 font-bold mb-1">หัวข้อปัญหา:</label>
                      <select 
                        value={contactTopic}
                        onChange={(e) => setContactTopic(e.target.value)}
                        className="glass-input p-2 rounded-lg w-full text-purple-300 text-xs"
                      >
                        <option value="แจ้งเรื่องทั่วไป">แจ้งเรื่องทั่วไป / สอบถาม</option>
                        <option value="ไลน์หลุดจากกลุ่ม">หลุดกลุ่มในเครือ</option>
                        <option value="สมัครตัวแทนจำหน่าย">สมัครตัวแทนจำหน่าย</option>
                      </select>
                    </div>

                    <div className="text-[10px]">
                      <label className="block text-purple-300 font-bold mb-1">รายละเอียดข้อความ:</label>
                      <textarea 
                        required
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                        placeholder="กรอกข้อมูลไอดีติดต่อกลับ..." 
                        rows={3}
                        className="glass-input p-2 rounded-lg w-full text-white text-xs" 
                      />
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 text-white font-bold py-2 rounded-lg text-xs shadow transition-all cursor-pointer hover:shadow-lg"
                    >
                      ส่งข้อความ
                    </button>
                  </form>
                </div>

              </div>

            </div>
          )}

          {/* --- FOOTER CONTENT --- */}
          <footer className="glass-panel mt-12 py-6 px-4 border-t border-purple-500/20 text-center text-xs text-purple-300">
            <p className="m-0 font-medium">© 2026 By Wish Network. All Rights Reserved.</p>
            <p className="text-[9px] text-purple-400 mt-1 font-semibold uppercase tracking-wider">
              Premium Magic Amusement Park Aesthetic Platform
            </p>
          </footer>

        </main>

        {/* Bottom Navigation Tab Bar */}
        <div className="bottom-tab-bar-container">
          <nav className="bottom-tab-bar">
            <button 
              onClick={() => setActiveTab(1)}
              className={`bottom-tab-item ${activeTab === 1 ? 'active' : ''}`}
            >
              <Home className="w-5 h-5" />
              <span>หน้าแรก</span>
            </button>

            <button 
              onClick={() => setActiveTab(2)}
              className={`bottom-tab-item ${activeTab === 2 ? 'active' : ''}`}
            >
              <Users className="w-5 h-5" />
              <span>เครือกลุ่ม</span>
            </button>

            <button 
              onClick={() => setActiveTab(3)}
              className={`bottom-tab-item ${activeTab === 3 ? 'active' : ''}`}
            >
              <Type className="w-5 h-5" />
              <span>เครือฟอนต์</span>
            </button>

            <button 
              onClick={() => setActiveTab(4)}
              className={`bottom-tab-item ${activeTab === 4 ? 'active' : ''}`}
            >
              <Calendar className="w-5 h-5" />
              <span>ปล่อยเช่า</span>
            </button>

            <button 
              onClick={() => setActiveTab(7)}
              className={`bottom-tab-item ${[5, 6, 7].includes(activeTab) ? 'active' : ''}`}
            >
              <Phone className="w-5 h-5" />
              <span>ติดต่อ/อื่นๆ</span>
            </button>
          </nav>
        </div>

      </div>

      {/* Close the phone mockup viewport */}
      </div>

      {/* ======================================================== */}
      {/* ============ MODAL DIALOGS (AUTH & CREDIT) ============= */}
      {/* ======================================================== */}

      {/* LOGIN MODAL */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel p-5.5 rounded-2xl w-full max-w-xs border border-purple-500/35 shadow-lg relative animate-scaleIn text-left">
            <button 
              onClick={() => setIsLoginOpen(false)}
              className="absolute top-4 right-4 text-purple-400 hover:text-purple-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-bold text-sm text-yellow-300 m-0 mb-1">เข้าสู่ระบบสมาชิก</h3>
            <p className="text-[10px] text-purple-300 mb-4">เข้าใช้งานบัญชีจำลองในเครื่องของคุณลูกค้า</p>

            <form onSubmit={handleLogin} className="flex flex-col gap-3 text-left">
              <div className="text-[10px]">
                <label className="block text-purple-300 font-bold mb-1">อีเมลสมาชิก:</label>
                <input 
                  type="email" 
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="name@example.com" 
                  className="glass-input p-2 rounded-lg w-full text-xs text-white" 
                />
              </div>

              <div className="text-[10px]">
                <label className="block text-purple-300 font-bold mb-1">รหัสผ่าน:</label>
                <input 
                  type="password" 
                  required
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="กรอกรหัสผ่าน..." 
                  className="glass-input p-2 rounded-lg w-full text-xs text-white" 
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2.5 rounded-lg text-xs mt-1.5 cursor-pointer hover:shadow"
              >
                เข้าสู่ระบบ
              </button>
            </form>

            <p className="text-center text-[10px] text-purple-300 mt-4">
              ยังไม่มีบัญชี? {" "}
              <button 
                onClick={() => { setIsLoginOpen(false); setIsRegisterOpen(true); }}
                className="text-pink-400 font-bold hover:underline cursor-pointer"
              >
                สมัครใหม่ที่นี่
              </button>
            </p>
          </div>
        </div>
      )}

      {/* REGISTER MODAL */}
      {isRegisterOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel p-5.5 rounded-2xl w-full max-w-xs border border-purple-500/35 shadow-lg relative animate-scaleIn text-left">
            <button 
              onClick={() => setIsRegisterOpen(false)}
              className="absolute top-4 right-4 text-purple-400 hover:text-purple-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-bold text-sm text-yellow-300 m-0 mb-1">ลงทะเบียนสมาชิก</h3>
            <p className="text-[10px] text-purple-300 mb-4">สร้างบัญชีจำลองเพื่อบันทึกสิทธิ์ซื้อสินค้า</p>

            <form onSubmit={handleRegister} className="flex flex-col gap-3 text-left">
              <div className="text-[10px]">
                <label className="block text-purple-300 font-bold mb-1">กรอกอีเมลสมาชิก:</label>
                <input 
                  type="email" 
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="name@example.com" 
                  className="glass-input p-2 rounded-lg w-full text-xs text-white" 
                />
              </div>

              <div className="text-[10px]">
                <label className="block text-purple-300 font-bold mb-1">ตั้งรหัสผ่าน:</label>
                <input 
                  type="password" 
                  required
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  placeholder="มากกว่า 6 อักษร..." 
                  className="glass-input p-2 rounded-lg w-full text-xs text-white" 
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-2.5 rounded-lg text-xs mt-2 cursor-pointer hover:shadow"
              >
                ลงทะเบียน
              </button>
            </form>

            <p className="text-center text-[10px] text-purple-300 mt-4">
              มีบัญชีแล้ว? {" "}
              <button 
                onClick={() => { setIsRegisterOpen(false); setIsLoginOpen(true); }}
                className="text-pink-400 font-bold hover:underline cursor-pointer"
              >
                ล็อกอินที่นี่
              </button>
            </p>
          </div>
        </div>
      )}

      {/* TOP-UP CREDIT MODAL */}
      {isCreditOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel p-5.5 rounded-2xl w-full max-w-sm border border-purple-500/35 shadow-lg relative animate-scaleIn text-left">
            <button 
              onClick={() => setIsCreditOpen(false)}
              className="absolute top-4 right-4 text-purple-400 hover:text-purple-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-bold text-sm text-yellow-300 m-0 mb-1">ระบบจำลองเติมเครดิต</h3>
            <p className="text-[10px] text-purple-300 mb-4">จำลองการรับสิทธิ์เติมเครดิตบัญชีผ่านการแสกน QR Code</p>

            <form onSubmit={handleTopUpSubmit} className="flex flex-col gap-3 text-left">
              
              {/* Select Package Rate */}
              <div className="text-[10px]">
                <label className="block text-purple-300 font-bold mb-1.5">เลือกยอดเครดิตที่ต้องการ:</label>
                <div className="grid grid-cols-5 gap-1.5">
                  {[50, 100, 300, 500, 1000].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setTopUpAmount(amt)}
                      className={`py-1.5 rounded font-bold text-[10px] transition-all border cursor-pointer text-center ${
                        topUpAmount === amt 
                          ? 'bg-purple-600 text-white border-purple-500 shadow-sm' 
                          : 'bg-slate-900 border-purple-900 text-purple-300 hover:bg-slate-800'
                      }`}
                    >
                      {amt}
                    </button>
                  ))}
                </div>
              </div>

              {/* PromptPay QR Code container */}
              <div className="bg-slate-900 rounded-xl p-3 border border-purple-500/20 flex flex-col items-center justify-center shadow-inner">
                <div className="bg-blue-600 text-white font-bold text-[8px] px-2.5 py-1 rounded mb-2 uppercase tracking-widest">
                  PromptPay QR
                </div>
                
                <div className="w-32 h-32 bg-white border border-purple-100 rounded-lg flex flex-col items-center justify-center p-2 relative shadow-inner">
                  <div className="w-20 h-20 bg-purple-50/20 border border-dashed border-purple-300 rounded flex flex-col items-center justify-center">
                    <CreditCard className="w-6 h-6 text-purple-500" />
                  </div>
                  <span className="text-[9px] font-bold text-slate-800 mt-2">
                    ยอดเงิน: {topUpAmount}.00 บาท
                  </span>
                </div>
              </div>

              {/* Mock upload slip */}
              <div className="text-[10px]">
                <label className="block text-purple-300 font-bold mb-1">ไฟล์สลิปชำระเงินจำลอง (ทางเลือก):</label>
                <div className="flex items-center gap-1.5">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={(e) => setSimulatedSlip(e.target.files[0]?.name || "slip.png")}
                    className="glass-input p-1 rounded text-[9px] text-purple-300 flex-1"
                  />
                  {simulatedSlip && (
                    <span className="text-[9px] text-yellow-300 font-bold flex items-center">
                      <Check className="w-3.5 h-3.5" /> ตรวจพบ
                    </span>
                  )}
                </div>
              </div>

              <button 
                type="submit"
                disabled={isProcessingPayment}
                className="w-full bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 text-white font-bold py-2.5 rounded-lg text-xs mt-1 cursor-pointer hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-1"
              >
                {isProcessingPayment ? (
                  <>
                    <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>กำลังตรวจสอบความถูกต้อง...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>ยืนยันสลิปจำลอง (รับเครดิตทันที)</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* LINE DROP OUTAGE POPUP WARNING MODAL */}
      {isHelpModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel p-5.5 rounded-2xl w-full max-w-sm border border-rose-500/30 shadow-lg relative animate-scaleIn text-left">
            <button 
              onClick={() => setIsHelpModalOpen(false)}
              className="absolute top-4 right-4 text-purple-400 hover:text-purple-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-rose-450 mb-2">
              <AlertTriangle className="w-4 h-4" />
              <h3 className="font-bold text-sm m-0">
                แจ้งเรื่องหลุดกลุ่มเครือ Wish
              </h3>
            </div>
            
            <p className="text-[11px] text-purple-300 leading-relaxed mb-3">
              กรุณากรอกหัวข้อรายงานเพื่อความรวดเร็วในการประสานงานดึงลูกค้าเข้ากลุ่มสิทธิ์ไลน์กลุ่มเดิมของท่าน
            </p>

            <div className="bg-rose-950/40 border border-rose-900/50 p-3.5 rounded-xl text-[11px] text-rose-200 flex flex-col gap-2 mb-3.5 font-medium shadow-inner">
              <span className="font-bold text-rose-350">หลักฐานที่ควรส่งในช่องแชท:</span>
              <ul className="list-disc list-inside space-y-0.5 text-[10px] text-rose-300 font-semibold">
                <li>อีเมลที่สมัครสมาชิกในระบบ</li>
                <li>ชื่อกลุ่มไลน์ที่คุณหลุด (เช่น กลุ่มบล็อกพาสเทล)</li>
                <li>QR Code สำหรับให้แอดมินเชิญกลับ</li>
              </ul>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <button 
                onClick={() => setIsHelpModalOpen(false)}
                className="flex-1 bg-slate-900 border border-purple-900/30 hover:bg-slate-800 text-purple-300 font-semibold py-2.5 rounded-lg text-center transition-all cursor-pointer"
              >
                ปิดหน้านี้
              </button>
              
              <button 
                onClick={() => {
                  setIsHelpModalOpen(false);
                  setActiveTab(7);
                  showNotification("ระบบพาคุณมายังหน้าติดต่อสื่อสาร เรียบร้อยแล้ว", "info");
                }}
                className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold py-2.5 rounded-lg text-center shadow transition-all cursor-pointer flex items-center justify-center gap-1"
              >
                <Phone className="w-3 h-3" />
                <span>ไปหน้าติดต่อ</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- LIGHTBOX MODAL FOR PORTFOLIO ENLARGEMENTS --- */}
      {lightboxImage && (
        <div 
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out animate-fadeIn"
        >
          <div className="relative max-w-4xl max-h-[85vh] w-full flex flex-col items-center gap-3">
            <button 
              onClick={() => setLightboxImage(null)}
              className="absolute -top-10 right-0 text-white bg-slate-900/60 p-2 rounded-full border border-white/20 cursor-pointer shadow hover:bg-slate-800"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="w-full h-full flex items-center justify-center bg-slate-950 p-2 rounded-2xl border border-purple-500/20 shadow-2xl relative overflow-hidden">
              <img 
                src={getAssetUrl(lightboxImage)} 
                alt="Enlarged Magical View" 
                className="max-h-[80vh] max-w-full object-contain rounded-xl"
              />
            </div>
            <p className="text-xs text-purple-300 font-medium tracking-tight bg-slate-950/80 px-4 py-1.5 rounded-full border border-purple-500/20">
              คลิกที่ใดก็ได้ในจอด้านนอกเพื่อปิดการรับชม
            </p>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
