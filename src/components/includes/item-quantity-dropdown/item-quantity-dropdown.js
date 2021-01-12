$(document).ready(function () {

  const defaults = {
    maxItems: Infinity,
    minItems: 0,
    selectionText: 'item',
    textPlural: 'items',
    controls: {
      position: 'right',
      displayCls: 'iqdropdown-content',
      controlsCls: 'iqdropdown-item-controls',
      counterCls: 'counter',
    },
    items: {},
    onChange: () => {},
    beforeDecrement: () => true,
    beforeIncrement: () => true,
    setSelectionText(itemCount, totalItems) {
      const usePlural = totalItems !== 1 && this.textPlural.length > 0;
      const text = usePlural ? this.textPlural : this.selectionText;
      return `${totalItems} ${text}`;
    },
  };

  $.fn.iqDropdown = function (options) {
    this.each(function () {
      const $this = $(this);
      const $selection = $this.find('p.iqdropdown-selection').last();
      const $menu = $this.find('div.iqdropdown-menu');
      const $items = $menu.find('div.iqdropdown-menu-option');
      const dataAttrOptions = {
        selectionText: $selection.data('selection-text'),
        textPlural: $selection.data('text-plural'),
      };
      const settings = $.extend(true, {}, defaults, dataAttrOptions, options);
      const itemCount = {};
      let totalItems = 0;

      function updateDisplay() {
        $selection.html(settings.setSelectionText(itemCount, totalItems));
      }

      function setItemSettings(id, $item) {
        const minCount = Number($item.data('mincount'));
        const maxCount = Number($item.data('maxcount'));

        settings.items[id] = {
          minCount: Number.isNaN(Number(minCount)) ? 0 : minCount,
          maxCount: Number.isNaN(Number(maxCount)) ? Infinity : maxCount,
        };
      }

      function addControls(id, $item) {
        const $controls = $('<div />').addClass(settings.controls.controlsCls);
        const $buttonApply = $('.js-iqdropdown-menu-apply');
        const $buttonClean = $('.js-iqdropdown-menu-clean');
        const $decrementButton = $(`
          <button class="button-decrement">
            <i class="icon-decrement"></i>
          </button>
        `);
        const $incrementButton = $(`
          <button class="button-increment">
            <i class="icon-decrement icon-increment"></i>
          </button>
        `);
        const $counter = $(`<span>${itemCount[id]}</span>`).addClass(settings.controls.counterCls);

        $item.children('div').addClass(settings.controls.displayCls);
        $controls.append($decrementButton, $counter, $incrementButton);

        if (settings.controls.position === 'right') {
          $item.append($controls);
        } else {
          $item.prepend($controls);
        }
        // Работа кнопок
        $(".js-iqdropdown-menu-clean").on('click', function (e) {
          e.preventDefault();
          $('p.iqdropdown-selection').text('Сколько гостей');
          totalItems = 0;
          $('.counter').html(0);
          $counter.addClass('flag');
        });
        $(".js-iqdropdown-menu-apply").on('click', function (e) {
          e.preventDefault();
          $('.iqdropdown').removeClass('menu-open');
        });
        $decrementButton.click((event) => {
          const {
            items,
            minItems,
            beforeDecrement,
            onChange
          } = settings;
          const allowClick = beforeDecrement(id, itemCount);

          if ($counter.hasClass('flag')) {
            itemCount[id] = 0;
            $counter.html(0);
            updateDisplay();
            onChange(id, itemCount[id], totalItems);
            $counter.removeClass('flag');
          };

          if (allowClick && totalItems > minItems && itemCount[id] > items[id].minCount) {
            itemCount[id] -= 1;
            totalItems -= 1;
            $counter.html(itemCount[id]);
            updateDisplay();
            onChange(id, itemCount[id], totalItems);
          }

          event.preventDefault();
        });

        $incrementButton.click((event) => {
          const {
            items,
            maxItems,
            beforeIncrement,
            onChange
          } = settings;
          const allowClick = beforeIncrement(id, itemCount);

          if ($counter.hasClass('flag')) {
            itemCount[id] = 0;
            $counter.html(0);
            updateDisplay();
            onChange(id, itemCount[id], totalItems);
            $counter.removeClass('flag');
          };

          if (allowClick && totalItems < maxItems && itemCount[id] < items[id].maxCount) {
            itemCount[id] += 1;
            totalItems += 1;
            $counter.html(itemCount[id]);
            updateDisplay();
            onChange(id, itemCount[id], totalItems);
          }

          event.preventDefault();
        });

        $item.click(event => event.stopPropagation());

        return $item;
      }
      // Открытие/скрытие меню
      $selection.click(() => {
        $this.toggleClass('menu-open');
      });

      $(document).click(function (e) {
        var elem = $(".iqdropdown");
        if (e.target != elem[0] && !elem.has(e.target).length) {
          elem.removeClass('menu-open');
        }
      });

      $items.each(function () {
        const $item = $(this);
        const id = $item.data('id');
        const defaultCount = Number($item.data('defaultcount') || '0');

        itemCount[id] = defaultCount;
        totalItems += defaultCount;

        setItemSettings(id, $item);
        addControls(id, $item);
      });
      updateDisplay();
    });

    return this;
  };

  // Изменение текста(множ.формы)
  $(".iqdropdown").iqDropdown({
    minItems: 0,
    maxItems: Infinity,
    onChange: function (id, count, totalItems) {

    },
    setSelectionText: function (itemCount, totalItems) {
      if (totalItems == 0) {
        return 'Сколько гостей';
      }
      if (totalItems > 4) {
        return `${totalItems} гостей`;
      }
      if (totalItems == 1) {
        return `${totalItems} гость`;
      }
      if (totalItems > 1 && totalItems < 5) {
        return `${totalItems} гостя`;
      }
    }
  });
})
