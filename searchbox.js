/* jshint indent:2 */
/* jshint unused:false */
/* global FastClick, unveil, google, setupTypeahead */

'use strict';

(function(){

  var init = function () {
    setupFilter();
    setupAutocomplete();
    focusForm();
  };

  var setupFilter = function() {

    // This would come from elsewhere
    var filterOptions = [
      'All',
      'Ebooks',
      'Audiobooks',
      'Movies',
      'Libraries',
      'Crime',
      'Romance'
    ];

    var filter = $('#filter');
    var filterLabel = $('#filterLabel');
    var filterList = $('#filterList');
    var filterOpts = '';
    var filterListIsOpen = false;

    $.each(filterOptions, function() {
      filterOpts += '<li>' + this + '</li>';
    });

    filterList.html(filterOpts);
    filterList.find(':first').addClass('selected');
    filterOpts = filterList.find('li');


    var activateFilter = function() {
      filterList.css({'display': 'block'});
      filterListIsOpen = true;
    };

    var deactivateFilter = function() {
      filterListIsOpen = false;
      filterList.css({'display': 'none'});
    };

    var selectOption = function(opt) {
      filterOpts.removeClass('selected');
      opt.addClass('selected');
      filterLabel.text(opt.text());
    };

    filterOpts.each(function() {
      $(this).on('click', function() {
        selectOption($(this));
        deactivateFilter();
      });
    });

    $(filter).on('keydown', function(e){

      var selectedItem = $('.selected');
      var next;
      var prev;

      if(e.which === 40) {
        next = selectedItem.next();
        if (next.length > 0) {
          selectOption(next);
        }
      } else if (e.which === 38) {
        prev = selectedItem.prev();
        if (prev.length > 0) {
          selectOption(prev);
        }
      }

      if(e.which === 13 || e.which === 27) {
        deactivateFilter();
        // filter.blur();
      }
    });

    filter.on('focus', function() { activateFilter(); });
    filter.on('blur', function() { deactivateFilter(); });

  };

  var setupAutocomplete = function() {
    $('input').on('focus', function() {
      $('#autocompleteList').css({ 'display': 'block' });
    });

    $('input').on('blur', function() {
      $('#autocompleteList').css({ 'display': 'none' });
    });
  }

  var focusForm = function() {
    $('.form').children().on('focus', function() {
      $('.form').addClass('focused');
    });

    $('.form').children().on('blur', function() {
      $('.form').removeClass('focused');
    })
  }

  init();

})();

