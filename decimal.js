var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

let pdfKIT = require("pdfkit");
let doc = new pdfKIT();
let fs = require("fs");

let numb=0;
let store=[];


// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname+"/public"));

let template = {

    createTitle : function(doc,title){
        doc.fontSize(20).text(title,{
            align:"center",
            underline:true,
            height:300,
          });
    },

    addNameDate : function(doc){
        doc.fontSize(14).moveDown();
      doc.fontSize(14).text("Name:______________                                       Date:_______________");
      doc.moveDown().moveDown();
      doc.fontSize(12);
    },

    addBorder : function(doc){
        doc.rect(10,10,590,770).stroke();
    },

    addLogo : function(doc){
        doc.fontSize(6);
        doc.fillColor("grey");
        doc.text("Copyright SL",500,700,{
            lineBreak:false
    });
    }

};

app.get("/decimal", function(req, res) {
    //doc.pipe(fs.createWriteStream('output.pdf'))
    doc.pipe(res);
    decimalWorksheet();
  });

function decimalWorksheet(){
    //adding content
    //TO DO: Add to MTFTW website somehow...
    //template
    
    template.createTitle(doc,"Ordering Decimals Worksheet");
    
    template.addNameDate(doc);
    //Template end
    doc.fontSize(12);
    doc.text("Order from Greatest to Least");
    for(let i=0;i<10;i++){
      appendQuestion();
    }
    //add a logo
    template.addLogo(doc);
    //add a border
    template.addBorder(doc);
    
    createAnswerKey();
    template.addLogo(doc);
    
    //add a border
    template.addBorder(doc);
    
    function appendQuestion(){
      let arr=createQuestion();
      (store).push(arr);
      doc.fillColor("black");
      doc.text(arr[0],{
      });
      doc.fillColor("white")
      doc.text(arr[1],{
      })
      doc.moveDown();
    }
    
    function createQuestion(){
    let arr=[];
    for(i=0;i<5;i++){
      arr.push((Math.random()).toFixed(2));
    }
    numb++;
    return  ["\n"+numb+") "+arr.join(" ,"),createAnswer(arr)+"\n"];
    
    }
    
    function createAnswer(arr){
      let t=[];
      for(items of arr){
        t.push(items);
      }
      t.sort((a,b)=>{return b-a});
      return "Answer: "+t.join(" ,");
    }
    
    function createAnswerKey(){
      doc.fillColor("black");
      doc.addPage();
      doc.fontSize(20).text("Answer Key",{
        align:"center",
        underline:true,
      });
      doc.fontSize(12);
      for(items of store){
        doc.fillColor("black");
        doc.text(items[0]);
        doc.moveDown();
        doc.fillColor("red");
        doc.text(items[1]);
      };
    
    };
   
    // finalize the PDF and end the stream
    doc.end();
  };

  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });