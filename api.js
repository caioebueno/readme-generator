axios = require("axios");
function githubApi(user){
  var finalData;
  var url = 'https://api.github.com/users/' + user + '';
  axios
    .get(url)
      .then(data => {
        finalData = data;
        
      })
      return finalData;
}
module.exports = {git: githubApi};
