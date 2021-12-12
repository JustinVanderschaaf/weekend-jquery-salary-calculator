$(document).ready(onReady);

let employees = [];

function onReady() {
  //handle new employee form submit
  $("#employeeForm").on("submit", onAddEmployee);

  // Handle delete employee button
  $(document).on("click", ".deleteBtn", onDeleteEmployee);
} //end onReady

//add up total wages of employees
//divide by 12
//display to dom
function calculateTotal() {
  let totalWages = 0;
  employees.forEach((employee) => (totalWages += employee.annualSalary));

  let totalMonthly = Math.round((totalWages / 12 + Number.EPSILON) * 100) / 100;
  $("#totalMonthly").text(`${totalMonthly}`);
  if (totalMonthly > 20000) {
    $("footer").css({
      backgroundColor: "red",
    });
  }
}

function onDeleteEmployee() {
  let employeeId = $(this).closest("tr").attr("id");
  for (let i = 0; i < employees.length; i++) {
    if (employees[i].id == employeeId) {
      employees.splice(i, 1);
    }
  }
  $(this).parents("tr").remove();
  calculateTotal();
} // end delete employee

function onAddEmployee(event) {
  //prevent from reloading page
  event.preventDefault();

  console.log("employee added");

  //grab inputs and store in a var
  let firstName = $("#nameInput").val();
  let lastName = $("#lastNameInput").val();
  let id = $("#idInput").val();
  let title = $("#titleInput").val();
  let annualSalary = Number($("#salaryInput").val());

  $("#nameInput").val("");
  $("#lastNameInput").val("");
  $("#idInput").val("");
  $("#titleInput").val("");
  $("#salaryInput").val("");

  //make employee object
  let employeeObj = {
    firstName: firstName,
    lastName: lastName,
    id: id,
    title: title,
    annualSalary: annualSalary,
  };
  console.log("New Employee", employeeObj);

  //add obj to global employee array
  employees.push(employeeObj);
  console.log("📓 Employees", employees);

  //empty th <tbody>
  $("#employeeList").empty();

  //render the employees:
  //loop through the employees array and render each as a <tr>
  for (let employee of employees) {
    $("#employeeList").append(`
        <tr id=${employee.id}>
             <td>${employee.firstName}</td>
              <td>${employee.lastName}</td>
             <td class="employeeId">${employee.id}</td>
             <td>${employee.title}</td>
             <td>${employee.annualSalary}</td>
             <td>
                   <button class="deleteBtn">
                    Delete
                  </button>
            </td>
        </tr>`);
  } //end employee loop

  calculateTotal();
} //end addEmployee
$("#nameInput").val("");
