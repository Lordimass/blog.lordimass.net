let href = window.location.href
let i = href.length-1

// Fetch the list of valid blog pages
var blogs = []
fetch('blogs.json')
  .then(response => response.json())
  .then(data => {
    blogs = data["blogs"]
    load_blog(blogs)
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

function load_blog(blogs) {
    // Getting subdirectory (The blog name)
    for (i; i >= 0; i--) {
        if (href[i] == "/") {
            i++
            break
        }
    }
    let subdirectory = href.substring(i, href.length).replaceAll("%20", " ")

    // If the blog exists, load it
    if (is_in(blogs, subdirectory + ".md")) {
        fetch('blog_markdowns/'+ subdirectory + ".md")
        .then(response => response.text())
        .then(data => {
          show_blog(data)
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
}

function is_in(list, element) {
    for (let i = 0; i < list.length; i++) {
      if (list[i] === element) {
        return true;
      }
    }
    return false;
  }

function show_blog(blog_raw) {
  var converter = new showdown.Converter();
  var html = converter.makeHtml(blog_raw);

  p = document.createElement("p")
  p.innerHTML = html
  document.body.appendChild(p)

  a = document.createElement("a")
  a.innerText = "<<< Return Home"
  console.log(window.location.href.split("/"))
  a.href = "http://" + window.location.href.split("/")[2]
  document.body.appendChild(a)
}