// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .
"use strict";

// import Home         from './views/pages/Home.js'
// import About        from './views/pages/About.js'
// import Error404     from './views/pages/Error404.js'
// import PostShow     from './views/pages/PostShow.js'
// import Register     from './views/pages/Register.js'
// import Navbar       from './views/components/Navbar.js'
// import Bottombar    from './views/components/Bottombar.js' 
// import Utils        from './services/Utils.js'

   function parseRequestURL(){
        let url = location.hash.slice(1).toLowerCase() || '/';
        let r = url.split("/")
        let request = {
            resource    : null,
            id          : null,
            verb        : null
        }
        request.resource    = r[1]
        request.id          = r[2]
        request.verb        = r[3]
        return request
    }
// Navbar start 
let Navbar = `
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Interview Scheduler</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
      <a class="nav-item nav-link active" href="#">Home</a>
      <a class="nav-item nav-link active" href="#/create">Create</a>
      <a class="nav-item nav-link active" href="#/update">Update</a>
      <a class="nav-item nav-link active" href="#/list">List</a>
    </div>
  </div>
</nav>
        `

// Navbar end
let Create = 
    `
    <h1> Create Interview</h1>
    <div class="container">
        <form id="create-interview">
            <div class="form-group">
              <label for="date">Interview Date</label>
              <input type="date" name="date" class="form-control" id="date">
              
            </div>
            <div class="form-group">
                <label for="start">Start time</label>
                <input type="time" name="start" class="form-control" id="start">
            </div>
            <div class="form-group">
                <label for="end">End time</label>
                <input type="time" name="end" class="form-control" id="end">
            </div>
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" name="title" class="form-control" id="title">
            </div>
            <div class="form-group">
                <label for="participants">Participants</label>
                <input type="text" name="participants" class="form-control" id="participants" placeholder="Separate the participant ids by comma">
            </div>
    
            <button type="submit" name="submit" class="btn btn-primary">Submit</button>
          </form>
    </div>
        `
       
    

let Home = `
            <h1> Welcome to interview scheduler </h1>
        `
        
let Update =`
<h1> Update Interview</h1>
<div class="container">
    <form id="update-interview">
        <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="interviewId">Select Interview</label>
            </div>
            <select class="custom-select" id="interviewId">
              <option selected>Choose...</option>
              <!-- <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option> -->
            </select>
          </div>
          <div class="form-group">
            <label for="date">Interview Date</label>
            <input type="date" name="date" class="form-control" id="date">
          </div>
        <div class="form-group">
            <label for="start">Start time</label>
            <input type="time" name="start" class="form-control" id="start">
        </div>
        <div class="form-group">
            <label for="end">End time</label>
            <input type="time" name="end" class="form-control" id="end">
        </div>
        <div class="form-group">
            <label for="title">Title</label>
            <input type="text" name="title" class="form-control" id="title">
        </div>
        <div class="form-group">
            <label for="participants">Participants</label>
            <input type="text" name="participants" class="form-control" id="participants" placeholder="Separate the participant ids by comma">
        </div>
        <!-- <div class="input-group mb-3">
            <div class="input-group-prepend">
              <label class="input-group-text" for="participants">Select participants</label>
            </div>
            <select class="custom-select" id="participants">
              <option selected>Choose...</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div> -->
        <button type="submit" name="submit" class="btn btn-primary">Submit</button>
      </form>

      
</div>`

let Show = `<div class="container">
<h1> Interview Details</h1>
<form>
<fieldset disabled>
    <div class="form-group">
        <label for="date">Interview Date</label>
        <input type="date" name="date" class="form-control" id="date">
      </div>
    <div class="form-group">
        <label for="start">Start time</label>
        <input type="time" name="start" class="form-control" id="start">
    </div>
    <div class="form-group">
        <label for="end">End time</label>
        <input type="time" name="end" class="form-control" id="end">
    </div>
    <div class="form-group">
        <label for="title">Title</label>
        <input type="text" name="title" class="form-control" id="title">
    </div>
    <div class="form-group">
        <label for="participants">Participants</label>
        <input type="text" name="participants" class="form-control" id="participants" placeholder="Separate the participant ids by comma">
    </div>
</fieldset>
</div>`

