// Carousel
const carouselContainer = document.querySelector(".c-container");
const previousButton = document.querySelector(".btn-prev");
const nextButton = document.querySelector(".btn-next");
const galleryContainer = document.querySelector(".gallery-images");

let currentPosition = 4;
let amountOfPhotos = 8;
let currentGalleryImage = 0;

nextButton.addEventListener("click", () => moveCarousel(1));
previousButton.addEventListener("click", () => moveCarousel(-1));

async function addPostsToCarousel() {
    try {
        const posts = await getBlogPosts(1);
        carouselContainer.innerHTML = "";
        posts.forEach(post => makePostSlide(post));
    }
    catch (exception) {
        console.log("Exception caught: " + exception);
        carouselContainer.innerHTML = errorMessage("Failed to load blog posts, if the problem persists please contact me <a href='/contact.html'>here</a>.");
    }
}

async function addImagesToGallery() {
    try {
        const galleryImages = await getGalleryImages();
        galleryContainer.innerHTML = "";
        galleryImages.forEach(image => makeGalleryImage(image));
        prepareImagesForHideOnMobile();
    } catch (exception) {
        console.log("Exception caught: " + exception);
        galleryContainer.innerHTML = errorMessage("Failed to load gallery images, if the problem persists please contact me <a href='/contact.html'>here</a>.");
    }
}

function makePostSlide(post) {
    carouselContainer.innerHTML += `
        <a href="/blog-post.html?id=${post.id}">
            <div class="slide">
                <div class="postinfo">
                    <h3>${post.acf.title}</h3>
                </div>
                <img src="${post.acf.featured_image}" alt="${post.acf.title}">
            </div>
        </a>
    `;
}

function makeGalleryImage(image) {
    galleryContainer.innerHTML += `
    <div class="gallery-image-wrapper">
        <img src="${image.acf.galleryimage}" alt="${image.acf.img_alt}"/>
    </div>
    `;
}

function prepareImagesForHideOnMobile() {
    const allGalleryImages = document.querySelectorAll(".gallery-image-wrapper");
    for (i = 0; i < allGalleryImages.length; i++) {
        if(currentGalleryImage > 3) {
            allGalleryImages[i].classList.add("hide-on-mobile");
        }
        currentGalleryImage++;
    }
}

function moveCarousel(direction){

    let desiredPosition = currentPosition + direction;

    if(desiredPosition > amountOfPhotos) {
        desiredPosition = 4;
    }
    else if (desiredPosition < 4) {
        desiredPosition = amountOfPhotos;
    }

    let translation = (desiredPosition - 4) * 25 * -1;
    currentPosition = desiredPosition;
    document.getElementById("carousel-photos").style.transform = "translateX(" + translation + "vw)";
}

addPostsToCarousel();
addImagesToGallery();

const isMobileWidth = window.matchMedia('(max-width: 750px)');

if(isMobileWidth.matches){
    setInterval(() => {
        moveCarousel(4);
    }, 4000);
}