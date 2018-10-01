
$(document).ready(function(){
    $('.customer-logos').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows: false,
        dots: false,
        pauseOnHover: false,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 4
            }
        }, {
            breakpoint: 520,
            settings: {
                slidesToShow: 3
            }
        }]
    });
});


$(document).ready(function(){
    var images = document.querySelectorAll('img')
    var imageData = []
    function replaceImage (node) {
      if (
        node.getAttribute('data-lazyload-replaced') ||
        (window.scrollY + window.innerHeight) <= node.offsetTop
      ) {
        return
      }
      var newImage = new Image()
      newImage.src = node.getAttribute('data-src')
      newImage.onload = (function (event) {
        setTimeout(function () {
          node.parentElement.replaceChild(newImage, node)      
        }, Math.random() * 2000 + 500)
      }).bind(this)
      
      node.setAttribute('data-lazyload-replaced', true)
    }
    document.addEventListener('scroll', function (event) {
      for (var i = 0, numImages = images.length; i < numImages; i++) {
        replaceImage(images[i])
      }
    })
    for (var i = 0, numImages = images.length; i < numImages; i++) {
      images[i].onload = function (event) {
        replaceImage(event.target)
      }
    }
});


// skill bar

(function() {
  
  var Progress = function( element ) {
    
    this.context = element.getContext( "2d" );
    this.refElement = element.parentNode;
    this.loaded = 0;
    this.start = 4.72;
    this.width = this.context.canvas.width;
    this.height = this.context.canvas.height;
    this.total = parseInt( this.refElement.dataset.percent, 10 );
    this.timer = null;
    
    this.diff = 0;
    
    this.init();  
  };
  
  Progress.prototype = {
    init: function() {
      var self = this;
      self.timer = setInterval(function() {
        self.run(); 
      }, 25);
    },
    run: function() {
      var self = this;
      
      self.diff = ( ( self.loaded / 100 ) * Math.PI * 2 * 10 ).toFixed( 2 );  
      self.context.clearRect( 0, 0, self.width, self.height );
      self.context.lineWidth = 10;
      self.context.fillStyle = "#000";
      self.context.strokeStyle = "#d30000";
      self.context.textAlign = "center";
      
      self.context.fillText( self.loaded + "%", self.width * .5, self.height * .5 + 2, self.width );
      self.context.beginPath();
      self.context.arc( 35, 35, 30, self.start, self.diff / 10 + self.start, false );
      self.context.stroke();
      
      if( self.loaded >= self.total ) {
        clearInterval( self.timer );
      }
      
      self.loaded++;
    }
  };
  
  var CircularSkillBar = function( elements ) {
    this.bars = document.querySelectorAll( elements );
    if( this.bars.length > 0 ) {
      this.init();
    } 
  };
  
  CircularSkillBar.prototype = {
    init: function() {
      this.tick = 25;
      this.progress();
      
    },
    progress: function() {
      var self = this;
      var index = 0;
      var firstCanvas = self.bars[0].querySelector( "canvas" );
      var firstProg = new Progress( firstCanvas );
      
      
      
      var timer = setInterval(function() {
        index++;
          
        var canvas = self.bars[index].querySelector( "canvas" );
        var prog = new Progress( canvas );
        
        if( index == self.bars.length ) {
            clearInterval( timer );
        } 
        
      }, self.tick * 100);
        
    }
  };
  
  document.addEventListener( "DOMContentLoaded", function() {
    var circularBars = new CircularSkillBar( "#bars .bar" );
  });
  
})();


// ========= basic flip book =================

function addPage(page, book) {

  var id, pages = book.turn('pages');

  // Create a new element for this page
  var element = $('<div />', {});

  // Add the page to the flipbook
  if (book.turn('addPage', element, page)) {

    // Add the initial HTML
    // It will contain a loader indicator and a gradient
    element.html('<div class="gradient"></div><div class="loader"></div>');

    // Load the page
    loadPage(page, element);
  }

}

function loadPage(page, pageElement) {

  // Create an image element

  var img = $('<img />');

  img.mousedown(function(e) {
    e.preventDefault();
  });

  img.load(function() {
    
    // Set the size
    $(this).css({width: '100%', height: '100%'});

    // Add the image to the page after loaded

    $(this).appendTo(pageElement);

    // Remove the loader indicator
    
    pageElement.find('.loader').remove();
  });

  // Load the page

  img.attr('src', 'pages/' +  page + '.jpg');

}


function loadLargePage(page, pageElement) {
  
  var img = $('<img />');

  img.load(function() {

    var prevImg = pageElement.find('img');
    $(this).css({width: '100%', height: '100%'});
    $(this).appendTo(pageElement);
    prevImg.remove();
    
  });

  // Loadnew page
  
  img.attr('src', 'pages/' +  page + '-large.jpg');
}


function loadSmallPage(page, pageElement) {
  
  var img = pageElement.find('img');

  img.css({width: '100%', height: '100%'});

  img.unbind('load');
  // Loadnew page

  img.attr('src', 'pages/' +  page + '.jpg');
}



// http://code.google.com/p/chromium/issues/detail?id=128488
function isChrome() {

  return navigator.userAgent.indexOf('Chrome')!=-1;

}