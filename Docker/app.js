var child = require('child_process');
const express = require('express');
const app = express();
const fs = require('fs');
var multer  = require('multer')
// console.log(process.cwd());
var upload = multer({ dest: 'uploads/' })
const port = 80;
const unzipper = require('unzipper');
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.raw({
//     type:'application/octet-stream'
// }));

app.get('/',(req,res)=>{res.sendFile(__dirname+"/index.html")});
app.post('/compile',upload.single('myCode'),function(req,res){
    // console.log(req.file);
    // console.log(req.body);
    var stdin = req.body.input_text;
    var folderName = req.file.originalname;
    var entrypoint = req.body.entrypoint;
    var data = fs.createReadStream(__dirname +"/"+req.file.path);
    data.pipe(unzipper.Extract({path:__dirname +"/data/"}).on('close',function(){
        var stdout;
        var startTime;
        var endTime;
        var workdir = '.';
        switch(req.body.language)
        {
            case 'python':
                startTime = new Date();
                stdout = child.execSync("valgrind --tool=massif python3 data/"+folderName.slice(0,folderName.length-4)+'/'+entrypoint,{input:stdin}).toString();
                endTime = new Date();
                break
            case 'C':
                child.execSync("gcc -o Ccode data/"+folderName.slice(0,folderName.length-4)+'/'+entrypoint);
                startTime = new Date();
                stdout = child.execSync("valgrind --tool=massif ./Ccode",{input:stdin}).toString();
                endTime = new Date();
                break;
            case 'C++':
                child.execSync("g++ -o Ccode data/"+folderName.slice(0,folderName.length-4)+'/'+entrypoint);
                startTime = new Date();
                stdout = child.execSync("valgrind --tool=massif ./Ccode",{input:stdin}).toString();
                endTime = new Date();
                break
            case 'java':
                child.execSync("javac "+entrypoint,{cwd:"data/"+folderName.slice(0,folderName.length-4)+'/'});
                startTime = new Date();
                stdout = child.execSync("valgrind --tool=massif java "+entrypoint.slice(0,entrypoint.length-5),{cwd:"data/"+folderName.slice(0,folderName.length-4)+'/',input:stdin}).toString();
                endTime = new Date();
                workdir = "data/"+folderName.slice(0,folderName.length-4)+'/';
                break;
        }
        var MemData = child.execSync("find . -name 'massif.out.*'",{cwd:workdir}).toString();
        var sortedData = child.execSync("ms_print "+MemData,{cwd:workdir}).toString();
        var unit = sortedData.split("\n")[7].trim();
        var value = sortedData.split("\n")[8];
        value = value.slice(0,value.indexOf("^"));
        var memory = value+" "+unit;
        child.execSync("rm "+MemData,{cwd:workdir});
        child.execSync("rm -r data");
        child.execSync("rm "+__dirname +"/"+req.file.path);
        var result = {
            stdout:stdout,
            timeTaken:endTime-startTime,
            memory:memory
        };
        res.send(result);
        
        
        
    }));
    
    
})
app.listen(port,() => console.log(`Example app listening on port ${port}!`))
