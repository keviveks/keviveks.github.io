(function($) {

// prettyPhoto
	jQuery(document).ready(function(){
		jQuery('a[data-gal]').each(function() {
			jQuery(this).attr('rel', jQuery(this).data('gal'));
		});
		jQuery("a[data-rel^='prettyPhoto']").prettyPhoto({animationSpeed:'slow',theme:'light_square',slideshow:false,overlay_gallery: false,social_tools:false,deeplinking:false});
	});

  $("#keviveks-blog").on("click", function() {
    window.open("https://keviveks.wordpress.com", '_blank');
  });

  $("#keviveks-web-designs").on("click", function() {
    window.open("http://codepen.io/keviveks/", '_blank');
  });
})(jQuery);

// animate function on head
(function($) {
  var words = ['passionate','focused','enthusiastic'],
  currentStep = 0,
  textEl = document.querySelector('#highlights'),
  oldWord = '';

  setTimeout(changeWord, 1500);

  function changeWord() {
    oldWord = textEl.innerHTML;
    // check if there is a word atm or not
    if (oldWord.length < 1) {
      if (currentStep !== words.length -1) {
        currentStep ++;
      } else {
        currentStep = 0;
      }
      addNextWord();
    } else {
        setTimeout(deleteWord, 1200);
    }
  };

  function deleteWord() {
    var WordLength = oldWord.length,
    currentWord = textEl.innerHTML,
    currentLength = currentWord.length;

    // The word is deleted so, start adding in the new one
    if (currentLength < 1) {
      changeWord();
      return;
    }
    // Remove a charachter
    textEl.innerHTML = currentWord.substring(0, currentLength - 1);
    setTimeout(deleteWord, 300);
  }

  function addNextWord() {
      var currentWord = textEl.innerHTML,
      currentLength = currentWord.length,
      nextWord = words[currentStep],
      nextWordLength = nextWord.length;

      if (currentLength === nextWordLength) {
        changeWord();
        return;
      }

      // add a charachter
      textEl.innerHTML = nextWord.substring(0, currentLength + 1);
      setTimeout(addNextWord, 300);
  }
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
