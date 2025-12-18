document.addEventListener('DOMContentLoaded', function () {


  // SLIDERS
  new Swiper('.main__slider', {
    slidesPerView: 1,
    spaceBetween: 0,
    autoplay: {
      delay: 5000
    },
    speed: 1000,
    loop: true,
    pagination: {
      el: '.main__pagination',
      clickable: true,
    }
  });

  new Swiper('.values__slider', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
      delay: 3000
    },
    speed: 1000,
    pagination: {
      el: '.values__pagination',
      clickable: true,
    },
    on: {
      init: function () {
        updateSliderTheme(this);
      },
      slideChange: function () {
        updateSliderTheme(this);
      },
      slideChangeTransitionEnd: function () {
        updateSliderTheme(this);
      }
    }
  });

  new Swiper('.block-interested__slider', {
    slidesPerView: 1.1,
    spaceBetween: 10,
    breakpoints: {
      500: {
        slidesPerView: 1.3,
        spaceBetween: 20,
      },
      992: {
        slidesPerView: 1.5,
        spaceBetween: 20,
      },
      1300: {
        slidesPerView: 2.2,
        spaceBetween: 20,
      },
    },
    on: {
      init: function () {
        updateSliderTheme(this);
      },
      slideChange: function () {
        updateSliderTheme(this);
      },
      slideChangeTransitionEnd: function () {
        updateSliderTheme(this);
      }
    }
  });

  function updateSliderTheme(swiper) {
    const slider = document.querySelector('.values__slider');
    if (!slider) return;

    let activeIndex = swiper.realIndex !== undefined ? swiper.realIndex : swiper.activeIndex;

    if (swiper.params.loop) {
      activeIndex = swiper.realIndex;
    }

    if (activeIndex === 3) {
      slider.classList.add('dark');
    } else {
      slider.classList.remove('dark');
    }
  }

  new Swiper('.objects__slider', {
    slidesPerView: 'auto',
    loop: false,
    spaceBetween: 20
  });

  new Swiper('.blog__drop-slider', {
    slidesPerView: 'auto',
    loop: false,
    spaceBetween: 20
  });

  new Swiper('.partners__slider', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    loop: true,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
      reverseDirection: false
    },
    loopedSlides: 5,
    speed: 2000,
    freeMode: true,
    simulateTouch: false,
    mousewheel: false,
    breakpoints: {
      576: { spaceBetween: 20 },
      0: { spaceBetween: 16 }
    }
  });

  if (window.innerWidth <= 991) {
    const blogList = document.querySelector('.blog__list');
    const blogItems = document.querySelectorAll('.blog__slide');

    if (blogList) {
      blogList.classList.add('swiper-wrapper');
    }

    blogItems.forEach(item => {
      item.classList.add('swiper-slide');
    });

    const blogContainer = document.querySelector('.blog__slider');
    if (blogContainer) {
      new Swiper('.blog__slider', {
        loop: false,
        slidesPerView: 2,
        spaceBetween: 14,
        breakpoints: {
          576: { slidesPerView: 2 },
          0: { slidesPerView: 1 }
        }
      });
    }
  }
  // END SLIDERS

  // FAQ
  const buttons = document.querySelectorAll('.faq__item-btn');

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      const faqItem = this.closest('.faq__item');

      if (faqItem) {
        faqItem.classList.toggle('opened');
      }
    });
  });
  // END FAQ

  // SCROLL TOP
  const scrollTopBtn = document.querySelector('.scroll-top');

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  // END SCROLL TOP

  // RANGE SLIDERS
  function initRangeSliders() {
    // Находим все контейнеры с классом range
    const rangeContainers = document.querySelectorAll('.range');

    rangeContainers.forEach(container => {
      const sliderElement = container.querySelector('.slider');
      const minInput = container.querySelector('.range__input-min');
      const maxInput = container.querySelector('.range__input-max');

      if (!sliderElement || !minInput || !maxInput) return;

      // Получаем значения из data-атрибутов или из инпутов
      const minValue = parseInt(sliderElement.getAttribute('data-min') || minInput.value);
      const maxValue = parseInt(sliderElement.getAttribute('data-max') || maxInput.value);

      // Создаем слайдер
      const sliderInstance = noUiSlider.create(sliderElement, {
        start: [minInput.value, maxInput.value],
        connect: true,
        range: {
          'min': minValue,
          'max': maxValue
        }
      });

      // Обновляем инпуты при движении слайдера
      sliderInstance.on('update', function (values, handle) {
        const value = Math.round(values[handle]);
        if (handle) {
          maxInput.value = value;
        } else {
          minInput.value = value;
        }
      });

      // Обновляем слайдер при изменении инпутов
      minInput.addEventListener('change', function () {
        const value = Math.max(minValue, Math.min(this.value, maxValue));
        this.value = value;
        sliderInstance.set([value, null]);
      });

      maxInput.addEventListener('change', function () {
        const value = Math.max(minValue, Math.min(this.value, maxValue));
        this.value = value;
        sliderInstance.set([null, value]);
      });
    });
  }

  initRangeSliders();
  // END RANGE SLIDERS

  // POPUP
  document.querySelectorAll('.js-popup-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();

      // document.documentElement.style.height = window.innerHeight + 'px';
      // document.documentElement.style.overflow = 'hidden';
      // document.querySelector('.page-wrap').style.overflow = 'scroll';

      const popup = document.querySelector(this.dataset.href);
      if (popup.classList.contains('opened')) {
        popupClose();
        return;
      }
      popup.classList.add('opened');
    });
  });

  function popupClose() {
    const popups = document.querySelectorAll('.popup');
    popups.forEach(function (popup) {
      popup.classList.remove('opened');
      // document.querySelector('.page-wrap').style.overflow = 'hidden';
      // document.documentElement.style.overflow = 'auto';
    });
  }

  document.querySelectorAll('.popup').forEach(function (popup) {
    popup.addEventListener('click', function (e) {
      e.stopPropagation();
    });
  });

  document.querySelectorAll('.popup__close').forEach(function (element) {
    element.addEventListener('click', popupClose);
  });

  document.body.addEventListener('keyup', function (e) {
    if (e.keyCode === 27) {
      popupClose();
    }
  });
  // END POPUPS

  // SELECTS
  function initCustomSelect() {
    const selects = document.querySelectorAll('.select');
    if (!selects.length) return;

    selects.forEach(select => {
      const checkedRadio = select.querySelector('.filter__type input[type="radio"]:checked');
      if (checkedRadio) applyFilter(select);
    });

    document.addEventListener('click', function (e) {
      const select = e.target.closest('.select');
      const selectItem = e.target.closest('.select__item');
      const isSelectList = e.target.closest('.select__list');
      const filterType = e.target.closest('.filter__type');
      const filterTypeInput = e.target.closest('.filter__type input[type="radio"]');
      const filterTypeBtn = e.target.closest('.filter__type-btn');
      const selectTopBack = e.target.closest('.select-top__back');
      const selectTopClose = e.target.closest('.select-top__close');

      if (selectTopBack || selectTopClose) {
        e.preventDefault();
        e.stopPropagation();
        if (window.innerWidth <= 768 && select) {
          select.classList.remove('filter-open');
          select.classList.remove('opened');
        }
        return;
      }

      if (filterTypeBtn) {
        e.stopPropagation();
        const filterType = filterTypeBtn.closest('.filter__type');
        const radioInput = filterType ? filterType.querySelector('input[type="radio"]') : null;
        if (radioInput && !radioInput.checked) {
          const select = filterType.closest('.select');
          if (select) {
            const allRadios = select.querySelectorAll('.filter__type input[type="radio"]');
            allRadios.forEach(radio => radio.checked = false);
            radioInput.checked = true;
            applyFilter(select);
          }
        }
        return;
      }

      if (select && !selectItem && !filterType && !filterTypeInput && !isSelectList) {
        e.stopPropagation();
        if (select.classList.contains('opened')) {
          select.classList.remove('opened');
          if (window.innerWidth <= 768) select.classList.remove('filter-open');
        } else {
          document.querySelectorAll('.select.opened').forEach(openedSelect => {
            if (openedSelect !== select) {
              openedSelect.classList.remove('opened');
              if (window.innerWidth <= 768) openedSelect.classList.remove('filter-open');
            }
          });
          select.classList.add('opened');
          if (window.innerWidth <= 768) select.classList.add('filter-open');
        }
        return;
      }

      if (selectItem && window.innerWidth > 768) {
        const select = selectItem.closest('.select');
        if (!select) return;
        const selectField = select.querySelector('.select__field');
        const allSelectItems = select.querySelectorAll('.select__item');
        const filterRadios = select.querySelectorAll('.filter__type input[type="radio"]');
        if (selectField) {
          selectField.value = selectItem.textContent.trim();
          allSelectItems.forEach(item => {
            item.style.display = 'flex';
            item.classList.remove('selected');
          });
          selectItem.classList.add('selected');
          selectItem.style.display = 'none';
          if (filterRadios.length) {
            const allRadio = select.querySelector('.filter__type input[value="Все"], .filter__type input[type="radio"]:first-child');
            if (allRadio) {
              allRadio.checked = true;
              applyFilter(select);
            }
          }
        }
        document.querySelectorAll('.select.opened').forEach(sel => {
          sel.classList.remove('opened');
          if (window.innerWidth <= 768) sel.classList.remove('filter-open');
        });
        return;
      }

      if (selectItem && window.innerWidth <= 768) {
        e.stopPropagation();
        e.preventDefault();
        const select = selectItem.closest('.select');
        if (!select) return;
        const allSelectItems = select.querySelectorAll('.select__item');
        allSelectItems.forEach(item => item.classList.remove('selected'));
        selectItem.classList.add('selected');
        return;
      }

      if (filterTypeInput) {
        e.stopPropagation();
        const select = filterTypeInput.closest('.select');
        if (!select) return;
        const allRadios = select.querySelectorAll('.filter__type input[type="radio"]');
        allRadios.forEach(radio => radio.checked = false);
        filterTypeInput.checked = true;
        applyFilter(select);
        return;
      }

      if (filterType) {
        e.stopPropagation();
        const radioInput = filterType.querySelector('input[type="radio"]');
        if (radioInput && !radioInput.checked) {
          const select = filterType.closest('.select');
          if (select) {
            const allRadios = select.querySelectorAll('.filter__type input[type="radio"]');
            allRadios.forEach(radio => radio.checked = false);
            radioInput.checked = true;
            applyFilter(select);
          }
        }
        return;
      }

      if (isSelectList) {
        e.stopPropagation();
        return;
      }

      document.querySelectorAll('.select.opened').forEach(sel => {
        sel.classList.remove('opened');
        if (window.innerWidth <= 768) sel.classList.remove('filter-open');
      });
    });

    selects.forEach(select => {
      const selectTopBack = select.querySelector('.select-top__back');
      const selectTopClose = select.querySelector('.select-top__close');
      if (selectTopBack) {
        selectTopBack.addEventListener('click', function (e) {
          e.stopPropagation();
          if (window.innerWidth <= 768) {
            select.classList.remove('filter-open');
            select.classList.remove('opened');
          }
        });
      }
      if (selectTopClose) {
        selectTopClose.addEventListener('click', function (e) {
          e.stopPropagation();
          if (window.innerWidth <= 768) {
            select.classList.remove('filter-open');
            select.classList.remove('opened');
          }
        });
      }

      const selectItems = select.querySelectorAll('.select__item');
      selectItems.forEach(item => {
        item.addEventListener('click', function (e) {
          if (window.innerWidth <= 768) {
            e.stopPropagation();
            e.preventDefault();
            const allSelectItems = select.querySelectorAll('.select__item');
            allSelectItems.forEach(item => item.classList.remove('selected'));
            this.classList.add('selected');
            return;
          }
          e.stopPropagation();
          const selectField = select.querySelector('.select__field');
          const allSelectItems = select.querySelectorAll('.select__item');
          const filterRadios = select.querySelectorAll('.filter__type input[type="radio"]');
          if (selectField) {
            selectField.value = this.textContent.trim();
            allSelectItems.forEach(item => {
              item.style.display = 'flex';
              item.classList.remove('selected');
            });
            this.classList.add('selected');
            this.style.display = 'none';
            if (filterRadios.length) {
              const allRadio = select.querySelector('.filter__type input[value="Все"], .filter__type input[type="radio"]:first-child');
              if (allRadio) {
                allRadio.checked = true;
                applyFilter(select);
              }
            }
          }
          document.querySelectorAll('.select.opened').forEach(sel => {
            sel.classList.remove('opened');
            if (window.innerWidth <= 768) sel.classList.remove('filter-open');
          });
        });
      });
    });

    function applyFilter(select) {
      if (!select) return;
      const selectedItem = select.querySelector('.select__item.selected');
      const selectedValue = selectedItem ? selectedItem.textContent.trim() : '';
      const allItems = select.querySelectorAll('.select__item');
      const activeRadio = select.querySelector('.filter__type input[type="radio"]:checked');
      if (!activeRadio) {
        const allRadio = select.querySelector('.filter__type input[value="Все"], .filter__type input[type="radio"]:first-child');
        if (allRadio) allRadio.checked = true;
        return;
      }
      const filterValue = activeRadio.value || activeRadio.nextElementSibling.textContent.trim();
      allItems.forEach(item => {
        const itemText = item.textContent.trim();
        if (itemText === selectedValue) {
          item.style.display = 'none';
          return;
        }
        let shouldShow = false;
        switch (filterValue) {
          case 'Все':
            shouldShow = true;
            break;
          case 'Округ':
            shouldShow = itemText.includes('АО');
            break;
          case 'Метро':
            shouldShow = itemText.includes('м.') || itemText.toLowerCase().includes('метро');
            break;
          case 'Улица':
            const streetIndicators = ['ул.', 'улица', 'проспект', 'пр.', 'бульвар', 'б-р', 'шоссе', 'аллея', 'переулок', 'площадь'];
            shouldShow = streetIndicators.some(indicator => itemText.toLowerCase().includes(indicator.toLowerCase()));
            break;
          default:
            shouldShow = true;
        }
        item.style.display = shouldShow ? 'flex' : 'none';
      });
    }

    selects.forEach(select => {
      const filterInputs = select.querySelectorAll('.filter__type input[type="radio"]');
      const selectField = select.querySelector('.select__field');
      const hasChecked = Array.from(filterInputs).some(input => input.checked);
      if (!hasChecked && filterInputs.length) {
        const allRadio = select.querySelector('.filter__type input[value="Все"], .filter__type input[type="radio"]:first-child');
        if (allRadio) allRadio.checked = true;
      }
      filterInputs.forEach(input => {
        input.addEventListener('change', function () {
          applyFilter(select);
        });
      });
      if (selectField) {
        selectField.addEventListener('focus', function () {
          this.blur();
        });
        selectField.addEventListener('dblclick', function () {
          resetSelect(select);
        });
      }
    });

    function resetSelect(select) {
      if (!select) return;
      const selectField = select.querySelector('.select__field');
      const allItems = select.querySelectorAll('.select__item');
      const selectedItem = select.querySelector('.select__item.selected');
      const allRadio = select.querySelector('.filter__type input[value="Все"], .filter__type input[type="radio"]:first-child');
      if (selectField) {
        selectField.value = '';
        selectField.placeholder = 'Выбрать';
      }
      if (selectedItem) selectedItem.classList.remove('selected');
      allItems.forEach(item => item.style.display = 'flex');
      if (allRadio) {
        allRadio.checked = true;
        applyFilter(select);
      }
      select.classList.remove('opened');
      if (window.innerWidth <= 768) select.classList.remove('filter-open');
    }

    selects.forEach(select => applyFilter(select));
  }

  initCustomSelect();
  // END SELECTS

  // SORT
  document.addEventListener('click', function (e) {
    const sortBtn = e.target.closest('.sort__btn');
    const sortList = e.target.closest('.sort__list');
    const sortElement = e.target.closest('.sort');

    // Проверяем ширину экрана
    const isMobile = window.innerWidth <= 550;

    if (sortBtn) {
      e.stopPropagation();

      if (isMobile) {
        // Для мобильных: добавляем/удаляем класс sort-open у documentElement
        document.documentElement.classList.toggle('sort-open');
      } else {
        // Для десктопа: добавляем/удаляем класс opened у родительского .sort
        const sort = sortBtn.closest('.sort');
        if (sort) {
          sort.classList.toggle('opened');
        }
      }
      return;
    }

    if (sortList) {
      e.stopPropagation();
      return;
    }

    // Если кликнули на кнопку закрытия внутри sort__body (только для мобильных)
    const sortClose = e.target.closest('.sort__close');
    if (sortClose && isMobile) {
      document.documentElement.classList.remove('sort-open');
      return;
    }

    // Для мобильных: если кликнули вне sort__body
    if (isMobile) {
      const sortBody = e.target.closest('.sort__body');
      if (!sortBody) {
        document.documentElement.classList.remove('sort-open');
      }
    }

    // Для десктопа: если кликнули вне sortElement
    if (!sortElement) {
      document.querySelectorAll('.sort').forEach(sort => {
        sort.classList.remove('opened');
      });
    }
  });

  // Обработчик изменения размера окна
  window.addEventListener('resize', function () {
    // Если ширина экрана больше 550px, удаляем класс sort-open
    if (window.innerWidth > 550) {
      document.documentElement.classList.remove('sort-open');
    }
  });
  // END SORT

  // SCRIPTS LOADED
  setTimeout(function () {
    document.querySelector('.page-wrap').classList.add('loaded');
  }, 1000);
  // END SCRIPTS LOADED

  // SEARCH
  const searchElement = document.querySelector('.search');

  if (!searchElement) return;

  document.addEventListener('click', function (e) {
    const target = e.target;
    const searchBtn = target.closest('.search-open-btn');
    const isSearchElement = target.closest('.search') === searchElement;

    if (searchBtn) {
      e.preventDefault();
      e.stopPropagation();
      searchElement.classList.toggle('opened');
    }
    else if (isSearchElement) {
      e.stopPropagation();
    }
    else {
      searchElement.classList.remove('opened');
    }
  });
  // EDN SEARCH

  // MENU
  document.addEventListener('click', function (e) {
    if (e.target.closest('.menu-open-btn')) {
      e.preventDefault();

      const btn = e.target.closest('.menu-open-btn');
      const menu = document.querySelector('.menu');

      btn.classList.toggle('actived');
      if (menu) {
        menu.classList.toggle('opened');
      }
    }
  });
  // END MENU

  // HEADER SCROLL
  (function () {
    let lastKnownScrollPosition = 0;
    let ticking = false;

    function isMobileView() {
      return window.innerWidth <= 991;
    }

    function updateHeader(scrollPos) {
      const header = document.querySelector('.header');
      if (!header || !isMobileView()) return;

      const isScrollingDown = scrollPos > lastKnownScrollPosition;

      if ((scrollPos > 100 && lastKnownScrollPosition === 0) ||
        (isScrollingDown && scrollPos > 100)) {
        header.classList.add('hidden');
      }
      else if (!isScrollingDown) {
        header.classList.remove('hidden');
      }

      lastKnownScrollPosition = scrollPos <= 0 ? 0 : scrollPos;
    }

    function checkInitialScroll() {
      const scrollPos = window.pageYOffset || document.documentElement.scrollTop;
      const header = document.querySelector('.header');

      if (header && isMobileView() && scrollPos > 100) {
        header.classList.add('hidden');
      }

      lastKnownScrollPosition = scrollPos;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          updateHeader(window.pageYOffset || document.documentElement.scrollTop);
          ticking = false;
        });
        ticking = true;
      }
    });

    window.addEventListener('resize', function () {
      if (!isMobileView()) {
        document.querySelector('.header')?.classList.remove('hidden');
      } else {
        checkInitialScroll();
      }
    });

    document.addEventListener('DOMContentLoaded', function () {
      if (!isMobileView()) {
        document.querySelector('.header')?.classList.remove('hidden');
      } else {
        checkInitialScroll();
      }
    });

    window.addEventListener('load', checkInitialScroll);
  })();
  // END HEADER SCROLL

  // YANDEX MAP
  function showYaMaps() {
    if (window.ymaps) {
      initMaps();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://api-maps.yandex.ru/2.1/?lang=ru_RU";

    document.body.appendChild(script);

    script.onload = function () {
      ymaps.ready(initMaps);
    };
  }

  if (document.getElementById('map') || document.getElementById('map2') || document.getElementById('map3')) {
    showYaMaps();
  }

  function initMaps() {
    if (document.getElementById('map')) {
      var map = new ymaps.Map("map", {
        center: [55.7643235689689, 37.55611849999994],
        zoom: 17,
        controls: []
      });

      var placemark = new ymaps.Placemark([55.7643235689689, 37.55611849999994], {
        hintContent: '123022 Звенигородское ш. 18/20, стр. 1'
      }, {
        iconLayout: 'default#image',
        iconImageHref: 'images/mark.svg',
        iconImageSize: [46, 46],
        iconImageOffset: [-23, -46]
      });

      map.behaviors.disable('scrollZoom');
      map.geoObjects.add(placemark);
    }
    if (document.getElementById('map2')) {
      var map2 = new ymaps.Map("map2", {
        center: [55.7643, 37.5561],
        zoom: 15,
      });

      var clusterer = new ymaps.Clusterer({
        clusterDisableClickZoom: false,
        clusterOpenBalloonOnClick: false,
        hasBalloon: false,
        clusterIcons: [{
          href: 'img/cluster.svg',
          size: [56, 56],
          offset: [-28, -28]
        }],
        clusterIconContentLayout: ymaps.templateLayoutFactory.createClass(
          '<div class="cluster-number">$[properties.geoObjects.length]</div>'
        )
      });

      var clusterCoords = [
        [55.7643, 37.5561],
        [55.7650, 37.5560],
        [55.7635, 37.5550]
      ];

      for (var i = 0; i < clusterCoords.length; i++) {
        var placemark = new ymaps.Placemark(
          clusterCoords[i],
          {},
          {
            iconLayout: 'default#image',
            iconImageHref: 'images/mark.svg',
            iconImageSize: [30, 30],
            iconImageOffset: [-15, -15],
            hasBalloon: false,
            hasHint: false
          }
        );
        clusterer.add(placemark);
      }

      var customIconLayout = ymaps.templateLayoutFactory.createClass(
        '<a href="#" class="custom-marker">' +
        '<div class="marker-header">' +
        '<img class="marker-icon" src="{{ properties.markerData.icon }}" alt="">' +
        '</div>' +
        '<div class="marker-body">' +
        '<div class="marker-address">{{ properties.markerData.address }}</div>' +
        '<div class="marker-details">' +
        '<span class="marker-area">{{ properties.markerData.area }}</span>' +
        '<span class="marker-tenant">{{ properties.markerData.tenant }}</span>' +
        '</div>' +
        '</div>' +
        '</a>'
      );

      var htmlMarkersData = [
        {
          coords: [55.763690, 37.602005],
          data: {
            icon: 'images/objects/list/item-1.jpg',
            address: 'Большая Бронная, 25с3',
            area: '46,5 м2',
            tenant: 'Арендатор: THE KAS',
          }
        },
      ];

      for (var i = 0; i < htmlMarkersData.length; i++) {
        var marker = htmlMarkersData[i];

        var htmlPlacemark = new ymaps.Placemark(
          marker.coords,
          {
            markerData: marker.data
          },
          {
            iconLayout: customIconLayout,
            iconOffset: [0, -120],
            iconShape: {
              type: 'Rectangle',
              coordinates: [[-100, -140], [100, 20]]
            },
            hasBalloon: false,
            hasHint: false,
            hideIconOnBalloonOpen: false
          }
        );

        map2.geoObjects.add(htmlPlacemark);
      }

      map2.geoObjects.add(clusterer);
      map2.behaviors.disable('scrollZoom');

      clusterer.events.add('click', function (e) {
        var target = e.get('target');
        if (target instanceof ymaps.Cluster) {
          map2.setBounds(target.getBounds(), {
            checkZoomRange: true,
            zoomMargin: 30
          });
        }
      });
    }

    if (document.getElementById('map3')) {
      var map3 = new ymaps.Map("map3", {
        center: [55.763690, 37.602005],
        zoom: 15,
      });

      var customIconLayout = ymaps.templateLayoutFactory.createClass(
        '<a href="#" class="custom-marker">' +
        '<div class="marker-header">' +
        '<img class="marker-icon" src="{{ properties.markerData.icon }}" alt="">' +
        '</div>' +
        '<div class="marker-body">' +
        '<div class="marker-address">{{ properties.markerData.address }}</div>' +
        '<div class="marker-details">' +
        '<span class="marker-area">{{ properties.markerData.area }}</span>' +
        '<span class="marker-tenant">{{ properties.markerData.tenant }}</span>' +
        '</div>' +
        '</div>' +
        '</a>'
      );

      var htmlMarkersData = [
        {
          coords: [55.763690, 37.602005],
          data: {
            icon: 'images/objects/list/item-1.jpg',
            address: 'Большая Бронная, 25с3',
            area: '46,5 м2',
            tenant: 'Арендатор: THE KAS',
          }
        },
      ];

      for (var i = 0; i < htmlMarkersData.length; i++) {
        var marker = htmlMarkersData[i];

        var htmlPlacemark = new ymaps.Placemark(
          marker.coords,
          {
            markerData: marker.data
          },
          {
            iconLayout: customIconLayout,
            iconOffset: [0, -120],
            iconShape: {
              type: 'Rectangle',
              coordinates: [[-100, -140], [100, 20]]
            },
            hasBalloon: false,
            hasHint: false,
            hideIconOnBalloonOpen: false
          }
        );

        map3.geoObjects.add(htmlPlacemark);
      }

      map3.behaviors.disable('scrollZoom');
    }
  }
  // END YANDEX MAP
});

