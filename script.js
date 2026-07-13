function createPost(title, body, author) {
    var post = {
        id: Date.now(),
        title: title,
        body: body,
        author: author,
        date: new Date().toLocaleDateString() 
    };
    return post;
}

function savePosts() {
    localStorage.setItem("iniumBlogPosts", JSON.stringify(posts));
}

function loadPosts() {
    var saved = localStorage.getItem("iniumBlogPosts");
    if (saved !== null) {
        posts = JSON.parse(saved);
    }
}

var posts = [];

function renderPosts(keyword) {
    var container = document.getElementById("postList");
    container.innerHTML = "";

    for (var i = 0; i < posts.length; i++) {
        var p = posts[i];

        if (keyword) {
            var text = (p.title + " " + p.body + " " + p.author).toLowerCase();
            if (text.indexOf(keyword.toLowerCase()) === -1) {
                continue;
            }
        }
        var preview = p.body.slice(0, 100);

        container.innerHTML += "<h2 data-postid=" + p.id + ">" + p.title + "</h2>";
        container.innerHTML += "<p>" + p.date + " - " + p.author + "</p>";
        container.innerHTML += "<p>" + preview + "...</p>";
        container.innerHTML += "<div class='postActions'>";
        container.innerHTML += "<button data-postid=" + p.id + " class='readMoreBtn'>Read More</button>";
        container.innerHTML += "<button data-postid=" + p.id + " class='deleteBtn'>Delete</button>";
        container.innerHTML += "</div>";
        container.innerHTML += "<hr>"; // a horizontal line to separate posts
    }
}

function viewPost(id) {
    var thePost = null;

    for (var i = 0; i < posts.length; i++) {
        if (posts[i].id == id) {
            thePost = posts[i];
        }
    }

    document.getElementById("postTitle").innerHTML = thePost.title;
    document.getElementById("postTitle").setAttribute("data-postid", thePost.id);
    document.getElementById("postMeta").innerHTML = thePost.date + " - " + thePost.author;
    document.getElementById("postBody").innerHTML = thePost.body;

    var relatedContainer = document.getElementById("relatedPosts");
    relatedContainer.innerHTML = "";
    var count = 0;

    for (var i = 0; i < posts.length; i++) {
        if (posts[i].id != id && count < 3) {
            relatedContainer.innerHTML += "<p data-postid=" + posts[i].id + " class='relatedPostLink'>" + posts[i].title + "</p>";
            count++;
        }
    }

    document.getElementById("postList").style.display = "none";
    document.getElementById("postView").style.display = "block";
    document.getElementById("addPostButton").style.display = "none";
    document.getElementById("searchInput").style.display = "block";
}

function deletePost(id) {
    posts = posts.filter(function (post) {
        return post.id != id;
    });

    savePosts();
    renderPosts();
}

document.getElementById("searchInput").addEventListener("input", function () {
    renderPosts(this.value);
});


document.getElementById("postList").addEventListener("click", function (event) {
    if (event.target.tagName === "H2" || event.target.classList.contains("readMoreBtn")) {
        var clickedId = event.target.getAttribute("data-postid");
        viewPost(clickedId);
    }

    if (event.target.classList.contains("deleteBtn")) {
        var clickedId = event.target.getAttribute("data-postid");
        if (confirm("Are you sure you want to delete this post?")) {
            deletePost(clickedId);
        }
    }
});

document.getElementById("relatedPosts").addEventListener("click", function (event) {
    if (event.target.classList.contains("relatedPostLink")) {
        var clickedId = event.target.getAttribute("data-postid");
        viewPost(clickedId);
    }
})

document.getElementById("backButton").addEventListener("click", function () {
    document.getElementById("postList").style.display = "block";
    document.getElementById("postView").style.display = "none";
    document.getElementById("addPostButton").style.display = "block";
});

document.getElementById("addPostButton").addEventListener("click", function () {
    document.getElementById("postList").style.display = "none";
    document.getElementById("addPostView").style.display = "block";
    document.getElementById("addPostButton").style.display = "none";
    document.getElementById("searchInput").style.display = "none";
});

document.getElementById("cancelAddButton").addEventListener("click", function () {
    document.getElementById("addPostView").style.display = "none";
    document.getElementById("postList").style.display = "block";
    document.getElementById("addPostButton").style.display = "block";
    document.getElementById("searchInput").style.display = "block";
})

document.getElementById("submitPostButton").addEventListener("click", function () {
    var title = document.getElementById("titleInput").value;
    var author = document.getElementById("authorInput").value;
    var body = document.getElementById("bodyInput").value;

    if (title === "" || author === "" || body === "") {
        alert("Please fill in all fields before publishing.")
        return;
    }

    posts.push(createPost(title, body, author));
    savePosts();

    document.getElementById("titleInput").value = "";
    document.getElementById("authorInput").value = "";
    document.getElementById("bodyInput").value = "";

    renderPosts();

    document.getElementById("addPostView").style.display = "none";
    document.getElementById("postList").style.display = "block";
    document.getElementById("addPostButton").style.display = "block";
});

document.getElementById("deleteFromViewButton").addEventListener("click", function () {
    var currentId = document.getElementById("postTitle").getAttribute("data-postid");
    if (confirm("Are you sure you want to delete this post?")) {
        deletePost(currentId);
        document.getElementById("postView").style.display = "none";
        document.getElementById("postList").style.display = "block";
        document.getElementById("addPostButton").style.display = "block";
    }
});

loadPosts();
renderPosts();