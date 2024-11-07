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
        // var bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
        // bookmarks.push();
        // localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        // displayBookmarks();
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
        displayBookmarks(Object.toString(data.data) === '[Object object]'? [data.data]: data.data);
    });
}

function displayBookmarks(bookmarks) {
    // var bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
    var ul = document.getElementById('bookmarkUl');
    ul.innerHTML = '';
    for (var i = 0; i < bookmarks.length; i++) {
        var li = document.createElement('li');
        li.className = 'list-group-item';

        var text = bookmarks[i].name + ' - ' + bookmarks[i].url;
        li.innerHTML = text;

        (function(index) {
            var removeBtn = document.createElement('button');
            removeBtn.className = 'btn btn-danger btn-sm float-end';
            removeBtn.textContent = '移除';
            removeBtn.addEventListener('click', function() {
                removeBookmark(index);
            });
            li.appendChild(removeBtn);
        })(i);

        ul.appendChild(li);
    }
}
