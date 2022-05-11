document.addEventListener("DOMContentLoaded", function() 
{   
    
    let valid = document.getElementById("valid")    
    const newDate = new Date();
    const day = newDate.getDay()
    
    

    
   
    valid.addEventListener("click",function(){
        let week=['sunday', 'monday', 'tuesday' , 'wednesday', 'thursday',
        'friday', 'saturday']
        
        for(i = 0;i < week.length-2;i++ )
        {
            console.log(i)
            if(day==i)
            {
                document.getElementsByTagName("p")[0].innerHTML=week[i]
                document.getElementsByTagName("p")[i].innerHTML=week[i+day]
                
            }
            
            else
            {
                document.getElementsByTagName("p")[i].innerHTML=week[i+day]
            }

            if ((day==3 && i==4)||(day==4 && i==3)||(day==5 && i==2)||(day==6 && i==1))
            {
                document.getElementsByTagName("p")[i].innerHTML=week[i-i]
            }
            
            if ((day==4 && i==4)||(day==5 && i==3)||(day==6 && i==2))
            {
                document.getElementsByTagName("p")[i].innerHTML=week[i-(i-1)]
            }
            
            if((day==5 && i== 4)||(day==6 && i==3))
            {
                document.getElementsByTagName("p")[i].innerHTML=week[i-(i-2)]
            }
            if (day==6 && i==4)
            {
                document.getElementsByTagName("p")[i].innerHTML=week[i-(i-3)]
            }

            
        }
        
        const myCity=document.getElementById("town").value
        console.log(myCity);
        const API_KEY = "0a0f8a9f474b4e88ac225651e1f6375f"
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
                   .then(data=>{
                       
                    i=0;
                    while(i < 5)
                    {
                        console.log(iconDisplay= data.daily[i].weather[0].id)
                       if(iconDisplay==800)
                       {
                            document.getElementsByTagName("img")[i].src="weathers/sun.svg"  
                       }
                       if(iconDisplay==801 || iconDisplay==802)
                       {
                            document.getElementsByTagName("img")[i].src="weathers/cloudy.svg"  
                       }
                       if(iconDisplay==803 || iconDisplay==804)
                       {
                            document.getElementsByTagName("img")[i].src="weathers/clouds.svg"  
                       }
                       if(iconDisplay >=600 && iconDisplay <=622) 
                       {
                            document.getElementsByTagName("img")[i].src="weathers/snow.svg"  
                       }
                       if(iconDisplay >=600 && iconDisplay <=622) 
                       {
                            document.getElementsByTagName("img")[i].src="weathers/snow.svg"  
                       }
                       if((iconDisplay >=500 && iconDisplay <=531)||
                       (iconDisplay >=701 && iconDisplay <=781)||(iconDisplay>=200 && iconDisplay<=232)||
                       (iconDisplay>=300 && iconDisplay<=321)
                       ) 
                       {
                            document.getElementsByTagName("img")[i].src="weathers/rain.svg"  
                       }
                       i++
                    }  
                           
                       
                       
                    })
                   .catch(err => {
                   console.error('Request failed', err)
        })
        
        })
        
       
        
    })   
    
})


