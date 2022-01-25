const DOM = {
    title: null,
    note: null,
    date: null,
    time: null,
    taskContainer: null,
};

const state = { tasks: [] };
const CONFIG = { TASKS: "tasks" };

function init() {

    DOM.title = document.getElementById("title");
    DOM.note = document.getElementById("note");
    DOM.date = document.getElementById("date");
    DOM.time = document.getElementById("time");
    DOM.taskContainer = document.getElementById("taskContainer");

    const addTaskBtn = document.getElementById("addTask")
    addTaskBtn.addEventListener("click", addTask);

    const resetBtn = document.getElementById("reset")
    resetBtn.addEventListener("click", reset);

    try {
        const tasksString = localStorage.getItem(CONFIG.TASKS);
        const tasks = JSON.parse(tasksString);
        if (!tasks) return;
        state.tasks = tasks;
    } catch {}

    cleanAnimation(state.tasks);
    draw(state.tasks);
}

function reset() {
    DOM.title.value = "";
    DOM.note.value = "";
    DOM.date.value = "";
    DOM.time.value = "";
}

init();

function draw(tasks) {

    DOM.taskContainer.innerHTML = "";

    for (let index = 0; index < tasks.length; index++) {
        const task = getUI(tasks[index], tasks);
        if (!task) return;
        DOM.taskContainer.append(task);
    }
}

function addTask() {

    const titleValue = DOM.title.value;
    const noteValue = DOM.note.value;
    const dateValue = DOM.date.value;
    const timeValue = DOM.time.value;

    if (!titleValue) { alertError("TITILE"); return; };
    if (!noteValue) { alertError("NOTE"); return; };
    if (!dateValue) { alertError("DATE"); return; };
    if (!timeValue) { alertError("TIME"); return; };

    cleanAnimation(state.tasks);
    const task = getNoteObj(titleValue, noteValue, dateValue, timeValue);
    state.tasks.push(task);

    localStorage.setItem(CONFIG.TASKS, JSON.stringify(state.tasks));
    draw(state.tasks);
    reset()
}

function cleanAnimation(tasks) {

    for (let index = 0; index < tasks.length; index++) {
        if (!tasks) return;
        const currentTask = tasks[index]
        currentTask.ifNew = false;
        currentTask.ifMoving = false;
    }
}

function _randomNumber(number) {
    return Math.ceil(Math.random() * number)
}

function alertError(missingValue) {
    const mainForm = document.getElementById("form");
    const errorMassage = document.createElement("div")
    errorMassage.className = "col-4";
    errorMassage.innerText = `ERROR!!!!! you need to fill a ${missingValue} section!!!`;
    errorMassage.classList.add("errorMasage");
    setTimeout(() => { errorMassage.classList.add("errorMasageAnim"), init() }, 2000);

    mainForm.appendChild(errorMassage);
    init()
    setTimeout(() => { mainForm.removeChild(errorMassage), init() }, 3000);

}