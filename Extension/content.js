// running the main function during the loading of the page


var loginData;
var popup;
var issueData;
$(document).ready(function () {

	recursive();
	var css = document.createElement("style");
	css.innerText = `/* The Modal (background) */
	    .modal {
	      display: none; /* Hidden by default */
	      position: fixed; /* Stay in place */
	      z-index: 10; /* Sit on top */
	      padding-top: 200px; /* Location of the box */
	      left: 0;
	      top: 0;
	      width: 100%; /* Full width */
	      height: 100%; /* Full height */
	      overflow: auto; /* Enable scroll if needed */
	      background-color: rgb(0,0,0); /* Fallback color */
	      background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
	    }

	    /* Modal Content */
	    .modal-content {
	      background-color: #fefefe;
	      margin: auto;
	      padding: 20px;
	      border: 1px solid #888;
	      width: 50%;
	      height: 50%;
	      text-align: center;
	    }

	    /* The Close Button */
	    .close {
	      color: #aaaaaa;
	      float: right;
	      font-size: 28px;
	      font-weight: bold;
	    }

	    .close:hover,
	    .close:focus {
	      color: #000;
	      text-decoration: none;
	      cursor: pointer;
	    }
	    .bounty{
	        color: blue;
	    }
	    .bounty:hover{
	        color: red;
	        cursor: pointer;
	    }
	    `;
	document.body.appendChild(css);
	popupHTML = `<div id="myModal" class="modal">
	    <div class="modal-content">
	        <span class="close">&times;</span>
	        <h1> GitLance</h1><br>
	        <label id="issueNo"></label><br>
	        <input type="number" id="bountyValue"><br>
	        <button class="submit" id="bountySubmit">Submit</button>
	    </div>
	    </div>`
	popup = $.parseHTML(popupHTML)[0]
	document.body.appendChild(popup);
	var closeButton = document.getElementsByClassName("close")[0]
	closeButton.onclick = function () {
		popup.style.display = "none";
	}
	window.onclick = function (event) {
		if (event.target == popup) {
			popup.style.display = "none";
		}
	}
})

function changed() {
	try {
		var bountyAdded = document.getElementById("bountyAdded");
		// console.log(bountyAdded);
		if (bountyAdded) {
			return;
		}
		if (loginData) {
			var url = window.location.href;
			var urlReg = /https:\/\/github.com\/(.*?)\/issues/g;
			var regexOperation = !!urlReg.exec(url);
			if (regexOperation) {
				var header = document.getElementById("js-issues-toolbar");
				var hiddenInput = $.parseHTML(`<input type="text" hidden id="bountyAdded">`)[0];
				header.appendChild(hiddenInput);
				chrome.runtime.sendMessage(loginData["user"], function (response) {
					console.log(response);
					issueData = response;
					main(issueData);
				});
			}



		}

	}
	catch (err) {
		console.log(err);
		return;
	}
}
function recursive() {
	setTimeout(function () {
		if (loginData == null) {
			loginData = JSON.parse(localStorage.getItem("gitLanceUser"));
		}
		// console.log(loginData);
		changed();
		recursive();
	}, 1500)
}
// // to detect changes on the github page because it doesn't reload the entire page
// window.addEventListener("hashchange", function () {
//     console.log("hash changed");
//     main();
// }, false);

function main(issueData) {


	console.log("main ran");
	// var bountyStringHeading = `<details class="details-reset details-overlay select-menu d-inline-block">
	// <summary class="btn-link" aria-haspopup="menu">
	// Bounty
	// <span></span>
	// </summary>
	// </details>`;
	var header = document.getElementById("js-issues-toolbar");
	// var target = header.getElementsByClassName("table-list-filters")[0].firstElementChild.children[1];
	// // var container = document.getElementsByClassName('Box')[2].children[1].children[0];
	// var bountyHeadingNode = $.parseHTML(bountyStringHeading)[0];
	// target.insertBefore(bountyHeadingNode, target.children[target.children.length - 1]);
	// var hiddenInput = $.parseHTML(`<input type="text" hidden id="bountyAdded">`)[0];
	// header.appendChild(hiddenInput);
	var issues = header.parentElement.children[1].children[0].children;

	// console.log(issues);
	// to be retrieved from data base
	var bounties = [];
	for (let i = 0; i < issues.length; i++)bounties[i] = i * 100;

	for (let i = 0; i < issues.length; i++) {

		var targetIssue = issues[i].firstElementChild.children;
		var issueId = issues[i].id;

		if (issueData[issueId]) {
			if (issueData[issueId]["active"]) {
				var bountyString = `<div class="col-4 text-small text-bold">${issueData[issueId]["bountyValue"]} by ${issueData[issueId]["creatorName"]}</div>`;
			}
			else {
				var bountyString = `<div class="col-4 text-small text-bold">Bounty Completed</div>`;
			}

		}
		else {
			var bountyString = `<div class="col-4 text-small text-bold bounty">Add bounty</div>`;
		}

		var bountyNode = $.parseHTML(bountyString)[0];
		if (targetIssue.length > 3) {
			targetIssue = targetIssue[2];
		}
		else {
			targetIssue = targetIssue[1];
		}
		var subCols = targetIssue.children;
		for (let j = 0; j < subCols.length; j++) {
			$(subCols[j]).removeClass("col-6");
			$(subCols[j]).addClass("col-4");
		}
		targetIssue.appendChild(bountyNode);
	}
	$(".bounty").click(function (event) {
		var myDiv = event["currentTarget"];
		// var popUp = myDiv.children[1];
		var mainIssueDiv = myDiv.parentElement.parentElement.parentElement;
		var issueName = (mainIssueDiv.firstElementChild.children[1].firstElementChild.innerText);
		document.getElementById("issueNo").innerText = mainIssueDiv.id;
		popup.style.display = "block";
		$("#bountySubmit").click(function () {
			var bountyValue = document.getElementById("bountyValue").value;
			var issueId = mainIssueDiv.id;
			var userId = loginData["user"]["uid"];
			var userName = loginData["user"]["displayName"];
			var apiKey = loginData["user"]["apiKey"];
			var timeCreated = (new Date()).getTime();
			issueData[issueId] = {
				bountyName: issueName,
				createdTime: timeCreated,
				bountyValue: bountyValue,
				creator: userId,
				creatorName: userName,
				active: true
			}
			var messageData = {
				issueData: issueData,
				apiKey: apiKey
			}
			chrome.runtime.sendMessage(messageData, function (response) {
				console.log(response);
			});
			popup.style.display = "none";
			$(myDiv).removeClass("bounty");
			document.getElementById("bountyValue").value = "";
			myDiv.innerHTML = bountyValue + " by " + userName;
		});

	})

}
