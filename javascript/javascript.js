var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};
var apiKey = '&api_key=OrojWAr9pY3KrMR5xHe06SOw7QeWYH12';
var patron = /^[a-zA-Z0-9 ]{1,100}$/;
let buttonSearchID = document.getElementById('buttonSearchID');
let search_suggestion = document.getElementsByClassName('search_suggestion');
let lupa = document.getElementById('lupa');
let trends__img = document.getElementById('trends__img');
let cont = 1;
let contSuggestion = 0;
let arraySearch = [];
let cancel_uploading = false;

/* buttons video */
const enableRecord = document.getElementById('enableRecord');
const video = document.querySelector("video");
const button_capture = document.getElementsByClassName('button_capture');
let buttonsStopRecord = document.getElementsByClassName('buttonsStopRecord');
let my_guifos__img = document.getElementById('my_guifos__img');
let button_up = document.getElementsByClassName('button_up');
let button_rep = document.getElementsByClassName('button_rep');
let buttons_rep_up = document.getElementsByClassName('buttons_rep_up');
let up_loading = document.getElementsByClassName('up_loading');
let button_canc_uploading = document.getElementsByClassName('button_canc_uploading');
let timerVideo = document.getElementsByClassName('timerVideo');
let form = new FormData();

let pre_record = document.getElementsByClassName('pre_record');
let create_guifos = document.getElementsByClassName('create_guifos');
let my_guifos = document.getElementsByClassName('my_guifos');
let gifos = document.getElementsByClassName('gifos');
let createGuifosHome = document.getElementsByClassName('createGuifosHome');
let timer = document.getElementsByClassName('timer');
let play_video = document.getElementsByClassName('play_video');
let success = document.getElementsByClassName('success');

let pre_record__capture = document.getElementsByClassName('pre_record__capture');
let pre_record__record = document.getElementsByClassName('pre_record__record');
let pre_record__rep_up = document.getElementsByClassName('pre_record__rep_up');
let pre_record__uploading = document.getElementsByClassName('pre_record__uploading');
let pre_record__success = document.getElementsByClassName('pre_record__success');
let buttons__copy = document.getElementsByClassName('buttons__copy');
let buttons__download = document.getElementsByClassName('buttons__download');
let search__options = document.getElementsByClassName('search__options');
let buttons_themes = document.querySelectorAll('.button_theme');
let icon_home = document.getElementsByClassName('icon_home');
let camera = document.getElementsByClassName('camera')[0];
let loading = document.getElementsByClassName('loading')[0];
let loading_up = document.getElementsByClassName('loading_up')[0];

/* behavior buttons themes */
if (localStorage.getItem('theme') === 'night') {
    document.body.setAttribute('class','Night');
    changeTheme('gifOF_logo_dark','night', 'camera_light');
} else {
    document.body.removeAttribute('class');
    changeTheme('gifOF_logo','day', 'camera'); 
}

buttons_themes[0].onclick = (event) => {
    document.body.removeAttribute('class');
    changeTheme('gifOF_logo','day');
};

buttons_themes[1].onclick = (event) => {
    document.body.setAttribute('class','Night');
    changeTheme('gifOF_logo_dark','night');
};

/* change theme */
function changeTheme(imagen, theme, image_camera) {
    document.getElementsByClassName('button_themes_them')[0].setAttribute('style', 'display:none');
    icon_home[0].setAttribute('src','img/' + imagen + '.png');
    localStorage.setItem('theme', theme);
    if (camera){
        camera.setAttribute('src','svg/' + image_camera + '.svg');
    }
}

/* show ramdon */
if (document.URL.indexOf('create') === -1 ) {
    for (let i = 0; i < 4; i++) {
        getRamdonGif();
    }
}

/* show treding */
if (document.URL.indexOf('create') === -1 ) {
    getTrending();
}

if (search__options[0]) {
    for (let i = 0; i < search__options.length; i++) {
        search__options[i].onclick = () => {
            textSearch.value = search__options[i].id;
            behaviorButtonSearch();
        }
    }
}

