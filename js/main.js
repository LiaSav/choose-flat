$(document).ready(function () {
  $('.slider').on('init', (slick, slick1) => {
    slick1.$slideTrack[0].style.cssText += `
      position:relative;
      right: ${slick1.slideWidth - (slick1.slideWidth * 1.27)}px;
    `;
  })
  $('.slider').slick({
    speed: 1000,
    adaptiveHeight: true,
    swipe: true,
    dots: false,
    slidesToShow: 1.27,
    slidesToScroll: 1,
    nextArrow: '<button type="button" class="slick-next"></button>',
    prevArrow: '<button type="button" class="slick-prev"></button>',
  });
});

/** Стрелка переключатель в зависимости от положения на экране */
function sideSwitchArrow(swiper, arrow, container) {
  const mediumCordValue = document.documentElement.clientWidth / 2;
  document.body.append(arrow);
  container.style.cursor = 'none';
  arrow.style.cursor = 'none';
  arrow.style.zIndex = 1000;
  arrow.style.position = 'fixed';
  arrow.__proto__.hide = function () {
    this.style.opacity = '0';
    this.style.pointerEvents = 'none';
  };
  arrow.__proto__.show = function () {
    this.style.opacity = '1';
    // this.style.pointerEvents = 'auto';
  };
  arrow.dataset.side = 'leftSide';

  container.addEventListener('mousemove', desktopNavButtonHandler);
  container.addEventListener('mouseenter', () => {
    arrow.show();
  });
  container.addEventListener('mouseleave', () => {
    arrow.hide();
  });
  if (document.documentElement.clientWidth < 769) {
    window.removeEventListener('mousemove', desktopNavButtonHandler);
    arrow.remove();
  }

  /** Записывает координаты обьекта, на котором нужно скрыть стрелку переключения слайдера */
  /** ms ---> main-screen */

  function desktopNavButtonHandler(evt) {
    // arrow.style.position = 'fixed';
    arrow.style.left = `${evt.clientX - 18}px`;
    arrow.style.top = `${evt.clientY - 18}px`;

    getCursorSide(evt.clientX);
    handleArrowVisibility(evt);
  }

  function handleArrowVisibility() { }

  function getCursorSide(x) {
    if (x < mediumCordValue) {
      arrow.classList.add('left-side');
      arrow.dataset.side = 'leftSide';
      // switchGallerySlide('leftSide');
    } else {
      arrow.classList.remove('left-side');
      arrow.dataset.side = 'rightSide';
      // switchGallerySlide('rightSide')
    }
  }
  function changeMe() {
    switchGallerySlide(arrow.dataset.side);
  }
  container.addEventListener('click', changeMe);
  if (document.documentElement.clientWidth < 576) {
    container.removeEventListener('click', changeMe);
  }
  const navigate = {
    leftSide: () => {
      // swiper.slidePrev();
      document.querySelector('.slick-prev').click();
    },
    rightSide: () => {
      // swiper.slideNext();
      document.querySelector('.slick-next').click();
    },
  };

  function switchGallerySlide(side) {
    navigate[side]();
    return navigate.side;
  }

  // eslint-disable-next-line no-unused-vars
}
sideSwitchArrow({}, document.querySelector('.moving-arrow'), document.querySelector('.slider'));
/** СТрелка переключатель в зависимости от положения на єкране END */