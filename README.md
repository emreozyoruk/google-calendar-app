# Google Calendar Integration

Bu uygulama, Google Takvim API'sini kullanarak kullanıcıların takvim etkinliklerini görüntüleyebilmelerini sağlar. Next.js ve TypeScript kullanılarak geliştirilmiştir.

## Özellikler

- Google hesabı ile kimlik doğrulama
- Takvim etkinliklerini görüntüleme
- Oturum yönetimi
- Modern ve responsive tasarım
- Kapsamlı hata yönetimi
- Toast bildirimleri
- Yükleme durumu göstergeleri
- Grid layout ile etkinlik kartları
- Etkinlik detayları (başlık, tarih, konum, açıklama)

## Kurulum

1. Repoyu klonlayın:
```bash
git clone [repo-url]
cd google-calendar-app
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Google Cloud Console'da bir proje oluşturun:
   - [Google Cloud Console](https://console.cloud.google.com)'a gidin
   - Yeni bir proje oluşturun
   - Google Calendar API'sini etkinleştirin
   - OAuth 2.0 kimlik bilgilerini oluşturun
   - İzin verilen yönlendirme URI'lerini ekleyin: `http://localhost:3000/api/auth/callback/google`

4. `.env.local` dosyasını oluşturun ve gerekli değişkenleri ekleyin:
```env
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_here
```

5. Uygulamayı başlatın:
```bash
npm run dev
```

6. Tarayıcınızda `http://localhost:3000` adresine gidin

## Kullanım

1. Ana sayfada "Sign in with Google" butonuna tıklayın
2. Google hesabınızla giriş yapın ve gerekli izinleri verin
3. Takvim etkinlikleriniz otomatik olarak görüntülenecektir

## Hata Yönetimi

Uygulama aşağıdaki durumlarda kullanıcıya anlamlı geri bildirimler sağlar:

1. Kimlik Doğrulama Hataları:
   - Oturum açma başarısız olduğunda
   - Oturum süresi dolduğunda
   - Gerekli izinler verilmediğinde

2. API Hataları:
   - Takvim verilerine erişilemediğinde
   - Google Calendar API'si yanıt vermediğinde
   - Rate limit aşıldığında

3. Bağlantı Hataları:
   - İnternet bağlantısı kesildiğinde
   - API istekleri zaman aşımına uğradığında

Tüm hatalar:
- Kullanıcı dostu mesajlarla toast bildirimleri olarak gösterilir
- Hata durumunda uygun UI bileşenleri görüntülenir
- Konsola detaylı hata bilgileri kaydedilir
- Otomatik yeniden deneme mekanizması (bazı durumlarda)

## Teknolojiler

- Next.js
- TypeScript
- NextAuth.js
- Google Calendar API
- Tailwind CSS
- React Icons
- React Toastify
- Modern UI/UX prensipleri

## Lisans

MIT

## Test Stratejisi

Bu projede kapsamlı bir test yaklaşımı benimsedik:

### Test Çerçeveleri ve Araçları

1. Jest
   - JavaScript/TypeScript için standart test çerçevesi
   - Snapshot testing ve code coverage özellikleri
   - Mocking ve spying yetenekleri

2. React Testing Library
   - Kullanıcı davranışlarını simüle etmek için
   - Erişilebilirlik odaklı test yaklaşımı
   - DOM tabanlı testler

### Test Türleri ve Kapsamı

1. Birim Testler
   - Bileşen testleri (EventCard, EventList, Header, Login)
   - Servis testleri (Google Calendar API entegrasyonu)
   - Props, state ve event yönetimi testleri

2. Entegrasyon Testleri
   - Bileşenler arası etkileşim
   - API çağrıları ve veri akışı
   - Oturum yönetimi

3. Kapsam
   - Bileşen render testleri
   - Kullanıcı etkileşimi testleri
   - Hata durumu yönetimi
   - Loading durumları
   - API entegrasyonu

### Mock ve Test Yardımcıları

1. Mock Veriler
   - Test için örnek event verileri
   - Mock session bilgileri
   - API yanıtları

2. Test Utilities
   - Custom render fonksiyonları
   - Ortak test yardımcıları
   - Type tanımlamaları

### Testleri Çalıştırma

```bash
# Tüm testleri çalıştır
npm test

# Test coverage raporu oluştur
npm run test:coverage

# Testleri watch modunda çalıştır
npm run test:watch
```

### Test Kapsamı

Testler şu alanları kapsar:

1. Bileşenler
   - Doğru render
   - Prop değişiklikleri
   - Kullanıcı etkileşimleri
   - Hata durumları
   - Loading durumları

2. Servisler
   - API çağrıları
   - Hata yönetimi
   - Response parsing

3. Oturum Yönetimi
   - Giriş/çıkış işlemleri
   - Oturum durumu kontrolü
   - Yetkilendirme

4. Veri Akışı
   - State yönetimi
   - Props drilling
   - API entegrasyonu

### Sürekli Entegrasyon

- Her commit'te testler otomatik çalıştırılır
- Test coverage raporu oluşturulur
- Minimum %80 test coverage hedefi
