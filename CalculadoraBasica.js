class Calculadora {
	constructor() {
		this.valorEnMemoria = 0;
	}
	añadirAResultados(valor) {
		document.getElementById('ventanaResultados').value += valor;
	}	

	borrarDatos(valor) {
		document.getElementById('ventanaResultados').value = valor;
	}

	calcularResultados() {
		try {
			var result = eval(document.getElementById('ventanaResultados').value);
			document.getElementById('ventanaResultados').value = result;
		} catch (err) {
			document.getElementById('ventanaResultados').value = "Error = " + err;
		}
	}

	calcularMas() {
		this.añadirAResultados("+");
		this.añadirAResultados(this.valorEnMemoria);
		this.calcularResultados();
	}
	calcularMenos() {
		this.añadirAResultados("-");
		this.añadirAResultados(this.valorEnMemoria);
		this.calcularResultados();
	}
	meterEnMemoria() {
		var result = eval(document.getElementById('ventanaResultados').value);
		document.getElementById('ventanaResultados').value = result;
		this.valorEnMemoria = result;
	}

}
var calculadoraScript = new Calculadora();

