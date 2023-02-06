// Домашнее задание к занятию 3.1 «Асинхронные запросы»
// Загрузка больших файлов

const URLPost = 'https://students.netoservices.ru/nestjs-backend/upload',
    progress = document.getElementById( 'progress' ),
    fileSendForm = document.getElementById( 'form' ),
    fileInput = document.getElementById( 'file' ),
    buttonSend = document.getElementById( 'send' )
;

function setSendFileFormHandlers() {
    let handlers = {}

    handlers.clickOnSendButton = (event) => {
        xhr.send(formData);
        event.preventDefault();
    }

    handlers.sendFile = (event) => setTimeout( () => alert(
        `${xhr.status}: ${xhr.statusText}. ${JSON.parse(xhr.response).message}!`
    ), 100);

    handlers.updateProgress = (event) => progress.value = event.loaded / event.total;

    handlers.loaderTransferFailed = (event) => alert(`При отправке файла произошла ошибка! (${xhr.status})`);

    return handlers;
}

function setEventHandlers() {
    let handlers = {};
    handlers.sendFileForm = setSendFileFormHandlers();
    return handlers;
}


let formData = new FormData(fileSendForm),
    myHandlers = setEventHandlers();

const xhr = new XMLHttpRequest();

xhr.upload.onloadend = myHandlers.sendFileForm.sendFile;
xhr.upload.onprogress = myHandlers.sendFileForm.updateProgress;
xhr.upload.onerror = myHandlers.sendFileForm.loaderTransferFailed;

xhr.open('POST', URLPost, true);
buttonSend.addEventListener('click', myHandlers.sendFileForm.clickOnSendButton);


