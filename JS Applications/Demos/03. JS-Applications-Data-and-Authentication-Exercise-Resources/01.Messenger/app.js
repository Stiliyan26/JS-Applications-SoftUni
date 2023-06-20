
function attachEvents() {
    const textArea = document.getElementById('messages');
    const name = document.querySelector('input[name="author"]');
    const message = document.querySelector('input[name="content"]');

    const sendBtn = document.getElementById('submit');
    const refreshBtn = document.getElementById('refresh');

    sendBtn.addEventListener('click', postMessage)
    refreshBtn.addEventListener('click', getAllMessages)

    async function getAllMessages() {
        try {
            const url = 'http://localhost:3030/jsonstore/messenger';

            const response = await fetch(url);
            const getMessageResult = await response.json();

            const messageStr = Object.values(getMessageResult)
                .map(message => `${message.author}: ${message.content}`)
                .join(`\n`);

            textArea.value = messageStr;
        }
        catch(err){
            console.error(err);
        }
    }

    async function postMessage() {
        try {
            const url = 'http://localhost:3030/jsonstore/messenger';

            const newMessage = {
                author: name.value,
                content: message.value,
            };

            const createResponse = await fetch(url, {
                method: 'Post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newMessage)
            });

            let createResult = await createResponse.json();
            textArea.value = text.value + `\n${createResult.author}: ${createResult.content}`;
        }
        catch (err) {
            console.error(err);
        }
    }
}

attachEvents();