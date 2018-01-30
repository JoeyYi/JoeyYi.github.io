var list = document.querySelector("ul.post-list");
var items_per_page = 5;
var num_pages = 3;
var items_count = true;

var items = list.children;
var num_items = items.length;

var index_array = [];
var page_array = [];


for (var i = 0; i < num_items; i++) {
    if (page_array.length < items_per_page) {
        page_array.push(i);
    } else {
        index_array.push(page_array);
        page_array = [i];
    }
}

index_array.push(page_array);

var pager = document.createElement("div");
pager.setAttribute("id","pager");
list.parentNode.append(pager);


function set_nav(el,page) {
    el.setAttribute("href","#" + (page + 1));
    el.setAttribute("onclick","f(" + page + ")");
}

function del_nav(el) {
    if (el.hasAttribute) {
        el.removeAttribute("href");
        el.removeAttribute("onclick");
    }

}

//create pager elements
function create_num(class_name,num) {
    for (var i = 0; i < num; i++) {
        var el = document.createElement("a");
        el.innerHTML = "[" + (i + 1) + "]";
        el.setAttribute("class",class_name);
        set_nav(el, 0);
        pager.append(el); 
    }
}

function create_nav(id,name) {
    var el = document.createElement("a");
    el.innerHTML = name;
    el.setAttribute("id",id);
    set_nav(el, "");
    pager.append(el); 
}

create_nav("page_prev","&lt; Prev");
create_num("page_index",index_array.length);
create_nav("page_next","Next &gt;");

if (items_count) {
    var el = document.createElement("p");
    el.innerHTML = items.length + " posts in all";
    pager.append(el); 
}


//config pagination

var indexes = document.querySelectorAll(".page_index");


function f(x) {
    index_array.forEach(function(pages, page_index){       
        pages.forEach(function(i){
            items[i].style.display = (page_index == x)? "block":"none";
        });

    });

    indexes.forEach(function(index,i){
        index.setAttribute("href","#" + (i + 1));
        index.setAttribute("onclick","f("+i+")");
    });

    del_nav(indexes[x]);

    prev = document.getElementById("page_prev");
    next = document.getElementById("page_next");


    (x > 0)? set_nav(prev, x - 1):del_nav(prev);
    (x < index_array.length - 1)? set_nav(next, x + 1):del_nav(next);

}
//init

f(0);