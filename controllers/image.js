const Clarifai = require('clarifai');

const app = new Clarifai.App({
	apiKey: '0b0b25a88d84497daa69c019a4e07014'
});

const handleApiCall = (req, res) => {
	app.models
      .predict("a403429f2ddf4b49b307e318f00e528b", req.body.input)
      .then(data => {
          res.json(data);
      })
      .catch(err => res.status(400).json('unable to fetch api'))
}

module.exports = {
    handleApiCall
}