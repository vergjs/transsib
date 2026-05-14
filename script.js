const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = navbar.offsetHeight;
      const y = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  });
});

const revealTargets = [
  '.section-label',
  '.section-title',
  '.section-underline',
  '.section-desc',
  '.intro-text',
  '.intro-sidebar',
  '.challenge-card',
  '.gallery-item',
  '.legacy-intro',
  '.legacy-impact',
  '.legacy-closing',
  '.map-placeholder',
  '.map-route-stations',
  '.impact-card',
  '.timeline-card',
  '.sidebar-fact',
];


revealTargets.forEach(selector => {
  document.querySelectorAll(selector).forEach((el, i) => {
    el.classList.add('reveal');

    if (el.closest('.cards-grid') || el.closest('.gallery-grid') || el.closest('.legacy-impact')) {
      el.style.transitionDelay = `${i * 0.08}s`;
    }
  });
});

// Intersection Observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px',
});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));


const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroHeight = document.getElementById('hero').offsetHeight;
    if (scrolled < heroHeight) {
      heroBg.style.transform = `scale(1.03) translateY(${scrolled * 0.25}px)`;
    }
  }, { passive: true });
}


const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = 'var(--bronze-light)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));


document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.boxShadow = '0 0 0 1px rgba(184,135,58,0.45), 0 12px 40px rgba(0,0,0,0.4)';
  });
  item.addEventListener('mouseleave', () => {
    item.style.boxShadow = '';
  });
});

/* ═══ Leaflet interactive map ═══ */
window.addEventListener('load', () => {
  if (heroBg) {
    heroBg.style.transition = 'transform 20s ease-out';
    heroBg.style.transform = 'scale(1.06)';
  }
  initMap();
});

