
var inquirer = require("inquirer");
var gitApi = require("./api.js");
var axios = require("axios");
var fs = require("fs");
var prepend = require("prepend-file");
var innerApi = "## Questions \n * Feel free to email me on ";
var innerText = "";

fs.writeFile("readme.md","",err=>{});

inquirer.prompt([
    {
        name: 'username',
        message: 'What is your GitHub username?', 
    },
    {
        name: 'email',
        message: 'What is your email'
    }
])
.then(data => {

    var username = data.username
    var url = 'https://api.github.com/users/' + username + '';
    var email = data.email;

    innerApi = innerApi + email + "\n"

    axios
        .get(url)
            .then(function(data){
                var profile = data.data.avatar_url;
                innerApi = innerApi + "* Check out my [GitHub account](" + data.html_url + ") ![GitHub Logo](" + profile +") \n";
            });
    
})
.then(function(){
    inquirer.prompt([
        {
            name: 'title',
            message: 'What is your project title?',
        },
        {
            name: 'desc',
            message: 'What is your project description?'
        },
        {
            name: 'version',
            message: 'What version is your project in?'
        },
        {  
            name: 'installDesc',
            message: 'Provide a installation description.'
        },
        {
            name: 'installCode',
            message: 'Installation code separeted by "," (Ex: fs, axios, inquirer)'
        },
        {
            name: 'usage',
            message: 'Provide usage separeted by ","'
        },
        {
            name: 'license',
            message: 'What is your license?'
        },
        {
            name: 'contributor',
            message: 'Provide contributor`s GitHub username separeted by ","',
        },
    ])
.then(async function(data){

    //Title

    innerText = innerText + "# " + data.title + "\n";

    //Desc

    innerText = innerText + data.desc + "\n";

    //Badge

    innerText = innerText + "* ![badge](https://img.shields.io/static/v1?label=<Version>&message=<" + data.version + ">&color=<blue>) \n";

    //Install desc

    var installInit = "## Installation \n "

    innerText = innerText + installInit +  data.installDesc + "\n";

    //Install code

    var installInner = "``` \n"

    var endInstall = "``` \n"

    var installCodeStr = data.installCode;

    var installCodeArray = installCodeStr.split(",");

    for(let i = 0; i < installCodeArray.length; i++){
        installInner = installInner + installCodeArray[i] + "\n";
    }
    innerText = innerText + installInner + endInstall;

    //Usage

    var usageStr = data.usage;

    var usageArray = usageStr.split(",");

    var usageInner = "## Usage \n ``` \n";

    var endUsage = "``` \n";

    for(let i = 0; i < usageArray.length; i++){
        usageInner = usageInner + usageArray[i] + "\n";
    }

    innerText = innerText + usageInner + endUsage;

    //License

    innerText = innerText + "## License \n" + data.license + "\n";

    //Contributors

    var contInner = "## Contributors \n"

    var contStr = data.contributor;

    var contArray = contStr.split(",");

    for(let i = 0; i < contArray.length; i++){
        axios
            .get("https://api.github.com/users/" + contArray[i])
            .then(data =>{
                contInner = contInner + "* [" + contArray[i] + "](" + data.html_url + ") ![GitHub Logo](" + data.avatar_url +") \n"
            })
    }

    innerText = innerText + contInner;

})
.then(function(){

    innerText = innerText + innerApi;

    fs.appendFile("readme.md", innerText, err=>{return err;});
})
})


function init() {

}


init();
module.exports = {

}