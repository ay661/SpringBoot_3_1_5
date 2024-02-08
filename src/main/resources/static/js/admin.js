const allUsersURL = "/api/admin/getUsers";
const allRolesURL = "/api/admin/getRoles";
const createUserURL = "/api/admin/create";
const updateUserURL = "/api/admin/update";
const deleteUserURL = "/api/admin/delete";

async function allUsersTableShow() {
    let allUsersResponse = await fetch(allUsersURL);
    if (!allUsersResponse.ok) {
        console.log(allUsersResponse.status, allUsersResponse.statusText);
        return;
    }
    let allUsersList = await allUsersResponse.json();
    let allUsersTableHtml = '';
    allUsersList.forEach(
        user => {
            let rolesString = '';
            user.roles.forEach(role => {
                rolesString += role.roleName.replace("ROLE_", "  ");
            });
            let modalEditHtml = "<td><button type='button' class='btn btn-info' hover='white' data-bs-toggle='modal' "
                + "data-bs-target='#edit" + user.id + "'>Edit</button></td><div class='modal fade' tabindex='-1' id='edit"
                + user.id +"' role='dialog' aria-labelledby='editModalLabel' aria-hidden='true'>"
                + "<div class='modal-dialog modal-dialog-scrollable' role='document'><div class='modal-content'>"
                + "<div class='modal-header'><h5 class='modal-title'>Edit user</h5>"
                + "<button type='button' onClick='removeWarnings(this)' id='edit_form_close_button_" + user.id  +"' class='close' data-bs-dismiss='modal' aria-label='Close'>"
                + "<span aria-hidden='true'>&times;</span></button></div><div class='modal-body text-center'>"
                + "<form method='POST' id='edit_form_"+ user.id  +"'>"
                + "<input type='hidden' name='${_csrf.parameterName}' value='${_csrf.token}'/><div class='container'>"
                + "<div class='row justify-content-center '><div class='col-7'><div class='mb-1'>"
                + "<label class='fw-bold' for='edit_username_" + user.id +"'>Username</label></div><div class='mb-2'>"
                + "<input type='text' name='username'  value='" + user.username +"' id='edit_username_" + user.id +"' required/></div>"
                + "<div class='mb-1'><label class='fw-bold' for='edit_password_" + user.id +"'>Password</label></div><div class='mb-2'>"
                + "<input type='password' id='edit_password_" + user.id +"' name='password' value='' required/></div><div class='mb-1'>"
                + "<label class='fw-bold' for='edit_email_" + user.id +"'>Email</label></div><div class='mb-2'>"
                + "<input type='email' name='email' value='" + user.email + "' id='edit_email_" + user.id +"' required /></div>"
                + "<div class='mb-1'><label class='fw-bold' for='edit_age_" + user.id +"'>Age</label></div><div class='mb-2'>"
                + "<input type='number' class='form-control' min='0' max='120' name='age' value='" + user.age + "' id='edit_age_" + user.id +"' required />"
                + "</div><div class='mb-1'><label class='fw-bold'>Role</label></div><div class='mb-2'>"
                + "<select class='form-select' aria-label='Role selection' id='edit_roles_" + user.id + "' name='roles' multiple='multiple'  size='2'></select>"
                + "</div></div></div></div><div class='modal-footer'><button type='button' onClick='removeWarnings(this)' id='edit_form_close_button_" + user.id  +"' class='btn btn-secondary' data-bs-dismiss='modal'>Close</button>"
                + "<button type='submit' onClick='editSubmit(this)' id='edit_form_edit_button_"+ user.id  +"' class='btn btn-primary'>Edit</button></div></form></div></div></div></div>";

            let modalDeleteHtml = "<td><button type='button' class='btn btn-danger' data-bs-toggle='modal' "
                + "data-bs-target='#delete" + user.id + "'>Delete</button></td><div class='modal fade' tabindex='-1' id='delete"
                + user.id +"' role='dialog' aria-labelledby='deleteModalLabel' aria-hidden='true'>"
                + "<div class='modal-dialog modal-dialog-scrollable' role='document'><div class='modal-content'>"
                + "<div class='modal-header'><h5 class='modal-title'>Delete user</h5>"
                + "<button type='button' class='close' data-bs-dismiss='modal' aria-label='Close'>"
                + "<span aria-hidden='true'>&times;</span></button></div><div class='modal-body text-center'>"
                + "<form method='POST' id='delete_form_"+ user.id  +"'>"
                + "<input type='hidden' name='${_csrf.parameterName}' value='${_csrf.token}'/><div class='container'>"
                + "<div class='row justify-content-center '><div class='col-7'><div class='mb-1'>"
                + "<label class='fw-bold' for='delete_username_" + user.id +"'>Username</label></div><div class='mb-2'>"
                + "<input type='text' name='username'  value='" + user.username +"' id='delete_username_" + user.id +"' disabled/></div>"
                + "<div class='mb-1'><label class='fw-bold' for='delete_password_" + user.id +"'>Password</label></div><div class='mb-2'>"
                + "<input type='password' id='delete_password_" + user.id +"' name='password' value='' disabled/></div><div class='mb-1'>"
                + "<label class='fw-bold' for='delete_email_" + user.id +"'>Email</label></div><div class='mb-2'>"
                + "<input type='email' name='email' value='" + user.email + "' id='delete_email_" + user.id +"' disabled/></div>"
                + "<div class='mb-1'><label class='fw-bold' for='delete_age_" + user.id +"'>Age</label></div><div class='mb-2'>"
                + "<input type='number' class='form-control' min='0' max='120' name='age' value='" + user.age + "' id='delete_age_" + user.id +"' disabled/>"
                + "</div><div class='mb-1'><label class='fw-bold'>Role</label></div><div class='mb-2'>"
                + "<select class='form-select' aria-label='Role selection' id='delete_roles_" + user.id + "' name='roles' multiple='multiple'  size='2' disabled></select>"
                + "</div></div></div></div><div class='modal-footer'><button type='button' id='delete_form_close_button_" + user.id  +"' class='btn btn-secondary' data-bs-dismiss='modal'>Close</button>"
                + "<button type='submit' onClick='deleteSubmit(this)' id='delete_form_edit_button_"+ user.id  +"' class='btn btn-danger'>Delete</button></div></form></div></div></div></div>";

            allUsersTableHtml += "<tr><td>" + user.id + "</td><td>"
                + user.username + "</td><td>" + user.age + "</td><td>"
                + user.email + "</td><td>"
                + rolesString + "</td>" + modalEditHtml + modalDeleteHtml + "</tr>";
        }
    );
    document.getElementById("table-all-users-rows").innerHTML = allUsersTableHtml;

    let rolesListResponse = await fetch(allRolesURL);
    let rolesList = await rolesListResponse.json();
    rolesList.forEach(role => {
        role.roleName = role.roleName.replace("ROLE_", "");
    });
    allUsersList.forEach(user => {
        rolesList.forEach( role => {
            document.getElementById("edit_roles_" + user.id).options.add(
                new Option(role.roleName, role.id, true, user.roles.map(x => x.id).includes(role.id)));
            document.getElementById("delete_roles_" + user.id).options.add(
                new Option(role.roleName, role.id, true, user.roles.map(x => x.id).includes(role.id)));
        });
    });
}

