async function displayPages() {
    let listPages = await axios('http://localhost:3004/pages1')
    listPages = listPages.data
    console.log(listPages);
    let str = ''
    for (const page of listPages) {
        str += renderPage(page)
    }
    $("ul#list-pages").html(str)
}
displayPages()
function renderPage(el) {
    return `
    <li class="active"><a href="${el.link}" title="">${el.page}</a></li>`
}


async function displayDirectories() {
    let listDirectories = await axios('http://localhost:3004/directories')
    listDirectories = listDirectories.data
    console.log(listDirectories);
    let str = ''
    for (const directory of listDirectories) {
        str += renderDirectory(directory)
    }
    $("ul#newsDirectory").html(str)
}
displayDirectories()
function renderDirectory(el) {
    return `<li>
    <a href="danhmuc.html?cid=${el.id}">${el.directory}</a>
    </li>`
}

async function displayContent() {
    let mainContents = await axios("http://localhost:3004/mainContents")
    mainContents = mainContents.data

    function render(el) {
        return `<p>
        ${el.content}</p>`
    }
    let str = ''
    function display() {

        for (const el of mainContents) {
            str += render(el)
        }
    }
    display()
    $("div.rightbody").html(str)
}
displayContent()