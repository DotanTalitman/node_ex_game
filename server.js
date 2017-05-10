var express = require("express");
var app = express();
var fs = require("fs");
var path = require("path");
var root = process.cwd();
var filesLib = path.join(root, "files");

//app.set('views', './vash-views');
//app.set('views', './pug-views');
//app.set('view engine', 'vash');
///app.set("view engine","pug");

app.get("/",function(req,res){
                res.send("d")
})

// app.get("/",function(req,res){
        
//         var data={
//                 title:"hello from pug page",
//                 msg:"hi"
//         }
//         res.render("index2",data);
// });


// app.get("/", function (req, res) {
//       
//         res.render("index", {
//                 title: "hello from jade",
//         });
// })

app.get("/shoot/:player/:num", function (req, res) {
        var num = req.params.num;
        var player = req.params.player;
        if(player !="a" || player!="b" ) res.send("invalid player")
        var file = player + ".text";
        var opponentPath = path.join(filesLib, file);
        if (!fs.existsSync(opponentPath)) {
                fs.writeFileSync(opponentPath, 100);
        }
        var fileContent = fs.readFileSync(opponentPath);
        if (fileContent) {
                var content = fileContent.toString();
                content = content - num;
                fs.writeFileSync(opponentPath, content);
        }

        res.send("ok");

})
app.listen(3000)