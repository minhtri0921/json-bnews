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

let did = findGetParameter('did');
let cid = findGetParameter('cid')
let listNews = []
async function getData() {
    try {
        const response = await axios(`http://localhost:3004/news/${did}`);
        const newByDID = response.data;
        console.log(newByDID);
        function render(newByDID) {
            return `
                <h1>${newByDID.content}</h1>
                <div class="main-content">
                    <p>${newByDID.detail}</p>
                </div>
            `;
        }
        let str = '';
        function display(newByDID) {
            str += render(newByDID);
            $("div.rightbody").html(str);
        }
        display(newByDID);
    } catch (error) {
        console.error(error);
    }
}
getData();
async function display() {
    let listDirectories = await axios('http://localhost:3004/directories')
    listDirectories = listDirectories.data
    let str = ''
    for (const directory of listDirectories) {
        str += renderDirectory(directory)
    }
    $("ul#newsDirectory").html(str)
    console.log(str);
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


// let listNews1 = []
// async function getData1() {
//     listNews = await axios('http://localhost:3004/news')

//     listNews = listNews.data
//     console.log(listNews);
//     function render(neww) {
//         return `
//         <li>
//             <h2>
//             <a href="chitiet.html?did=${neww.id}" title="">${neww.content}</a>
//             </h2>
//             <div class="item">
//             <a href="chitiet.html" title=""><img src="${neww.image}" alt="" /></a>
//             <p>${neww.detail}</p>
//             <div class="clr"></div>
//         </div>
//         </li>
//         `
//     }
//     let str = ''
//     function display(listNews) {
//         for (const neww of listNews) {
//             str += render(neww)
//         }
//         $("ul#news").html(str)

//     }
//     display(listNews)
// }
// getData1()