class ToDo{
    constructor(todo) {
        this.todo = todo;
    }
}

class Ui{
    static displayToDo(){

        const todo = Store.getTodo();        

        todo.forEach((item,index) => {
            console.log('display todo',index); 
            Ui.addTodoToList(item,index)
        });

        Store.getTodo();

    }    

    static addTodoToList(item,index){
        const display_list = document.querySelector('#to-do-list');

        var div = document.createElement('div')    

        console.log('add todo list',index);

        div.innerHTML += `
            <div class="alert list alert-primary alert-dismissible mt-3 fade show" role="alert" id="${index}">
                <strong>${item.todo}</strong>
                <button type="button" class="close remove" style="cursor:pointer" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true" class="">&times;</span>
                </button>
            </div>
        `;        

        display_list.appendChild(div);        

    }

    static clearField(){
        document.getElementById("todo").value = " " ;
    }

    static deleteTodo(el){

        if(el.classList.contains('remove')){
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(type,msg){

        document.getElementById("show-alert").innerHTML = "";

        if(type == "success"){
            document.getElementById('show-alert').innerHTML = `
                <div class="alert alert-success">
                    <strong>${msg}</strong>
                </div>
            `
        }else if(type == "failed"){
            document.getElementById('show-alert').innerHTML = `
                <div class="alert alert-danger">
                    <strong>${msg}</strong>
                </div>
            `
        }
    }
}


// localstorage
class Store{
    // select
    static getTodo() {
        let todo;
        if (localStorage.getItem('todolist') === null){
            todo = [];
        }else {
            todo = JSON.parse(localStorage.getItem('todolist'));
        }
        return todo;
    }

    // add ke ls
    static storeTodo(todo) {
        const todos = Store.getTodo();
        todos.push(todo);

        localStorage.setItem("todolist",JSON.stringify(todos));
    }

    // delete dari ls
    static deleteTodo(el) {        

        const todos = Store.getTodo();

        todos.forEach((item,index) => {   
            console.log('deleteTodo',index);
        });

        var x = document.getElementsByClassName("list")[0].id;        
        

        // todos.forEach((el,item,index) => {
        //     if(el.target.parentElement.indexOf == index){
        //         console.log(index,'hapus');
        //     };
        // });        
        
    }
}

// menjalankan dan menampilkan to do list
document.addEventListener("DOMContentLoaded",Ui.displayToDo);

document.querySelector('#form-todo').addEventListener("submit",function(e){

    e.preventDefault();

    //ambil input value
    const todo_value = document.getElementById("todo").value;    

    //validasi simpel
    if(todo_value === ""){
        Ui.showAlert('failed','Silahkan Masukkan Data')
    }else{
        // instansiasi todo
        const todo = new ToDo(todo_value);
        
        // menambahkan todo list 
        Ui.addTodoToList(todo);

        // menambahkan to do list ke localstorage
        Store.storeTodo(todo);

        // membersihkan bekas input
        Ui.clearField();

        // menampilkan alert
        Ui.showAlert("success","To Do Ditambahkan");

    }    
})

document.querySelector('#to-do-list').addEventListener('click',function(e){
    // menghapus to do list
    Ui.deleteTodo(e.target);    

    // menghapus dari localstorage
    Store.deleteTodo(e.target);

    // menampilkan alert
    Ui.showAlert("success","To Do Dihapus");
})