$(document).ready(onReady);

let employees = []

function onReady() {
    //handle new employee form submit
    $('#employeeForm').on('submit', onAddEmployee);

    // Handle delete employee button
    //$('.deleteBtn').on('click', onDeleteProduct);
    $(document).on('click', '.deleteBtn', onDeleteEmployee);
}

function onDeleteEmployee() {
    console.log('👋 onDeleteEmployee');

    $(this).parents('tr').remove();
}

function onAddEmployee(event){
    //prevent from reloading page
    event.preventDefault();

    console.log('employee added');

    //grab inputs and store in a var
    let firstName = $('#nameInput').val();
    let lastName = $('#lastNameInput').val();
    let id = $('#idInput').val();
    let title = $('#titleInput').val();
    let annualSalary = Number($('#salaryInput').val());


    //make employee object
    let employeeObj= {
       firstName:firstName,
        lastName:lastName,
        id:id,
        title:title,
        annualSalary:annualSalary
    };
    console.log('New Employee', employeeObj);

    //add obj to global employee array
    employees.push(employeeObj);
    console.log('📓 Employees', employees);

    //empty th <tbody>
    $('#employeeList').empty();

    //render the employees:
    //loop through the employees array and render each as a <tr>
    for (let employee of employees){
        $('#employeeList').append(`
        <tr>
             <td>${employee.firstName}</td>
              <td>${employee.lastName}</td>
             <td>${employee.id}</td>
             <td>${employee.title}</td>
             <td>${employee.annualSalary}</td>
             <td>
                   <button class="deleteBtn">
                    Delete
                  </button>
            </td>
        </tr>`)
       
    }
    //add up total wages of employees
    //divide by 12
    //display to dom
    let totalWages = 0;
    employees.forEach(employee => totalWages += employee.annualSalary);

    let totalMonthly=totalWages/12
    $('#totalMonthly').append(`${totalMonthly}`)
};
