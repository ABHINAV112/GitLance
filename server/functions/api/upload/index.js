var express = require("express");
var router = express.Router();
var admin = require("firebase-admin");
var functions = require("firebase-functions");
admin.initializeApp(functions.config().firebase);
var cors = require('cors')({origin: true});


var db = admin.firestore();

module.exports = () => {
  router.use(cors);
  router.post("/uploadJob", async (req, res) => {
    var jobRequestData = req.body;
    // console.log(jobRequestData);
    // API validation
    var bodyKeys = [
      "creatorId",
      "creatorName",
      "problemHeading",
      "problemDescription",
      "pay"
    ];
    var run = true;
    for (var i = 0; i < bodyKeys.length; i++) {
      if (!jobRequestData[bodyKeys[i]]) {
        run = false;
      }
    }
    // saving to data base
    if (!run) {
      res.status(400);
      return res.send("Error, invalid json body");
    }
    var timeCreated = new Date().getTime();
    var documentData = await db
      .collection("jobData")
      .doc(jobRequestData.creatorId)
      .get();
    var newJobData = {
      active: true,
      bestSubmissionId: "",
      createdTime: timeCreated,
      creatorName: jobRequestData.creatorName,
      problemHeading: jobRequestData.problemHeading,
      problemDescription: jobRequestData.problemDescription,
      pay: jobRequestData.pay,
      submissions: {},
      timeLimit : jobRequestData.timeLimit,
      memoryLimit: jobRequestData.memoryLimit,
      inputString:jobRequestData.inputString,
      outputString:jobRequestData.outputString
    };
    var currFields;
    var jobLength = 0;
    if (documentData.exists) {
      currFields = documentData.data();
      // console.log("data already exists",currFields);
      jobLength = Object.keys(currFields).length;
      currFields["job_" + String(jobLength + 1)] = newJobData;
    } else {
      // console.log("data doesn't already exist");
      currFields = { job_1: newJobData };
    }
    // console.log("data which is going to be stored",currFields);
    db.collection("jobData")
      .doc(jobRequestData.creatorId)
      .set(currFields);
    return res.send({ jobId: "job_" + String(jobLength + 1) });
  });

  router.post("/jobSubmission", async (req, res) => {
    var submissionQuery = req.body;
    // console.log("jobsubmission", req.body);
    var documentData = await db
      .collection("jobData")
      .doc(submissionQuery.userId)
      .get();
    if (!documentData.exists) {
      res.status(400);
      return res.send("job doesn't exist");
    }
    var jobData = documentData.data()[submissionQuery.jobId];
    // console.log("jobdata", jobData);
    var output = { submissions: jobData.submissions };
    return res.send(output);
  });

  router.post("/issueSubmission",async(req,res)=>{
    var submissionQuery = req.body;
    console.log(submissionQuery);
    var documentData = await db.collection('bountyData').doc(submissionQuery.gitUserName).get();
    if(!documentData.exists){
      res.status(400);
      return res.send("bounties haven't been uploaded on this repo");
    }
    var gitUserData = documentData.data();
    var output = gitUserData[submissionQuery.gitRepo][submissionQuery.issueId];
    if(output.submissions){
      output = output.submissions;
    }else{
      output = {submissions:{}};
    }
    return res.send(output);
  })

  router.post("/resolve/issue", async(req, res) => {
    var gitRepoCreator = req.body.gitRepoCreator;
    var gitRepo = req.body.gitRepo;
    var issueId = req.body.issueId;
    var gitRepoCreatorRef = await db.collection('bountyData').doc(gitRepoCreator).get()
    var gitRepoCreatorData = gitRepoCreatorRef.data();
    gitRepoCreatorData[gitRepo][issueId].active = false;  
    db.collection('bountyData').doc(gitRepoCreator).set(gitRepoCreatorData);
    return res.send("not implemented")
  });
  router.post("/resolve/problem", async(req, res) => {
    var creatorId = req.body.creatorId;
    var jobId = req.body.jobId;
    var creatorRef = await db.collection('jobData').doc(creatorId).get();
    var creatorData = creatorRef.data();
    creatorData[jobId].active = false;
    db.collection('jobData').doc(creatorId).set(creatorData);
    return res.send("not implemented")
  });

  router.post("/uploadedIssues",async(req,res)=>{
    var userId = req.body.userId;
    // let db = admin.firestore();
    var collection = await db.collection("bountyData").get();
    var output = { records: [] };
    collection.forEach(doc => {
      var currDocData = doc.data();
      for (currRepo in currDocData) {
        for (var issue in currDocData[currRepo]) {

          if(currDocData[currRepo][issue].creator===userId){
            currDocData[currRepo][issue]["Repo"] = currRepo;
            currDocData[currRepo][issue]["issue"] = issue;
            currDocData[currRepo][issue]["creator"] = undefined;
            currDocData[currRepo][issue]["gitRepoCreator"] = doc.id;
            output.records.push(currDocData[currRepo][issue]);
          }
        }
      }
    });
    return res.json(output);
  });

  router.post("/uploadedProblems", async (req, res) => {
    var userId = req.body.userId;
    var output = { records: [] };
    var collection = await db.collection("jobData").get();
    collection.forEach(doc => {
      var currDocData = doc.data();
      var creatorId = doc.id;
      if(creatorId===userId){
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

  return router;
};
