(function($) {
  // prettyPhoto
	jQuery(document).ready(function(){
		jQuery('a[data-gal]').each(function() {
			jQuery(this).attr('rel', jQuery(this).data('gal'));
		});
		jQuery("a[data-rel^='prettyPhoto']").prettyPhoto({animationSpeed:'slow',theme:'light_square',slideshow:false,overlay_gallery: false,social_tools:false,deeplinking:false});
	});
})(jQuery);

// animate function on head
(function($) {
    var textHolder = document.querySelector("#highlights");
    var newWord;
    var currentWord = "";

    function changingText() {
      this.words = ['passionate','focused','enthusiastic'];
      this.step = 0;
    }

    var ChangingText = new changingText();
    

    ChangingText.addWord = function() {
      if(currentWord.length < 1) {
        newWord = this.words[this.step];
      }

      var currentLength = currentWord.length;

      if(currentLength == newWord.length) {
        ChangingText.deleteWord();
        return;
      }
      
      // add new word by single character
      currentWord = newWord.substring(0, currentLength + 1);
      textHolder.innerHTML = currentWord;
      setTimeout(ChangingText.addWord, 300);
    }

    ChangingText.changeWord = function() {
      ++this.step; // increment step to get next word
      if(this.step == this.words.length) {
        this.step = 0;
      }

      ChangingText.addWord();
      return;
    }

    ChangingText.deleteWord = function() {
      if(currentWord.length < 1) {
        ChangingText.changeWord();
        return;
      }

      var currentLength = currentWord.length;

      // remove word by single character
      currentWord = currentWord.substring(0, currentLength - 1);
      textHolder.innerHTML = currentWord;
      setTimeout(ChangingText.deleteWord, 300);
    }

    // start with new word
    document.onready = ChangingText.addWord();
  
})(jQuery);

// Skills carousel
(function($) {
  $('#skills-carousel').carousel({
    interval: 10000
  })
  $('.fdi-Carousel .item').each(function () {
    var next = $(this).next();
    if (!next.length) {
        next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));

    if (next.next().length > 0) {
        next.next().children(':first-child').clone().appendTo($(this));
    }
    else {
        $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
    }
  });
})(jQuery);


// Portfolio
(function($) {
  "use strict";
  var $container = $('.portfolio'),
  $items = $container.find('.portfolio-item'),
  portfolioLayout = 'fitRows';

  if( $container.hasClass('portfolio-centered') ) {
    portfolioLayout = 'masonry';
  }

  $container.isotope({
    filter: '*',
    animationEngine: 'best-available',
    layoutMode: portfolioLayout,
    animationOptions: {
      duration: 750,
      easing: 'linear',
      queue: false
    },
    masonry: {}
  }, refreshWaypoints());

  function refreshWaypoints() {
    setTimeout(function() {}, 1000);
  }

  $('nav.portfolio-filter ul a').on('click', function() {
    var selector = $(this).attr('data-filter');
    $container.isotope({ filter: selector }, refreshWaypoints());
    $('nav.portfolio-filter ul a').removeClass('active');
    $(this).addClass('active');
    return false;
  });

  function getColumnNumber() {
    var winWidth = $(window).width(),
    columnNumber = 1;

    if (winWidth > 1200) {
      columnNumber = 5;
    } else if (winWidth > 950) {
      columnNumber = 4;
    } else if (winWidth > 600) {
      columnNumber = 3;
    } else if (winWidth > 400) {
      columnNumber = 2;
    } else if (winWidth > 250) {
      columnNumber = 1;
    }
    return columnNumber;
  }

  function setColumns() {
    var winWidth = $(window).width(),
    columnNumber = getColumnNumber(),
    itemWidth = Math.floor(winWidth / columnNumber);

    $container.find('.portfolio-item').each(function() {
      $(this).css( {
        width : itemWidth + 'px'
      });
    });
  }

  function setPortfolio() {
    setColumns();
    $container.isotope('reLayout');
  }

  $container.imagesLoaded(function () {
    setPortfolio();
  });

  $(window).on('resize', function () {
    setPortfolio();
  });
})(jQuery);
