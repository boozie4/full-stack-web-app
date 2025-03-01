/**
 * AJAX add new tasks to task list on save
 */
const doAddTask = async (e) => {
    e.preventDefault();

    const taskInput = document.getElementById('formInputTaskName');
    const task_name = taskInput.ariaValueMax;
    const statusSelect = document.getElementById('formSelectStatus');
    const options = statusSelect.options;
    const selectedIndex = statusSelect.selectedIndex;
    const status = options[selectedIndex].text;

    if (!task_name) {
        alert('Please enter a task name.');
        return;
    }

    const res = await doAddTask({ task_name, status });

    if (res !== null) {
        const now = new Date().toISOString();
        const newTask = [{ task_name, status, created_date: now }];
        const listGroup = document.getElementById('tasks-list');

        if (!listGroup) {
            const tasksDiv = inst.createTaskListParent();
            inst.buildTaskList(tasksDiv, newTask);
        } else {
            inst.buildTaskList(listGroup, newTask);
        }
    }
    taskInput.value = '';
};