if (document.querySelector('.images-product')) {
  const thumbsSwiper = new Swiper('.images-product__thumb', {
    observer: true,
    observeParents: true,
    slidesPerView: 7,
    spaceBetween: 12,
    speed: 400,
    preloadImages: true,
    breakpoints: {
      992: {
        slidesPerView: 4.9, spaceBetween: 12,
      },
      1200: {
        slidesPerView: 6.9, spaceBetween: 12,
      },
    },
  });

  const mainThumbsSwiper = new Swiper('.images-product__slider', {
    thumbs: {
      swiper: thumbsSwiper
    },
    observer: true,
    observeParents: true,
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 400,
    preloadImages: true,
    pagination: {
      el: '.images-product__pagination',
      clickable: true,
    },
    navigation: {
      prevEl: '.images-product__arrow-prev',
      nextEl: '.images-product__arrow-next',
    },
  });
}

Fancybox.bind("[data-fancybox]", {
  // опции
});

//========================================================================================================================================================

document.addEventListener('click', function (e) {
  const target = e.target;
  const btn = target.closest('[data-open-filter]');

  if (btn) {
    e.preventDefault();
    const filterType = btn.getAttribute('data-open-filter');
    let filterElement = null;

    if (filterType === 'main') {
      filterElement = document.querySelector('[data-filter-id="main-filter"]');
    } else if (filterType === 'catalog') {
      filterElement = document.querySelector('.catalog-filter');
    } else if (filterType === 'map') {
      filterElement = document.querySelector('.filter-map');
    }

    if (filterElement) {
      filterElement.classList.add('filter-open');
      document.documentElement.classList.add('filter_open');
    }
  }

  if (target.closest('.filter-top__close') || target.closest('.filter-map__close')) {
    document.querySelectorAll('.filter-open').forEach(el => {
      el.classList.remove('filter-open');
    });
    document.documentElement.classList.remove('filter_open');
  }

});

