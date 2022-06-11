
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const postId = params.get("id");
const postContainer = document.querySelector(".post-wrapper");

async function createPostContainer() {

    try {

        const blogPost = await getBlogPost(postId);
        const publishedDate = new Date(blogPost.date).toLocaleDateString();

        postContainer.innerHTML = "";

        postContainer.innerHTML = `
        <div class="post-content">
            <div class="post-text-content">
                <h1>${blogPost.acf.title}</h1>
                <p class="posted-date">Posted: ${publishedDate}</p>
                <p class="main-text-content">${blogPost.acf.text_content}</p>
            </div>
            <div class="featured-image">
                <img class="post-image" src='${blogPost.acf.featured_image}' alt='${blogPost.acf.image_alt}'>
            </div>
        </div>`;

        // Html page title
        const pageTitle = blogPost.acf.title;
        document.title = `Miamo | ${pageTitle}`;

        setupModal();
    }
    catch (exception) {
        postContainer.innerHTML = errorMessage("Failed to load blog post, if the problem persists please contact me <a href='/contact.html'>here</a>");
    }
}

function setupModal() {

    const modal = document.querySelector(".modal");
    const featuredImage = document.querySelector(".post-image");
    const modalImg = document.getElementById("modalimg");
    const closeButton = document.querySelector(".close");

    function openModal() {
        modal.style.display = "block";
        modalImg.src = this.src;
    }

    function closeModal() {
        if (event.target != modalImg) {
            modal.style.display = "none";
        }
    }
    
    featuredImage.addEventListener("click", openModal);
    closeButton.addEventListener("click", closeModal);
    modal.addEventListener("click", closeModal);
}

createPostContainer();
