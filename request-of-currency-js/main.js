// datepicker
let input = $('.input-form');

let property = {
		autoclose: true
	};

input.datepicker(property);



let dateFrom = document.getElementById("date-from");
let dateTill = document.getElementById("date-till");
let cur = document.getElementById('currency');
let url, f, t, dateFromNewFormat, dateTillNewFormat, curCode;

let currentDate = new Date();
let firstDate = new Date(new Date().getTime() - (1000*60*60*24*30));
dateTill.value = (currentDate.getMonth()+1) + "/" + currentDate.getDate() + "/" + currentDate.getFullYear();
dateFrom.value = (firstDate.getMonth()+1) + "/" + firstDate.getDate() + "/" + firstDate.getFullYear();


// for canvas
let ctx = document.getElementById('myChart').getContext('2d');

 

//ajax request
function ajax_get(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // console.log('responseText:' + xhr.responseText);
            try {
                var data = JSON.parse(xhr.responseText);
            } catch(err) {
                console.log(err.message + " in " + xhr.responseText);
                return;
            }
            callback(data);
        }
    };
 
    xhr.open("GET", url, true);
    xhr.send();

}

	
// main function
let val = () => {
	
	// work with dates
	f = new Date(dateFrom.value);
	t = new Date(dateTill.value);
	dateFromNewFormat = f.getFullYear()+"-"+(f.getMonth()+1)+"-"+f.getDate();
	dateTillNewFormat = t.getFullYear()+"-"+(t.getMonth()+1)+"-"+t.getDate();

	(+f < +t) ? true : alert("Fail! Correct a first or last date.")
	

	// choose currency
	switch (cur.value) {
 		case "EUR":
    	curCode = 292;
    	break;
  	case "RUB":
    	curCode = 298;
    	break;
  	default:
    	curCode = 145;
	}

	
	url = "http://www.nbrb.by/API/ExRates/Rates/Dynamics/" + curCode + "?startDate=" + 
				dateFromNewFormat + "&endDate=" + dateTillNewFormat +"&Periodicity=0";
	

	// request and paint chart
	ajax_get(url, function(data) {

		let arrayCur = [];
		let arrayDate = [];
		let date;

		data.forEach((data)=>{
			arrayCur.push(data.Cur_OfficialRate);
			date = new Date(data.Date);

			arrayDate.push(date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear());
			})

		let chart = new Chart(ctx, {
    	type: 'line',
			data: {
        labels: arrayDate,
        datasets: [{
        		lineTension: 0,
        		borderColor: 'rgb(255, 99, 132)',
        		pointHoverRadius: 5,
    				fill: false,
            data: arrayCur,
        }]
    	},

    	options: {
        legend: {
            display: false
        }
      }
   		
	});
		
	});

};


(val)();


btn.addEventListener("click", val);
