const cityForm = document.querySelector(`.change-location`);
const card = document.querySelector(`.card`);
const details = document.querySelector(`.details`);
const time = document.querySelector(`img.time`);
const icon = document.querySelector(`.icon img`);
const background = document.querySelector(`.custom-background`);
const forecast = new Forecast();

const updateUI = data => {
    const { cityDet, weather, wall } = data;
    //update details template
    details.innerHTML = `
                <h5 class="my-3">${cityDet.EnglishName}</h5>
                <div class="my-3">${weather.WeatherText}</div>
                <div class="display-4 my-4">
                    <span>${weather.Temperature.Metric.Value}</span>
                    <span>&deg;C</span>
                </div>
    `;
    //update nigt and day images and icons
    const iconSource = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute(`src`, iconSource);

    let timeSource = null;
    weather.IsDayTime
    ? timeSource = `img/day.svg`
    : timeSource = `img/night.svg`;
    time.setAttribute(`src`, timeSource);

    //update background
    const wallUrl = wall[0].urls.regular;
    background.style.cssText = `
    background: url("${wallUrl}");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    `;
    //add animation
    if(wall[1] === 200) {
        background.classList.add('background-animation');
    setTimeout(() => {
        background.classList.remove('background-animation');
    }, 2500);
    }

    if(card.classList.contains(`d-none`)) {
        card.classList.remove(`d-none`);
    }
}

cityForm.addEventListener(`submit`, e => {
    e.preventDefault();
    const city = cityForm.city.value.trim();
    cityForm.reset();

    //update ui with city
    forecast.updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    // add local storage
    localStorage.setItem('city', city);
});

if(localStorage.getItem('city')) {
    forecast.updateCity(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}
