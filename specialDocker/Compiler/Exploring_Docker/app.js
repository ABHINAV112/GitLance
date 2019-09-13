var child = require('child_process');
const express = require('express');
const bodyParser = require('body-parser');
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

    data = fs.createReadStream(__dirname +"/"+req.file.path);
    data.pipe(unzipper.Extract({path:__dirname +"/data/"}).on('close',function(){
        k = child.execSync("python3 data/"+req.file.originalname.slice(0,req.file.originalname.length-4)+'/'+req.body.entrypoint,{input:req.body.input_text}).toString();
        res.send(k);
    }));   
})
app.listen(port,() => console.log(`Example app listening on port ${port}!`))

// output = fs.readFileSync("output.txt",'utf8');
// console.log(output.toString());