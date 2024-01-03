const postList = document.querySelector(".post-list");
const postForm = document.querySelector(".post-form");
const titleData = document.querySelector("#title");
const bodyData = document.querySelector("#desc");
const submitBtn = document.querySelector(".submit");
let add = true;
//update POST
function editPost(id) {
  // select post
  const post = document.getElementById(id);
  // inject data to form
  let title = post.querySelector(".card-title").textContent;
  let body = post.querySelector(".card-text").textContent;
  titleData.value = title;
  bodyData.value = body;
  // update btn text
  submitBtn.textContent = "Update Post";
  add = false;
  submitBtn.addEventListener("click", () => {
    if (!add) {
      // update URL
      const updateURL = url + `/${id}`;
      fetch(updateURL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: titleData.value,
          body: bodyData.value,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Post updated", data);
          location.reload();
          submitBtn.textContent = "Add Post";
        }); // Removed the extra comma here
    }
  });
}

//delete POST
function deletePost(id) {
  const deleteURL = url + `/${id}`;
  fetch(deleteURL, {
    method: "DELETE",
    headers: {
      "Content-Type": "applications/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Post Deleted having id ", id, data);
      location.reload();
    })
    .catch((error) => console.log(error));
}

//render posts
const renderPosts = (post) => {
  let output = "";
  post.forEach((post) => {
    output += `
      <div class="col-md-6" id=${post._id}>
        <div class="card mb-3">
           <div class="card-body">
               <h3 class="card-title">${post.title}</h3>
               <p class="card-subtitle mb-2 text-muted " style="font-size:12px">${post.date}</p>
               <p class="card-text">${post.body}</p>
               <a class=" card-link text-decoration-none" onclick="editPost('${post._id}')">Edit</a>
               <a class=" card-link text-danger text-decoration-none" onclick="deletePost('${post._id}')">Delete</a>
           </div>
       </div>
       </div>`;
  });
  postList.innerHTML = output;
};

//Add new Post
postForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (add) {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: titleData.value,
        body: bodyData.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        renderPosts(data);
      });
  }
});

//POST request to API
const url = "http://localhost:5000/api/posts";
fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    renderPosts(data);
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });
