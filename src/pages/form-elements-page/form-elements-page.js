import 'normalize.css';

import '@form-elements-page/form-elements-page.scss'
import '@form-elements-page/form-elements-page.pug'

// Form Elements Masked
import '@includes/form-elem-masked/jquery.maskedinput.min.js';

// Form Elements Masked код
$(document).ready(function(){
  $('.js-date').mask('99.99.9999');
});


// item-quantity-dropdown
// import '@includes/item-quantity-dropdown/item-quantity-dropdown-libs.js';
// import '@includes/item-quantity-dropdown/item-quantity-dropdown.js'
// import '@includes/item-quantity-dropdown/item-quantity-dropdown-common.css';


// item-quantity-dropdown код
// $(function(){
//   $('.iqdropdown').iqDropdown({
//     // max total items
//     maxItems: Infinity,
//     // min total items
//     minItems: 0,
//     // text to show on the dropdown override data-selection-text attribute
//     selectionText: 'item',
//     // text to show for multiple items
//     textPlural: 'items',
//     // optionally can use setSelectionText function to override selectionText
//     setSelectionText: (itemCount, totalItems) => { /* return string */ },
//     // buttons to increment/decrement
//     controls: {
//       position: 'right',
//       displayCls: 'iqdropdown-item-display',
//       controlsCls: 'iqdropdown-item-controls',
//       counterCls: 'counter'
//     },
//     // fires when an item quantity changes
//     onChange: (id, count, totalItems) => {},
//     // return false to prevent an item decrement
//     beforeDecrement: (id, itemCount) => {},
//     // return false to prevent an item increment
//     beforeIncrement: (id, itemCount) => {}
//   })
// });
