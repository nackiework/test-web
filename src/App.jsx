import React, { useState, useEffect } from 'react';
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
  User, 
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
  DollarSign,
  Box,
  Smile,
  Globe,
  Camera,
  Layers,
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
  { id: 1, name: "เช่าสิทธิ์กลุ่มบล็อกพรีเมียม (Wish Block System)", category: "ปล่อยเช่าบล็อก", basePrice: 29, duration: 7, rateDesc: "29 เครดิต / 7 วัน", desc: "เข้าถึงคลังของตกแต่งบล็อกทุกประเภท พร้อมอัปเดตใหม่ๆ ตลอดสัปดาห์" },
  { id: 2, name: "เช่าสิทธิ์ฟอนต์ใช้งานส่วนตัวยกเซ็ต", category: "ปล่อยเช่าแนวฟอนต์", basePrice: 89, duration: 30, rateDesc: "89 เครดิต / 30 วัน", desc: "เช่าลิขสิทธิ์ฟอนต์ Wish ทุกแบบไปใช้งานออกแบบส่วนตัวได้นาน 1 เดือนเต็ม" },
  { id: 3, name: "เช่าเหมาคลังกลุ่มตูน + ของตกแต่ง", category: "ปล่อยเช่าบล็อก", basePrice: 59, duration: 15, rateDesc: "59 เครดิต / 15 วัน", desc: "แพ็กเกจสุดคุ้มสำหรับครีเอเตอร์สายแต่งภาพ ดึงรูปไปแต่งรีวิวสะใจครึ่งเดือน" },
  { id: 4, name: "VIP All-Access Unlimited Pass", category: "แพ็กเกจเช่ารายเดือน", basePrice: 499, duration: 365, rateDesc: "499 เครดิต / ปี", desc: "ที่สุดแห่งความคุ้มค่า! ปล่อยเช่าลิขสิทธิ์ทุกอย่างในเครือ Wish ตลอดระยะเวลา 1 ปี" }
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
  const [currentUser, setCurrentUser] = useState(null);
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
  const [selectedRental, setSelectedRental] = useState(null);
  const [rentalDays, setRentalDays] = useState(7);

  // Page 6 Urgent Modal
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  // Lightbox Modal for Full Image View
  const [lightboxImage, setLightboxImage] = useState(null);

  // Contact Form Simulated State
  const [contactName, setContactName] = useState("");
  const [contactTopic, setContactTopic] = useState("แจ้งเรื่องทั่วไป");
  const [contactMessage, setContactMessage] = useState("");

  // Load user from LocalStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('bywish_user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Error loading user", e);
      }
    }
  }, []);

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
    showNotification(`ซื้อ "${productName}" สำเร็จ หัก ${price} เครดิต คงเหลือ ${updatedUser.credits} เครดิต`, "success");
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

  useEffect(() => {
    if (MOCK_RENTALS.length > 0 && !selectedRental) {
      setSelectedRental(MOCK_RENTALS[0]);
    }
  }, []);

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
    <div className="min-h-screen flex flex-col justify-between font-sans selection:bg-purple-200">
      
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

      {/* --- TOP BAR HEADER --- */}
      <header className="glass-panel sticky top-0 z-40 px-6 md:px-12 py-4 flex items-center justify-between border-b shadow-sm">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => setActiveTab(1)}>
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-pink-400 via-purple-500 to-indigo-500 flex items-center justify-center text-white font-medium text-base shadow-sm animate-pulse">
            W
          </div>
          <div className="text-left">
            <h1 className="text-lg font-bold tracking-tight m-0 bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              By Wish Network
            </h1>
            <p className="text-[9px] text-purple-300 tracking-widest font-semibold uppercase">Magic Amusement Park Theme</p>
          </div>
        </div>

        {/* Member Navigation with subtle pastel colors */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-3 bg-slate-900/60 px-3.5 py-1.5 rounded-xl border border-purple-500/30 text-xs shadow-sm">
              <div className="flex flex-col text-left">
                <span className="text-[9px] text-purple-300/80 truncate max-w-[100px] font-medium">{currentUser.email}</span>
                <span className="font-bold text-yellow-300 flex items-center gap-1">
                  <span>{currentUser.credits}</span> 
                  <span className="text-[9px] font-normal text-purple-300">เครดิต</span>
                </span>
              </div>
              <button 
                onClick={() => setIsCreditOpen(true)}
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-650 hover:to-purple-700 text-white font-medium py-1 px-3 rounded-lg shadow transition-all text-[11px] flex items-center gap-1 cursor-pointer"
              >
                <CreditCard className="w-3 h-3" />
                <span>เติมเครดิต</span>
              </button>
              <button 
                onClick={handleLogout}
                className="p-1 text-purple-300 hover:text-rose-400 rounded transition-all cursor-pointer"
                title="ออกจากระบบ"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsLoginOpen(true)}
                className="flex items-center gap-1 bg-purple-950/60 hover:bg-purple-900/80 text-purple-200 border border-purple-500/50 font-semibold py-1.5 px-3.5 rounded-lg transition-all text-xs cursor-pointer shadow-sm"
              >
                <LogIn className="w-3 h-3 text-purple-400" />
                <span>เข้าสู่ระบบ</span>
              </button>
              <button 
                onClick={() => setIsRegisterOpen(true)}
                className="flex items-center gap-1 bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-1.5 px-3.5 rounded-lg transition-all text-xs cursor-pointer shadow-sm"
              >
                <User className="w-3 h-3 text-purple-250" />
                <span>สมัครสมาชิก</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* --- MAIN PAGE LAYOUT --- */}
      <div className="flex-1 max-w-6xl w-full mx-auto px-6 md:px-8 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* SIDEBAR NAVIGATION - MINIMAL SLEEK LIST */}
        <aside className="lg:w-56 w-full flex flex-col gap-2">
          <nav className="glass-panel p-3 rounded-2xl flex lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1.5 scrollbar-none shadow-sm">
            
            <button 
              onClick={() => setActiveTab(1)}
              className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl font-medium text-xs tracking-tight transition-all whitespace-nowrap cursor-pointer w-full text-left ${
                activeTab === 1 
                  ? 'bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 text-white shadow-sm font-semibold' 
                  : 'text-purple-700 hover:bg-purple-100/40 hover:text-purple-950'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              <span>1. แนะนำตัว & ต้อนรับ</span>
            </button>

            <button 
              onClick={() => setActiveTab(2)}
              className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl font-medium text-xs tracking-tight transition-all whitespace-nowrap cursor-pointer w-full text-left ${
                activeTab === 2 
                  ? 'bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 text-white shadow-sm font-semibold' 
                  : 'text-purple-700 hover:bg-purple-100/40 hover:text-purple-950'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>2. เครือกลุ่ม By Wish</span>
            </button>

            <button 
              onClick={() => setActiveTab(3)}
              className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl font-medium text-xs tracking-tight transition-all whitespace-nowrap cursor-pointer w-full text-left ${
                activeTab === 3 
                  ? 'bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 text-white shadow-sm font-semibold' 
                  : 'text-purple-700 hover:bg-purple-100/40 hover:text-purple-950'
              }`}
            >
              <Type className="w-3.5 h-3.5" />
              <span>3. เครือฟอนต์ By Wish</span>
            </button>

            <button 
              onClick={() => setActiveTab(4)}
              className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl font-medium text-xs tracking-tight transition-all whitespace-nowrap cursor-pointer w-full text-left ${
                activeTab === 4 
                  ? 'bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 text-white shadow-sm font-semibold' 
                  : 'text-purple-700 hover:bg-purple-100/40 hover:text-purple-950'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>4. ของปล่อยเช่า</span>
            </button>

            <button 
              onClick={() => setActiveTab(5)}
              className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl font-medium text-xs tracking-tight transition-all whitespace-nowrap cursor-pointer w-full text-left ${
                activeTab === 5 
                  ? 'bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 text-white shadow-sm font-semibold' 
                  : 'text-purple-700 hover:bg-purple-100/40 hover:text-purple-950'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>5. รวมฟอนต์บ้านอื่น</span>
            </button>

            <button 
              onClick={() => setActiveTab(6)}
              className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl font-medium text-xs tracking-tight transition-all whitespace-nowrap cursor-pointer w-full text-left ${
                activeTab === 6 
                  ? 'bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 text-white shadow-sm font-semibold' 
                  : 'text-purple-700 hover:bg-purple-100/40 hover:text-purple-950'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>6. แก้ไขไลน์หลุดกลุ่ม</span>
            </button>

            <button 
              onClick={() => setActiveTab(7)}
              className={`flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl font-medium text-xs tracking-tight transition-all whitespace-nowrap cursor-pointer w-full text-left ${
                activeTab === 7 
                  ? 'bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 text-white shadow-sm font-semibold' 
                  : 'text-purple-700 hover:bg-purple-100/40 hover:text-purple-950'
              }`}
            >
              <Phone className="w-3.5 h-3.5" />
              <span>7. ติดต่อเรา & กฎร้าน</span>
            </button>

          </nav>

          {/* Minimalist Sidebar Announcement Banner with Star-Glow */}
          <div className="glass-panel p-4.5 rounded-2xl text-left hidden lg:block border border-purple-500/20 shadow-sm mt-1">
            <h4 className="text-[10px] font-bold text-yellow-300 uppercase tracking-widest mb-1.5 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-yellow-300 animate-spin" />
              <span>ข่าวสารเวทมนตร์</span>
            </h4>
            <p className="text-[11px] text-purple-200 leading-relaxed font-normal">
              ยินดีต้อนรับสู่สวนสนุกเวทมนตร์แห่งความคิดสร้างสรรค์! อัปเดตข้อมูลตัวแทนและพรีวิวภาพจริงแล้ววันนี้
            </p>
          </div>
        </aside>

        {/* --- MAIN DISPLAY WORKSPACE --- */}
        <main className="flex-1">

          {/* --- PAGE 1: WELCOME SCREEN (AMUSEMENT PARK THEME & REAL PORTFOLIO) --- */}
          {activeTab === 1 && (
            <div className="flex flex-col gap-6 text-left animate-fadeIn">
              
              {/* Magic Jumbotron Card */}
              <div className="glass-panel p-8 md:p-10 rounded-2xl relative overflow-hidden flex flex-col md:flex-row items-center gap-8 shadow-md border-purple-500/35">
                
                {/* Glowing nebulas background inside card */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl -z-10"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl -z-10"></div>

                {/* Styled portrait frame with beautiful pink-purple gradient */}
                <div className="w-44 h-44 md:w-52 md:h-52 rounded-xl bg-gradient-to-tr from-yellow-300 via-pink-400 to-purple-500 p-1 flex-shrink-0 flex items-center justify-center border border-white/20 shadow-md relative floating-element">
                  <div className="w-full h-full rounded-lg bg-slate-950 flex flex-col items-center justify-center border border-purple-900/50 relative overflow-hidden">
                    <img 
                      src={getAssetUrl(PORTFOLIO_IMAGES_PAGE1[4])} 
                      alt="By Wish Avatar" 
                      className="w-full h-full object-cover"
                      onClick={() => setLightboxImage(PORTFOLIO_IMAGES_PAGE1[4])}
                      title="คลิกเพื่อขยายรูปภาพ"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-slate-950/80 py-1 text-center border-t border-purple-500/30">
                      <span className="text-[9px] text-purple-200 font-bold uppercase tracking-widest">WISH FOUNDER</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-3">
                  <span className="bg-purple-900/80 text-purple-200 border border-purple-500/50 font-semibold px-2.5 py-1 rounded text-[10px] w-fit uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-yellow-300" />
                    <span>Welcome to Our Space</span>
                  </span>
                  <h2 className="text-2xl md:text-3.5xl font-black tracking-tight leading-tight m-0 bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-300 bg-clip-text text-transparent">
                    ยินดีต้อนรับสู่ WISH / WITH
                  </h2>
                  <p className="text-purple-200 text-xs md:text-sm leading-relaxed font-normal">
                    ยินดีที่ได้รู้จักค่ะ! ในฐานะผู้ก่อตั้งและเจ้าของกลุ่มเครือ Wish รวมถึงผู้สร้างสรรค์ฟอนต์ในเครือ With 
                    มีความตั้งใจจริงที่อยากจะขับเคลื่อนไอเดียดี ๆ ผ่านงานออกแบบ และตัวอักษรที่จะช่วยเติมเต็มทุกความฝันของคุณให้เป็นจริงในจุดหมายปลายทางแห่งความสนุกและเวทมนตร์แห่งนี้
                  </p>
                  
                  <div className="flex flex-wrap gap-2.5 mt-2.5">
                    <button 
                      onClick={() => setActiveTab(2)}
                      className="bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-5 py-2.5 rounded-lg transition-all text-xs shadow-md cursor-pointer flex items-center gap-1.5"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span> Make a WISH, take a ride!</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Magical Portfolio Slide Showcase (Grid of large static images they provided) */}
              <div className="flex flex-col gap-3">
                <h3 className="text-sm font-bold text-yellow-300 uppercase tracking-widest flex items-center gap-1">
                  <ImageIcon className="w-4 h-4 text-purple-400" />
                  <span>คลังผลงานเวทมนตร์ (Magical Showcase Portfolio)</span>
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {PORTFOLIO_IMAGES_PAGE1.slice(0, 4).map((imgUrl, idx) => (
                    <div 
                      key={idx}
                      onClick={() => setLightboxImage(imgUrl)}
                      className="glass-panel p-1 rounded-xl cursor-pointer overflow-hidden shadow group hover:border-purple-400/80 transition-all"
                    >
                      <div className="aspect-[4/5] rounded-lg bg-slate-900 overflow-hidden relative">
                        <img 
                          src={getAssetUrl(imgUrl)} 
                          alt={`Magic Artwork ${idx+1}`} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all flex items-end justify-center pb-2.5">
                          <span className="text-[10px] font-bold text-purple-200">ขยายรูปภาพ</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* RECRUITMENT CAMPAIGN BOARD (FROM SLIDE 2) */}
              <div className="glass-panel p-6 md:p-8 rounded-2xl border border-yellow-500/20 shadow-md bg-gradient-to-tr from-purple-950/40 via-slate-950/70 to-pink-950/20 flex flex-col gap-6 text-left">
                
                <div className="border-b border-purple-500/30 pb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                  <div>
                    <h3 className="text-base font-extrabold text-yellow-300 m-0 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
                      <span>เปิดรับตัวแทนจำหน่ายรุ่นที่ 1 (WISH & WITH REPRESENTATIVES GEN 1)</span>
                    </h3>
                    <p className="text-[11px] text-purple-300/80 mt-0.5">โอกาสทองในการสร้างรายได้ คืนทุนไวแบบถาวร!</p>
                  </div>
                  <span className="bg-gradient-to-r from-yellow-300 to-amber-500 text-slate-950 text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow">
                    รับจำนวนจำกัด
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Group Representatives card */}
                  <div className="glass-panel p-5 rounded-xl border border-purple-500/20 flex flex-col justify-between gap-4">
                    <div>
                      <span className="bg-purple-900/60 text-purple-200 text-[9px] font-bold px-2 py-0.5 rounded border border-purple-500/30 uppercase tracking-widest">
                        ตัวแทนขายบ้านกลุ่ม WISH
                      </span>
                      <h4 className="text-base font-extrabold text-white mt-2 mb-1.5">ตัวแทนเครือกลุ่ม รุ่นที่ 1</h4>
                      <p className="text-[11px] text-purple-200 leading-relaxed font-normal">
                        ไม่มีการคัดออกจากการเป็นสมาชิก เสียค่าสมัครครั้งเดียว คืนทุนไวเนื่องจากมีโบนัสการทำยอดจำหน่ายและมีส่วนแบ่งให้ตั้งแต่ชิ้นแรก!
                      </p>
                      
                      <div className="mt-4 bg-slate-950/50 p-3 rounded-lg border border-purple-900/50 flex justify-between items-center text-xs">
                        <span className="text-purple-300">ค่าสมัครสมาชิก</span>
                        <span className="text-sm font-black text-yellow-300">599 บาท (ถาวร)</span>
                      </div>
                    </div>

                    <div className="border-t border-purple-500/20 pt-3 text-[10px] text-purple-400 font-semibold italic flex items-center gap-1">
                      <Info className="w-3.5 h-3.5" />
                      <span>เงื่อนไข: ต้องโพสต์สม่ำเสมอ (สุ่มเช็ค)</span>
                    </div>
                  </div>

                  {/* Font Representatives card */}
                  <div className="glass-panel p-5 rounded-xl border border-pink-500/20 flex flex-col justify-between gap-4">
                    <div>
                      <span className="bg-pink-900/60 text-pink-200 text-[9px] font-bold px-2 py-0.5 rounded border border-pink-500/30 uppercase tracking-widest">
                        ตัวแทนขายบ้านฟ้อนต์ WITH
                      </span>
                      <h4 className="text-base font-extrabold text-white mt-2 mb-1.5">ตัวแทนเครือฟ้อนต์ รุ่นที่ 1</h4>
                      <p className="text-[11px] text-purple-200 leading-relaxed font-normal">
                        รับจำนวนจำกัดเพียง 15 ท่านแรกเท่านั้น ไม่มีการคัดออก มีฟอนต์ดีไซน์ใหม่ให้ขายเรื่อยๆ พร้อมมอบอัตราเรทส่วนแบ่งสูงสุดถึง 40% คืนทุนไวแน่นอน!
                      </p>
                      
                      <div className="mt-4 bg-slate-950/50 p-3 rounded-lg border border-purple-900/50 flex justify-between items-center text-xs">
                        <span className="text-purple-300">ค่าสมัครสมาชิก</span>
                        <span className="text-sm font-black text-pink-400">299 บาท (จำกัด 15 คน)</span>
                      </div>
                    </div>

                    <div className="border-t border-pink-500/20 pt-3 text-[10px] text-purple-400 font-semibold italic flex items-center gap-1">
                      <Info className="w-3.5 h-3.5" />
                      <span>เงื่อนไข: ต้องโพสต์สม่ำเสมอ (สุ่มเช็ค)</span>
                    </div>
                  </div>

                </div>

                <div className="border-t border-purple-500/30 pt-4 text-center">
                  <button 
                    onClick={() => {
                      showNotification("ยินดีต้อนรับเข้าสู่ครอบครัวของเราค่ะ นำไปยังหน้าช่องทางการติดต่อสมัครงาน", "success");
                      setActiveTab(7);
                    }}
                    className="bg-white hover:bg-purple-100 text-purple-950 font-bold px-6 py-2.5 rounded-lg text-xs cursor-pointer shadow transition-all inline-flex items-center gap-1.5"
                  >
                    <span>ติดต่อสมัครเป็นตัวแทนจำหน่าย</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* --- PAGE 2: GROUPS LIST NETWORK (STATIC ASSETS REDESIGN) --- */}
          {activeTab === 2 && (
            <div className="flex flex-col gap-6 text-left animate-fadeIn">
              
              {/* Header Title with search and price sorter */}
              <div className="glass-panel p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
                <div>
                  <h2 className="text-lg font-bold text-neutral-800 m-0 flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-400" /> เครือกลุ่ม By Wish
                  </h2>
                  <p className="text-[11px] text-purple-300">กลุ่มของตกแต่งและภาพลายเส้นการ์ตูนในธีมสวนสนุกเวทมนตร์</p>
                </div>

                {/* Tab layout switches */}
                <div className="flex bg-slate-950/80 border border-purple-500/30 p-1 rounded-lg text-xs gap-1">
                  <button 
                    onClick={() => setP2SubView("groups")}
                    className={`px-3 py-1 rounded transition-all cursor-pointer font-bold ${
                      p2SubView === "groups" ? 'bg-purple-600 text-white shadow-sm' : 'text-purple-300 hover:text-white'
                    }`}
                  >
                    รายการแพ็กเกจ
                  </button>
                  <button 
                    onClick={() => setP2SubView("gallery")}
                    className={`px-3 py-1 rounded transition-all cursor-pointer font-bold ${
                      p2SubView === "gallery" ? 'bg-purple-600 text-white shadow-sm' : 'text-purple-300 hover:text-white'
                    }`}
                  >
                    คลังภาพตกแต่งจริง
                  </button>
                  <button 
                    onClick={() => setP2SubView("rates")}
                    className={`px-3 py-1 rounded transition-all cursor-pointer font-bold ${
                      p2SubView === "rates" ? 'bg-purple-600 text-white shadow-sm' : 'text-purple-300 hover:text-white'
                    }`}
                  >
                    กรอบเรทราคา
                  </button>
                </div>
              </div>

              {/* VIEW 1: PRODUCT LIST */}
              {p2SubView === "groups" && (
                <div className="flex flex-col gap-6">
                  {/* Search and Sorters */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="relative flex-1 md:flex-initial">
                      <input 
                        type="text" 
                        placeholder="ค้นหาชื่อกลุ่ม..."
                        value={p2Search}
                        onChange={(e) => setP2Search(e.target.value)}
                        className="glass-input text-xs rounded-lg pl-8 pr-4 py-1.5 w-full md:w-44 text-neutral-700"
                      />
                      <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-purple-400" />
                    </div>

                    <div className="flex items-center gap-1 bg-slate-900 border border-purple-500/30 px-2.5 py-1.5 rounded-lg text-xs text-purple-300 font-medium cursor-pointer">
                      <ArrowUpDown className="w-3 h-3 text-purple-400" />
                      <select 
                        value={p2Sort} 
                        onChange={(e) => setP2Sort(e.target.value)}
                        className="bg-transparent border-none outline-none font-sans font-semibold cursor-pointer text-xs"
                      >
                        <option value="default">เรียงลำดับราคา</option>
                        <option value="low-to-high">ราคาต่ำ ไป สูง</option>
                        <option value="high-to-low">ราคาสูง ไป ต่ำ</option>
                      </select>
                    </div>

                    {/* Quick Filters */}
                    <div className="flex flex-wrap gap-1.5">
                      {["ทั้งหมด", "กลุ่มบล็อก", "กลุ่มตูน", "กลุ่มของตกแต่ง"].map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setP2Category(cat)}
                          className={`px-3 py-1.5 rounded-lg font-bold text-[10px] transition-all whitespace-nowrap cursor-pointer ${
                            p2Category === cat 
                              ? 'bg-purple-600 text-white shadow-sm' 
                              : 'bg-slate-900/60 border border-purple-500/30 text-purple-300 hover:bg-slate-900/90'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Grid */}
                  {filteredGroups.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                      {filteredGroups.map((item) => (
                        <div 
                          key={item.id} 
                          className="glass-panel glass-panel-hover p-4.5 rounded-2xl border flex flex-col justify-between gap-4 text-left shadow-sm relative overflow-hidden group border-purple-500/20"
                        >
                          {item.badge && (
                            <div className="absolute top-3 right-3 text-[9px] font-bold px-2 py-0.5 rounded bg-gradient-to-r from-purple-500 to-pink-500 text-white uppercase tracking-wider shadow-sm z-10">
                              {item.badge}
                            </div>
                          )}

                          <div className="flex flex-col gap-2">
                            {/* Rendering real asset path inside preview shape! */}
                            <div 
                              onClick={() => setLightboxImage(item.image)}
                              className="w-full h-36 rounded-xl bg-slate-950 overflow-hidden flex items-center justify-center shadow-inner mb-1 border border-purple-900/30 relative cursor-zoom-in"
                            >
                              <img 
                                src={getAssetUrl(item.image)} 
                                alt={item.name} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" 
                              />
                              <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                                <span className="text-[10px] font-bold text-white bg-slate-950/80 px-2 py-1 rounded border border-purple-500/30">ขยายภาพจริง</span>
                              </div>
                            </div>

                            <span className="text-[9px] font-bold tracking-wider uppercase text-purple-300 bg-purple-900/50 px-2 py-0.5 rounded w-fit border border-purple-500/30">
                              {item.category}
                            </span>

                            <h3 className="font-bold text-white text-sm m-0 leading-snug line-clamp-1">
                              {item.name}
                            </h3>

                            <p className="text-[11px] text-purple-300 leading-relaxed line-clamp-2">
                              {item.desc}
                            </p>
                          </div>

                          <div className="border-t border-purple-500/20 pt-3 flex items-center justify-between">
                            <div className="text-left">
                              <p className="text-[9px] text-purple-400">ราคาซื้อสิทธิ์</p>
                              <p className="text-sm font-bold text-yellow-300">
                                {item.price} เครดิต
                              </p>
                            </div>

                            <button 
                              onClick={() => simulateBuyProduct(item.name, item.price)}
                              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-3.5 py-1.5 rounded-lg shadow transition-all text-xs cursor-pointer flex items-center gap-1"
                            >
                              <ShoppingBag className="w-3 h-3" />
                              <span>เข้าร่วมกลุ่ม</span>
                            </button>
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
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                      {TOON_GALLERY.map((imgUrl, idx) => (
                        <div 
                          key={idx}
                          onClick={() => setLightboxImage(imgUrl)}
                          className="glass-panel p-0.5 rounded-xl cursor-pointer overflow-hidden border border-purple-500/20 hover:border-purple-400 group transition-all"
                        >
                          <div className="aspect-square bg-slate-950 rounded-lg overflow-hidden relative">
                            <img src={getAssetUrl(imgUrl)} alt={`Toon ${idx+1}`} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Category 2: DECORATIONS GALLERY */}
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xs font-extrabold text-pink-400 uppercase tracking-widest border-b border-purple-500/30 pb-1.5 flex justify-between items-center">
                      <span>ภาพตกแต่งน่ารักในกลุ่ม (Cute Decors Library)</span>
                      <span className="text-[9px] font-normal text-purple-400 lowercase">6 files</span>
                    </h3>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                      {DECOR_GALLERY.map((imgUrl, idx) => (
                        <div 
                          key={idx}
                          onClick={() => setLightboxImage(imgUrl)}
                          className="glass-panel p-0.5 rounded-xl cursor-pointer overflow-hidden border border-pink-500/20 hover:border-pink-400 group transition-all"
                        >
                          <div className="aspect-square bg-slate-950 rounded-lg overflow-hidden relative">
                            <img src={getAssetUrl(imgUrl)} alt={`Decor ${idx+1}`} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Category 3: BLOCKS GALLERY */}
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xs font-extrabold text-purple-300 uppercase tracking-widest border-b border-purple-500/30 pb-1.5 flex justify-between items-center">
                      <span>ภาพกรอบข้อความและบล็อกจริง (Widget Blocks Library)</span>
                      <span className="text-[9px] font-normal text-purple-400 lowercase">6 files</span>
                    </h3>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                      {BLOCK_GALLERY.map((imgUrl, idx) => (
                        <div 
                          key={idx}
                          onClick={() => setLightboxImage(imgUrl)}
                          className="glass-panel p-0.5 rounded-xl cursor-pointer overflow-hidden border border-purple-500/20 hover:border-purple-400 group transition-all"
                        >
                          <div className="aspect-square bg-slate-950 rounded-lg overflow-hidden relative">
                            <img src={getAssetUrl(imgUrl)} alt={`Block ${idx+1}`} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Category 4: HEADER TUTORIALS */}
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xs font-extrabold text-blue-400 uppercase tracking-widest border-b border-purple-500/30 pb-1.5 flex justify-between items-center">
                      <span>ภาพสอนทำหัวป้ายประกอบ (Header Label Tutorials)</span>
                      <span className="text-[9px] font-normal text-purple-400 lowercase">6 files</span>
                    </h3>
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                      {HEADER_TUTORIALS.map((imgUrl, idx) => (
                        <div 
                          key={idx}
                          onClick={() => setLightboxImage(imgUrl)}
                          className="glass-panel p-0.5 rounded-xl cursor-pointer overflow-hidden border border-blue-500/20 hover:border-blue-400 group transition-all"
                        >
                          <div className="aspect-square bg-slate-950 rounded-lg overflow-hidden relative">
                            <img src={getAssetUrl(imgUrl)} alt={`Tutorial ${idx+1}`} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* VIEW 3: RATE CARD LIST */}
              {p2SubView === "rates" && (
                <div className="flex flex-col gap-6">
                  <h3 className="text-xs font-bold text-yellow-300 uppercase tracking-widest mb-1">กรอบเรทราคาของกลุ่ม/ฟ้อนต์จริง (Real Rate Cards)</h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                    {RATE_CARDS.map((imgUrl, idx) => (
                      <div 
                        key={idx}
                        onClick={() => setLightboxImage(imgUrl)}
                        className="glass-panel p-1 rounded-2xl cursor-pointer overflow-hidden shadow group hover:border-purple-400/80 transition-all border-purple-500/20"
                      >
                        <div className="aspect-[3/4] rounded-xl bg-slate-950 overflow-hidden relative">
                          <img src={getAssetUrl(imgUrl)} alt={`Rate Card ${idx+1}`} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500" />
                          <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                            <span className="text-[11px] font-semibold text-white bg-slate-950/80 px-2.5 py-1 rounded-lg border border-purple-500/30">ดูเรทราคาชัดๆ</span>
                          </div>
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
            <div className="flex flex-col gap-6 text-left animate-fadeIn">
              
              {/* Header Title with search and price sorter */}
              <div className="glass-panel p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
                <div>
                  <h2 className="text-lg font-bold text-neutral-800 m-0 flex items-center gap-2">
                    <Type className="w-4 h-4 text-purple-400" /> เครือฟอนต์ By Wish
                  </h2>
                  <p className="text-[11px] text-gray-400">กล่องพิมพ์ทดลองลายฟอนต์ลิขสิทธิ์และการจัดเรียงราคา</p>
                </div>

                <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                  <div className="relative flex-1 md:flex-initial">
                    <input 
                      type="text" 
                      placeholder="ค้นหาชื่อฟอนต์..."
                      value={p3Search}
                      onChange={(e) => setP3Search(e.target.value)}
                      className="glass-input text-xs rounded-lg pl-8 pr-4 py-1.5 w-full md:w-44 text-neutral-700"
                    />
                    <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-purple-450" />
                  </div>

                  <div className="flex items-center gap-1 bg-slate-900 border border-purple-500/30 px-2.5 py-1.5 rounded-lg text-xs text-purple-300 font-medium cursor-pointer">
                    <ArrowUpDown className="w-3 h-3 text-purple-450" />
                    <select 
                      value={p3Sort} 
                      onChange={(e) => setP3Sort(e.target.value)}
                      className="bg-transparent border-none outline-none font-sans font-semibold cursor-pointer text-xs text-purple-300"
                    >
                      <option value="default">เรียงลำดับราคา</option>
                      <option value="low-to-high">ราคาต่ำ ไป สูง</option>
                      <option value="high-to-low">ราคาสูง ไป ต่ำ</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Categories Tabs */}
              <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1">
                {["ทั้งหมด", "ขายดี", "ฟอนต์หน้าปกtiktok", "ฟอนต์น่ารัก", "ฟอนต์มินิมอล"].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setP3Category(cat)}
                    className={`px-3.5 py-1.5 rounded-lg font-bold text-[11px] transition-all whitespace-nowrap cursor-pointer ${
                      p3Category === cat 
                        ? 'bg-purple-600 text-white shadow-sm' 
                        : 'bg-slate-900/60 border border-purple-500/30 text-purple-300 hover:bg-slate-900/90'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* DYNAMIC PASTEL LIVE TESTER BOX */}
              <div className="glass-panel p-5 rounded-2xl border border-pink-500/20 shadow-sm flex flex-col gap-3 bg-gradient-to-r from-pink-500/5 to-purple-500/5">
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
            <div className="flex flex-col gap-6 text-left animate-fadeIn">
              
              <div className="glass-panel p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
                <div>
                  <h2 className="text-lg font-bold text-neutral-800 m-0 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-purple-400" /> สิทธิ์ปล่อยเช่าใช้งาน
                  </h2>
                  <p className="text-[11px] text-purple-300">สิทธิ์ปล่อยเช่าใช้งานรายวันรายสัปดาห์สำหรับความต้องการชั่วคราว</p>
                </div>
              </div>

              {/* Minimalist Pricing Calculator Panel */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Selector List */}
                <div className="lg:col-span-2 flex flex-col gap-3">
                  <h3 className="text-xs font-bold text-yellow-300 m-0 tracking-tight uppercase">เลือกสิทธิ์ปล่อยเช่าที่ต้องการคำนวณ</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {MOCK_RENTALS.map((rental) => (
                      <div 
                        key={rental.id}
                        onClick={() => setSelectedRental(rental)}
                        className={`glass-panel p-4.5 rounded-xl border transition-all cursor-pointer text-left flex flex-col justify-between gap-3 border-purple-500/20 ${
                          selectedRental?.id === rental.id 
                            ? 'border-purple-400 bg-slate-900 shadow-sm ring-1 ring-purple-500' 
                            : 'hover:bg-slate-900/50'
                        }`}
                      >
                        <div>
                          <div className="flex justify-between items-center gap-2">
                            <span className="text-[8px] font-bold tracking-wider uppercase bg-purple-900/60 text-purple-200 px-2 py-0.5 rounded border border-purple-500/30">
                              {rental.category}
                            </span>
                            <span className="text-[10px] font-semibold text-pink-300 bg-pink-900/60 px-2 py-0.5 rounded border border-pink-500/30">
                              {rental.rateDesc}
                            </span>
                          </div>
                          
                          <h4 className="font-bold text-white text-xs mt-2 mb-1.5 leading-snug">
                            {rental.name}
                          </h4>
                          
                          <p className="text-[10px] text-purple-300 leading-relaxed line-clamp-2">
                            {rental.desc}
                          </p>
                        </div>

                        <div className="flex items-center justify-between border-t border-purple-950 pt-2 text-[10px]">
                          <span className="text-purple-400">เริ่มต้น</span>
                          <span className="font-bold text-yellow-300">{rental.basePrice} เครดิต</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Calculator Panel Box */}
                {selectedRental && (
                  <div className="glass-panel p-5 rounded-2xl border border-pink-500/25 bg-slate-950/70 shadow-sm flex flex-col justify-between gap-5">
                    <div>
                      <div className="flex items-center gap-2 border-b border-purple-500/30 pb-2.5 mb-3">
                        <Info className="w-4 h-4 text-purple-450" />
                        <h3 className="font-bold text-yellow-300 text-xs m-0">
                          คำนวณวันปล่อยเช่า
                        </h3>
                      </div>

                      <div className="flex flex-col gap-3.5 text-xs text-left">
                        <div>
                          <p className="text-purple-400 font-semibold mb-0.5">สิทธิ์เช่า:</p>
                          <p className="font-bold text-white">{selectedRental.name}</p>
                        </div>

                        <div>
                          <p className="text-purple-400 font-semibold mb-0.5">เกณฑ์อ้างอิง:</p>
                          <p className="font-bold text-purple-300">{selectedRental.duration} วัน / {selectedRental.basePrice} เครดิต</p>
                        </div>

                        {/* Interactive Duration Slider */}
                        <div className="flex flex-col gap-1.5 mt-1">
                          <div className="flex justify-between items-center font-semibold text-purple-300 text-[11px]">
                            <span>ระบุวันเช่าจริง:</span>
                            <span className="text-pink-400 font-bold">{rentalDays} วัน</span>
                          </div>
                          
                          <input 
                            type="range" 
                            min="3" 
                            max="90" 
                            value={rentalDays}
                            onChange={(e) => setRentalDays(Number(e.target.value))}
                            className="accent-pink-500 h-1 bg-gray-700 rounded-lg cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-purple-500/30 pt-3 flex flex-col gap-3">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-purple-300 font-semibold">ยอดค่าใช้จ่ายเช่า:</span>
                        <span className="text-lg font-extrabold text-yellow-300">
                          {Math.ceil((selectedRental.basePrice / selectedRental.duration) * rentalDays)} เครดิต
                        </span>
                      </div>

                      <button 
                        onClick={() => {
                          const finalPrice = Math.ceil((selectedRental.basePrice / selectedRental.duration) * rentalDays);
                          simulateBuyProduct(`เช่าสิทธิ์ ${selectedRental.name} (${rentalDays} วัน)`, finalPrice);
                        }}
                        className="w-full bg-gradient-to-r from-purple-500 via-purple-600 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-2 rounded-lg text-xs cursor-pointer shadow transition-all flex items-center justify-center gap-1.5"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>ชำระเช่าและรับสิทธิ์</span>
                      </button>
                    </div>
                  </div>
                )}

              </div>

            </div>
          )}

          {/* --- PAGE 5: PARTNER BRANDS REPRESENTATIVES --- */}
          {activeTab === 5 && (
            <div className="flex flex-col gap-6 text-left animate-fadeIn">
              
              <div className="glass-panel p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
                <div>
                  <h2 className="text-lg font-bold text-neutral-800 m-0 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" /> รวมเครือฟอนต์ตัวแทนขายบ้านอื่นๆ
                  </h2>
                  <p className="text-[11px] text-purple-300">ตัวแทนจำหน่ายฟอนต์ลิขสิทธิ์ถูกต้องของบ้านพันธมิตร</p>
                </div>
              </div>

              {/* Group Brands tabs and lists */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {Object.keys(MOCK_PARTNER_HOUSES).map((houseName) => {
                  const borderClass = houseName.includes("ส้ม") ? "border-t-orange-400" : houseName.includes("ฟ้า") ? "border-t-blue-400" : "border-t-pink-400";
                  const buttonBg = houseName.includes("ส้ม") ? "from-orange-500 to-amber-600" : houseName.includes("ฟ้า") ? "from-blue-500 to-sky-600" : "from-pink-500 to-rose-600";
                  
                  return (
                    <div 
                      key={houseName}
                      className={`glass-panel p-4.5 rounded-2xl border flex flex-col justify-between gap-4 text-left shadow-sm border-t-4 border-purple-500/20 ${borderClass}`}
                    >
                      <div>
                        <h3 className="font-bold text-white text-xs m-0 mb-2.5 flex items-center justify-between">
                          <span>{houseName}</span>
                          <span className="text-[9px] font-bold text-purple-450 uppercase">Partner</span>
                        </h3>
                        
                        <div className="flex flex-col gap-2">
                          {MOCK_PARTNER_HOUSES[houseName].map((item) => (
                            <div key={item.id} className="bg-slate-900/60 border border-purple-900/50 rounded-lg p-2.5 flex flex-col gap-0.5">
                              <div className="flex justify-between items-center text-[11px]">
                                <span className="font-semibold text-white">{item.name}</span>
                                <span className="font-bold text-yellow-300">{item.price} เครดิต</span>
                              </div>
                              <p className="text-[9px] text-purple-300 leading-normal">{item.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <button 
                        onClick={() => {
                          showNotification(`นำคุณมายังช่องทางการติดต่อสั่งซื้อฟอนต์จาก ${houseName}`, "success");
                          setActiveTab(7);
                        }}
                        className={`w-full bg-gradient-to-r ${buttonBg} text-white font-bold py-1.5 rounded-lg text-xs cursor-pointer shadow transition-all flex items-center justify-center gap-0.5`}
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

          {/* --- PAGE 6: HELP GUIDE LINE DROPPED --- */}
          {activeTab === 6 && (
            <div className="flex flex-col gap-6 text-left animate-fadeIn">
              
              <div className="glass-panel p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
                <div>
                  <h2 className="text-lg font-bold text-neutral-800 m-0 flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-purple-400" /> การแก้ไขกรณีบัญชีไลน์หลุดจากกลุ่ม
                  </h2>
                  <p className="text-[11px] text-purple-300">คำแนะนำขั้นตอนแก้ปัญหาการหลุดกลุ่มและวิธีแจ้งเรื่องความช่วยเหลือ</p>
                </div>
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

          {/* --- PAGE 7: CONTACT & POLICIES (REAL IMAGE EMBEDS) --- */}
          {activeTab === 7 && (
            <div className="flex flex-col gap-6 text-left animate-fadeIn">
              
              <div className="glass-panel p-5 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm">
                <div>
                  <h2 className="text-lg font-bold text-neutral-800 m-0 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-purple-400" /> ช่องทางติดต่อ & กฎระเบียบ
                  </h2>
                  <p className="text-[11px] text-purple-300">ช่องทางการติดต่อและภาพบอร์ดคอนแทคจริงของทางร้าน</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Contact and Rules (Left side) */}
                <div className="lg:col-span-2 flex flex-col gap-5">
                  
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
                    <h3 className="text-xs font-bold text-yellow-300 uppercase tracking-widest">การ์ดช่องทางการติดต่อหลัก (Official Banner Cards)</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    
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

                </div>

                {/* Simulated Quick Send Message Form */}
                <div className="glass-panel p-5 rounded-2xl border border-purple-500/25 bg-slate-950/70 shadow-sm flex flex-col gap-3.5">
                  <h3 className="font-bold text-yellow-300 text-xs m-0 flex items-center gap-1.5 border-b border-purple-100/30 pb-2.5">
                    <span>ฝากข้อความถึงทีมงาน</span>
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

        </main>
      </div>

      {/* --- FOOTER CONTENT --- */}
      <footer className="glass-panel mt-12 py-6 px-4 border-t border-purple-500/20 text-center text-xs text-purple-300">
        <p className="m-0 font-medium">© 2026 By Wish Network. All Rights Reserved.</p>
        <p className="text-[9px] text-purple-400 mt-1 font-semibold uppercase tracking-wider">
          Premium Magic Amusement Park Aesthetic Platform
        </p>
      </footer>

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
