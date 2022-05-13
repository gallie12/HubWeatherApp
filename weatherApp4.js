document.addEventListener("DOMContentLoaded", function() 
{   
    
    let valid = document.getElementById("valid")    
    const newDate = new Date();
    const day = newDate.getDay()
    let week=['sunday', 'monday', 'tuesday' , 'wednesday', 'thursday',
        'friday', 'saturday']
    selectNumberDay = document.getElementById("days_select")
    selectNumberDay.addEventListener("change",function(){
        for(i=0;i < 7;i++)
        {
            document.getElementsByTagName("p")[i].innerHTML=""
            document.getElementsByTagName("img")[i].src=""
        }
    })
    function iconDayDisplayer(iconDisplay) 
    {
        if(iconDisplay==800)
        {
                document.getElementsByTagName("img")[i].src="./weathers/sun.svg"  
        }
        if(iconDisplay==801 || iconDisplay==802)
        {
                document.getElementsByTagName("img")[i].src="./weathers/cloudy.svg"  
        }
        if(iconDisplay==803 || iconDisplay==804)
        {
                document.getElementsByTagName("img")[i].src="./weathers/clouds.svg"  
        }
        if(iconDisplay >=600 && iconDisplay <=622) 
        {
                document.getElementsByTagName("img")[i].src="./weathers/snow.svg"  
        }
        if(iconDisplay >=600 && iconDisplay <=622) 
        {
                document.getElementsByTagName("img")[i].src="./weathers/snow.svg"  
        }
        if((iconDisplay >=500 && iconDisplay <=531)||
        (iconDisplay >=701 && iconDisplay <=781)||(iconDisplay>=200 && iconDisplay<=232)||
        (iconDisplay>=300 && iconDisplay<=321)
        ) 
        {
                document.getElementsByTagName("img")[i].src="./weathers/rain.svg"  
        }
        if(day==i)
        {
            document.getElementsByTagName("p")[0].innerHTML=week[i]
            document.getElementsByTagName("p")[i].innerHTML=week[i+day]
            
        }
        
        else
        {
            document.getElementsByTagName("p")[i].innerHTML=week[i+day]
        }

        if ((day==1 && i==6)||(day==2 && i==5)||(day==3 && i==4)||(day==4 && i==3)||(day==5 && i==2)||(day==6 && i==1))
        {
            document.getElementsByTagName("p")[i].innerHTML=week[i-i]
        }
        
        if ((day==4 && i==4)||(day==5 && i==3)||(day==6 && i==2)||(day==3 && i==5)||(day==2 && i==6))
        {
            document.getElementsByTagName("p")[i].innerHTML=week[i-(i-1)]
        }
        
        if((day==5 && i== 4)||(day==6 && i==3)||(day==3 && i==6)||(day==4 && i==5)
        ||(day==5 && i==6))
        {
            document.getElementsByTagName("p")[i].innerHTML=week[i-(i-2)]
        }
        if ((day==6 && i==4)||(day==4 && i==6)||(day==5 && i==5))
        {
            document.getElementsByTagName("p")[i].innerHTML=week[i-(i-3)]
        }
        if ((day==6 && i==5))
        {
            document.getElementsByTagName("p")[i].innerHTML=week[i-(i-4)]
        }
        if ((day==6 && i==6))
        {
            document.getElementsByTagName("p")[i].innerHTML=week[i-(i-5)]
        }
        
    }
    function fetchCall(API) 
    {
        return fetch(URL2)
        .then(response => response.json())
        .then(data=>{
           return data
        })
        .catch(err => {
            console.error('Request failed', err)
        })  
    }
    function SelectDay() 
    {
        numberDayDisplayer = selectNumberDay.selectedIndex
        indexNumberDay = 7-numberDayDisplayer
        
    }
      
    valid.addEventListener("click",function(){
    
        SelectDay()
        const myCity=document.getElementById("town").value
        const API_KEY = "0a0f8a9f474b4e88ac225651e1f6375f"
        let URL = `https://api.opencagedata.com/geocode/v1/json?q=${myCity}&key=${API_KEY}&language=fr&pretty=1`
            
        fetch(URL) 
            .then(response => { 
            if (response.status == 200) { 
                return response.json() 
            }
            else console.log(`Erreur lorsqu'on a tenté de récupérer les data`);
            })
            .then(data => {
                const lattitude=data.results[0].geometry.lat
                const longitude=data.results[0].geometry.lng;
                const API_KEY2="95bc2844cb84b960d71387c403eede5f"
                URL2=`https://api.openweathermap.org/data/2.5/onecall?lat=${lattitude}&lon=${longitude}&appid=${API_KEY2}`
                fetchCall(URL2)
                    .then(data => {
                        i=0;
                        while(i < week.length-indexNumberDay)
                        {
                            iconDisplay= data.daily[i].weather[0].id
                            iconDayDisplayer(iconDisplay)
                            
                            i++
                        }
                    })
            })   
    })
})