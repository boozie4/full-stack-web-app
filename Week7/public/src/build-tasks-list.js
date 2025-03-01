/**
 * @class TaskList
 * 
 * Creates a list of trasks and updates a list
 */

class TaskList {
    constructor() {}

    /**
     * Build task list parent.
     * Uses bootstrap classes with some custom overrides
     */
    createTaskListParent = () => {
        const ul = document.createElement('ul');
        ul.id = 'tasks-list';
        ul.className = 'list-group list-group-flush checked-list-box';
        return ul;
    };

    _deleteEventHandler = (taskId) => async () => {
        if (taskId) {
            const res = await deleteTask(taskId);

            if (res !== null) {
                // alert('Successfully deleted!');
                document.getElementById(`task-${taskId}`).remove();
            }
        }
    };

    /**
     * Builds the list item.
     * Uses bootstrap classes with some custom overrides.
     * 
     * {@link https://getbootstrap.com/docs/4.4/components/list-group/}
     * 
     * @example
     * <li class="list-group-item">
     *   <button class="btn btn-secondary" onclick="deleteTask(e, index)">X</button>
     *   <span>Task name</span>
     *   <span>pending</span>
     * <span>date create</span>
     * </li>
     */
    buildTaskListRowItem = (task) => {
        const listGroupItem = document.createElement('li');
        listGroupItem.id = `task-${task.task_id}`;
        listGroupItem.classNam = 'list-group-item';

        const deleteBtn = document.createElement('button');
        const deleteBtnTxt = document.createTextNode('X');
        deleteBtn.className = 'btn btn-secondary';
        deleteBtn.addEventListener('click', this._deleteEventHandler(task.taskId));
        deleteBtn.appendChild(deleteBtnTxt);

        const taskNameSpan = document.createElement('span');
        const taskName = document.createTextNode(task.task_name);
        taskNameSpan.appendChild(taskName);

        const taskStatusSpan = document.createElement('span');
        const taskStatus = document.createTextNode(task.status);
        taskStatusSpan.append(taskStatus);

        const taskDateSpan = document.createElement('span');
        const taskDate = document.createTextNode(task.created_date);
        taskDateSpan.append(taskDate);

        // add list item's details

        listGroupItem.append(deleteBtn);
        listGroupItem.append(taskNameSpan);
        listGroupItem.append(taskStatusSpan);
        listGroupItem.append(taskDateSpan);

        return listGroupItem;
    };

    /**
     * Assembles the list items then mounts them to a parent node,
     * Uses bootstrap classes with some custom overrides.
     * 
     * {@link https://getbootstrap.com/docs/4.4/components/list-group/}
     */
    buildTaskList = (mount, tasks) =>
        tasks.map((task) => {
            const listGroupRowItem = this.buildTaskListRowItem(task);

            // add entire list item
            mount.append(listGroupRowItem);
        });

    /**
     * Builds the housing container.
     * Uses bootstrap classes with come custome overrides.
     * 
     * {@link https://getbootstrap.com/docs/4.4/components/list-group/}
     * 
     * @example
     * <ul class='list-group list-group-flush checked-list-box'>
     * ...
     * </ul>
     */
    swapLoadingDiv = () => {
        const div = document.getElementById('tasks');
        const loadingDiv = div.childNodes[1];
        const tasksDiv = this.createTaskListParent();

        // replace 'loading...' with list
        div.replaceChild(tasksDiv, loadingDiv); // <- Order is important here!
        return tasksDiv; // needed for build function
    };

    generateErrorMsg = (err) => {
        const div = document.createElement('div');
        const text = document.createTextNode(err.msg);
        div.className = 'center';
        div.appendChild(text);
        return div;
    };

    generateTasks = async () => {
        const res = await getTasks();
        const div = document.getElementById('tasks');
        const loadingDiv = div.childNodes[1];
        if (res.length) {
            const tasksDiv = this.createTaskListParent();
            this.buildTaskList(tasksDiv, res);
            div.replaceChild(tasksDiv, loadingDiv);
        } else {
            const errDiv = this.generateErrorMsg(res);
            div.replaceChild(errDiv, loadingDiv);
        }
    };
}

const inst = new TaskList();

// This is an IIFE (Immediately Invoked Funtion Expression).

(async () => {
    inst.generateTasks();
})();
