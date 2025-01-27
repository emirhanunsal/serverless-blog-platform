const apiUrl = "APIURL";

// Fetch and display blog posts
async function fetchBlogPosts() {
  console.log("fetchBlogPosts called!");

  const loading = document.getElementById("loading");
  loading.style.display = "flex"; // Show loading animation

  try {
    const response = await fetch(apiUrl, { method: "GET" });
    if (!response.ok) throw new Error(`API request failed: ${response.statusText}`);

    const data = await response.json();
    const posts = JSON.parse(data.body);

    if (!Array.isArray(posts)) throw new Error("Invalid data format from API!");

    renderBlogList(posts);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    showError("An error occurred while loading blog posts. Please try again.");
  } finally {
    loading.style.display = "none"; // Hide loading animation
  }
}

// Render the list of blog posts
function renderBlogList(posts) {
  const blogList = document.getElementById("blog-list");
  blogList.innerHTML = "";

  posts.forEach(post => {
    const listItem = document.createElement("div");
    listItem.classList.add("blog-card");
    listItem.setAttribute("data-post-id", post.postId);
    listItem.innerHTML = `
      <h2>${post.title}</h2>
      <p><strong>Author:</strong> ${post.author}</p>
      <p><strong>Date:</strong> ${post.date}</p>
    `;
    blogList.appendChild(listItem);
  });

  document.querySelectorAll(".blog-card").forEach(card => {
    card.addEventListener("click", (e) => {
      const postId = e.currentTarget.getAttribute("data-post-id");
      const post = posts.find(p => p.postId === postId);
      if (post) navigateToDetailPage(post);
    });
  });
}

// Navigate to the detailed post page
function navigateToDetailPage(post) {
  const postData = encodeURIComponent(JSON.stringify(post));
  window.location.href = `post.html?data=${postData}`;
}

// Show error message
function showError(message) {
  const blogList = document.getElementById("blog-list");
  blogList.innerHTML = `<p class="error">${message}</p>`;
}

document.addEventListener("DOMContentLoaded", fetchBlogPosts);
