const nameForm = document.getElementById('nameForm')
const nameInput = nameForm.querySelector('#nameInput')

const nameFormError = document.querySelector('#mainScreen .error')
const nameFormErrorMessage = nameFormError.querySelector('#errorMessage')

const roomChoosingScreen = document.getElementById('roomChoosingScreen')
const roomChoosingScreenClose = document.getElementById('closeRoomChoosingScreen')

const joinRoom = document.getElementById('joinRoom')

const bottomWidget = document.getElementById('bottomWidget')
const bottomWidgetClose = bottomWidget.querySelector('.topbar .close')
const overlay = document.getElementById('overlay')

const roomCodeForm = document.getElementById('roomCodeForm')
const roomCodeInput = document.getElementById('roomCodeInput')

const BW_mainbar = document.querySelector('#bottomWidget .mainbar')
const BW_loader = document.querySelector('#bottomWidget .loader')
const BW_notification = document.querySelector('#bottomWidget .notification')
const BW_notificationErrorMessage = BW_notification.querySelector('.errorMessage')
const BW_notificationTryRefill = BW_notification.querySelector('.container #tryRefill')

let user = null
const nameFormErrors = {
	NO_NAME: 'Isilah form berikut!',
	INCLUDES_SPACES: 'Nama tidak boleh menggunakan spasi!',
	SHORT_NAME: 'Masukkan minimal 6 huruf!'
}
const BW_errors = {
	NO_CODE: 'Isilah Kode Room pada form!',
	NOT_FOUND: 'Room tidak ditemukan!',
	SLOW_CONNECTION: 'Koneksi kurang baik!',
	INTERNAL_ERROR: 'Terdapat error internal!'
}

const showNameFormError = (errorMessageId) => {
	errorMessage.textContent = nameFormErrors[errorMessageId]
	nameFormError.classList.add('show')
}

const BW_showMainbar = () => {
	BW_mainbar.classList.add('show')
	BW_loader.classList.remove('show')
	BW_notification.classList.remove('show')

	bottomWidgetClose.classList.add('show')
}

const BW_load = () => {
	BW_mainbar.classList.remove('show')
	BW_loader.classList.add('show')
	BW_notification.classList.remove('show')

	bottomWidgetClose.classList.remove('show')

	setTimeout(() => {
		BW_notify('SLOW_CONNECTION')
	}, 5000)
}

const BW_notify = (err, isCustom = false) => {
	BW_mainbar.classList.remove('show')
	BW_loader.classList.remove('show')
	BW_notification.classList.add('show')

	bottomWidgetClose.classList.add('show')
	BW_notificationErrorMessage.innerHTML = isCustom? err : BW_errors[err]
}

nameForm.addEventListener('submit', e => {
	e.preventDefault()
	const name = nameInput.value.trim()
	if(name.length === 0) showNameFormError('NO_NAME')
	else if(name.includes(' ')) showNameFormError('INCLUDES_SPACES') 
	else if(name.length < 6) showNameFormError('SHORT_NAME')
	else {
		nameFormError.classList.remove('show')
		user = name
		roomChoosingScreen.classList.add('show')
	}
})

roomChoosingScreenClose.addEventListener('click', e => {
	if(roomChoosingScreen.classList.contains('show')) roomChoosingScreen.classList.remove('show')
})

joinRoom.addEventListener('click', e => {
	if(roomChoosingScreen.classList.contains('show')) {
		bottomWidget.classList.add('show')
		overlay.classList.add('show')
		BW_showMainbar()
	}
})

bottomWidgetClose.addEventListener('click', e => {
	if(bottomWidget.classList.contains('show')) {
		bottomWidget.classList.remove('show')
		overlay.classList.remove('show')
	}
})

roomCodeForm.addEventListener('submit', e => {
	e.preventDefault()
	const roomCode = roomCodeInput.value.trim()
	if(roomCode.length === 0) BW_notify('NO_CODE')
	else BW_load()
})

BW_notificationTryRefill.addEventListener('click', () => {
	if(bottomWidget.classList.contains('show')) BW_showMainbar()
})