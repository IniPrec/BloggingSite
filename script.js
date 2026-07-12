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

function renderPosts() {
    var container = document.getElementById("postList");
    container.innerHTML = "";

    for (var i = 0; i < posts.length; i++) {
        var p = posts[i];
        var preview = p.body.slice(0, 100);

        container.innerHTML += "<h2 data-postid=" + p.id + ">" + p.title + "</h2";
        container.inneHTML += "<p>" + p.date + "-" + p.author + "</p>";
        container.innerHTML += "<p>" + preview + "...</p>";
        conatiner.innerHTML += "<hr>";
    }
}

renderPosts();