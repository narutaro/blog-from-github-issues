function shortDate(dateString){
	const nth = function(d) {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
        case 1:  return "st";
        case 2:  return "nd";
        case 3:  return "rd";
        default: return "th";
    }
	};

	const dateObj = new Date(dateString);
	const date = dateObj.getDate();
	const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][dateObj.getMonth()];
	const year = dateObj.getFullYear();

	return dateString = month + ' ' + date+nth(date) + ', ' + year;
}

module.exports = { shortDate };


//date = shortDate("2022-09-21T06:34:38Z")
//console.log(date)


