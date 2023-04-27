function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}

let cid = findGetParameter('cid');


let listNews = []
async function getData() {
    try {
        listNews = await axios('http://localhost:3004/news')

        listNews = listNews.data

        let listNewsByCID = listNews.filter(function (news) {
            return news.cat_id == cid
        })

        function render(listNewsByCID) {
            return `
        <li>
        <h2>
        <a href="chitiet.html?did=${listNewsByCID.id}" title="">${listNewsByCID.content}</a>
        </h2>
        <div class="item">
        <a href="chitiet.html" title=""><img src="${listNewsByCID.image}" alt="" /></a>
        <p>${listNewsByCID.detail}</p>
        <div class="clr"></div>
    </div>
    </li>
        `
        }
        let str = ''
        function display(listNewsByCID) {
            for (const neww of listNewsByCID) {
                str += render(neww)
            }
            $("ul#list-news").html(str)

        }
        display(listNewsByCID)
    } catch (error) {
        console.error(error)
    }
}
getData()


async function display() {
    let listDirectories = await axios('http://localhost:3004/directories')
    listDirectories = listDirectories.data
    let str = ''
    for (const directory of listDirectories) {
        str += renderDirectory(directory)
    }
    $("ul#newsDirectory").html(str)
}
display()
function renderDirectory(el) {
    return `<li>
    <a href="danhmuc.html?cid=${el.id}">${el.directory}</a>
    </li>`
}

async function displayPages() {
    let listPages = await axios('http://localhost:3004/pages1')
    listPages = listPages.data
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