const btnMap = document.querySelector('.btn-map');
const btnCloseMap = document.querySelector('.filter-map__close');
if (btnMap) {
  btnMap.addEventListener('click', function (event) {
    event.preventDefault();
    document.documentElement.classList.add('map-open');
  });
  btnCloseMap.addEventListener('click', function () {
    document.documentElement.classList.remove('map-open');
  });
}

const layoutContainers = document.querySelectorAll('.block-layout__content');

if (layoutContainers) {
  layoutContainers.forEach(container => {
    const zoomContainer = container.querySelector('.block-layout__zoom-container');
    const image = container.querySelector('.block-layout__image');
    const zoomPlusBtn = container.querySelector('.zoom-plus');
    const zoomMinusBtn = container.querySelector('.zoom-minus');

    // Настройки зума
    let currentScale = 1;
    const minScale = 0.5;
    const maxScale = 3;
    const scaleStep = 0.25;

    let isDragging = false;
    let startX, startY;
    let translateX = 0;
    let translateY = 0;

    function getCenter() {
      const containerRect = zoomContainer.getBoundingClientRect();
      return {
        x: containerRect.width / 2,
        y: containerRect.height / 2
      };
    }

    function centerImage() {
      const imageRect = image.getBoundingClientRect();
      const center = getCenter();

      translateX = 0;
      translateY = 0;
      updateTransform();
    }

    function updateTransform() {
      image.style.transform = `
                translate(${translateX}px, ${translateY}px)
                scale(${currentScale})
            `;
    }

    function updateScale(newScale) {
      const oldScale = currentScale;
      currentScale = Math.max(minScale, Math.min(maxScale, newScale));

      if (currentScale === 1) {
        centerImage();
      } else if (currentScale !== oldScale && currentScale > 1) {
        const scaleChange = currentScale / oldScale;
        translateX *= scaleChange;
        translateY *= scaleChange;
      }

      constrainPosition();
      updateTransform();

      zoomPlusBtn.disabled = currentScale >= maxScale;
      zoomMinusBtn.disabled = currentScale <= minScale;

      zoomContainer.style.cursor = currentScale > 1 ? 'grab' : 'default';
    }

    function constrainPosition() {
      if (currentScale <= 1) {
        translateX = 0;
        translateY = 0;
        return;
      }

      const containerRect = zoomContainer.getBoundingClientRect();
      const imageRect = image.getBoundingClientRect();

      const scaledWidth = imageRect.width * currentScale;
      const scaledHeight = imageRect.height * currentScale;

      const maxMoveX = (scaledWidth - containerRect.width) / 2;
      const maxMoveY = (scaledHeight - containerRect.height) / 2;

      translateX = Math.max(-maxMoveX, Math.min(maxMoveX, translateX));
      translateY = Math.max(-maxMoveY, Math.min(maxMoveY, translateY));

      if (scaledWidth <= containerRect.width) {
        translateX = 0;
      }
      if (scaledHeight <= containerRect.height) {
        translateY = 0;
      }
    }

    zoomContainer.addEventListener('mousedown', startDrag);

    function startDrag(e) {
      if (currentScale <= 1) return;

      e.preventDefault();
      isDragging = true;
      startX = e.clientX - translateX;
      startY = e.clientY - translateY;
      zoomContainer.style.cursor = 'grabbing';

      document.addEventListener('mousemove', drag);
      document.addEventListener('mouseup', stopDrag);
    }

    function drag(e) {
      if (!isDragging) return;

      translateX = e.clientX - startX;
      translateY = e.clientY - startY;

      constrainPosition();
      updateTransform();
    }

    function stopDrag() {
      isDragging = false;
      zoomContainer.style.cursor = currentScale > 1 ? 'grab' : 'default';

      document.removeEventListener('mousemove', drag);
      document.removeEventListener('mouseup', stopDrag);
    }

    zoomPlusBtn.addEventListener('click', function () {
      if (currentScale < maxScale) {
        updateScale(currentScale + scaleStep);
      }
    });

    zoomMinusBtn.addEventListener('click', function () {
      if (currentScale > minScale) {
        updateScale(currentScale - scaleStep);
      }
    });

    zoomContainer.addEventListener('wheel', function (e) {
      e.preventDefault();

      if (currentScale <= minScale && e.deltaY > 0) return;
      if (currentScale >= maxScale && e.deltaY < 0) return;

      const rect = zoomContainer.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const center = getCenter();

      const offsetFromCenterX = mouseX - center.x;
      const offsetFromCenterY = mouseY - center.y;

      const oldScale = currentScale;

      if (e.deltaY < 0) {
        updateScale(currentScale + scaleStep);
      } else {
        updateScale(currentScale - scaleStep);
      }

      if (currentScale !== oldScale && currentScale > 1) {
        const scaleChange = currentScale / oldScale;
        translateX += offsetFromCenterX * (1 - scaleChange);
        translateY += offsetFromCenterY * (1 - scaleChange);

        constrainPosition();
        updateTransform();
      }
    }, { passive: false });

    zoomContainer.addEventListener('dblclick', function (e) {
      e.preventDefault();
      updateScale(1);
    });

    centerImage();
    updateScale(1);

    window.addEventListener('resize', function () {
      centerImage();
      constrainPosition();
      updateTransform();
    });
  });
}

const stickyBlock = document.querySelector('.block-sticky');
const targetBlock = document.querySelector('.block-descr-product');

if (stickyBlock && targetBlock) {
  const OFFSET = 100;

  function checkStickyActive() {
    const targetRect = targetBlock.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (targetRect.bottom < OFFSET) {
      stickyBlock.classList.add('active');
    } else {
      stickyBlock.classList.remove('active');
    }
  }

  setTimeout(checkStickyActive, 10);

  window.addEventListener('scroll', checkStickyActive);
}