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

var posts = [];

function renderPosts() {
    var container = document.getElementById("postList");
    container.innerHTML = "";

    for (var i = 0; i < posts.length; i++) {
        var p = posts[i];
        var preview = p.body.slice(0, 100);

        container.innerHTML += "<h2 data-postid=" + p.id + ">" + p.title + "</h2";
        container.innerHTML += "<p>" + p.date + " - " + p.author + "</p>";
        container.innerHTML += "<p>" + preview + "...</p>";
        container.innerHTML += "<hr>";
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
    document.getElementById("postMeta").innerHTML = thePost.date + " - " + thePost.author;
    document.getElementById("postBody").innerHTML = thePost.body;

    document.getElementById("postList").style.display = "none";
    document.getElementById("postView").style.display = "block";
    document.getElementById("addPostButton").style.display = "none";
}

document.getElementById("postList").addEventListener("click", function (event) {
    if (event.target.tagName === "H2") {
        var clickedId = event.target.getAttribute("data-postid");
        viewPost(clickedId);
    }
});

document.getElementById("backButton").addEventListener("click", function () {
    document.getElementById("postList").style.display = "block";
    document.getElementById("postView").style.display = "none";
    document.getElementById("addPostButton").style.display = "block";
});

document.getElementById("addPostButton").addEventListener("click", function () {
    document.getElementById("postList").style.display = "none";
    document.getElementById("addPostView").style.display = "block";
    document.getElementById("addPostButton").style.display = "none";
});

document.getElementById("cancelAddButton").addEventListener("click", function () {
    document.getElementById("addPostView").style.display = "none";
    document.getElementById("postList").style.display = "block";
    document.getElementById("addPostButton").style.display = "block";
})

document.getElementById("submitPostButton").addEventListener("click", function () {
    var title = document.getElementById("titleInput").value;
    var author = document.getElementById("authorInput").value;
    var body = document.getElementById("bodyInput").value;

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

loadPosts();
renderPosts();

function savePosts() {
    localStorage.setItem("iniumBlogPosts", JSON.stringify(posts));
}

function loadPosts() {
    var saved = localStorage.getItem("iniumBlogPosts");
    if (saved !== null) {
        posts = JSON.parse(saved);
    }
}