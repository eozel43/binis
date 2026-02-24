# Product Specification Document (Ürün Özellikleri Belgesi)

## 1. Ürünün Amacı (Purpose)
**Ulaşım Analiz Paneli (Transportation Analysis Dashboard)**, toplu taşıma araçlarına ait biniş ve hasılat verilerini interaktif, hızlı ve detaylı bir şekilde analiz etmek için geliştirilmiş bir veri görselleştirme uygulamasıdır. Kullanıcılara (yöneticiler, veri analistleri) hangi hatların daha çok kullanıldığı, hasılat durumları ve kart kullanım tiplerinin (ücretli/ücretsiz, tam, öğrenci vb.) dağılımını takip etme imkânı sunar.

## 2. Temel Özellikler (Features)

### 2.1 Güvenlik ve Erişim
- **Giriş Ekranı (Login):** Kullanıcıların veriye erişmeden önce sisteme güvenli bir şekilde giriş yapmasını sağlayan bir kimlik doğrulama mekanizması bulunur.

### 2.2 İnteraktif Filtreleme Sistemi
Kullanıcıların büyük veri setlerini daraltarak odaklanmalarını sağlayan çoklu seçim (multi-select) özellikli filtreler:
- **Tarih Filtreleri:** Yıl ve Ay bazlı seçimler.
- **Güzergah (Hat) Filtresi:** Belirli otobüs/ulaşım hatlarına göre filtreleme.
- **Kart Tipi (Küme) Filtresi:** Kartların kullanım amacına göre (örn: Öğrenci, Tam vb.) filtrelenmesi.
- **Ücretli/Ücretsiz Seçimi:** Binişlerin ücretli mi yoksa ücretsiz mi olduğuna göre daraltılması. Sadece ücretsiz binişleri detaylı analiz etmek için özel bir "Sadece Ücretsizler" (onlyFree) görünümü mevcuttur.

### 2.3  Temel Performans Göstergeleri (KPI Kartları)
Panelin en üstünde seçilen filtrelere göre anlık güncellenen 3 temel metrik gösterilir:
1. **Toplam Biniş Sayısı**
2. **Toplam Hasılat (TRY)**
3. **Ücretsiz Biniş Sayısı**

### 2.4 Görselleştirme ve Grafikler
- **Trend Grafiği (Trend Chart):** Zamana bağlı biniş sayılarının (seçili tarihler aralığında) gidişatını gösteren zaman serisi grafiği.
- **Kart Tipi Dağılımı (Pie Chart):**
  - *Kart Tipi Kümelenmiş:* Farklı kart türlerinin (abonman, NFC, tam, lise vb.) oransal dağılımını pasta grafiği üzerinde listeler.
  - *Ücretli / Ücretsiz Dağılımı:* Toplam binişler içinde ücretli binişler ile ücretsiz geçişlerin pastadaki payını karşılaştırır.

### 2.5 Detaylı Veri Tabloları
- **En Yoğun Hatlar Tablosu (Route Table):** Biniş sayısına göre en çok kullanılan ilk 10 hattı, biniş sayıları ve elde edilen hasılatları ile birlikte listeler.

### 2.6 Kullanıcı Deneyimi (UX/UI)
- **Tema Desteği:** Dark (Karanlık) ve Light (Aydınlık) mod geçişi sağlayan buton.
- **Responsive Tasarım:** TailwindCSS kullanılarak oluşturulan yapı ile mobil, tablet ve masaüstü cihazlara tam uyumluluk.

---

## 3. Sistem Nasıl Çalışıyor? (How it Works)

Uygulama temel olarak **Veri İşleme (Backend/Python)** ve **Görüntüleme (Frontend/React)** olmak üzere iki aşamadan oluşur.

### 3.1 Veri İşleme Aşaması (`process_data.py`)
1. **Hafifletme ve Gruplama:** Sistem Excel (`binişler_tum.xlsx`) formatındaki ham veriyi işler. Tüm satırları tek tek frontend'e göndermek performans sorunu yaratacağı için, veriler Python (Pandas) kullanılarak "Tarih, Hat, Kart Kümesi ve Ücretli/Ücretsiz" boyutlarına göre gruplanır.
2. **JSON Çıktısı:** Hesaplanmış metrikler (toplam biniş, gelir vb.) ve filtre seçenekleri `dashboard_data.json` adında hafif statik bir JSON dosyasına yazılarak frontend klasörüne (public/data) aktarılır.

### 3.2 İstemci (Frontend) ve Analiz Motoru
1. **Veri Yükleme:** React uygulaması (`App.jsx`) başlatıldığında JSON dosyasını HTTP üzerinden (ya da yerel path) async olarak yükler.
2. **Dinamik Toplama (Dynamic Aggregation):** Frontend, gelen her filtre değişiminde (örn: kullanıcı sadece "Mart" ayını ve "Hat 1"i seçtiğinde) veriyi canlı olarak `useMemo` hook'u içinde anlık olarak filtreler, toplamları bulur ve grafiklere aktarır.
3. **Render:** Grafikler (Recharts kütüphanesi) ve tablolar filtrelenmiş bu verileri anında görselleştirir.

### 3.3 Teknoloji Yığını
- **Veri Tarafı:** Python, Pandas, Numpy 
- **Arayüz Tarafı:** React (Vite build aracı ile), Tailwind CSS, Recharts (Grafikler), Lucide-React (İkonlar)
- **Deployment:** Uygulama tamamen statik bir build (HTML/JS/JSON) oluşturduğu için CDN'ler (Örn: Netlify, Vercel) üzerinde `netlify.toml` desteğiyle hızlıca barındırılabilir.
