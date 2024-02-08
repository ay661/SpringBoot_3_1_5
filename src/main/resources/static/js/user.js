const currentUserURL = '/api/user/getCurrentUser';

async function currentUserShow() {
    let currentUserResponse = await fetch(currentUserURL);
    if (!currentUserResponse.ok) {
        console.log(currentUserResponse.status, currentUserResponse.statusText);
        return;
    }
    let currentUser = await currentUserResponse.json();
    console.log("Current user (email): " + currentUser.email);
    document.getElementById("topnavbar-current-user").innerHTML = currentUser.email;
    let roles = '';
    currentUser.roles.forEach(role => {
        roles += role.roleName.replace("ROLE_", "  ");
    });
    document.getElementById("topnavbar-current-roles").innerHTML = roles;
    document.getElementById("table-current-user-rows").innerHTML = "<tr><td>" + currentUser.id + "</td><td>"
        + currentUser.username + "</td><td>" + currentUser.age + "</td><td>" + currentUser.email + "</td><td>"
        + roles + "</td></tr>";
}

(async () => {await currentUserShow();})();