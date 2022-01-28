const register = () => {
    const email = document.querySelector("#registration-email").value;
    
    const password = document.querySelector("#registration-password").value;
    const repassword = document.querySelector("#registration-repassword").value;
    const nom = document.querySelector("#registration-nom").value;
    const prenom = document.querySelector("#registration-prenom").value;
    const radioButtons = document.querySelectorAll('input[name="categorie"]');
    var db = firebase.firestore();
    let selectedcategory = "";
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedcategory = radioButton.value;
            break;
        }
    }
    if (email.trim() == "") {
      alert("Enter Email");
    } else if (password.trim().length < 7) {
      alert("Password must be at least 7 characters");
    }
    else if (password != repassword) {
      alert("passwords do not match");
    } 
    else if (selectedcategory == "") {
        alert("enter you're category");
    }else if (nom == "") {
        alert("enter you're nom");
    }else if (prenom == "") {
        alert("enter you're prenom");
    } else {
      auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        var uid = firebase.auth().currentUser.uid;
        console.log(uid)
        

        datatofirestore(uid, nom, prenom, email, selectedcategory)
       
        
      })
      .catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);
          // ...
        });
        
    }


    function datatofirestore(uid, nom, prenom, email, selectedcategory){
        db.collection("users").doc(uid).set({
            name: nom,
            prenom: prenom,
            email: email,
            category: selectedcategory
        })



        
    }
  };