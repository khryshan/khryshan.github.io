let reverse = (str) => {
	let obj = {
		"А": "A",
		"В": "B",
		"Е": "E",
		"С": "C"
	}
	return obj[str];
} 

exports.changeMAC = function ( str ) {

		str = str.replace(/[a-zа-я]/g, u => u.toUpperCase());
		str = str.replace(/[^A-FАВЕС0-9]/g, '');
		str = str.replace(/А|В|Е|С/g, reverse);
		// str = str.replace(/([A-F0-9]{2})([^:])/g,'$1'+':'+'$2');
		str = str.replace(/(\w{2})/g,'$1'+':');
		str = str.replace(/^:|:$/g, '');

		return str;
};