/* behavior text search */
let textSearch = document.getElementById('textSearch');
if (textSearch){
    textSearch.onkeydown = (event) => {
        if (event.key.match(patron)) {
            (setTimeout(()=> { 
                if (textSearch.value.match(patron)) {
                    actBehaviorSearch();
                    if (event.key === 'Enter') {
                        buttonSearchID.onclick();
                    }
                }
            } ), 1);
        } else {
            inactBehaviorSearch(false);
        };
    } ;
}

if (createGuifosHome[0] || gifos[0]){
    createGuifosHome[0].onclick = () => {
        localStorage.setItem('behavior','Create');
    };

    gifos[0].onclick = () => {
        localStorage.setItem('behavior','MyGif');
    };
}

if (localStorage.getItem('behavior') === 'Create') {
    if (pre_record[0] || create_guifos[0] || my_guifos[0]) {
        pre_record[0].setAttribute('style','display: none');
        create_guifos[0].setAttribute('style','display: block');
        my_guifos[0].setAttribute('style','display: block');
        document.getElementsByClassName('img_arrow')[0].setAttribute('style','display: block');
        document.getElementsByClassName('buttons_create_home')[0].setAttribute('style','display: none');
    }
} else if (localStorage.getItem('behavior') === 'MyGif') {
    if (pre_record[0] || create_guifos[0] || my_guifos[0]) {
        pre_record[0].setAttribute('style','display: none');
        create_guifos[0].setAttribute('style','display: none');
        my_guifos[0].setAttribute('style','display: block');
        document.getElementsByClassName('img_arrow')[0].setAttribute('style','display: none');
        document.getElementsByClassName('buttons_create_home')[0].setAttribute('style','display: flex');
    }
}


function actBehaviorSearch() {
    search_suggestion[0].setAttribute('style', 'display:block');      
    buttonSearchID.removeAttribute('disabled');
    lupa.setAttribute('src','svg/lupa.svg');
    buttonSearchID.removeAttribute('style');
    buttonSearchID.setAttribute('style','    background: #F7C9F3;border: 1px solid #110038;box-shadow: inset -1px -1px 0 0 #997D97, inset 1px 1px 0 0 #FFFFFF;');
    if (document.body.getAttribute('class')==='Night') {
        buttonSearchID.removeAttribute('style');
        buttonSearchID.setAttribute('style','background: #EE3EFE; border: 1px solid #110038; box-shadow: inset -1px -1px 0 0 #A72CB3, inset 1px 1px 0 0 #FFFFFF;');
    }
}


function inactBehaviorSearch(flat) {
    if (flat === false) textSearch.value = 'texto invalido';
    search_suggestion[0].setAttribute('style', 'display:none');
    buttonSearchID.setAttribute('disabled','true');
    lupa.setAttribute('src','svg/lupa_inactive.svg');
    buttonSearchID.removeAttribute('style');
    buttonSearchID.setAttribute('style','background: #E6E6E6; border: 1px solid #808080;box-shadow: inset -1px -1px 0 0 #B4B4B4, inset 1px 1px 0 0 #FFFFFF;');
    if (document.body.getAttribute('class')==='Night') {
        buttonSearchID.removeAttribute('style');
        buttonSearchID.setAttribute('style','background: #B4B4B4; border: 1px solid #110038; box-shadow: inset -2px -2px 0 0 #8F8F8F, inset 2px 2px 0 0 #FFFFFF;');
    }
}

/* behavior button search */
if (buttonSearchID){
    buttonSearchID.onclick = () => {
        behaviorButtonSearch();
    };
}

