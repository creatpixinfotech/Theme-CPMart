document.addEventListener('DOMContentLoaded', function () {
  var swiper = new Swiper('.js-collection-swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    slidesPerGroup: 1,
    direction: 'horizontal',
    pagination: {
      el: '.swiper-pagination',
      type: 'progressbar',
    },
  });
});