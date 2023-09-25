const firebaseConfig = {
    apiKey: "AIzaSyCS-cxo7ARJWf0T6WDlUBawgKqx99bPSOM",
    authDomain: "datos-de-formulario-54945.firebaseapp.com",
    projectId: "datos-de-formulario-54945",
    storageBucket: "datos-de-formulario-54945.appspot.com",
    messagingSenderId: "378706094649",
    appId: "1:378706094649:web:c927a560f81dae5b41bbe8",
    measurementId: "G-EQGTM2JWE2"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

document.getElementById('formulario').addEventListener('submit', (event) =>{
    event.preventDefault()

    //Validar campo nombre
    let entradaNombre = document.getElementById('name')
    let errorNombre = document.getElementById('nameError')

    if(entradaNombre.value.trim() === ''){
        errorNombre.textContent = 'Por Favor, introduce tu nombre'
        errorNombre.classList.add('error-message')
    }else{
        errorNombre.textContent = ''
        errorNombre.classList.remove('error-mesasage')
    }

    //Validar correo electronico
    let emailEntrada = document.getElementById('email')
    let emailError = document.getElementById('emailError')
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //Patron de validacion basico
    if(!emailPattern.test(emailEntrada.value)){
        emailError.textContent = 'Por favor, introduce un correo valido'
        emailError.classList.add('error-message')
    }else{
        emailError.textContent = ''
        emailError.classList.remove('error-mesasage')
    }

    //Validar la contraseña
    let contrasenaEntrada = document.getElementById('password')
    let contrasenaError = document.getElementById('passwordError')
    let contrasenaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/;
    if(!contrasenaPattern.test(contrasenaEntrada.value)){
        contrasenaError.textContent = 'La contraseña debe tener al menos 8 caracteres, numeros, mayusculas y minusculas y caracteres especiales'
        contrasenaError.classList.add('error-message')
    }else{
        contrasenaError.textContent = ''
        contrasenaError.classList.remove('error-mesasage')
    }

    //Si todos los campos son validos enviar formulario

    if(!errorNombre.textContent && !emailError.textContent && !contrasenaEntrada.textContent){

        //BACKEND QUE REDIBA LA INFORMACION

        db.collection("users").add({
            nombre: entradaNombre.value,
            email: emailEntrada.value,
            password: contrasenaEntrada.value
        })
        .then((docRef) => {
            alert('El formulario se ha enviado con exito', docRef.id)
            document.getElementById('formulario').reset();
        })
        .catch((error) => {
            alert(error)
        });
        
    }

})