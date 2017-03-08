(function(window) {
  'use strict';

  // WOW plugin
  new WOW().init();

  // select2 plugin
  $('select').select2({
    width: '150px',
    minimumResultsForSearch: Infinity
  });

  // Bootstrap tooltips
  $(function () {
    $('[data-toggle="tooltip"]').tooltip();
  });

  // scroll to sections
  $('.main-nav, .slider, .offer').on('click', 'a', function(event){
      event.preventDefault();
      $('html, body').animate({
          scrollTop: $( $.attr(this, 'href') ).offset().top
      }, 500);
  });

  // Menu: Extend Object helper function
  function extend(a, b) {
    for(var key in b) {
      if(b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }
    return a;
  }
  // Menu: Each helper function
  function each(collection, callback) {
    for (var i = 0; i < collection.length; i++) {
      var item = collection[i];
      callback(item);
    }
  }
  // Menu: Menu Constructor
  function Menu(options) {
    this.options = extend({}, this.options);
    extend(this.options, options);
    this._init();
  }
  // Menu: Menu Options
  Menu.prototype.options = {
    wrapper: '#o-wrapper',          // The content wrapper
    type: 'slide-left',             // The menu type
    menuOpenerClass: '.c-button',   // The menu opener class names (i.e. the buttons)
    maskId: '#c-mask'               // The ID of the mask
  };
  // Menu: Initialise Menu
  Menu.prototype._init = function() {
    this.body = document.body;
    this.wrapper = document.querySelector(this.options.wrapper);
    this.mask = document.querySelector(this.options.maskId);
    this.menu = document.querySelector('#c-menu--' + this.options.type);
    this.closeBtn = this.menu.querySelector('.c-menu__close');
    this.menuOpeners = document.querySelectorAll(this.options.menuOpenerClass);
    this._initEvents();
  };
  // Menu: Initialise Menu Events
  Menu.prototype._initEvents = function() {
    // Event for clicks on the close button inside the menu
    this.closeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      this.close();
    }.bind(this));

    // Event for clicks on the mask
    this.mask.addEventListener('click', function(e) {
      e.preventDefault();
      this.close();
    }.bind(this));
  };
  // Menu: Open Menu
  Menu.prototype.open = function() {
    this.body.classList.add('has-active-menu');
    this.wrapper.classList.add('has-' + this.options.type);
    this.menu.classList.add('is-active');
    this.mask.classList.add('is-active');
    this.disableMenuOpeners();
  };
  // Menu: Close menu
  Menu.prototype.close = function() {
    this.body.classList.remove('has-active-menu');
    this.wrapper.classList.remove('has-' + this.options.type);
    this.menu.classList.remove('is-active');
    this.mask.classList.remove('is-active');
    this.enableMenuOpeners();
  };
  // Menu: Disable Menu Openers
  Menu.prototype.disableMenuOpeners = function() {
    each(this.menuOpeners, function(item) {
      item.disabled = true;
    });
  };
  // Menu: Enable Menu Openers
  Menu.prototype.enableMenuOpeners = function() {
    each(this.menuOpeners, function(item) {
      item.disabled = false;
    });
  };
  // Menu: Add to global namespace
  window.Menu = Menu;

})(window);
