function contact(productName) {
  const phoneNumber = "966552232516"; // يمكن تغيير الرقم حسب الحاجة
  const message = `مرحباً، أنا مهتم بشراء المنتج: ${productName}. أرجو تزويدي بالمزيد من المعلومات والسعر.`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  window.open(whatsappURL, "_blank");
}

// دالة لإضافة تأثيرات تفاعلية عند التمرير
document.addEventListener("DOMContentLoaded", function () {
  // تأثير سلس للروابط
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      // إذا كان الرابط يبدأ بـ # أو يشير لقسم داخل الصفحة فقط امنع الافتراضي
      if (href.startsWith("#")) {
        e.preventDefault();
        const targetSection = document.querySelector(href);
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 50,
            behavior: "smooth",
          });
        }
      }
      // إذا كان الرابط صفحة أخرى، اسمح بالتنقل الافتراضي
    });
  });

  // تأثير عند التمرير على الأقسام
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // تطبيق تأثيرات على العناصر
  const animatedElements = document.querySelectorAll(".item, section, .hero");
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  // إضافة تأثير hover على الأزرار
  const buttons = document.querySelectorAll(".btn-contact");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.05)";
      this.style.transition = "transform 0.3s ease";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1)";
    });
  });

  // دالة لعرض تنبيهات
  function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === "success" ? "#4CAF50" : "#2196F3"};
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            z-index: 1000;
            opacity: 0;
            transform: translateX(100px);
            transition: all 0.3s ease;
        `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.opacity = "1";
      notification.style.transform = "translateX(0)";
    }, 100);

    setTimeout(() => {
      notification.style.opacity = "0";
      notification.style.transform = "translateX(100px)";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  // إضافة تأثير تحميل الصور
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1";
    });

    img.style.opacity = "0";
    img.style.transition = "opacity 0.5s ease";

    // إذا كانت الصورة محملة مسبقاً
    if (img.complete) {
      img.style.opacity = "1";
    }
  });

  // تحسين تجربة المستخدم للهواتف
  if (window.innerWidth <= 768) {
    // إضافة تأثيرات خاصة للجوال
    document.body.style.touchAction = "manipulation";
  }

  // تحديث السنة في الفوتر تلقائياً
  const currentYear = new Date().getFullYear();
  const footer = document.querySelector("footer");
  if (footer) {
    footer.innerHTML = footer.innerHTML.replace(/2025/, currentYear);
  }
});

// دالة لمشاركة الموقع
function shareWebsite() {
  if (navigator.share) {
    navigator
      .share({
        title: "متجر الرفوف الصناعية",
        text: "اكتشف أفضل رفوف المستودعات والتموينات بجودة عالية",
        url: window.location.href,
      })
      .then(() => console.log("تم المشاركة بنجاح"))
      .catch((error) => console.log("خطأ في المشاركة:", error));
  } else {
    // نسخ الرابط إذا لم تدعم المتصفح المشاركة
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        alert("تم نسخ رابط الموقع إلى الحافظة");
      })
      .catch(() => {
        prompt("انسخ الرابط يدوياً:", window.location.href);
      });
  }
}

// إدارة حالة التحميل
window.addEventListener("load", function () {
  document.body.classList.add("loaded");

  // إخفاء مؤشر التحميل إذا كان موجوداً
  const loader = document.querySelector(".loader");
  if (loader) {
    loader.style.display = "none";
  }
});

let scrollTimer;
window.addEventListener("scroll", function () {
  document.body.classList.add("scrolling");

  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(function () {
    document.body.classList.remove("scrolling");
  }, 100);
});

// تحكم بالفيديو وإضافة تأثيرات
function initVideoPlayer() {
  const videos = document.querySelectorAll("video");

  videos.forEach((video) => {
    // إضافة تحكم بالصوت
    video.volume = 0.5;

    // تأثير عند التشغيل
    video.addEventListener("play", function () {
      this.parentElement.classList.add("playing");
    });

    // تأثير عند التوقف
    video.addEventListener("pause", function () {
      this.parentElement.classList.remove("playing");
    });

    // تحميل تلقائي للبوستر
    video.addEventListener("loadeddata", function () {
      this.style.opacity = "1";
    });
  });
}

// استدعاء الدالة عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", function () {
  initVideoPlayer();
});
