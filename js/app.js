const fileInput = document.getElementById('fileUploader')
const imageAction = document.querySelector('.image-actions')
const loadedAvatar = document.querySelector('.loaded-avatar')
const ticketPhoto = document.getElementById('display-image')
const changeImageButton = document.getElementById('changeImage')
const deleteImageButton = document.getElementById('deleteImage')
const generateBtn = document.querySelector('.generate-btn')
const fullName = document.getElementById('fullName')
const emailAddress = document.getElementById('emailAddress')
const gitUserName = document.getElementById('gitUserName')
const displayName = document.querySelectorAll('.display-name')
const displayGitUserName = document.getElementById('display-github')
const displayEmailAddress = document.getElementById('display-email')
const textInputs = document.querySelectorAll('.required')


function isValidEmail(email) {
    if (!email.includes('@')) {
        return false
    }

    const parts = email.split('@')
    
    if (parts.length !== 2 || parts[0].trim() === '' || parts[1].trim() === '') {
		return false
    }

    if (!parts[1].includes('.')) {
        return false
    }

    const domainParts = parts[1].split('.');
    if (domainParts.length < 2 || domainParts[domainParts.length - 1].length < 2) {
        return false
    }

    return true;
}

function isValidGitHubUsername(username) {
    if (username.startsWith('@') && !username.includes(' ')) {
        return true
    }
	return false
}

function validateFunc() {
    let isValid = true

	document.getElementById('uploaderPhoto').style.color = 'var(--color-neutral-0)'
	document.getElementById('errorName').style.display = 'none'
	document.getElementById('errorEmail').style.display = 'none'
	document.getElementById('errorGithub').style.display = 'none'


    textInputs.forEach((input) => {
        if (input.value.trim() === '') {
            if (input.name == 'Photo') {
				document.getElementById('uploaderPhoto').style.color = 'red'
			}
			else if (input.name == 'Full name') {
				document.getElementById('errorName').style.display = 'inline-flex'
			}
			else if (input.name == 'Email') {
				document.getElementById('errorEmail').style.display = 'inline-flex'
			} 
			else if (input.name == 'GitHub Username') {
				document.getElementById('errorGithub').style.display = 'inline-flex'
			} 
			isValid = false;
        }
    })

    const email = emailAddress.value.trim()
    if (email && !isValidEmail(email)) {
		document.getElementById('errorEmail').textContent = 'Enter a valid email address.'
		document.getElementById('errorEmail').style.display = 'flex'
        isValid = false;
    }

    const gitHubUserName = gitUserName.value.trim()
    if (gitHubUserName && !isValidGitHubUsername(gitHubUserName)) {
		document.getElementById('errorGithub').textContent = 'Enter a valid GitHub username.'
		document.getElementById('errorGithub').style.display = 'flex'
        isValid = false;
    }


    return isValid
}

fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
	document.getElementById('uploaderPhoto').textContent = 'Upload your photo (JPG or PNG, max size: 500KB).'
	document.getElementById('uploaderPhoto').style.color = 'var(--color-neutral-0)'


	if (file) {
		if (file.size > 500 * 1024) {
			document.getElementById('uploaderPhoto').textContent = 'Image is too big.'
			document.getElementById('uploaderPhoto').style.color = 'red'
			fileInput.value = ''
			loadedAvatar.src = 'assets/images/icon-upload.svg'
			return
		}

		const fileType = file.type
		if (fileType !== 'image/png' && fileType !== 'image/jpeg') {
			document.getElementById('uploaderPhoto').textContent = 'Invalid file extension.'
			document.getElementById('uploaderPhoto').style.color = 'red'
			fileInput.value = ''
			loadedAvatar.src = 'assets/images/icon-upload.svg'
			return
		}

		const reader = new FileReader()
		reader.onload = (event) => {
		loadedAvatar.src = event.target.result
		loadedAvatar.style.padding = '0'
		loadedAvatar.style.transform = 'scale(1.2)'
		imageAction.style.display = 'flex'
	}
	reader.readAsDataURL(file);
	}
})

changeImageButton.addEventListener('click', () => fileInput.click())

deleteImageButton.addEventListener('click', () => {
	fileInput.value = ''
    loadedAvatar.src = 'assets/images/icon-upload.svg'
	loadedAvatar.style.width = '55px'
	loadedAvatar.style.height = '55px'
    loadedAvatar.style.padding = '10px'
	loadedAvatar.style.transform = 'scale(1)'
	imageAction.style.display = 'none'
});


generateBtn.addEventListener('click', () => {
	
	if(validateFunc()) {
		document.getElementById('header').style.display = 'none'
		document.getElementById('form').style.display = 'none'
		document.getElementById('display-data').style.display = 'block'
		ticketPhoto.src = loadedAvatar.src
		displayEmailAddress.textContent = emailAddress.value
		displayGitUserName.textContent = gitUserName.value
		displayName.forEach((name) => {
			name.textContent = fullName.value
		})
	}
})