async function newUserFormShow() {
    let rolesListResponse = await fetch(allRolesURL);
    let rolesListJson = await rolesListResponse.json();
    rolesListJson.forEach(role => {
        role.roleName = role.roleName.replace("ROLE_", "");
        document.getElementById("new_roles").options.add(
            new Option(role.roleName, role.id));
    });
}

async function editSubmit(element){
    let regex = /edit_form_edit_button_(\d+)/g;
    let userId = regex.exec(element.id)[1];
    let updateURL = updateUserURL + "?id=" + userId;
    let editForm = document.getElementById("edit_form_" + userId);
    let username = document.getElementById("edit_username_" + userId);
    let password = document.getElementById("edit_password_" + userId);
    let email = document.getElementById("edit_email_" + userId);
    let age = document.getElementById("edit_age_" + userId);
    let roleList = [];
    let selectedOptions = document.getElementById("edit_roles_" + userId).selectedOptions;
    for (let i = 0; i < selectedOptions.length; i++) {
        roleList.push({
            id: selectedOptions[i].value
        });
    }
    let p = document.createElement("span");
    p.innerHTML = "<span style='color: red'>Required</span>";
    p.setAttribute("class", "warn_label");
    if (username.value.trim() === "") {
        username.classList.add("err_input");
        username.after(p);
        return;
    }
    if (password.value.trim() === "") {
        password.classList.add("err_input");
        password.after(p);
        return;
    }
    let paramDict = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
            username: username.value.trim(),
            password: password.value,
            email: email.value.trim(),
            age: age.value,
            roles: roleList
        })
    };
    console.log(updateURL, paramDict);
    let response = await fetch(updateURL, paramDict);
    document.getElementById("edit_form_close_button_" + userId).click();
    if (response.ok){
        await allUsersTableShow();
    }else{
        console.log(response.status, response.statusText);
    }
}

function removeWarnings(element){
    let regex = /edit_form_close_button_(\d+)/g;
    let userId = regex.exec(element.id)[1];
    let username = document.getElementById("edit_username_" + userId);
    let password = document.getElementById("edit_password_" + userId);
    username.classList.remove("err_input");
    password.classList.remove("err_input");
    let labels = document.getElementsByClassName("warn_label");
    for(let i = 0; i < labels.length; i++){
        labels[i].remove();
    }
    element.click();
}

async function deleteSubmit(element){
    let regex = /delete_form_edit_button_(\d+)/g;
    let userId = regex.exec(element.id)[1];
    let deleteURL = deleteUserURL + "?id=" + userId;
    let paramDict = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        }
    };
    console.log(deleteURL, paramDict);
    let response = await fetch(deleteURL, paramDict);
    document.getElementById("delete_form_close_button_" + userId).click();
    if (response.ok){
        await allUsersTableShow();
    }else{
        console.log(response.status, response.statusText);
    }
}

async function getAllRoles() {
    let rolesListResponse = await fetch(allRolesURL);
    let rolesList = await rolesListResponse.json();
    rolesList.forEach(role => {
        role.roleName = role.roleName.replace("ROLE_", "");
    });
    rolesCopy = JSON.parse(JSON.stringify(rolesList));
}

(async () =>{
    await allUsersTableShow();
    await newUserFormShow();
    await getAllRoles();
})();

const handle201 = async function (data, textStatus, jqXHR) {
    await allUsersTableShow();
    $('#allusers-tab').tab('show');
};

//Для HTTP-запроса можно было также использовать fetch. Здесь используем jQuery
$(document).ready(function () {
    $("#new-user-form").on("submit", function(){
        let roleList = [];
        for (let i = 0; i < new_roles.selectedOptions.length; i++) {
            roleList.push({
                id: new_roles.selectedOptions[i].value
            });
        }
        let jsonData = JSON.stringify({
            username: new_username.value.trim(),
            email: new_email.value.trim(),
            password: new_password.value,
            age: new_age.value,
            roles: roleList
        });
        $.ajax({
            url: createUserURL,
            method: "post",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            data: jsonData,
            statusCode: {
                201: handle201,
            },
            error: function (data) {
                console.log(data);
            }
        });
        return false;
    });
});