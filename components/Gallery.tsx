import React, { useState, useRef } from "react";
import { Reveal } from "./Reveal";

const Gallery: React.FC = () => {
  const categories = [
    "Semua",
    "Pramuka",
    "Seni & Budaya",
    "Pembelajaran",
    "Olahraga",
    "Acara Khusus",
  ];

  // GAMBAR UTAMA (sesuai permintaan: TIDAK DIUBAH)
  const gridItems = [
    { title: "Pencak Silat", img: "https://res.cloudinary.com/dhovq374h/image/upload/v1765022540/silat_k7zfg5.png", category: "Bela Diri" },
    { title: "Hadroh", img: "https://res.cloudinary.com/dhovq374h/image/upload/v1765022539/hadroh_lr5ywb.png", category: "Seni & Budaya" },
    { title: "Marching Band", img: "https://res.cloudinary.com/dhovq374h/image/upload/v1765022658/marching_d67jjp.jpg", category: "Seni & Budaya" },
    { title: "Badminton", img: "https://res.cloudinary.com/dhovq374h/image/upload/v1765022601/badminton_wzdwjy.jpg", category: "Olahraga" },
    { title: "Volly Ball", img: "https://res.cloudinary.com/dhovq374h/image/upload/v1765022651/volli_ymgdi9.jpg", category: "Olahraga" },
    { title: "Futsal", img: "https://res.cloudinary.com/dhovq374h/image/upload/v1765022583/futsal_kpfpqr.jpg", category: "Olahraga" },
    { title: "Pramuka", img: "https://res.cloudinary.com/dhovq374h/image/upload/v1765022706/pramuka_psiqtq.jpg", category: "Klub" },
    { title: "Arabic Song", img: "https://res.cloudinary.com/dhovq374h/image/upload/v1765022655/musikalisasi_fiv3l9.jpg", category: "Seni & Budaya" },
    { title: "Catur", img: "https://res.cloudinary.com/dhovq374h/image/upload/v1765022565/catur_jafswj.jpg", category: "Klub" },
    { title: "Kesenian", img: "https://res.cloudinary.com/dhovq374h/image/upload/v1765022666/seni_trkn8o.jpg", category: "Seni & Budaya" },
    { title: "Lari Pagi", img: "https://res.cloudinary.com/dhovq374h/image/upload/v1765022569/lari_cfet9f.jpg", category: "Olahraga" },
    { title: "PASKARDA", img: "https://res.cloudinary.com/dhovq374h/image/upload/v1765022708/paskarda_tag1k5.jpg", category: "Bela Diri" },
  ];

  // GAMBAR TAMBAHAN PER KATEGORI
  const extraImages = {
    "Pramuka": [
      "https://res.cloudinary.com/dhovq374h/image/upload/v1765029907/DSC_0419_wd2cad.jpg",
      "https://res.cloudinary.com/dhovq374h/image/upload/v1765029900/DSC_0356_lglmed.jpg",
      "https://res.cloudinary.com/dhovq374h/image/upload/v1765029889/DSC_0360_kwodlv.jpg",
      "https://res.cloudinary.com/dhovq374h/image/upload/v1765029877/DSC_0349_q98ng5.jpg",
      "https://res.cloudinary.com/dhovq374h/image/upload/v1765029836/DSC_0209_wfn6hq.jpg",
      "https://res.cloudinary.com/dhovq374h/image/upload/v1765029835/DSC_0091_er9cgv.jpg",
      "https://res.cloudinary.com/dhovq374h/image/upload/v1765029828/DSC_09082_yx3dnv.jpg",
      "https://res.cloudinary.com/dhovq374h/image/upload/v1765029831/DSC_0079_hgl9bv.jpg",
      "https://res.cloudinary.com/dhovq374h/image/upload/v1765029873/DSC_0344_zv21ub.jpg",
      "https://res.cloudinary.com/dhovq374h/image/upload/v1765029872/DSC_0176_yqyywx.jpg",
      "https://res.cloudinary.com/dhovq374h/image/upload/v1765029913/DSC_0055_pz10vc.jpg",
      "https://res.cloudinary.com/dhovq374h/image/upload/v1765029909/DSC_0411_cgwj2l.jpg",
    ],
    "Pembelajaran": [
      "https://res.cloudinary.com/dhovq374h/image/upload/v1765029864/DSC_0564_uhuix6.jpg",
      "https://res.cloudinary.com/dhovq374h/image/upload/v1765029841/DSC_0641_siuek8.jpg",
      "/public/pembelajaran3.jpg",
      "/public/pembelajaran4.jpg",
      "/public/pembelajaran5.jpg",
      "/public/pembelajaran6.jpg",
      "/public/pembelajaran7.jpg",
      "/public/pembelajaran8.jpg",
      "/public/pembelajaran9.jpg",
      "/public/pembelajaran10.jpg",
      "/public/pembelajaran11.jpg",
      "/public/pembelajaran12.jpg",
    ],
    "Seni & Budaya":
      ["/public/seni1.jpg",
        "/public/seni2.jpg",
        "/public/seni3.jpg",
        "/public/seni4.jpg"],
    "Klub": [
      "/public/klub1.jpg",
      "/public/klub2.jpg",
      "/public/klub3.jpg"],
    "Olahraga": [
      "https://res.cloudinary.com/dhovq374h/image/upload/v1765029837/NHD_0932_gfua7h.jpg",
      "/public/olahraga2.jpg",
      "/public/olahraga3.jpg",
      "/public/olahraga4.jpg"],
    "Acara Khusus": [
      "https://res.cloudinary.com/dhovq374h/image/upload/v1765029812/Pentas_Seni_Milad_6_u7bw2v.jpg",
      "https://res.cloudinary.com/dhovq374h/image/upload/v1765022691/reuni_byqotm.jpg",
      "https://res.cloudinary.com/dhovq374h/image/upload/v1765022538/pergarus_r6ulmh.jpg"],
  };

  const [activeCategory, setActiveCategory] = useState("Semua");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // SWIPE HANDLING
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: any) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e: any) => {
    touchEndX.current = e.changedTouches[0].clientX;

    if (touchStartX.current - touchEndX.current > 80) {
      nextImage();
    }
    if (touchEndX.current - touchStartX.current > 80) {
      prevImage();
    }
  };

  // LIST GAMBAR AKTIF (gabungan main + extra)
  const activeImages =
    activeCategory === "Semua"
      ? gridItems.map((i) => i.img)
      : [
        ...gridItems.filter((i) => i.category === activeCategory).map((i) => i.img),
        ...(extraImages[activeCategory] || []),
      ];

  const openImage = (img: string) => {
    const idx = activeImages.indexOf(img);
    setCurrentIndex(idx);
    setSelectedImage(img);
  };

  const nextImage = () => {
    setCurrentIndex((prev) => {
      const next = (prev + 1) % activeImages.length;
      setSelectedImage(activeImages[next]);
      return next;
    });
  };

  const prevImage = () => {
    setCurrentIndex((prev) => {
      const next = (prev - 1 + activeImages.length) % activeImages.length;
      setSelectedImage(activeImages[next]);
      return next;
    });
  };

  // FILTER GRID
  const filteredItems =
    activeCategory === "Semua"
      ? gridItems
      : gridItems.filter((item) => item.category === activeCategory);

  const extraItems = activeCategory !== "Semua" ? extraImages[activeCategory] || [] : [];

  return (
    <section id="gallery" className="py-16 bg-[#F8F9FA] dark:bg-navy-dark transition-colors duration-300">
      <div className="container mx-auto px-4 lg:px-20">

        {/* TITLE */}
        <Reveal>
          <h2 className="text-4xl font-black mb-8 text-navy dark:text-white">
            Galeri Ekstrakurikuler & Kegiatan
          </h2>
        </Reveal>

        {/* FILTER KATEGORI */}
        <div className="flex flex-wrap gap-3 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-colors ${activeCategory === cat
                ? "bg-gold text-navy"
                : "bg-navy/10 dark:bg-white/10 text-navy dark:text-white hover:bg-navy/20"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID UTAMA */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
          {filteredItems.map((item, idx) => (
            <Reveal key={idx} delay={idx * 100}>
              <div
                onClick={() => openImage(item.img)}
                className="group relative aspect-[3/4] overflow-hidden rounded-xl cursor-pointer shadow-md hover:shadow-xl transition-shadow"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform"
                  style={{ backgroundImage: `url("${item.img}")` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent"></div>
                <div className="absolute bottom-0 p-4 text-white font-bold">{item.title}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* GRID TAMBAHAN */}
        {extraItems.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {extraItems.map((img, idx) => (
              <Reveal key={idx} delay={idx * 80}>
                <div
                  onClick={() => openImage(img)}
                  className="relative aspect-[3/4] rounded-xl bg-cover bg-center cursor-pointer shadow-md"
                  style={{ backgroundImage: `url("${img}")` }}
                ></div>
              </Reveal>
            ))}
          </div>
        )}
      </div>

      {/* POPUP */}
      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 z-50 cursor-pointer"
        >
          {/* Wrapper (stop close on click inside) */}
          <div
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative w-full max-w-5xl h-full max-h-[90vh] flex flex-col items-center justify-center"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-50 text-white/70 hover:text-white"
            >
              <span className="material-symbols-outlined text-4xl">close</span>
            </button>

            {/* Main Image Container */}
            <div className="flex-1 w-full flex items-center justify-center p-4 overflow-hidden">
              <img
                src={selectedImage}
                className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
              />
            </div>

            {/* Thumbnail Preview */}
            <div className="w-full max-w-2xl px-4 pb-4">
              <div
                className="flex gap-2 overflow-x-auto pb-2 justify-center"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                <style>{`
                  .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                <div className="flex gap-2 hide-scrollbar">
                  {activeImages.map((thumb, idx) => (
                    <img
                      key={idx}
                      src={thumb}
                      onClick={() => openImage(thumb)}
                      className={`w-14 h-14 md:w-16 md:h-16 object-cover rounded-md cursor-pointer transition-all border-2 ${currentIndex === idx ? "border-gold scale-110" : "border-transparent opacity-60 hover:opacity-100"
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation Arrows (Desktop) */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-2 hidden md:block"
            >
              <span className="material-symbols-outlined text-5xl">chevron_left</span>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-2 hidden md:block"
            >
              <span className="material-symbols-outlined text-5xl">chevron_right</span>
            </button>

          </div>
        </div>
      )}

      {/* ANIMASI ZOOM KEYFRAMES */}
      <style>{`
        @keyframes zoomIn {
          from { transform: scale(0.6); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default Gallery;
