window.chartColors = {
	red: 'rgb(255, 99, 132)',
	orange: 'rgb(255, 159, 64)',
	yellow: 'rgb(255, 205, 86)',
	green: 'rgb(75, 192, 192)',
	blue: 'rgb(54, 162, 235)',
	purple: 'rgb(153, 102, 255)',
	grey: 'rgb(201, 203, 207)'
};
var config = {
	type: 'line',
	data: {
		labels: [],
		datasets: [{
			label: 'Отн. интенсивность',
			backgroundColor: window.chartColors.blue,
			borderColor: window.chartColors.blue,
			data: [],
			fill: false,
		}]
	},
	options: {
		responsive: true,
		title: {
			display: true,
			text: 'График зависимости отн. интенсивности волны от частоты'
		},
		tooltips: {
			mode: 'index',
			intersect: false,
		},
		hover: {
			mode: 'nearest',
			intersect: true
		},
		scales: {
			xAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: 'Частота, Гц'
				}
			}],
			yAxes: [{
				display: true,
				scaleLabel: {
					display: true,
					labelString: 'Отн. интенсивность'
				}
			}]
		}
	}
};

window.onload = function () {
	var ctx = document.getElementById('canvas').getContext('2d');
	window.myLine = new Chart(ctx, config);
};

// document.getElementById('randomizeData').addEventListener('click', function() {
// 	config.data.datasets.forEach(function(dataset) {
// 		dataset.data = dataset.data.map(function() {
// 			return randomScalingFactor();
// 		});

// 	});

// 	window.myLine.update();
// });

var colorNames = Object.keys(window.chartColors);


const statusRef = firebase.database().ref('status');
firebase.auth().onAuthStateChanged(function (user) {
	if (user) {
		// User is signed in.
		var ref = firebase.database().ref('status/chartId');
		// console.log(user.uid);
		ref.once("value").then(function (snap) {
			// console.log(Object.keys(snap.val())[0]);
			if (snap.val() != "null") {
				var refStr = 'users/' + user.uid + '/charts/' + snap.val();
				var refChart = firebase.database().ref(refStr);
				// console.log(refStr);
				refChart.on('child_added', snapshot => {
					var addedData = snapshot.val();
					// console.log("@");
					config.data.datasets[0].data.push(parseInt(addedData.y));
					config.data.labels.push(parseInt(addedData.x));
					window.myLine.update();
					$("#addData").prop("disabled", false);
					$("#addData").removeClass("button--disable");
				})
			}
		});
	}
});
// ref.endAt().limitToLast(1).on('child_added', snapshot => {


document.getElementById('saveCsv').addEventListener('click', function () {
	if (config.data.labels.length > 0) {
		var csv = '';
		for (let i = 0; i < config.data.labels.length; i++) { // выведет 0, затем 1, затем 2
			// console.log(config.data.labels[i]);
			csv += config.data.labels[i] + ';' + config.data.datasets[0].data[i] + '\x0D\x0A';
		}
		var element = document.createElement('a');
		element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csv));
		element.setAttribute('download', 'chart.csv');

		element.style.display = 'none';
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);
	} else {
		alert('Ошибка: нет данных для сохранения!');
	}
});

document.getElementById('savePng').addEventListener('click', function () {
	var canvas = document.getElementById("canvas");
	// draw to canvas...
	var element = document.createElement('a');
	element.setAttribute('href', canvas.toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream'));
	element.setAttribute('download', 'chart.png');

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
});

document.getElementById('addData').addEventListener('click', function () {
	if ($("#freq").valid()) {
		$("#addData").prop("disabled", true);
		$("#addData").addClass("button--disable");
		var frequency = $("#freq").val();
		const freqRef = firebase.database().ref('status');
		freqRef.update({
			frequency: frequency,
			bpState: true,
		});
	}

});

document.getElementById('removeDataset').addEventListener('click', function () {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			// User is signed in.
			var ref = firebase.database().ref('status/chartId');
			// console.log(user.uid);
			ref.once("value").then(function (snap) {
				// console.log(Object.keys(snap.val())[0]);
				if (snap.val() != "null") {
					var refStr = 'users/' + user.uid + '/charts/' + snap.val();
					var refChart = firebase.database().ref(refStr);
					console.log(refStr);
					refChart.remove();
				}
			});
		}
	});
	// config.data.datasets.splice(0, 1);
	config.data.datasets[0].data = [];
	config.data.labels = [];
	window.myLine.update();
});

document.getElementById('removeData').addEventListener('click', function () {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
			// User is signed in.
			var ref = firebase.database().ref('status/chartId');
			// console.log(user.uid);
			ref.once("value").then(function (snap) {
				// console.log(Object.keys(snap.val())[0]);
				if (snap.val() != "null") {
					var refStr = 'users/' + user.uid + '/charts/' + snap.val();
					var refChart = firebase.database().ref(refStr);
					refChart.once("value").then(function (snap) {
						// console.log(snap.val());
						if (snap.val()) {
							var lastPointPath = refStr + "/" + Object.keys(snap.val())[Object.keys(snap.val()).length - 1];
							// console.log(lastPointRef);
							var lastPointRef = firebase.database().ref(lastPointPath);
							lastPointRef.remove();
						}
					});
				}
			});
		}
	});

	config.data.labels.pop(); // remove the label first
	config.data.datasets[0].data.pop();

	window.myLine.update();
});

//------

// document.getElementById('addData').addEventListener('click', function() {
// 	if (config.data.datasets.length > 0) {
// 		var month = MONTHS[config.data.labels.length % MONTHS.length];
// 		config.data.labels.push(month);

// 		config.data.datasets.forEach(function(dataset) {
// 			dataset.data.push(randomScalingFactor());
// 		});

// 		window.myLine.update();
// 	}
// });

document.getElementById('complete').addEventListener('click', function () {
	firebase.auth().onAuthStateChanged(function (user) {
		if (user) {
				const statusRef = firebase.database().ref('status');
				statusRef.update({
					currentUser: "null",
					chartId: "null",
				});
		}
	});
	window.location.href = "index.html";
});

$(document).ready(function() {
	$('#freq').keydown(function(event){
		if(event.keyCode == 13) {
			event.preventDefault();
			return $('#addData').click();
	}
});
});