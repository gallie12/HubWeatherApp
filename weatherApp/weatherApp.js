
document.addEventListener("DOMContentLoaded", function() 
{
    let valid = document.getElementById("valid")

    valid.addEventListener("click",function(){
        const myCity=document.getElementById("town").value
        console.log(myCity);
        const API_KEY = "0a0f8a9f474b4e88ac225651e1f6375f"
        const API_KEY2="95bc2844cb84b960d71387c403eede5f"
        let URL = `https://api.opencagedata.com/geocode/v1/json?q=${myCity}&key=${API_KEY}&language=fr&pretty=1`
            
         fetch(URL) // on utilise la methode fetch, qui est asynchrone et qui existe par défaut dans le navigateur (on aurait aussi pu utiliser la librairie axios par exemple)
    // on utilise la méthode then() (NB: on pourrait aussi utiliser la syntaxe async/await)
        .then(response => { 
        if (response.status == 200) { // on vérifier que l'appel à l'API a fonctionné
            return response.json()  // ne pas oublier le return du callback
        }
        else console.log(`Erreur lorsqu'on a tenté de récupérer les data`);
        })
        .then(data => {
        const lattitude=data.results[0].geometry.lat
        const longitude=data.results[0].geometry.lng;
        const API_KEY2="95bc2844cb84b960d71387c403eede5f"
        URL2=`https://api.openweathermap.org/data/2.5/onecall?lat=${lattitude}&lon=${longitude}&appid=${API_KEY2}`
        return fetch(URL2)
                   .then(response => response.json())
                   .then(data=>{console.log(data.current.weather)})
                   .catch(err => {
                   console.error('Request failed', err)
        })
        
        })
        
       
        
    })   
})

