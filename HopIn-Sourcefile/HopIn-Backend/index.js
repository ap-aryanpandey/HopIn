let express = require("express");
let http = require("http");
let mongoose = require("mongoose");
let ObjectID = require("mongodb").ObjectID;


let app = express();

let server = http.createServer(app);

let url = "mongodb+srv://hop:hello12345@cluster0-tuagx.mongodb.net/nec";


app.use(express.static('public'));
app.use(require("body-parser").json())

server.listen(process.env.PORT || 2000, () => {
  console.log("connected to server");
})




//Monogo connect 

let mongoDB = process.env.MONGODB_URI || url;
mongoose.connect(mongoDB, { useNewUrlParser: true, poolSize: 10, reconnectTries: Number.MAX_VALUE, reconnectInterval: 1000 });

mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

///////////////

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});



/// Enpoints




app.get("/", (req, res) => {

  //     res.json(1);

  db.collection("user").find({}).toArray(
    function (err, resp) {
      if (err) throw err;

      res.json(resp)

    })

})

// app.post("/send",(req,res)=>{



// })

app.post("/send", (req, res) => {

  // let user = req.body;
  let user = req.body;
  console.log(req.body);

  // mongoose.connect(url ,{useNewUrlParser:true} , (err,db)=>{
  //     if (err) throw err;

  db.collection("user").insertOne(user, (err, resp) => {
    if (err) throw err;
    console.log("1 document inserted");
    console.log(resp.ops);
    res.json(resp.ops[0]);
    //  db.close();
  });

})


// })


app.get("/view", (req, res) => {

  // mongoose.connect(url ,{useNewUrlParser:true} , (err,db)=>{
  //     if (err) throw err;
  db.collection("user").find({}).toArray((err, resp) => {
    if (err) throw err;

    // db.close()

    res.json(resp)
    // db.close();
  })

})

// })







// })

app.get("/view/:id", (req, res) => {

  var user = req.params.id;

  let myquery = { _id: ObjectID(`${user}`) };

  console.log(myquery);  ////

  // mongoose.connect(url ,{useNewUrlParser:true} , (err,db)=>{
  db.collection("user").find({ _id: ObjectID(`${user}`) }).toArray(function (err, result) {
    if (err) throw err;

    console.log(result)
    res.json(result);
    // db.close();
  });

  // })

})

app.get("/delete/:id", (req, res) => {

  var user = req.params.id;

  let myquery = { _id: ObjectID(`${user}`) };

  console.log(myquery);  ////

  // mongoose.connect(url ,{useNewUrlParser:true} , (err,db)=>{
  db.collection("user").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    res.json(1);
    // db.close();
  });
});

// })

app.post("/update", (req, res) => {   //update user


  let user = req.body;
  var id = req.body.id;


  let obj = new Object();

  obj = user;

  var newvalues = { $set: obj };



  let myquery = { _id: ObjectID(`${id}`) };

  db.collection("user").updateOne(myquery, newvalues, function (err, resp) {
    if (err) throw err;
    console.log(resp.result);

  });



  res.json(1);
})







// User Endpoint




app.post("/user/send", (req, res) => {

    // let user = req.body;
    let user = req.body;
    console.log(req.body);
  
    // mongoose.connect(url ,{useNewUrlParser:true} , (err,db)=>{
    //     if (err) throw err;
  
    db.collection("user").insertOne(user, (err, resp) => {
      if (err) throw err;
      console.log("1 document inserted");
      console.log(resp.ops);
      res.json(resp.ops[0]);
      //  db.close();
    });
  
  })
  
  
  // })
  
  
  app.get("/user/view", (req, res) => {
  
    // mongoose.connect(url ,{useNewUrlParser:true} , (err,db)=>{
    //     if (err) throw err;
    db.collection("user").find({}).toArray((err, resp) => {
      if (err) throw err;
  
      // db.close()
  
      res.json(resp)
      // db.close();
    })
  
  })
  
  // })
  
  
  // })
  
  app.get("/user/view/:id", (req, res) => {
  
    var user = req.params.id;
  
    let myquery = { _id: ObjectID(`${user}`) };
  
    console.log(myquery);  ////
  
    // mongoose.connect(url ,{useNewUrlParser:true} , (err,db)=>{
    db.collection("user").find({ _id: ObjectID(`${user}`) }).toArray(function (err, result) {
      if (err) throw err;
  
      console.log(result)
      res.json(result);
      // db.close();
    });
  
    // })
  
  })
  
  app.get("/user/delete/:id", (req, res) => {
  
    var user = req.params.id;
  
    let myquery = { _id: ObjectID(`${user}`) };
  
    console.log(myquery);  ////
  
    // mongoose.connect(url ,{useNewUrlParser:true} , (err,db)=>{
    db.collection("user").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      res.json(1);
      // db.close();
    });
  });
  
  // })
  
  app.post("/user/update", (req, res) => {   //update user
  
  
    let user = req.body;
    var id = req.body.id;
  
  
    let obj = new Object();
  
    obj = user;
  
    var newvalues = { $set: obj };
  
  
  
    let myquery = { _id: ObjectID(`${id}`) };
  
    db.collection("user").updateOne(myquery, newvalues, function (err, resp) {
      if (err) throw err;
      console.log(resp.result);
  
    });
  
  
  
    res.json(1);
  })
  
  
  

  //Driver Endpoints
  


