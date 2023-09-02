const firebaseConfig = {
  apiKey: "AIzaSyAIG6AvScxdIqOgoANEEwYL2nnoXY567NE",
  authDomain: "nocodeuploadtask.firebaseapp.com",
  projectId: "nocodeuploadtask",
  storageBucket: "nocodeuploadtask.appspot.com",
  messagingSenderId: "619097217369",
  appId: "1:619097217369:web:9846e72f9cfaef114a5448",
};

firebase.initializeApp(firebaseConfig);

let fileText = document.querySelector(".fileText");
let uploadPercentage = document.querySelector(".uploadPercentage");
let progress = document.querySelector(".progress");
let percentVal;
let fileItem;
let fileName;
let img = document.querySelector(".img");

function getFile(e) {
  fileItem = e.target.files[0];
  fileName = fileItem.name;
  fileText.innerHTML = fileName;
}

function uploadImage() {
  let storageRef = firebase.storage().ref("images/" + fileName);
  let uploadTask = storageRef.put(fileItem);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      percentVal = Math.floor(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      console.log(percentVal);
      uploadPercentage.innerHTML = percentVal + "%";
      progress.style.width = percentVal + "%";
    },
    (error) => {
      console.log("Error is", error);
    },
    () => {
      uploadTask.snapshot.ref.getDownloadURL().then((url) => {
        let data =  fetch("gs://nocodeuploadtask.appspot.com").then(res=> res).then( res => data = res )

        setTimeout(() => {
          console.log(data,'datasa');
          
        }, 3000);
        
        let arrImage = [];
        let main = document.getElementById('main');
        if (url !== "") {
          arrImage.push(url);
          arrImage.map(() => {
            let div = document.createElement('div');
            let img = document.createElement('img')
            div.className = 'imageUploaded'
            img.src = url
            img.className = 'img'
            
            
            
            div.appendChild(img)
            main.appendChild(div)
          });
          img.src = url;
          img.style.display = "block";
        }
      });
    }
  );
}
