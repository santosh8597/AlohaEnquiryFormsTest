
var sdata = [];
$(document).ready(function () {
    $("#btnUpdate").hide();
    $("#btnSubmit").show();

    clearData();
    getStudetnData();
})
function fetchStudentData() {
    var name = $("#txtName").val();
    var email = $("#txtEamil").val();
    var phoneNo = $("#txtPhoneNo").val();
    var typeofEnq = $("#ddEnquiry").val();
    var details = $("#txtDetails").val();

    var data = { "name": name, "emailId": email, "phoneNo": phoneNo, "enquiryType": typeofEnq, "details": details };

    $.ajax({

        url: '/Students/AddStudentData',
        method: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (resp) {
            alert(resp);
            clearData();
            getStudetnData();

        }
    })

}


function getStudetnData() {
    $.ajax({
        url: '/Students/GetStudents',
        method: 'get',
        contentType: 'applicaton/json',
        success: function (resp) {

            $("#tbldata").empty();
            $.each(resp, function (i, d) {

                $("#tbldata").append("<tr><td>" + i + 1 + "</td><td>"
                            + d.name + "</td><td>" + d.emailId + "</td><td>"
                           + d.phoneNo + "</td><td>" + d.enquiryType + "</td><td>"
                            + d.details + "</td><td><input type='button' id='btnview' value='View' onclick='viewStudent(" + d.studentId + ")' class='btn btn-info'/></td><td><input type='button' id='btnview' value='Delete' onclick='deleteStudent(" + d.studentId + ")' class='btn btn-danger'/></td></td></tr>")
            })

        }
    })
}

function viewStudent(x) {
    $("#btnUpdate").show();
    $("#btnSubmit").hide();

    $.ajax({
        url: '/Students/ViewStudent/' + x,
        method: 'get',
        contentType: 'application/json',
        success: function (resp) {

            $("#txtStudentId").val(resp.studentId);
            $("#txtName").val(resp.name);
            $("#txtEamil").val(resp.emailId);
            $("#txtPhoneNo").val(resp.phoneNo);
            $("#ddEnquiry").val(resp.enquiryType);
            $("#txtDetails").val(resp.details);
        }
    })
}

function updateStudet() {
    debugger;
    var studId = $("#txtStudentId").val();
    var name = $("#txtName").val();
    var email = $("#txtEamil").val();
    var phoneNo = $("#txtPhoneNo").val();
    var typeofEnq = $("#ddEnquiry").val();
    var details = $("#txtDetails").val();

    var data = { "studentId": studId, "name": name, "emailId": email, "phoneNo": phoneNo, "enquiryType": typeofEnq, "details": details };

    $.ajax({

        url: '/Students/UpdateStudent',
        method: 'post',
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function (resp) {
            alert(resp);
            clearData();
            getStudetnData();

        }
    })

}

function deleteStudent(id) {

    debugger;
    $.ajax({
        url: '/Students/DeleteStudent/' + id,
        method: 'get',
        contentType: 'application/json',
        success: function (resp) {

            alert(resp);
            getStudetnData();

        }
    })
}

function clearData() {
    $("#btnUpdate").hide();
    $("#btnSubmit").show();

    $("#txtName").val("");
    $("#txtEamil").val("");
    $("#txtPhoneNo").val("");
    $("#ddEnquiry").val("");
    $("#txtDetails").val("");
}
   