function initMap() {
  const mapEl = document.getElementById('leaflet-map');
  if (!mapEl || typeof L === 'undefined') return;


  const map = L.map('leaflet-map', {
    center: [55, 87],
    zoom: 3,
    minZoom: 2,
    maxZoom: 10,
    zoomControl: true,
  });


  L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a> &copy; OpenStreetMap',
    maxZoom: 19,
  }).addTo(map);


  map.attributionControl.setPrefix('<a href="https://leafletjs.com">Leaflet</a>');


  const stations = [
    {
      name: 'Москва',
      km: 0,
      lat: 55.7558, lng: 37.6173,
      type: 'start',
      desc: 'Нулевой километр Транссиба. С Ярославского вокзала ежедневно отправляется поезд «Россия» — семь суток через всю страну до Тихого океана. Вокзал в неорусском стиле построен по проекту Шехтеля в 1902–1904 гг.',
      icon: '',
    },
    {
      name: 'Екатеринбург',
      km: 1818,
      lat: 56.8389, lng: 60.6057,
      type: 'key',
      desc: 'Граница Европы и Азии — стела на 1 778-м километре отмечает символический рубеж двух частей света. Город основан в 1723 году как горнозаводской центр Урала и стал крупнейшим транзитным узлом магистрали.',
      icon: '',
    },
    {
      name: 'Омск',
      km: 2712,
      lat: 54.9914, lng: 73.3645,
      type: 'key',
      desc: 'Административная столица Западной Сибири и крепость на Иртыше. Участок Челябинск–Омск открыт в 1893 году одним из первых. Здесь формировались продовольственные составы, снабжавшие строителей восточных участков.',
      icon: '',
    },
    {
      name: 'Новосибирск',
      km: 3191,
      lat: 54.9892, lng: 82.9015,
      type: 'key',
      desc: 'Город, рождённый Транссибом: в 1893 году у моста через Обь возник посёлок строителей, за двадцать лет превратившийся в крупнейший город Сибири. Мост длиной 880 метров стал одним из ключевых сооружений Западно-Сибирского участка.',
      icon: '',
    },
    {
      name: 'Красноярск',
      km: 4098,
      lat: 56.0153, lng: 92.8932,
      type: 'key',
      desc: 'Знаменитый мост через Енисей (949 м), спроектированный профессором Лавром Проскуряковым, удостоен Золотой медали Всемирной парижской выставки 1900 года наряду с Эйфелевой башней. Стройка моста длилась три года в суровых условиях.',
      icon: '',
    },
    {
      name: 'Иркутск',
      km: 5184,
      lat: 52.2978, lng: 104.2964,
      type: 'key',
      desc: 'Столица Восточной Сибири и «ворота Байкала». До прихода железной дороги в 1898 году грузы из Москвы шли сюда до полугода. Транссиб сократил путь до десяти дней и превратил Иркутск в промышленный и торговый центр.',
      icon: '',
    },
    {
      name: 'КБЖД · Байкал',
      km: 5500,
      lat: 51.7, lng: 104.7,
      type: 'key',
      desc: '«Золотая пряжка» Транссиба — 84 км вдоль скалистого южного берега Байкала. Построено 39 тоннелей, 16 каменных галерей и 248 мостов. Стоимость километра была рекордной — до 130 тысяч рублей, вдесятеро дороже обычного участка.',
      icon: '',
    },
    {
      name: 'Улан-Удэ',
      km: 5642,
      lat: 51.8272, lng: 107.6061,
      type: 'key',
      desc: 'Столица Бурятии на реке Селенге. После открытия Забайкальского участка в 1900 году город стал ключевым транзитным узлом на стыке России и Монголии. Отсюда ответвляется Трансмонгольская магистраль к Улан-Батору и Пекину.',
      icon: '',
    },
    {
      name: 'Чита',
      km: 6199,
      lat: 52.0317, lng: 113.5006,
      type: 'key',
      desc: 'Центр Забайкалья и самый сложный участок стройки. Вечная мерзлота промерзала на десятки метров, летом грунт превращался в болото, разрушая насыпи. Инженеры разработали здесь первые в мире методы строительства на мерзлотных грунтах.',
      icon: '',
    },
    {
      name: 'Хабаровск',
      km: 8521,
      lat: 48.4827, lng: 135.0840,
      type: 'key',
      desc: 'Мост через Амур длиной 2,6 км — последнее звено непрерывного пути. Достроен в 1916 году, замкнув целиком российский маршрут без транзита через Маньчжурию. Проект инженера Лавра Проскурякова потребовал 18 пролётов и трёх лет работ.',
      icon: '',
    },
    {
      name: 'Владивосток',
      km: 9298,
      lat: 43.1155, lng: 131.8855,
      type: 'end',
      desc: 'Конечная станция и главный тихоокеанский порт России. Именно здесь в мае 1891 года цесаревич Николай заложил первый камень магистрали, провезя символическую тачку земли. Вокзал построен в стиле московского Ярославского — как архитектурная «рифма» начала и конца пути.',
      icon: '',
    },
  ];

  /* ── Маршрутная ломаная ── */
  const route = stations.map(s => [s.lat, s.lng]);

  // Тень маршрута (более широкая полупрозрачная)
  L.polyline(route, {
    color: 'rgba(184, 135, 58, 0.15)',
    weight: 10,
    smoothFactor: 1,
  }).addTo(map);

  // Основная линия маршрута
  const routeLine = L.polyline(route, {
    color: '#b8873a',
    weight: 3,
    opacity: 0.9,
    smoothFactor: 1,
  }).addTo(map);

  // Подгоняем вид карты под маршрут
  map.fitBounds(routeLine.getBounds(), { padding: [40, 40] });

  /* ── Функция создания кастомных маркеров ── */
  function makeIcon(type) {
    const colors = {
      start: { bg: '#f59e0b', border: '#fcd34d', size: 16 },
      end: { bg: '#ef4444', border: '#fca5a5', size: 16 },
      key: { bg: '#b8873a', border: '#d4a55c', size: 12 },
      regular: { bg: '#5a524a', border: '#7a6f64', size: 8 },
    };
    const c = colors[type] || colors.regular;
    const s = c.size;
    return L.divIcon({
      className: '',
      html: `<div style="
        width:${s}px;height:${s}px;
        border-radius:50%;
        background:${c.bg};
        border:2px solid ${c.border};
        box-shadow:0 0 ${s / 1.5}px ${c.bg}88, 0 2px 8px #000a;
        transition:transform .2s;
      "></div>`,
      iconSize: [s, s],
      iconAnchor: [s / 2, s / 2],
      popupAnchor: [0, -(s / 2 + 4)],
    });
  }

  /* ── Маркеры и попапы ── */
  const markers = {};
  stations.forEach(s => {
    const marker = L.marker([s.lat, s.lng], { icon: makeIcon(s.type) });

    const popupHtml = `
      <div class="map-popup-title">${s.icon} ${s.name}</div>
      <div class="map-popup-km">${s.km.toLocaleString('ru')} км от Москвы</div>
      <div class="map-popup-desc">${s.desc}</div>
    `;

    marker.bindPopup(popupHtml, {
      maxWidth: 250,
      closeButton: true,
      autoPan: true,
    });

    marker.on('mouseover', function () { this.openPopup(); });
    marker.addTo(map);
    markers[s.name] = { marker, lat: s.lat, lng: s.lng };
  });

  /* ── Клик по станциям в верхней панели → полёт к точке на карте ── */
  document.querySelectorAll('.station-item').forEach(item => {
    const nameEl = item.querySelector('.station-name');
    if (!nameEl) return;
    const name = nameEl.textContent.trim();
    const entry = markers[name];
    if (!entry) return;

    item.style.cursor = 'pointer';
    item.addEventListener('click', () => {
      map.flyTo([entry.lat, entry.lng], 8, { duration: 1.2 });
      setTimeout(() => entry.marker.openPopup(), 1300);
    });
  });
}
