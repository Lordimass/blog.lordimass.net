const body = document.body
var file_dirs = []

fetch('blogs.json')
  .then(response => response.json())
  .then(data => {
    file_dirs = data["blogs"]
    show_blog_list(file_dirs)
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

function show_blog_list(blogs) {
    blogs.forEach(blog => {
        let a = document.createElement("a")
        a.setAttribute("href", window.location.href + blog.slice(0, blog.length-3))
        a.innerText = blog.slice(0, blog.length-3)
        body.appendChild(a)
    });
}