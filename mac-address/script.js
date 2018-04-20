let address = document.getElementById('mac');


address.oninput = () => {
		let str = address.value;
		let lengthStr = str.length;

		if ( lengthStr > 16 ) {
			address.maxLength = 17;
		}
		
		address.value = changeMAC(str);
}

let changeMAC = (str) => {
		str = str.replace(/[a-z]/g, u => u.toUpperCase());
		str = str.replace(/[^A-F0-9:]/g, '');
		str = str.replace(/(\w{2})([^:])/g,'$1'+':'+'$2');
		
		return str;
}


