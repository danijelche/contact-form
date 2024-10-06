document.addEventListener('DOMContentLoaded', ()=> {
	const form = document.querySelector('form');
	
	form.addEventListener('submit', (e)=>{
		e.preventDefault();
		
		const isNameValid = validateName();
		const isEmailValid = validateEmail();
		const isQueryValid = validateQuery();
		const isTextValid = validateText();
		const isConsentChecked = validateTerms();
		
		if(isNameValid && isEmailValid && isQueryValid && isTextValid && isConsentChecked) {
			submitMessage();
		}
	})
	
	function submitMessage() {
		const message = document.querySelector('.message');
		message.style.display = 'block';
		setTimeout(()=> {
			message.style.display = 'none';
		},3000);
		
		document.querySelectorAll('.gen-enq, .sup-req').forEach(label => { 
		 label.classList.remove('selected'); 
		 });
		
		form.reset();
	}
	
	// Validate first and last name
	function validateName(){
		const firstName = document.getElementById('fName');
		const lastName = document.getElementById('lName');
		const firstNameError = document.querySelector('.firstName-error');
		const lastNameError = document.querySelector('.lastName-error');
		
		// Clear previous errors and styles
		firstNameError.textContent = '';
		lastNameError.textContent = '';
		firstName.style.borderColor = '';
		lastName.style.borderColor = '';
		
		let isValid = true;
		
		//Validate first name
		if(!firstName.value) {
			firstNameError.textContent = 'First name is required';
			firstName.style.borderColor = 'red';
			firstNameError.style.display = 'block';
			isValid = false;
		} else if (!/^[A-Za-z]+$/.test(firstName.value)) {
			firstNameError.textContent = 'Enter a valid first name';
            firstName.style.borderColor = 'red';
            firstNameError.style.display = 'block';
            isValid = false;
		}
		
		//Validate last name
		if(!lastName.value){
			lastNameError.textContent = 'Last name is required';
			lastName.style.borderColor = 'red';
			lastNameError.style.display = 'block'
			isValid = false;
		} else if(!/^[A-Za-z]+$/.test(lastName.value)){
			lastNameError.textContent = 'Enter a valid last name';
            lastName.style.borderColor = 'red';
            lastNameError.style.display = 'block';
            isValid = false;
		}
		return isValid;
	}
	
	// Validate Email
	function validateEmail() {
		const email = document.getElementById('email');
		const emailError = document.querySelector('.email-error')
		const emailRequiredError = document.querySelector('.requiredEmail-error');
		
		//Clear previous errors and styles
		email.style.borderColor = '';
		emailError.style.display = 'none';
		emailRequiredError.style.display = 'none';
		
		let isValid = true;
		
		if(!email.value) {
			email.style.borderColor = 'red';
			emailRequiredError.style.display = 'block';
			emailRequiredError.textContent = 'Email is required';
			isValid = false;
		} else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
			email.style.borderColor = 'red';
			emailError.style.display = 'block';
			emailError.textContent = 'Enter a valid email address';
			isValid = false;
		}
		return isValid;
		
	}
	
	// Validate query options
	function validateQuery() {
		const queryOptions = document.querySelectorAll('input[name="query"]');
		const queryError = document.querySelector('.query-error');
		
		// Clear previous styles and errors
		queryError.style.display = 'none';
		queryError.textContent = '';
		document.querySelector('.gen-enq').classList.remove('selected');
		document.querySelector('.sup-req').classList.remove('selected');
		let isValid = false;
		
		queryOptions.forEach(query => {
			if(query.checked) {
				isValid = true;
				if(query.id === 'generalEnquiry') {
					document.querySelector('.gen-enq').classList.add('selected');
				} else if(query.id === 'supportRequest') {
					document.querySelector('.sup-req').classList.add('selected');
				}
				
			}
		})
		// Show error if neither one option selected
		if(!isValid) {
			queryError.textContent = 'Please select an query type';
            queryError.style.display = 'block';
		}
		return isValid;
	}
	
	// Validate text message
	function validateText() {
		const textArea = document.getElementById('message');
		const textError = document.querySelector('.textArea-error');
		
		// Clear previous styles and errors
		textArea.style.borderColor = '';
		textError.style.display = 'none';
		
		let isValid = true;
		
		// Text area validation
		if(!textArea.value) {
			textArea.style.borderColor = 'red';
			textError.style.display = 'block';
			isValid = false;
		}
		return isValid; 
	}
	
	// Validate the terms and conditions checkbox
	function validateTerms() {
		const consentCheckbox = document.getElementById('consent');
		const consentError = document.querySelector('.terms-error');
		let isValid = true;
		
		if(consentCheckbox.checked) {
			consentError.style.display = 'none'
		} else {
			consentError.style.display = 'block';
			isValid = false;
		}
		return isValid;
	}
	document.querySelectorAll('input[name="query"]').forEach(option => {
		option.addEventListener('change', validateQuery);
	})
})