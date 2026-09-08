# 🍃 Spring Lab

Bu dizin, Java Spring Boot ile backend servisleri, REST API'ler ve deneysel mimari denemeleri için oluşturulmuş saf bir Spring Boot ortamıdır.

---

## 📋 Ön Gereksinimler

- **Java Development Kit (JDK 17 veya 21)**
  Eğer macOS üzerinde yüklü değilse Homebrew ile kurabilirsiniz:
  ```bash
  brew install openjdk@21
  ```
  veya SDKMAN ile:
  ```bash
  sdk install java 21-tem
  ```
- **Apache Maven** (veya IDE içerisindeki Maven entegrasyonu):
  ```bash
  brew install maven
  ```

---

## 🚀 Çalıştırma

Projeyi terminalden derleyip çalıştırmak için:
```bash
cd spring-lab
mvn spring-boot:run
```

Veya doğrudan favori IDE'nizle (IntelliJ IDEA, VS Code, Eclipse) `spring-lab` klasörünü bir Maven projesi olarak açıp `SpringLabApplication.java` dosyasını çalıştırabilirsiniz.

---

## 🔍 Test Endpoint'i

Uygulama ayağa kalktığında `http://localhost:8080` üzerinde dinlemeye başlar:

- **Endpoint:** `GET http://localhost:8080/api/hello`
- **Örnek Yanıt:**
  ```json
  {
    "message": "Hello from Spring Lab!",
    "status": "UP",
    "timestamp": "2026-09-08T18:30:00Z"
  }
  ```
