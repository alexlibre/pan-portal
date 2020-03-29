const fetchData = function(url) {
    // div родитель данных
    const container = document.querySelector('.fetch');
    console.log(container);

    // функция наполняет данными родителя ^
    const hydrateContainer = function(data)  {
        // @param data - тут будут данные полученные через fetch (json)

        const id = container.querySelector('.fetch__id');
        const img = container.querySelector('.fetch__img img');
        const name = container.querySelector('.fetch__name');

        // обращаемся по ключам объекта
        id.innerText = data.id;
        img.setAttribute('src',  data.options.image);

        const header = document.createElement('h1');
        header.innerText = data.properties.hintContent

        name.appendChild(header);
    }
    
    const data = fetch(url)
        .then(function(res) {
            
            // обрабатываем сырой результат фетча - приводим его в json
            return res.json();
        })
        .then(function(result) {
            // @param data - тут будут данные полученные через fetch (json)
            console.log(result);
            hydrateContainer(result.features[0]);
        })
}