let Edit = `<div class="container">
<h1> Interview Details</h1>
<form id="update-interview">

    <div class="form-group">
        <label for="date">Interview Date</label>
        <input type="date" name="date" class="form-control" id="date">
      </div>
    <div class="form-group">
        <label for="start">Start time</label>
        <input type="time" name="start" class="form-control" id="start">
    </div>
    <div class="form-group">
        <label for="end">End time</label>
        <input type="time" name="end" class="form-control" id="end">
    </div>
    <div class="form-group">
        <label for="title">Title</label>
        <input type="text" name="title" class="form-control" id="title">
    </div>
    <div class="form-group">
        <label for="participants">Participants</label>
        <input type="text" name="participants" class="form-control" id="participants" placeholder="Separate the participant ids by comma">
    </div>
    <button type="submit" name="submit" class="btn btn-primary">Submit</button>
</div>`

let List = `<div class="container">
<h1> Scheduled Interviews</h1> 
    <div id="content">

    </div>
</div>`

let Delete =`
<p id="content">
 </p>
`
// List of supported routes. Any url other than these routes will throw a 404 error
const routes = {
    '/'             : Home
    , '/create'      : Create,
    '/update'         : Update,
    '/show/:id'      :  Show,
    '/list'          : List,
    '/delete/:id'       : Delete,
    '/edit/:id'          : Edit
    // , '/register'   : Register
};


// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
function router() {

    // Lazy load view element:
    const header = null || document.getElementById('header_container');
    const content = null || document.getElementById('page_container');
    // const footer = null || document.getElementById('footer_container');
    
    // Render the Header and footer of the page
    header.innerHTML = Navbar
    // await Navbar.after_render();
    // footer.innerHTML = await Bottombar.render();
    // await Bottombar.after_render();


    // Get the parsed URl from the addressbar
    let request = parseRequestURL()

    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')
    console.log(request);
    // Get the page from our hash of supported routes.
    // If the parsed URL is not in our list of supported routes, select the 404 page instead
    let page = routes[parsedURL] ? routes[parsedURL] : Error404
    // console.log(page);
    content.innerHTML = page;


    if (page == Edit ){
        let date = document.querySelector('#date'); 
        let start = document.querySelector('#start'); 
        let end = document.querySelector('#end');  
        let title = document.querySelector('#title');
        let participants = document.querySelector('#participants');
        let edit = new XMLHttpRequest(); 
        edit.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            var p = JSON.parse(this.responseText);
            // document.getElementById("date").innerHTML+=p.date
            // document.getElementById(title)
            date.value = p.date
            var startTime = p.start
            startTime = startTime.split(/[-:T]/)
            // console.log(startTime)
            start.value = startTime[3]+":"+startTime[4]
            var endTime = p.end
            endTime = endTime.split(/[-:T]/)
            end.value = endTime[3]+":"+endTime[4]
            title.value = p.title 
            participants.value="";
            for(var i=0;i<p.participants.length;i++){
                participants.value+=p.participants[i].email +','
            }
            }
        };
    edit.open('GET', 'http://localhost:3001/api/v1/interviews/'+request.id);
    edit.send();
    function sendJSON(){

        edit.open('PUT','http://localhost:3001/api/v1/interviews/'+request.id)
        edit.setRequestHeader("Content-Type", "application/json"); 
               // Create a state change callback 
               edit.onreadystatechange = function () {
                   if (edit.readyState === 4 && edit.status === 200) {
                       // Print received data fom server 
                    //    result.innerHTML = this.responseText; 
                    // console.log(JSON.parse(this.responseText));
                    var res = JSON.parse(this.responseText)
                    if (res.code == 3000){
                        alert("There is an overlap in date and time")
                    }else{
                        alert("The Interview is created")
                    }
                   } 
               };
               // Converting JSON data to string 
               var data = JSON.stringify({ "date": date.value, "start": start.value, "end": end.value, "title": title.value,"participantlist": participants.value }); 
        edit.send(data);
    }
    let form = document.getElementById( "update-interview" );
           form.addEventListener( "submit", function ( event ) {
            event.preventDefault();
            sendJSON();
        });
    
    }
    else if (page == Delete){
    var deleteReq = new XMLHttpRequest();
        deleteReq.onload = function() {
            // if (this.readyState == 4 && this.status == "200") {
                // console.log("kajsdbkjs")
                document.getElementById("content").innerHTML+="Delete Successful";
            // }
        };
    deleteReq.open('DELETE','http://localhost:3001/api/v1/interviews/'+request.id);
    deleteReq.send(null);
    }
    else if (page == List){
        var list = new XMLHttpRequest();
        list.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            console.log(JSON.parse(this.responseText));
            var p = JSON.parse(this.responseText)
            for (var i=0;i<p.length;i++){
            document.getElementById("content").innerHTML+='<div class="alert alert-primary" role="alert">'+'<b>Date: </b>'+p[i].date+" "+'<b>Start Time: </b>'+p[i].start +" "+'<b>End Time: </b>'+p[i].end+" "+'<b>Title: </b>'+p[i].title+`<br><a class="btn btn-primary" href="#/show/`+p[i].id+`"> <b>Show</b></a>&nbsp<a href="#/delete/`+p[i].id+`" class="btn btn-danger">Delete</a>&nbsp<a href="#/edit/`+p[i].id+`" class="btn btn-success">Edit</a></div> `
            // document.getElementById("content").innerHTML+="<strong>"+p[i].name+"</strong><br>"
            }
            }
        };
    list.open('GET', 'http://localhost:3001/api/v1/interviews');
    list.send();

    }
    else if (page == Show){
        let date = document.querySelector('#date'); 
        let start = document.querySelector('#start'); 
        let end = document.querySelector('#end');  
        let title = document.querySelector('#title');
        let participants = document.querySelector('#participants');
        let show = new XMLHttpRequest(); 
        show.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
            var p = JSON.parse(this.responseText);
            // document.getElementById("date").innerHTML+=p.date
            // document.getElementById(title)
            date.value = p.date
            var startTime = p.start
            startTime = startTime.split(/[-:T]/)
            // console.log(startTime)
            start.value = startTime[3]+":"+startTime[4]
            var endTime = p.end
            endTime = endTime.split(/[-:T]/)
            end.value = endTime[3]+":"+endTime[4]
            title.value = p.title 
            participants.value="";
            for(var i=0;i<p.participants.length;i++){
                participants.value+=p.participants[i].email +','
            }
            }
        };
    show.open('GET', 'http://localhost:3001/api/v1/interviews/'+request.id);
    show.send();

    }
    else if (page == Create){
        const btn = document.querySelector('create-interview');
function sendJSON(){ 
               
            //    let result = document.querySelector('.result'); 
               let date = document.querySelector('#date'); 
               let start = document.querySelector('#start'); 
               let end = document.querySelector('#end');  
               let title = document.querySelector('#title');
               let participants = document.querySelector('#participants');
               // Creating a XHR object 
               let request = new XMLHttpRequest(); 
               let url = "http://localhost:3001/api/v1/interviews/"; 

               // open a connection 
               request.open("POST", url, true); 
     
               // Set the request header i.e. which type of content you are sending 
               request.setRequestHeader("Content-Type", "application/json"); 
     
               // Create a state change callback 
               request.onreadystatechange = function () { 
                   console.log(request.readyState)
                    console.log(request.status)
                   if (request.readyState === 4 && request.status === 200) { 
     
                       // Print received data from server 
                    //    result.innerHTML = this.responseText; 
                    console.log(JSON.parse(this.responseText));
                    var res = JSON.parse(this.responseText)
                    if (res.code == 3000){
                        alert("There is an overlap in date and time")
                    }else{
                        alert("The Interview is created")
                    }
                   } 
               }; 
     
               // Converting JSON data to string 
               var data = JSON.stringify({ "date": date.value, "start": start.value, "end": end.value, "title": title.value,"participantlist": participants.value }); 
     
               // Sending data with the request 
               request.send(data); 
           } 
           let form = document.getElementById( "create-interview" );
           form.addEventListener( "submit", function ( event ) {
            event.preventDefault();
            sendJSON();
        });
    }else if(page == Update) {

        const btn = document.querySelector('update-interview');
function sendJSON(){ 
               
            //    let result = document.querySelector('.result'); 
               let interviewId = document.querySelector("#interviewId")
               let date = document.querySelector('#date'); 
               let start = document.querySelector('#start'); 
               let end = document.querySelector('#end');  
               let title = document.querySelector('#title');
               let participants = document.querySelector('#participants');
               // Creating a XHR object 
               let xhr = new XMLHttpRequest(); 
               let url = "http://localhost:3001/api/v1/interviews/"+interviewId.value; 

               // open a connection 
               xhr.open("PUT", url, true); 
     
               // Set the request header i.e. which type of content you are sending 
               xhr.setRequestHeader("Content-Type", "application/json"); 
     
               // Create a state change callback 
               xhr.onreadystatechange = function () { 
                   console.log(xhr.readyState)
                    console.log(xhr)
                   if (xhr.readyState === 4 && xhr.status === 200) { 
     
                       // Print received data from server 
                    //    result.innerHTML = this.responseText; 
                    console.log(JSON.parse(this.responseText));
                    var res = JSON.parse(this.responseText)
                    if (res.code == 3000){
                        alert("There is an overlap in date and time")
                    }else{
                        alert("The Interview is created")
                    }
                   } 
               }; 
     
               // Converting JSON data to string 
               var data = JSON.stringify({ "date": date.value, "start": start.value, "end": end.value, "title": title.value,"participantlist": participants.value }); 
     
               // Sending data with the request 
               xhr.send(data);
           } 
           let form = document.getElementById( "update-interview" );
           form.addEventListener( "submit", function ( event ) {
            event.preventDefault();
            sendJSON();
        });

         // doc.onload =  getRequest() {
    var httpr = new XMLHttpRequest();
    httpr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        console.log(JSON.parse(this.responseText));
        var p = JSON.parse(this.responseText);
        for (var i=0;i<p.length;i++){
        document.getElementById("interviewId").innerHTML+='<option value="'+ p[i].id + '">' +p[i].title+'</option>'
        // document.getElementById("content").innerHTML+="<strong>"+p[i].name+"</strong><br>"
        }
        }
    };
