// Dropdown menu
const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu-items");

function dropDown() {
    menu.classList.toggle("nav-active");
}

burger.addEventListener("click", dropDown);

// API
const postUrl = "https://miamo.no/wp-json/wp/v2/base_post";
const postUrlSuffix = "?acf_format=standard&per_page=8&_fields=id,title,acf,date&page=";
const galleryUrl = "https://miamo.no/wp-json/wp/v2/galleryimage?acf_format=standard&per_page=100&_fields=acf";

async function getBlogPosts(page) {
    const response = await fetch(postUrl + postUrlSuffix + page);
    const result = await response.json();
    return result;
}

async function getBlogPost(postId) {
    const response = await fetch(postUrl + '/' + postId + postUrlSuffix);
    const result = await response.json();
    return result;
}

async function getGalleryImages() {
    const response = await fetch(galleryUrl);
    const result = await response.json();
    return result;
}