function behaviorButtonSearch(flatNotUpdateButtonSearch = true) {
    document.getElementsByClassName('trends__title')[0].innerHTML = textSearch.value;
    let suggestion = document.getElementsByClassName('suggestion');
    suggestion[0].setAttribute('style','display: none');
    inactBehaviorSearch(true);
    trends__img.innerHTML = '';
    getGifSearch(textSearch.value);
    if (flatNotUpdateButtonSearch) {
        let history_search = document.getElementById('history_search');
        let child = document.createElement('div');
        child.setAttribute('class', 'history_search');
        arraySearch[cont] = textSearch.value;
        if (cont === 3) cont = 0;
        cont += 1;
        history_search.innerHTML = '';
        arraySearch.forEach( element => {
            child.innerHTML = child.innerHTML + `
                <div class="history__item" id="${element}"> #${element} </div>
            `;
            child.onclick = (event) => {
                if (event.target.id){
                    textSearch.value = event.target.id;
                    behaviorButtonSearch(false);
                }
            };
        }); 
        history_search.appendChild(child);
    }
}

/* behavior button themes */
let button_theme = document.getElementsByClassName('button2');
changeButtonThem(button_theme);

button_theme = document.getElementsByClassName('button1');
changeButtonThem(button_theme);


function changeButtonThem(button) {
    button[0].onclick = function () {
        if (document.getElementsByClassName('button_themes_them')[0].style.display === 'block')
        {
            document.getElementsByClassName('button_themes_them')[0].setAttribute('style', 'display:none');
        } else {
            document.getElementsByClassName('button_themes_them')[0].setAttribute('style', 'display:block');
        }
    }
}

/* method get gif for search */
function getGifSearch(search) {
    fetch('https://api.giphy.com/v1/gifs/search?q=' + search + apiKey, requestOptions)
        .then(response => {
            return response.json();
        })
        .then(result => {
            setGifTreding(result.data);
        })
        .catch(error => console.log('error', error));
}

/* method get ramdon gif */
function getRamdonGif() {
    fetch ('https://api.giphy.com/v1/gifs/random?' + apiKey, requestOptions)
    .then(response => {
        return response.json();
    })
    .then(result => {
        setGifSuggestion(result.data)
    })
}

function setGifSuggestion(suggestionData) {
    let suggestion__img = document.getElementById('suggestion__img');
    let child = document.createElement('div');
    child.setAttribute('class', 'suggestion__img');
    child.innerHTML = `
        <div class="suggestion__bar_img">
            <div class="suggestion__title_img">
                <span id="elemento">#${suggestionData.username}</span>
            </div>
            <img src="svg/buttonX.svg" alt="Botón X" class="suggestion__buttonX">
        </div>
        <div class="suggestion__body_img">
            <img class ="gifSuggestion" src="${suggestionData.image_url}" alt="${suggestionData.title}">
            <button id="${suggestionData.username}" type="button" class="suggestion__buttonSeeMore">Ver más...</button>
        </div>
    `;
    suggestion__img.appendChild(child);
    let suggestion__buttonSeeMore = document.getElementsByClassName('suggestion__buttonSeeMore');
        suggestion__buttonSeeMore[contSuggestion].onclick = (event) => {
            textSearch.value = event.target.id;
            behaviorButtonSearch();
    };
    contSuggestion +=1;
}


/* method get treding gif */
function getTrending() {
    fetch('https://api.giphy.com/v1/gifs/trending?' + apiKey, requestOptions)
    .then(response => {
        if (response.ok) {      
            return response.json();
        }
    })
    .then(result => {
        setGifTreding(result.data);
    })
}

function setGifTreding(tredingData) {
    if (tredingData.length != 0){
        tredingData.forEach(element => {
            let child = document.createElement('div');
            child.setAttribute('class', 'trends__img');
            child.innerHTML = `
            <img id="${element.id}" class="gifTreding" src="${element.images.original.url}" alt="${element.title}">
            <div name="${element.id}" class="trends__title_img">#${element.username}</div>
            `;
            child.addEventListener("mouseover", function () {
                let trends__title_img = document.getElementsByName(element.id);
                trends__title_img[0].setAttribute('style','display : block; margin-left:4px');
            });
            child.addEventListener("mouseout", function () {
                let trends__title_img = document.getElementsByName(element.id);
                trends__title_img[0].setAttribute('style','display : none');
            });
            trends__img.appendChild(child);
        });            
    } else {
        document.getElementsByClassName('trends__title')[0].innerHTML = 'No hay resultado.';
    };
}

