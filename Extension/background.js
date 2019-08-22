var firebaseInit = false;
var gitUser,repo,apiKey,db;
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
		var url = sender["url"].split("/");
		gitUser = url[3];
		repo = url[4];
		if (!firebaseInit)
		{

			apiKey = request["apiKey"];
			var firebaseConfig = {
				apiKey:apiKey,
				authDomain: "git-lance.firebaseapp.com",
				projectId: "git-lance"
			}
			firebase.initializeApp(firebaseConfig);
			db = firebase.firestore();
			firebaseInit = true;
		}

		if (request["createdAt"])
		{
			db.collection("bountyData").doc(gitUser).get().then(function(issueData){
				// console.log(issueData.data()[repo]);
				if (issueData.exists)
				{
					if (issueData.data()[repo])
					{
						sendResponse(issueData.data()[repo]);
					}
					else
					{
						sendResponse({});
					}
				}
				else
				{
					sendResponse({});
				}

			});
			return !!"Vishal Birthday";
		}
		else
		{
			db.collection('bountyData').doc(gitUser).get().then(
				function(a){
					if (a.exists)
					{
						var myData = a.data();
						myData[repo]=request["issueData"];
						db.collection("bountyData").doc(gitUser).set(myData);
					}
					else
					{
						var myData = {[repo]:request["issueData"]};
						db.collection("bountyData").doc(gitUser).set(myData);
					}

				}
			)

			sendResponse({"Success":"failure"});
		}

		// setTimeout(sendResponse({"Test":2123}),3000);
  });
