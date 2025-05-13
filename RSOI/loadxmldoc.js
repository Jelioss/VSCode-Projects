// loadxmldoc.js
function loadXMLDoc(dname) {
	let xmlDoc;
	try { // Internet Explorer
		xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
		xmlDoc.async = false;
		xmlDoc.load(dname);
		return xmlDoc;
	} catch (e) {
		try { // Firefox, Mozilla, Opera, etc.
			xmlDoc = document.implementation.createDocument("", "", null);
			xmlDoc.async = false;
			xmlDoc.load(dname);
			return xmlDoc;
		} catch (e) {
			console.error("Ошибка создания XML-документа:", e.message);
		}
	}
	try {
		// Современные браузеры (альтернативный способ)
		let xhr = new XMLHttpRequest();
		xhr.open("GET", dname, false); // Синхронный запрос
		xhr.send();
		xmlDoc = new DOMParser().parseFromString(xhr.responseText, "text/xml");
		return xmlDoc;
	} catch (e) {
		console.error("Ошибка загрузки XML:", e.message);
	}
	return null;
}