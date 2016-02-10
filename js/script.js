var searchButton = document.querySelector('#searchbtn');


function sendSearch(evt) {
	evt.preventDefault()
	var moonapiURL = 'http://api.burningsoul.in/moon'
	
	moonxhr('GET', moonapiURL, function(moonData){
		moonRenderData(moonData)
	});
}
searchButton.addEventListener('click', sendSearch)


var moonxhr = function(method, path, callback) {
	var request = new XMLHttpRequest()
	request.open(method, path, true)
	 request.onreadystatechange = function () {
		if (request.readyState !==4) {return}

		if (request.readyState ==4 && (request.status !== 200 && request.status !== 201)) {
			console.log(new Error('XHR Failed: ' + path), null)
		}
		callback(JSON.parse(request.responseText))
	}
	request.send()
}

var moonRenderData = function(moonData) {

	var age = document.querySelector('#age').innerHTML = moonData.age + ' days'

	var illumination = document.querySelector('#illumination').innerHTML = moonData.illumination + ' %'

	String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
	}

	var capStage = moonData.stage.capitalize()

	var stage = document.querySelector('#stage').innerHTML = capStage

	var coreDistance = document.querySelector('#coreDistance').innerHTML = moonData.DFCOE + ' km'

	var sunDistance = document.querySelector('#sunDistance').innerHTML = moonData.DFS + ' km'

	var fullMoon = document.querySelector('#fullMoon').innerHTML = moonData.FM.DT

	var newMoon = document.querySelector('#newMoon').innerHTML = moonData.NNM.DT
}