app.post("/driver/send", (req, res) => {

    // let user = req.body;
    let user = req.body;
    console.log(req.body);
  
    // mongoose.connect(url ,{useNewUrlParser:true} , (err,db)=>{
    //     if (err) throw err;
  
    db.collection("driver").insertOne(user, (err, resp) => {
      if (err) throw err;
      console.log("1 document inserted");
      console.log(resp.ops);
      res.json(resp.ops[0]);
      //  db.close();
    });
  
  })
  
  
  // })
  
  
  app.get("/driver/view", (req, res) => {
  
    // mongoose.connect(url ,{useNewUrlParser:true} , (err,db)=>{
    //     if (err) throw err;
    db.collection("driver").find({}).toArray((err, resp) => {
      if (err) throw err;
  
      // db.close()
  
      res.json(resp)
      // db.close();
    })
  
  })
  
  // })
  
  
  // })
  
  app.get("/driver/view/:id", (req, res) => {
  
    var user = req.params.id;
  
    let myquery = { _id: ObjectID(`${user}`) };
  
    console.log(myquery);  ////
  
    // mongoose.connect(url ,{useNewUrlParser:true} , (err,db)=>{
    db.collection("driver").find({ _id: ObjectID(`${user}`) }).toArray(function (err, result) {
      if (err) throw err;
  
      console.log(result)
      res.json(result);
      // db.close();
    });
  
    // })
  
  })
  
  app.get("/driver/delete/:id", (req, res) => {
  
    var user = req.params.id;
  
    let myquery = { _id: ObjectID(`${user}`) };
  
    console.log(myquery);  ////
  
    // mongoose.connect(url ,{useNewUrlParser:true} , (err,db)=>{
    db.collection("driver").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      res.json(1);
      // db.close();
    });
  });
  
  // })
  
  app.post("/driver/update", (req, res) => {   //update user
  
  
    let user = req.body;
    var id = req.body.id;
  
  
    let obj = new Object();
  
    obj = user;
  
    var newvalues = { $set: obj };
  
  
  
    let myquery = { _id: ObjectID(`${id}`) };
  
    db.collection("driver").updateOne(myquery, newvalues, function (err, resp) {
      if (err) throw err;
      console.log(resp.result);
  
    });
  
  
  
    res.json(1);
  })


    
  app.get("/drive/update/:id/:people", (req, res) => {
  
    // var user = '5d60ddef2e4e6330e02f178e';
    var user = req.params.id;
    let people = req.params.people;

    let obj = new Object();
    obj = {'people':people}
    var newvalues = { $set: obj };

    let myquery = { _id: ObjectID(`${user}`) };
  
    console.log(myquery);  ////
  
    db.collection("driver").updateOne(myquery, newvalues, function (err, resp) {
        if (err) throw err;
        console.log(resp.result);
    
      });
      res.json(1);
  });
  
  
  
  



  app.get("/driver/1/view", (req, res) => {
  
    // mongoose.connect(url ,{useNewUrlParser:true} , (err,db)=>{
    //     if (err) throw err;
    db.collection("a").find({}).toArray((err, resp) => {
      if (err) throw err;
  
      // db.close()
  
      res.json(resp)
      // db.close();
    })
  
  })




  app.get("/driver/2/view", (req, res) => {
  
    // mongoose.connect(url ,{useNewUrlParser:true} , (err,db)=>{
    //     if (err) throw err;
    db.collection("b").find({}).toArray((err, resp) => {
      if (err) throw err;
  
      // db.close()
  
      res.json(resp)
      // db.close();
    })
  
  })




  app.get("/driver/3/view", (req, res) => {
  
    // mongoose.connect(url ,{useNewUrlParser:true} , (err,db)=>{
    //     if (err) throw err;
    db.collection("c").find({}).toArray((err, resp) => {
      if (err) throw err;
  
      // db.close()
  
      res.json(resp)
      // db.close();
    })
  
  })




  app.get("/driver/4/view", (req, res) => {
  
    // mongoose.connect(url ,{useNewUrlParser:true} , (err,db)=>{
    //     if (err) throw err;
    db.collection("d").find({}).toArray((err, resp) => {
      if (err) throw err;
  
      // db.close()
  
      res.json(resp)
      // db.close();
    })
  
  })


  app.get("/driver/5/view", (req, res) => {
  
    // mongoose.connect(url ,{useNewUrlParser:true} , (err,db)=>{
    //     if (err) throw err;
    db.collection("x").find({}).toArray((err, resp) => {
      if (err) throw err;
  
      // db.close()
  
      res.json(resp)
      // db.close();
    })
  
  })