(function($){
    
    "use strict";
    
    //===== Prealoder
    
    $(window).on('load', function(event) {
        $('.preloader').delay(500).fadeOut(500);
    });
    
    
    //===== Mobile Menu 
    
    $(".navbar-toggler").on('click', function() {
        $(this).toggleClass('active');
    });
    
    $(".navbar-nav a").on('click', function() {
        $(".navbar-toggler").removeClass('active');
    });
    
    
    //===== close navbar-collapse when a  clicked
    
    $(".navbar-nav a").on('click', function () {
        $(".navbar-collapse").removeClass("show");
    });
    
    
    //===== Sticky
    
    $(window).on('scroll', function(event) {    
        var scroll = $(window).scrollTop();
        if (scroll < 10) {
            $(".navigation").removeClass("sticky");
        } else{
            $(".navigation").addClass("sticky");
        }
    });
    
    
    //===== Section Menu Active

    var scrollLink = $('.page-scroll');
        // Active link switching
        $(window).scroll(function() {
        var scrollbarLocation = $(this).scrollTop();

        scrollLink.each(function() {

          var sectionOffset = $(this.hash).offset().top - 73;

          if ( sectionOffset <= scrollbarLocation ) {
            $(this).parent().addClass('active');
            $(this).parent().siblings().removeClass('active');
          }
        });
    });
    
    
    
    // Parallaxmouse js
    
    function parallaxMouse() {
        if ($('#parallax').length) {
            var scene = document.getElementById('parallax');
            var parallax = new Parallax(scene);
        };
    };
    parallaxMouse();
    
    
    //===== Progress Bar
    
    if($('.progress-line').length){
        $('.progress-line').appear(function(){
            var el = $(this);
            var percent = el.data('width');
            $(el).css('width',percent+'%');
        },{accY: 0});
    }
    
    
    //===== Counter Up
    
    $('.counter').counterUp({
        delay: 10,
        time: 1600,
    });
    
    
    //===== Magnific Popup
    
    $('.image-popup').magnificPopup({
      type: 'image',
      gallery:{
        enabled:true
      }
    });
    
    
    //===== Back to top
    
    // Show or hide the sticky footer button
    $(window).on('scroll', function(event) {
        if($(this).scrollTop() > 600){
            $('.back-to-top').fadeIn(200)
        } else{
            $('.back-to-top').fadeOut(200)
        }
    });
    
    
    //Animate the scroll to yop
    $('.back-to-top').on('click', function(event) {
        event.preventDefault();
        
        $('html, body').animate({
            scrollTop: 0,
        }, 1500);
    });
    

    
    //===== 
    
    
    
    
    
    
    
    
    
    
    
    
}(jQuery));

function initPopup() {
    $('.image-popup').magnificPopup({
        type: 'image',
        gallery: {
            enabled: true
        },
        closeBtnInside: true,
        removalDelay: 300,
        mainClass: 'mfp-fade'
    });
}

// Dynamic Gallery Population

const saiImages = Array.from({ length: 43 }, (_, i) => `Sai_${i + 1}.jpg`);
const gallery = document.getElementById("gallery");
const loadMoreBtn = document.getElementById("loadMore");

const DISPLAY_COUNT = 9;
const INTERVAL = 3000;

let currentImages = [];
let nextImageIndex = 0;
let rotationTimer = null;

/* ---------- Popup ---------- */
function initPopup() {
    $('.image-popup').magnificPopup({
        type: 'image',
        gallery: { enabled: true },
        closeBtnInside: true
    });
}

/* ---------- Render Images ---------- */
function renderImages(images) {
    images.forEach(img => {
        const col = document.createElement("div");
        col.className = "col-lg-4 col-md-6 col-sm-6";

        col.innerHTML = `
            <div class="single-work text-center mt-30">
                <div class="work-image fixed-img">
                    <img src="assets/images/sai/${img}" alt="Sai Baba">
                </div>
                <div class="work-overlay">
                    <div class="work-content">
                        <ul>
                            <li>
                                <a class="image-popup" href="assets/images/sai/${img}">
                                    <i class="lni-plus"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        gallery.appendChild(col);
    });
}

/* ---------- Render Video ---------- */
function renderVideo() {
    const col = document.createElement("div");
    col.className = "col-lg-12";

    col.innerHTML = `
        <div class="single-work text-center mt-50">
            <video 
                controls 
                muted 
                loop 
                playsinline
                style="width:100%; max-height:450px; border-radius:12px;">
                <source src="assets/videos/video_1.mp4" type="video/mp4">
                Your browser does not support the video tag.
            </video>
        </div>
    `;

    gallery.appendChild(col);
}

/* ---------- Render Gallery ---------- */
function renderGallery(images) {
    gallery.innerHTML = "";
    renderImages(images);
    renderVideo();          // ✅ video always last
    initPopup();
}

/* ---------- Initial Load ---------- */
function initGallery() {
    currentImages = saiImages.slice(0, DISPLAY_COUNT);
    nextImageIndex = DISPLAY_COUNT;
    renderGallery(currentImages);
}

/* ---------- Shift Right ---------- */
function shiftRight() {
    currentImages.unshift(saiImages[nextImageIndex]);
    currentImages.pop();

    nextImageIndex = (nextImageIndex + 1) % saiImages.length;

    renderGallery(currentImages);
}

/* ---------- Start Rotation ---------- */
function startRotation() {
    initGallery();
    rotationTimer = setInterval(shiftRight, INTERVAL);
}

/* ---------- Load More ---------- */
loadMoreBtn.addEventListener("click", function (e) {
    e.preventDefault();

    clearInterval(rotationTimer);
    renderGallery(saiImages);   // all images + video

    loadMoreBtn.style.display = "none";
});

/* ---------- Init ---------- */
startRotation();