/* behavior Record video */
if (enableRecord) { 
    enableRecord.onclick = () => {
        getStartRecord();
        play_video[0].setAttribute('style','display: none');
        timer[0].setAttribute('style','display: none');
        pre_record[0].setAttribute('style','display: block');
        create_guifos[0].setAttribute('style','display: none');
        my_guifos[0].setAttribute('style','display: none');
        buttons_rep_up[0].setAttribute('style','display: none');
        button_capture[0].setAttribute('style','display: flex');
        /* TITLE */
        pre_record__capture[0].setAttribute('style','display: block');
        pre_record__record[0].setAttribute('style','display: none');
        pre_record__rep_up[0].setAttribute('style','display: none');
        pre_record__uploading[0].setAttribute('style','display: none');
        pre_record__success[0].setAttribute('style','display: none');
    };
}
function getStartRecord() {
    navigator.mediaDevices
        .getUserMedia({
        audio: false,
        video: {
            height: { max: 434 },
            width: { max: 840}
        }
        })

        .then(function(stream) {
        video.srcObject = stream;
        video.play();
            recorder = RecordRTC(stream, {
                type: "gif",
                frameRate: 1,
                quality: 10,
                width: 840,
                height: 434,
                hidden: 240,

                onGifRecordingStarted: function() {
                console.log("started");
                }
            });
        });
}

if (button_capture.length > 0){
    button_capture[0].onclick = function() {
        recorder.startRecording();
        play_video[0].setAttribute('style','display: none');
        timer[0].setAttribute('style','display: flex');
        button_capture[0].setAttribute('style','display: none');
        buttonsStopRecord[0].setAttribute('style','display: flex');
        buttons_rep_up[0].setAttribute('style','display: none');
        /* TITLE */
        pre_record__capture[0].setAttribute('style','display: none');
        pre_record__record[0].setAttribute('style','display: block');
        pre_record__rep_up[0].setAttribute('style','display: none');
        pre_record__uploading[0].setAttribute('style','display: none');
        pre_record__success[0].setAttribute('style','display: none');
    }
}

if (buttonsStopRecord.length > 0){
    buttonsStopRecord[0].onclick = () => {
        recorder.stopRecording(function() {
            // creamos nuestro archivo gif
            form.append("file", recorder.getBlob(), "myGif.gif");
            console.log('Archivo grabado', form.get("file"));
            play_video[0].setAttribute('style','display: flex');
            bar_prog('loading',0,17);
            timer[0].setAttribute('style','display: flex');
            button_capture[0].setAttribute('style','display: none');
            buttonsStopRecord[0].setAttribute('style','display: none');
            buttons_rep_up[0].setAttribute('style','display: flex');
            /* TITLE */
            pre_record__capture[0].setAttribute('style','display: none');
            pre_record__record[0].setAttribute('style','display: none');
            pre_record__rep_up[0].setAttribute('style','display: block');
            pre_record__uploading[0].setAttribute('style','display: none');
            pre_record__success[0].setAttribute('style','display: none');
        });
    };
}

function uploadGif(gif) {
    fetch("https://upload.giphy.com/v1/gifs?" + apiKey, {
      method: "POST", // or 'PUT'
      body: gif
    })
      .then(res => {
        console.log('res.status', res.status);
        if (res.status != 200) {
          uploadMessage.innerHTML = `<h3>Hubo un error subiendo tu Guifo</h3>`;
        }
        return res.json();
      })
      .then(data => {
        console.log('2data', data);
        saveGifLocalStorage(data.data.id);
        getGifIdOne(data.data.id);  
      })
      .catch(error => {
        uploadMessage.innerHTML = `<h3>Hubo un error subiendo tu Guifo</h3>`;
        console.error("Error:", error);
      });
  }

function saveGifLocalStorage(id){
    localStorage.setItem('videos', localStorage.getItem('videos') + ' + ' + JSON.stringify(id))
}

