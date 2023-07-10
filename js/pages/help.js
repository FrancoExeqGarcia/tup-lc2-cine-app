function sendEmail(){

    nombre = document.getElementById("nombre").value;
    msj = document.getElementById("mensaje").value;
    var email = document.getElementById('email').value;
    
    var templateParams = {
        name: nombre,
        notes: mensaje,
        email: email
    };
     
    emailjs.send('service_5x0xwqb', 'contact-form', templateParams)
        .then(function(response) {
           console.log('Correo electrónico enviado:', response.status, response.text);
           let msj = document.getElementById("sec-cine-result");
           msj.innerHTML = '<p class="verde">¡Email enviado con éxito!</p>';
        }, function(error) {
           console.log('FAILED...', error);
           let msj = document.getElementById("sec-cine-result");
           msj.innerHTML ='<p class="rojo"> Hubo un error al enviar el email. Por favor, inténtalo nuevamente más tarde.</p>';
        }
        );
    }