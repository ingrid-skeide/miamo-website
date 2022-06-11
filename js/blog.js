// Blog
const blogContainer = document.querySelector(".posts");
const loader = document.querySelector(".loader-container");
const nextButton = document.querySelector(".load-more-btn");
const sortSelect = document.querySelector(".sort");
let currentPage = 1;
let isReversed = false;

async function fetchBlogPostsFromApi() {
    try { 
        let blogPosts = await getBlogPosts(currentPage);

        if(isReversed) {
            blogPosts.reverse();
        }
        
        loader.style.display = 'none';

        if (blogPosts.length < 8) {
            nextButton.style.display = "none";
        } else {
            nextButton.style.display = "block"
        }
        blogPosts.forEach(post => { addPostHtmlToBlogContainer(post) });
        currentPage++; 
    }
    catch(exception) {
        console.log("Exception caught: " + exception);
        blogContainer.innerHTML = errorMessage("Failed to load blog posts, if the problem persists please contact me <a href='/contact.html'>here</a>.");
    }
}

function addPostHtmlToBlogContainer(post) {
    blogContainer.innerHTML += `
    <div class='post'>
        <a href='/blog-post.html?id=${post.id}'>
            <div class='featured-image-container'>
                <img src='${post.acf.featured_image}' alt='${post.acf.image_alt}'>
            </div>
        </a>
        <div class="post-content">
            <h3>${post.acf.title}</h3>
            <p>${post.acf.text_content}</p>
            <div class="btn-container">
                <a href="/blog-post.html?id=${post.id}"><button class="read-btn">Read more</button></a>
            </div>
        </div>
    </div>`
}

function sortPosts(sorting) {
    if(sorting == "Oldest") {
        isReversed = true;
        currentPage = 2;
    } else if (sorting == "Newest") {
        isReversed = false;
        currentPage = 1;
    }
    blogContainer.innerHTML = "";
    fetchBlogPostsFromApi();
}

nextButton.addEventListener("click", fetchBlogPostsFromApi);
sortSelect.addEventListener("change", (event) => sortPosts(event.target.value));


fetchBlogPostsFromApi();