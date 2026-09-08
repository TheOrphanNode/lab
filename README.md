# 🧪 Dev Lab (Deneysel Çalışma Alanı)

Bu depo, farklı teknolojiler ve dillerle deneysel çalışmalar, konsept denemeleri (PoC) ve test projeleri gerçekleştirmek üzere oluşturulmuş çoklu teknoloji (polyglot) laboratuvarıdır.

---

## 📁 Proje Yapısı

```text
lab/
├── .gitignore          # Tüm teknolojileri kapsayan ana git yoksayma dosyası
├── README.md           # Ana laboratuvar dokümantasyonu
│
├── react-lab/          # Saf React (Vite) deneysel projesi
│   ├── .gitignore
│   ├── README.md
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│
├── spring-lab/         # Saf Java Spring Boot (Maven) deneysel projesi
│   ├── .gitignore
│   ├── README.md
│   ├── pom.xml
│   └── src/
│
├── rust-lab/           # (Gelecekte eklenecek Rust denemeleri)
└── go-lab/             # (Gelecekte eklenecek Go denemeleri)
```

---

## 🚀 Hızlı Başlangıç

### 1. React Lab (`react-lab`)
Saf, hafif ve modern Vite tabanlı React ortamı.

```bash
cd react-lab
npm install
npm run dev
```
Uygulama varsayılan olarak `http://localhost:5173` adresinde çalışır.

### 2. Spring Lab (`spring-lab`)
Temiz Java 17/21 ve Spring Boot 3 tabanlı REST API altyapısı.

```bash
cd spring-lab
mvn spring-boot:run
```
Uygulama varsayılan olarak `http://localhost:8080` adresinde çalışır.
- Test endpoint: `GET http://localhost:8080/api/hello`

---

## 🛠️ Gelecekte Yeni Lab Eklerken
- **Rust için:** `cargo new rust-lab`
- **Go için:** `mkdir go-lab && cd go-lab && go mod init lab/go-lab`
- Ana `.gitignore` dosyası Rust ve Go için hazır durumdadır.
