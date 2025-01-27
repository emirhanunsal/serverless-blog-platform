// Extract query parameters from the URL
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return JSON.parse(decodeURIComponent(params.get("data")));
}

// Render the blog post details
function renderPostDetail(post) {
  document.getElementById("post-title").textContent = post.title;
  document.getElementById("post-author").textContent = post.author;
  document.getElementById("post-date").textContent = post.date;

  const postContent = document.getElementById("post-content");
  postContent.innerHTML = "";

  const contentArray = JSON.parse(post.content);
  contentArray.forEach(item => {
    const element = document.createElement(item.type);
    element.textContent = item.text;
    postContent.appendChild(element);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const post = getQueryParams();
  renderPostDetail(post);
});
