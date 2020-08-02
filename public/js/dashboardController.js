$(function() {
  let userID = $("span").attr("id");
  getUserProjects(userID);
  createProject(userID);
});

function getUserProjects(userID) {
  let url = "https://cuntato.herokuapp.com/api/get-project-list?userID=";
    url += userID;
  $.get(url, function() {})
    .done((res) => {
      let str = "";
      res = res.data
      if (res !== undefined) {
        for (let i = res.length - 1; i >= 0; i--) {
          let path = "/project?projectName=" + res[i]._projectname;
            path += "&projectToken=" + res[i]._projecttoken ;
          str += " <div class='col s12 m6 l4'>"
          str += "<div class='card rounded project-card'>"
          str += "<div class='card-content'> <h5 class='truncate'>"
          str += "<a id='"+ res[i]._projecttoken +"' href='"+ path +"' "
          str += "class='project-link'>"+ res[i]._projectname +"</a>"
          str += "</h5> <span id='project-credential'>"+ res[i]._projecttoken +"</span>"
          str += " <i class='material-icons right copy-btn'>content_copy</i>"
          str += "</div></div></div>"
        }
        $("#projectList").html(str);
      }
    })
    .fail(() => {
      showToast("Problem Load projects!!!", "red darken-3");
    })  
}

function createProject(userID) {
  $("#createID").click(function() {
    let projectName = $("#projectName").val();
    let domainURL = $("#domainURL").val();
    let url = "https://cuntato.herokuapp.com/api/get-project-token";
    $.post(url, 
        { userID: userID , projectName: projectName, domainURL: domainURL }, 
        function() {})
      .done((res) => {
        if (res.status === "ok") {
          showToast("Project create success...", "green darken-3");
          getUserProjects(userID);
        } else if (res.message === "Provide a valid project name") {
          showToast("Please, provide a valid project name", "cyan darken-3");
        }else if (res.message === "Provide a valid domain URL") {
          showToast("Please, provide a valid domain URL", "cyan darken-3");
        }else if (res.message === "update your plan") {
          showToast("Update your plan", "cyan darken-3");
        } else if(res.message === "Already use this name") {
          showToast("Already use this name", "red darken-3");
        }
      })
      .fail(() => {
        showToast("Somthing want wrong!!!", "red darken-3");
      })
    $("#projectName").val("");
    $("#domainURL").val("");
    $('.modal').modal('close');
  });
}

/*** Show Toast ***/
function showToast(data, style) {
  M.toast({
      html : data,
      classes : style
  });
}