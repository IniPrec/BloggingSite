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
        container.innerHTML += "<button data-postid=" + p.id + " class='readMoreBtn'>Read More</button>";
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

    var otherPosts = posts.filter(function (p) {
        return p.id != id;
    });

    var shuffled = shuffleArray(otherPosts);

    for (var i = 0; i < shuffled.Length && i < 3; i++) 
    {
        relatedContainer.innerHTML += "<p data-postid=" + shuffled[i].id + " class='relatedPostLink'>" + shuffled[i].title + "</p>";
    }

    document.getElementById("postList").style.display = "none";
    document.getElementById("postView").style.display = "block";
    document.getElementById("addPostButton").style.display = "none";
    document.getElementById("searchInput").style.display = "block";
}

function shuffleArray(arr) {
    var shuffled = arr.slice();

    for (var i = shuffled.length - 1; i > 0; i--) 
    {
        var randomIndex = Math.floor(Math.random() * (i + 1));
        var temporary = shuffled[i];
        shuffled[i] = shuffled[randomIndex];
        shuffled[randomIndex] = temporary;
    }

    return shuffled;
}

function showSearchResults(keyword) {
    var resultsContainer = document.getElementById("searchResults");

    if (keyword === "") {
        resultsContainer.style.display = "none";
        resultsContainer.innerHTML = "";
        return;
    }

    var matches = posts.filter(function (p) {
        var text = (p.title + " " + p.author).toLowerCase();
        return text.indexOf(keyword.toLowerCase()) !== -1;
    });

    resultsContainer.innerHTML = "";

    for (var i = 0; i < matches.length; i++)
    {
        resultsContainer.innerHTML += "<p data-postid=" + matches[i].id + " class='searchResultItem'>" + matches[i].title + "</p>";
    }

    resultsContainer.style.display = matches.length > 0 ? "block" : "none";
}

document.getElementById("searchInput").addEventListener("input", function () {
    showSearchResults(this.value);
});

document.getElementById("searchResults").addEventListener("click", function (event) {
    if (event.target.classList.contains(searchResultItem)) 
    {
        var clickedId = event.target.getAttribute("data-postid");
        document.getElementById("searchResults").style.display = "none";
        document.getElementById("searchInput").value = "";
        viewPost(clickedId);
    }
});

document.getElementById("postList").addEventListener("click", function (event) {
    if (event.target.tagName === "H2" || event.target.classList.contains("readMoreBtn")) {
        var clickedId = event.target.getAttribute("data-postid");
        viewPost(clickedId);
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

    var newPost = createPost(title, body, author);
    posts.push(newPost);
    savePosts();

    document.getElementById("titleInput").value = "";
    document.getElementById("authorInput").value = "";
    document.getElementById("bodyInput").value = "";

    renderPosts();

    document.getElementById("addPostView").style.display = "none";

    viewPost(newPost.id);
});

loadPosts();
renderPosts();