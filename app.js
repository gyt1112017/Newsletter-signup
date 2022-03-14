const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const request = require("request");
const https = require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.listen(process.env.PORT || 3000, function(){
  console.log("server is running on port 3000");
})

app.get('/', function (req, res) {
  res.sendFile(__dirname+"/signup.html")
})

mailchimp.setConfig({
  apiKey: "f39c12e06897a2017039a2f9cb2f3af6-us14",
  server: "us14"
});

app.post('/', function (req,res){
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.Email;

  const listId = "aebe3ea75d";
  const subscribingUser = {
      firstName: firstName,
      lastName: lastName,
      email: email
  };

  app.post("/failure", function(req, res){
    res.redirect("/")
  })

  async function run() {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName
      }
    });

    console.log(
      `Successfully added contact as an audience member. The contact's id is ${
       response.id
       }.`
    );
}
run();

  if (res.statusCode===200){
    res.sendFile(__dirname+"/success.html")
  }

  else
  {
      res.sendFile(__dirname+"/failure.html")
  }

})





// API Key
// f39c12e06897a2017039a2f9cb2f3af6-us14

// List id
// aebe3ea75d
