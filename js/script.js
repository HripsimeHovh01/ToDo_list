document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector("#add-btn");
    const todoText = document.querySelector("#todo-text");
    const list = document.querySelector("#list");
    const filterOptions = document.querySelectorAll("input[name='filter']");

    // Add ToDo on button click 
    addBtn.addEventListener("click", addTodo);

    // Add ToDo on pressing Enter key
    todoText.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            addTodo();
        }
    });

    function addTodo() {
        if (todoText.value.trim() !== "") {
            addTodoItem(todoText.value.trim());
            todoText.value = "";
        }
    }

    // Create ToDo item
    function addTodoItem(text) {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item");

        const itemText = document.createElement("span");
        itemText.textContent = text;

        const toolsDiv = document.createElement("div");
        toolsDiv.classList.add("tools");

        const completeBtn = document.createElement("button");
        completeBtn.textContent = "Done";
        completeBtn.classList.add("done-button");
        completeBtn.addEventListener("click", () => toggleComplete(itemDiv, itemText));

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("del-button");
        deleteBtn.addEventListener("click", () => itemDiv.remove());

        toolsDiv.appendChild(completeBtn);
        toolsDiv.appendChild(deleteBtn);
        itemDiv.appendChild(itemText);
        itemDiv.appendChild(toolsDiv);

        list.appendChild(itemDiv);
    }

    // Toggle completion status
    function toggleComplete(itemDiv, itemText) {
        itemDiv.classList.toggle("done");
        itemText.classList.toggle("done");
        filterTodoItems();
    }

    // Filter ToDo items
    filterOptions.forEach(filter => {
        filter.addEventListener("change", () => filterTodoItems());
    });

    function filterTodoItems() {
        const filter = document.querySelector("input[name='filter']:checked").value;
        const items = list.children;

        for (const item of items) {
            const isDone = item.classList.contains("done");
            if (filter === "all" || (filter === "active" && !isDone) || (filter === "completed" && isDone)) {
                item.style.display = "flex";
            } else {
                item.style.display = "none";
            }
        }
    }
});
