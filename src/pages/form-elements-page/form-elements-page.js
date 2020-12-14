import 'normalize.css';
import '../../fonts/fontawesome-free-5/css/all.min.css'

import '@form-elements-page/form-elements-page.scss'
import '@form-elements-page/form-elements-page.pug'

// Form Elements Masked
import '@includes/form-elem-masked/jquery.maskedinput.min.js';

// Form Elements Masked код
$(document).ready(function(){
  $('.js-date-mask').mask('99.99.9999');
});