if (localStorage.getItem('videos') && document.URL.indexOf('create') >= 0){
    let myGifs = localStorage.getItem('videos').replace(/"/g,'').split(" + ");
    myGifs.forEach( element => {
        if (element){
            getGifId(element);
        }
    })
}

/* PINTAR GIF ID */
function getGifId(id) {
    fetch("https://api.giphy.com/v1/gifs/" + id + "?" + apiKey, requestOptions)
    .then(response => {
        if (response.ok) {      
            return response.json();
        }
    })
    .then(result => {
        setGifId(result.data);
    })
}

/* PINTAR UN GIF ID */
function getGifIdOne(id) {
    fetch("https://api.giphy.com/v1/gifs/" + id + "?" + apiKey, requestOptions)
    .then(response => {
        if (response.ok) {      
            return response.json();
        }
    })
    .then(result => {
        console.log(result.data);
        let child = document.createElement('div');
        let url = result.data.images.original.url;
        child.setAttribute('class','gifIdOne');
        child.innerHTML = `
        <img id="${result.data.id}" src="${url}" alt="${result.data.title}" style="width: 371px; height: 196px;">    
        `;
        document.getElementsByClassName('video_demo')[0].appendChild(child);
        buttons__copy[0].onclick = () => {
            const el = document.createElement('textarea');
            el.value = url;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
        };
        buttons__download[0].onclick = () => {
            window.location = url;
            console.log('url_file',url);
        };
    })
}

/* MOSTRAR GIF ID */
function setGifId(gifId) {
    let child = document.createElement('div');
    child.setAttribute('class','my_gifId');
    child.innerHTML = `
    <img id="${gifId.id}" src="${gifId.images.original.url}" alt="${gifId.title}">    
    `;
    my_guifos__img.appendChild(child);
}

/* SUBIR GIF */
if (button_up.length > 0) {
    button_up[0].onclick = () => {
        button_canc_uploading[0].setAttribute('style','display: flex');
        up_loading[0].setAttribute('style','display: flex');
        bar_prog('loading_up',0, 23);        
        video.setAttribute('style','display: none');
        buttons_rep_up[0].setAttribute('style','display: none');
        timerVideo[0].setAttribute('style','display: none');
        /* TITLE */
        pre_record__capture[0].setAttribute('style','display: none');
        pre_record__record[0].setAttribute('style','display: none');
        pre_record__rep_up[0].setAttribute('style','display: none');
        pre_record__uploading[0].setAttribute('style','display: block');
        pre_record__success[0].setAttribute('style','display: none');
        
        button_canc_uploading[0].onclick = () => {
            cancel_uploading = true;
        };

        setTimeout(()=>{
            if (!cancel_uploading) {
                button_canc_uploading[0].setAttribute('style','display: none');
                up_loading[0].setAttribute('style','display: none');
                success[0].setAttribute('style','display: block');
                my_guifos[0].setAttribute('style','display: block');
                /* TITLE */
                pre_record__capture[0].setAttribute('style','display: none');
                pre_record__record[0].setAttribute('style','display: none');
                pre_record__rep_up[0].setAttribute('style','display: none');
                pre_record__uploading[0].setAttribute('style','display: none');
                pre_record[0].setAttribute('style','display: none');
                uploadGif(form);
            }
        }, 3000);
    }
}

function bar_prog(elem, count, max) {
    if (count <= max) {
        let child = document.createElement('div');
        child.setAttribute('class','block');
        setTimeout(() => {
            if (elem === 'loading'){
                loading.appendChild(child);
            } else {
                loading_up.appendChild(child);
            }
            console.log('count:',count,'max:',max);
            count++;
            bar_prog(elem, count, max);
        }, 100);
    }
}

if (button_rep.length > 0) {
    button_rep[0].onclick = () => {
        play_video[0].setAttribute('style','display: none');
        pre_record[0].setAttribute('style','display: none');
        create_guifos[0].setAttribute('style','display: block');
        my_guifos[0].setAttribute('style','display: block');
    };
}
