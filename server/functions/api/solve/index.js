var express = require("express");
var router = express.Router();
var admin = require("firebase-admin");
// var functions = require("firebase-functions");
// admin.initializeApp(functions.config().firebase);

var db = admin.firestore();
module.exports = () => {
  router.post("/bounty", async (req, res) => {
    var userId = req.body.userId;
    // bounty data collection manipulation
    var collection = await db.collection("bountyData").get();
    var output = { records: [] };
    collection.forEach(doc => {
      var currDocData = doc.data();
      for (currRepo in currDocData) {
        for (var issue in currDocData[currRepo]) {
          if(currDocData[currRepo][issue].creator!==userId){
            currDocData[currRepo][issue]["Repo"] = currRepo;
            currDocData[currRepo][issue]["issue"] = issue;
            currDocData[currRepo][issue]["gitRepoCreator"] = doc.id;
            output.records.push(currDocData[currRepo][issue]);
          }
        }
      }
    });
    return res.json(output);
  });

  router.post("/submission/issue", async (req, res) => {
    // bounty data collection manipulation
    var submissionBody = req.body;
    console.log("request body", submissionBody);
    var currSubmission = {
      answer: submissionBody.answer,
      solverUserName: submissionBody.solverUserName,
      accepted: false,
      submissionTime: new Date().getTime()
    };
    var bountyDocument = await db
      .collection("bountyData")
      .doc(submissionBody.gitUserName)
      .get();
    if (!bountyDocument.exists) {
      res.status(400);
      return res.send("error, no bounties made by this user");
    }
    var currGitUserData = bountyDocument.data();
    if (!currGitUserData[submissionBody.gitRepository]) {
      res.status(400);
      return res.send("error, no bounties exist on this repository");
    }
    var currIssueData =
      currGitUserData[submissionBody.gitRepository][submissionBody.issueId];
    if (!currIssueData) {
      res.status(400);
      return res.send("error, no bounty has beem set for this issue");
    }
    if (!currIssueData.active) {
      res.status(400);
      return res.send("error, this issue's bounty has already been claimed");
    }
    if (!currIssueData.submissions) {
      currIssueData.submissions = {};
    }
    currIssueData.submissions[submissionBody.solverId] = currSubmission;
    currGitUserData[submissionBody.gitRepository][
      submissionBody.issueId
    ] = currIssueData;
    db.collection("bountyData")
      .doc(submissionBody.gitUserName)
      .set(currGitUserData);

    // submission collection data manipulation
    var submissionDocument = await db
      .collection("submissionData")
      .doc(submissionBody.solverId)
      .get();
    if (submissionDocument.exists) {
      fieldData = submissionDocument.data();
    } else {
      fieldData = {
        issues: {},
        problems: {}
      };
    }
    if (!fieldData.issues[submissionBody.gitUserName]) {
      fieldData.issues[submissionBody.gitUserName] = {};
    }
    if (
      !fieldData.issues[submissionBody.gitUserName][
        submissionBody.gitRepository
      ]
    ) {
      fieldData.issues[submissionBody.gitUserName][
        submissionBody.gitRepository
      ] = [];
    }
    if (
      !fieldData.issues[submissionBody.gitUserName][
        submissionBody.gitRepository
      ].includes(submissionBody.issueId)
    ) {
      fieldData.issues[submissionBody.gitUserName][
        submissionBody.gitRepository
      ].push(submissionBody.issueId);
    }
    db.collection("submissionData")
      .doc(submissionBody.solverId)
      .set(fieldData);
    return res.send("success");
  });

  router.post("/submission/problem", async (req, res) => {
    var submissionBody = req.body;
    var currSubmission = {
      codeUrl: submissionBody.codeUrl,
      solverUserName: submissionBody.solverUserName,
      accepted: false,
      submissionTime: new Date().getTime(),
      scores: submissionBody.scores
    };
    console.log("currSubmission", currSubmission);
    var jobDocument = await db.collection("jobData").doc(submissionBody.creatorId).get();
    if (!jobDocument.exists) {
      res.status(400);
      return res.send("no jobs uploaded by this user");
    }
    var currCreatorData = jobDocument.data();
    if (!currCreatorData[submissionBody.jobId]) {
      res.status(400);
      return res.send("no job with this id found");
    }
    if (!currCreatorData[submissionBody.jobId].active) {
      res.status(400);
      return res.send("this job has already been completed");
    }

    var currSubmissions = currCreatorData[submissionBody.jobId].submissions;

    var initialBestSubmissionId =currCreatorData[submissionBody.jobId].bestSubmissionId;
    currSubmissions[submissionBody.solverId] = currSubmission;
    if (initialBestSubmissionId === "") {
      initialBestSubmissionId = submissionBody.solverId;
    } else {
      if (
        currSubmissions[initialBestSubmissionId].scores.total <
        currSubmission.scores.total
      ) {
        initialBestSubmissionId = submissionBody.solverId;
      }
    }
    currCreatorData[submissionBody.jobId].submissions = currSubmissions;
    currCreatorData[submissionBody.jobId].bestSubmissionId = initialBestSubmissionId;
    db.collection("jobData").doc(submissionBody.creatorId).set(currCreatorData);

    var submissionDocument = await db.collection("submissionData").doc(submissionBody.solverId).get();
    if (submissionDocument.exists) {
      fieldData = submissionDocument.data();
    } else {
      fieldData = {
        issues: {},
        problems: {}
      };
    }
    if (!fieldData.problems[submissionBody.creatorId]) {
      fieldData.problems[submissionBody.creatorId] = [];
    }
    if (!fieldData.problems[submissionBody.creatorId].includes(submissionBody.jobId)) {
      fieldData.problems[submissionBody.creatorId].push(submissionBody.jobId);
    }
    db.collection("submissionData").doc(submissionBody.solverId).set(fieldData);
    return res.send("success");
  });

  router.post("/problems", async (req, res) => {
    var userId = req.body.userId;
    var output = { records: [] };
    var collection = await db.collection("jobData").get();
    collection.forEach(doc => {
      var currDocData = doc.data();
      var creatorId = doc.id;
      if(creatorId!==userId){
        for (var job in currDocData) {
          var currJob = currDocData[job];
          currJob["jobId"] = job;
          currJob["creatorId"] = creatorId;
          output.records.push(currJob);
        }
      }
    });
    return res.send(output);
  });

  router.post("/selfIssueSubmission",async(req,res)=>{
    var userId = req.body.userId;
    var output = {records:[]};
    // var submissionCollection = await db.collection("submissionData").doc(userId).get();
    // if(!submissionCollection.exists){
    //   return res.send(output);
    // }
    // var issues = submissionCollection.issues;
    var issueCollection = await db.collection("bountyData").get();
    issueCollection.forEach(function(doc){
      // console.log("document id",doc.id);
      var gitRepoCreator = doc.id;
      // console.log("document data",doc.data());
      var creatorData = doc.data();
      for(var currRepo in creatorData){
        for(var currIssue in creatorData[currRepo]){
          if(creatorData[currRepo][currIssue].submissions){
            console.log("submissions data",creatorData[currRepo][currIssue].submissions);
            if(creatorData[currRepo][currIssue].submissions[userId]){
              output.records.push(creatorData[currRepo][currIssue].submissions[userId])
              var length = output.records.length;
              output.records[length-1]['gitRepo'] = currRepo;
              output.records[length-1]['gitRepoCreator'] = gitRepoCreator;
              output.records[length-1]['issueId'] = currIssue;
              output.records[length-1]['bountyName'] = creatorData[currRepo][currIssue]['bountyName'];
              output.records[length-1]['bountyValue'] = creatorData[currRepo][currIssue]['bountyValue'];
            }
          }
        }
      }
    })
    // console.log(issueCollection);
    return res.send(output);
  });
  router.post('/selfProblemSubmission',async(req,res)=>{
    var userId = req.body.userId;
    var output = {records:[]};
    var jobCollection = await db.collection('jobData').get();
    jobCollection.forEach(function(doc){
      var jobCreator = doc.id;
      var creatorData = doc.data();
      for(var job in creatorData){
        if(creatorData[job].submissions[userId]){
          // console.log("shit being logegd",creatorData[job].submissions)
          output.records.push(creatorData[job].submissions[userId]);
          var length = output.records.length;
          output.records[length-1]['jobCreator'] = jobCreator;
          output.records[length-1]['jobId'] = job;
          output.records[length-1]['pay'] = creatorData[job].pay;
          output.records[length-1]['creatorName'] = creatorData[job].creatorName;
          output.records[length-1]['problemHeading'] = creatorData[job].problemHeading;
          output.records[length-1]['problemDescription'] = creatorData[job].problemDescription;
        }
      }
    })
    return res.send(output);  
  })

  return router;
};
