function displayList() {
    document.getElementById('bookmarkForm').style.display = 'none';
    document.getElementById('bookmarkList').style.display = 'block';
};
function displayForm() {
    document.getElementById('bookmarkForm').style.display = 'block';
    document.getElementById('bookmarkList').style.display = 'none';
}
// 在页面加载完成时执行
window.addEventListener('load', function() {
    displayList();
    getAllBookmarks();
});

// 显示添加表单的按钮点击事件
document.getElementById('showAddFormBtn').addEventListener('click', function() {
    displayForm();
});

// 关闭按钮的点击事件
document.getElementById('closeBtn').addEventListener('click', function() {
    displayList();
});

// 保存按钮的点击事件
document.getElementById('saveBtn').addEventListener('click', function() {
    var bookmarkName = document.getElementById('bookmarkName').value;
    var bookmarkUrl = document.getElementById('bookmarkUrl').value;

    if (bookmarkName && bookmarkUrl) {
        window.versions.addUser({ name: bookmarkName, url: bookmarkUrl }, (result) => {
            alert('书签保存成功！');
            displayList();
            getAllBookmarks();
        });
    } else {
        alert('请输入书签名称和 URL ！');
    }
});

// 移除书签的函数
function removeBookmark(index) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    bookmarks.splice(index, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    getAllBookmarks();  // 重新加载书签列表
}
function getAllBookmarks() {
    window.versions.getUsers(null, function (data) {
        displayBookmarks(data.data);
    });
}

function displayBookmarks(bookmarks) {
    var container = document.getElementById('bookmarkUl');
    container.innerHTML = '';
    if (bookmarks.length === 0) {
        container.innerHTML = '暂无数据';
        return;
    }
    var divRow, divId, divName, divUrl, divAppendix;
    for (var i = 0; i < bookmarks.length; i++) {
        divRow = document.createElement('div');
        divId = document.createElement('div');
        divName = document.createElement('div');
        divUrl = document.createElement('div');
        divAppendix = document.createElement('div');

        divRow.appendChild(divId);
        divRow.appendChild(divName);
        divRow.appendChild(divUrl);
        divRow.appendChild(divAppendix);

        divId.innerText = bookmarks[i].id;
        divName.innerText = bookmarks[i].name;
        divUrl.innerText = bookmarks[i].url;

        divRow.appendChild(divId);
        divRow.appendChild(divName);
        divRow.appendChild(divUrl);
        divRow.appendChild(divAppendix);
        
        divRow.classList.add('row');
        divId.classList.add('col-sm');
        divName.classList.add('col-sm');
        divUrl.classList.add('col-sm');
        divAppendix.classList.add('col-sm');

        container.appendChild(divRow);

        var text = bookmarks[i].name + ' - ' + bookmarks[i].url;

        (function(index) {
            var removeBtn = document.createElement('button');
            removeBtn.className = 'btn btn-danger btn-sm float-end';
            removeBtn.textContent = '移除';
            removeBtn.addEventListener('click', function() {
                removeBookmark(index);
            });
            divAppendix.appendChild(removeBtn);
        })(i);
    }
}

(() => {
    window.fetch('http://localhost:3000/api/hello').then(res => {
        res.text().then(title => document.querySelector('#helloTag').innerHTML = title);
    });
})();