httpr.open('GET', 'http://localhost:3001/api/v1/interviews');
httpr.send();
    // };
    let interviewId = document.getElementById("interviewId");
    interviewId.onchange  = function(){
        console.log("You have selected "+interviewId.value);
        let date = document.querySelector('#date'); 
        let start = document.querySelector('#start'); 
        let end = document.querySelector('#end');  
        let title = document.querySelector('#title');
        let participants = document.querySelector('#participants');
        var show = new XMLHttpRequest();
        show.open('GET', 'http://localhost:3001/api/v1/interviews/'+interviewId.value);
        show.send();
        show.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var p = JSON.parse(this.responseText);
            console.log(p)
            date.value = p.date
            var startTime = p.start
            startTime = startTime.split(/[-:T]/)
            // console.log(startTime)
            start.value = startTime[3]+":"+startTime[4]
            var endTime = p.end
            endTime = endTime.split(/[-:T]/)
            end.value = endTime[3]+":"+endTime[4]
            title.value = p.title 
            participants.value="";
            for(var i=0;i<p.participants.length;i++){
                participants.value+=p.participants[i].email +','
            }
        }
        }
    };

    
    }
    
    // await page.after_render();
  
}

// Listen on hash change:
window.addEventListener('hashchange', router);

// Listen on page load:
window.addEventListener('load', router);




