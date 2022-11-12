$(function () {
//    1. 文本框里面输入内容，按下回车，就可以生成待办事项
//      1.1 利用事件对象.keyCode 判断用户按下回车（13）
//      1.2 声明一个数组，保存数据
//      1.3 先要读取本地存储原来的数据（声明函数getData()）,放到这个数组里面
//      1.4 之后把最新从表单获取过来的数据，追加到数组里面
//      1.5 最后把数组存储给本地储存（声明函数 savaDate()）
    load();
    $('#title').on('keydown', function (e) {
        if (e.keyCode === 13) {
            if ($(this).val() === '') {
                alert('请输入内容');
            } else {
                let local = getData();
                local.push({title: $('#title').val(), done: false});
                saveDate(local);
                load();
                $(this).val("");
            }
        }
    });

//    2. 点击待办事项复选框，就可以把当前数据添加到已完成事项里面去
//      2.1 点击里面的a链接, 不是删除的li 而是删除本地存储对应的数据
//      2.2 核心原理：先获取本地储存数据, 删除对应的数据, 保存给本地储存, 重新渲染列表li
//      2.3 我们可以给链接自定义属性记录当前的索引号
//      2.4 根据这个索引号删除相关的数据--数组的splice(i,1) 方法
//      2.5 储存修改后的数据, 然后存储给本地储存
//      2.6 重新渲染加载数据列表
//      2.7 因为a是动态创建的, 我们使用on方法绑定事件
    $('#todolist, #donecount').on('click', 'a', function () {
        let data = getData();
        let index = $(this).attr('id');
        data.splice(index, 1);
        saveDate(data);
        load();
    })


//    3. 点击已完成事项复选框，就可以把当前数据添加到待办事项里面
//      3.1 当我们点击小的复选框, 修改本地储存数据，再重新渲染数据列表
//      3.2 点击之后, 获取本地存储数据
//      3.3 修改对应数据属性 done 为当前复选框的 checked 状态
//      3.4 之后保存数据本地储存
//      3.5 重新渲染加载数据列表
//      3.6 load 加载函数里面, 新增一个条件, 如果当前数据的 done 为 true 就是已经完成的, 就把列表渲染加载到 ul 里面
//      3.7 如果当前数据的 done 为 false ，则是待办事件, 就把列表渲染加载到 ol 里面
    $('ul, ol').on('click', 'input', function () {
        let data = getData();
        let index = $(this).siblings('a').attr('id');
        data[index].done = $(this).prop('checked');
        saveDate(data);
        load();
    })


//    4. 但是本页面内容刷新不会丢失

    function getData() {
        let data = localStorage.getItem("todolist");
        if (data !== null) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    function saveDate(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }

    function load() {
        let data = getData();
        $('#todolist, #donelist').empty();
        let todocount = 0; // 未完成的
        let donecount = 0; // 已完成的
        $.each(data, function (i, n) {
            if (n.done) {
                $('#donelist').prepend("<li><input type='checkbox' checked='checked'><p>" + n.title + "</p><a href='JavaScript:' id=" + i + "></a></li>");
                donecount++;
            } else {
                $('#todolist').prepend("<li><input type='checkbox'><p>" + n.title + "</p><a href='JavaScript:' id=" + i + "></a></li>");
                todocount++;
            }
        });
        $('#todocount').text(todocount);
        $('#donecount').text(donecount);
    }
})