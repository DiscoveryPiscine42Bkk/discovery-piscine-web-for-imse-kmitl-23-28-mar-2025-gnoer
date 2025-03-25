function getCookie(name) {
    let cookies = document.cookie.split("; ");
    for (let cookie of cookies) {
        let [key, value] = cookie.split("=");
        if (key === name) return decodeURIComponent(value);
    }
    return "";
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function loadTasks() {
    let tasks = getCookie("tasks");
    return tasks ? JSON.parse(tasks) : [];
}

function saveTasks(tasks) {
    setCookie("tasks", JSON.stringify(tasks), 7);
}

function addTask(taskText) {
    let ftList = document.getElementById("ft_list");
    let newTask = document.createElement("div");
    newTask.textContent = taskText;
    newTask.classList.add("task");
    newTask.addEventListener("click", function () {
        if (confirm("ลบรายการนี้ใช่ไหม?")) {
            ftList.removeChild(newTask);
            let tasks = loadTasks().filter(task => task !== taskText);
            saveTasks(tasks);
        }
    });
    ftList.insertBefore(newTask, ftList.firstChild);
}

window.onload = function () {
    let tasks = loadTasks();
    tasks.forEach(addTask);

    document.getElementById("newTask").addEventListener("click", function () {
        let taskText = prompt("เพิ่มรายการใหม่:");
        if (taskText) {
            addTask(taskText);
            let tasks = loadTasks();
            tasks.unshift(taskText);
            saveTasks(tasks);
        }
    });
};
