function getUI(task, tasks) {

    const outerDiv = document.createElement("div");
    if (task.ifNew) { outerDiv.className = "fadeIn" };
    if (task.deleting) { outerDiv.className = "fadeOut"; };
    outerDiv.classList.add("task");
    outerDiv.classList.add("col-xl-3");
    outerDiv.classList.add("col-md-4");
    outerDiv.classList.add("col-sm-6");

    if (task.ifMoving) {
        const randomNumber = _randomNumber(5)
        const currentClass = String(`taskMoving${randomNumber}`)
        outerDiv.classList.add(currentClass);
        console.log(currentClass);
    }


    if (task.isSelected) {
        outerDiv.classList.add("selected");
    }

    outerDiv.onclick = function() {
        const currenttaskState = task;
        currenttaskState.isSelected = !currenttaskState.isSelected;

    }

    const taskBody = document.createElement("div");
    taskBody.className = "task-body";

    const title = document.createElement("h1");
    title.innerText = task.title;
    title.className = "task-title";

    const note = document.createElement("p");
    note.innerText = task.note;
    note.className = "task-note";

    const date = document.createElement("h5");
    date.innerText = `Date ${task.date}`;
    date.className = "task-date";

    const time = document.createElement("h5");
    time.innerText = `Time ${task.time}`;
    time.className = "task-time";

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("btn", "btn-danger", "btn-xs");
    deleteButton.classList.add("buttonOnHover")
    const icon = document.createElement("ion-icon");
    icon.name = "trash-outline";

    deleteButton.onclick = function() {

        const taskIndex = getTaskIndexById(task.id, tasks);
        const currentTask = task;
        currentTask.deleting = true;
        currentTask.ifNew = false;
        cleanAnimation(state.tasks);
        motionToAllTasks(taskIndex, tasks);
        draw(tasks);
        const deleteMotionTime = 400;
        if (taskIndex === undefined) return;
        deleteTask(tasks, taskIndex, deleteMotionTime);
        localStorage.setItem(CONFIG.TASKS, JSON.stringify(state.tasks));
        draw(state.tasks);
    };

    deleteButton.append(icon);
    taskBody.append(title, note, date, time, deleteButton)
    outerDiv.append(taskBody);
    return outerDiv;
}

function deleteTask(tasks, taskIndex, deleteMotionTime) {
    setTimeout(() => { tasks.splice(taskIndex, 1) }, deleteMotionTime);
    setTimeout(() => { cleanAnimation(state.tasks) }, deleteMotionTime);
    setTimeout(() => { localStorage.setItem(CONFIG.TASKS, JSON.stringify(state.tasks)), draw(tasks) }, deleteMotionTime);
}


function motionToAllTasks(taskIndex, tasks) {
    for (let index = taskIndex; index < tasks.length; index++) {
        const currentTask = tasks[index];
        currentTask.ifMoving = true;
    }
}

function getTaskIndexById(id, tasks) {
    const index = tasks.findIndex(function(currenttask) {
        return currenttask.id === id;
    });
    return index;

};

function getTaskByid(id, tasks) {
    const task = tasks.find(function(currenttask) {
        return currenttask.id === id;
    });
    return task;
}