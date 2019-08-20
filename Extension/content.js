// running the main function during the loading of the page
var loginData;

$(document).ready(function(){

    recursive();

})

function changed(){
		try{
				var header = document.getElementById("js-issues-toolbar");
				var target = header.firstElementChild.firstElementChild.children[1];
				for (var i = 0; i<target.children.length;i++)
				{
						var currNode = target.children[i];
						if (currNode.innerText.trim()=="Bounty")
						{
								return;
						}
				}
				if (loginData)
				{
					main();
				}

		}
		catch(err){
				return;
		}
}
function recursive(){
		setTimeout(function(){
				loginData = localStorage.getItem("gitLanceUser");
				changed();
				recursive();
		},1500)
}
// // to detect changes on the github page because it doesn't reload the entire page
// window.addEventListener("hashchange", function () {
//     console.log("hash changed");
//     main();
// }, false);

function main() {
    var url = window.location.href;
    var urlReg = /https:\/\/github.com\/(.*?)\/issues/g;
    var regexOperation = !!urlReg.exec(url);

    if (regexOperation) {
        console.log("here lol");
        var bountyStringHeading = `<details class="details-reset details-overlay select-menu d-inline-block">
        <summary class="btn-link" aria-haspopup="menu">
        Bounty
        <span></span>
        </summary>
        </details>`;
        var header = document.getElementById("js-issues-toolbar");
        var target = header.firstElementChild.firstElementChild.children[1];
        // var container = document.getElementsByClassName('Box')[2].children[1].children[0];
        var bountyHeadingNode = $.parseHTML(bountyStringHeading)[0];
        target.insertBefore(bountyHeadingNode, target.children[target.children.length - 1]);

        var issues = header.parentElement.children[1].children[0].children;

        console.log(issues);
        // to be retrieved from data base
        var bounties = [];
        for (let i = 0; i < issues.length; i++)bounties[i] = i * 100;

        for (let i = 0; i < issues.length; i++) {
            var bountyString = `<div class="float-right col-4 no-wrap pt-2 pr-3 text-right"><span class="text-small text-bold">${bounties[i]}</span></div>`;
            var bountyNode = $.parseHTML(bountyString)[0];
            var targetIssue = issues[i].firstElementChild.children[2];
            var subCols = targetIssue.children;
            for (let j = 0; j < subCols.length; j++) {
                $(subCols[j]).removeClass("col-6");
                $(subCols[j]).addClass("col-4");
            }
            targetIssue.appendChild(bountyNode);
        }
    }
}
