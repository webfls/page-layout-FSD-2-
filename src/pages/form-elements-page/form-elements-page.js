import 'normalize.css';
import '../../fonts/fontawesome-free-5/css/all.min.css'

import '@form-elements-page/form-elements-page.scss'
import '@form-elements-page/form-elements-page.pug'

// Form Elements Masked
import '@includes/form-elem-masked/jquery.maskedinput.min.js';

// Form Elements Masked код
$(document).ready(function () {
  $('.js-date-mask').mask('99.99.9999');
});

// Like
$(document).ready(function () {
  $('.js-like').on('click', function () {

    $(this).toggleClass("form__label_like_checked");

    var $heart = $(this).parent().find('.js-heart');

    if ($(this).hasClass("form__label_like_checked")) {
      $heart.html('favorite');
      $(this).parent().find('.js-likebtn').addClass("checked");
    } else {
      $heart.html('favorite_border');
      $(this).parent().find('.js-likebtn').removeClass("checked");
    };

    // $heart.html() === 'favorite_border' ?

    var $numberLike = $(this).parent().find('.js-number-like').html();

    if ($numberLike >= 1) {
      if ($(this).hasClass("form__label_like_checked")) {
        $numberLike = parseInt($numberLike) + 1
      } else {
        $numberLike = parseInt($numberLike) - 1
      };
      return $(this).parent().find('.js-number-like').html($numberLike);
    } else if ($numberLike < 1) {
      if ($(this).hasClass("form__label_like_checked")) {
        $numberLike = parseInt($numberLike) + 1
      } else {
        $numberLike = parseInt($numberLike)
      };
      return $(this).parent().find('.js-number-like').html($numberLike);
    }

  });
});

// Rate (если стоит атрибут checked  у input, то добавляется класс "checked", в css меняется label(star_border -> star))
$(document).ready(function () {
  $('.js-rate').each(function (indx) {
    $(this).removeClass("checked");

    var attr = $(this).attr('checked');

    // For some browsers, `attr` is undefined; for others, `attr` is false. Check for both.
    if (typeof attr !== typeof undefined && attr !== false) {
      // Element has this attribute
      $(this).addClass("checked");
    }
  });

  // Rate (снятие активного класса checked у inputa)
  $('.js-rate').on('click', function () {
    $('.js-rate').removeClass("checked");
  });
});

// Range slider
import '@includes/range-slider/ion.rangeSlider.min.js';
import '@includes/range-slider/ion.rangeSlider.min.css';
import '@includes/range-slider/range-slider.scss';

$(".js-range-slider").ionRangeSlider({
  type: "double",
  min: 0,
  max: 16000,
  from: 5000,
  to: 10000,
  grid: false,
  keyboard: true,
  onChange: function (data) {
    $('.js-data-from').html(data.from);
    $('.js-data-to').html(data.to);
  },
});