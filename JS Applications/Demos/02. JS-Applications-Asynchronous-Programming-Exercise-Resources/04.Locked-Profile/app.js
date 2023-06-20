function lockedProfile() {

    (async () => {
        const url = 'http://localhost:3030/jsonstore/advanced/profiles';

        const res = await fetch(url);
        const profiles = await res.json();
        const main = document.getElementById('main');
        document.querySelector('.profile').remove();

        Object.keys(profiles)
            .forEach((key, i) => {
                let profile = profiles[key];
                let htmlProfile = createNewProfile(i + 1, profile.username, profile.email, profile.age);
                main.appendChild(htmlProfile);
            })
    })();

    function createNewProfile(userIndex, userName, email, age) {
        const profileDiv = document.createElement('div');
        profileDiv.classList.add('profile');

        const imgEl = document.createElement('img');
        imgEl.src = "./iconProfile2.png";
        imgEl.classList.add('userIcon');

        const lockLabelEl = document.createElement('label');
        lockLabelEl.textContent = 'Lock';

        const lockChekcerInp = document.createElement('input');
        lockChekcerInp.type = 'radio';
        lockChekcerInp.name = `user${userIndex}Locked`;
        lockChekcerInp.value = 'lock';
        lockChekcerInp.checked = true;

        const unlockLabelEl = document.createElement('label');
        unlockLabelEl.textContent = 'Unlock';

        const unlockChekcerInp = document.createElement('input');
        unlockChekcerInp.type = 'radio';
        unlockChekcerInp.name = `user${userIndex}Locked`;
        unlockChekcerInp.value = 'unlock';

        const brEl = document.createElement('br');

        const hrEl1 = document.createElement('hr');

        const userNameLabel = document.createElement('label');
        userNameLabel.textContent = 'Username';

        const userNameInp = document.createElement('input');
        userNameInp.type = 'text';
        userNameInp.name = `user${userIndex}Locked`;
        userNameInp.value = userName;
        userNameInp.disabled = true;
        userNameInp.readOnly = true;

        const divHideInfo = document.createElement('div');
        divHideInfo.style.display = 'none';

        const hrEl2 = document.createElement('hr');

        const emailLabelEl = document.createElement('label');
        emailLabelEl.textContent = 'Email:';

        const emailInp = document.createElement('input');
        emailInp.type = 'email';
        emailInp.name = `user${userIndex}Email`;
        emailInp.value = email;
        emailInp.disabled = true;
        emailInp.readOnly = true;

        const ageLabelEl = document.createElement('label');
        ageLabelEl.textContent = 'Age:';

        const ageInp = document.createElement('input');
        ageInp.type = 'email';
        ageInp.name = `user${userIndex}Age`;
        ageInp.value = age;
        ageInp.disabled = true;
        ageInp.readOnly = true;

        const showMoreBtn = document.createElement('button');
        showMoreBtn.textContent = 'Show more';
        showMoreBtn.addEventListener('click', showInfoHandler)

        divHideInfo.appendChild(hrEl2);
        divHideInfo.appendChild(emailLabelEl);
        divHideInfo.appendChild(emailInp);
        divHideInfo.appendChild(ageLabelEl);
        divHideInfo.appendChild(ageInp);

        profileDiv.appendChild(imgEl);
        profileDiv.appendChild(lockLabelEl);
        profileDiv.appendChild(lockChekcerInp);
        profileDiv.appendChild(unlockLabelEl);
        profileDiv.appendChild(unlockChekcerInp);
        profileDiv.appendChild(brEl);
        profileDiv.appendChild(hrEl1);
        profileDiv.appendChild(userNameLabel);
        profileDiv.appendChild(userNameInp);
        profileDiv.appendChild(divHideInfo);
        profileDiv.appendChild(showMoreBtn);

        return profileDiv;
    }

    function showInfoHandler(e){
        let profile = e.target.parentElement;
        let hiddenInfo = e.target.previousSibling;
        let radioBtn = profile.querySelector('input[type="radio"]:checked');
        let showMoreBtn = e.target;

        if (radioBtn.value != 'unlock'){
            return;
        }

        showMoreBtn.textContent = showMoreBtn.textContent === 'Show more' 
            ? 'Hide it' 
            : 'Show more';
        
        hiddenInfo.style.display = hiddenInfo.style.display === 'block'
            ? 'none'
            : 'block';
    }
}