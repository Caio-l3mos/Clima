document.querySelector('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault(); // não permite que o formulário seja enviado.

    let input = document.querySelector('#searchInput').value;

     if(input != ''){
        showWarning('carregando...')

        let url = `https://api.openweathermap.org/data/2.5/weather?q=
        ${encodeURI(input)}&units=metric&lang=pt_br&appid=ab469b4c64cda13dd4f332bfce289a28`;
       
        
        let results = await fetch(url);
        let json = await results.json();
        console.log(json)
      


        if(json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        } else {
            clearinfo();
            showWarning('Não encontramos esta localização.');
     
        }


    }else{
        clearinfo();
    }

   
})

function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg
}

function showInfo(json){

    showWarning('');
   
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML= `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h<span>`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle -90}deg)`

    document.querySelector('.resultado').style.display ='block';
}

function clearinfo(){
    document.querySelector('.resultado').style.display ='none';
}