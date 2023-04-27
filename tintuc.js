async function displayDirectories() {

    try {
        let listDirectories = await axios('http://localhost:3004/directories')
        listDirectories = listDirectories.data
        console.log(listDirectories);
        let str = ''
        for (const directory of listDirectories) {
            str += renderDirectory(directory)
        }
        $("ul#newsDirectory").html(str)
    } catch (error) {
        $("ul#newsDirectory").html(error.message)
        $("ul#newsDirectory").attr('style', 'color : red')
    }
}
displayDirectories()
function renderDirectory(el) {
    return `<li>
    <a href="danhmuc.html?cid=${el.id}">${el.directory}</a>
    </li>`
}


let listNews = []
async function getData() {
    listNews = await axios('http://localhost:3004/news')

    listNews = listNews.data
    console.log(listNews);
    function render(neww) {
        return `
        <li>
            <h2>
            <a href="chitiet.html?did=${neww.id}" title="">${neww.content}</a>
            </h2>
            <div class="item">
            <a href="chitiet.html" title=""><img src="${neww.image}" alt="" /></a>
            <p>${neww.detail}</p>
            <div class="clr"></div>
        </div>
        </li>
        `
    }
    let str = ''
    function display(listNews) {
        for (const neww of listNews) {
            str += render(neww)
        }
        $("ul#listNews").html(str)

    }
    display(listNews)
}
getData()

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