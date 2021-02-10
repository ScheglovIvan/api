//
// Forms
//

'use strict';

//
// Form control
//

var FormControl = (function() {

	// Variables

	var $input = $('.form-control'),
		$indeterminateCheckbox = $('[data-toggle="indeterminate"]');


	// Methods

	function init($this) {
		$this.on('focus blur', function(e) {
        	$(this).parents('.form-group').toggleClass('focused', (e.type === 'focus'));
    	}).trigger('blur');
	}


	// Events

	if ($input.length) {
		init($input);
	}

	// Add indeterminate state to a checkbox
	if($indeterminateCheckbox.length) {
		$indeterminateCheckbox.each(function() {
			$(this).prop('indeterminate', true)
		})
	}

})();


//
// Custom input file
//


const FormSend = (function () {

	const $formSend = $('form.send-form');
	if(!$formSend) return false;

	function clearErrorMessages() {
		$('.error-form').html('');
		$('.error-form').removeClass('d-none');
	}

	function hideErrorMessages() {
		$('.error-form').addClass('d-none');
		$('.error-form-exist').addClass('d-none');
	}

	function showErrorMessages() {
		$('.error-form').removeClass('d-none');
	}

	function showPreloader() {
		$('body').loading({
			stoppable: false,
			theme: 'dark',
			message: 'Подождите, Загружаем ваш аккаунт...'
		});
	}

	function hidePreloader() {
		$('body').loading('stop');
	}

	$($formSend).on('submit', function (e) {

		e.preventDefault();
		const action = $(this).attr('action');
		const method = $(this).attr('method');
		const form  = new FormData($formSend[0]);

		if(action === '/instagram/add') {
			showPreloader();
		}

		clearErrorMessages();
		hideErrorMessages();

		let object = {};
		form.forEach(function(value, key){
			object[key] = value;
		});
		let json = JSON.stringify(object);

		$.ajax({
			type: method,
			url: action,
			data: json,
			processData: false,
			success: function (response) {

				// console.log(response);

				if(response.access_token) {
					window.location.assign('/');
				}

				if(response.createdAt) {
					window.location.assign('/login');
				}

				if(response === 'success') {
					clearErrorMessages();
					hideErrorMessages();
					hidePreloader();
				}

				if(action === '/instagram/add') {
					console.log('hide');
					hidePreloader();
					window.location.assign('/');
				}
				if(response.finish) {
					hidePreloader();
					window.location.assign('/');
				}
				if(response.exist) {
					$('.error-form-exist').removeClass('d-none');
				}
				if (response.redirectHome) {
					window.location.assign('/');
				}
				else {
					if(response.balance && response._id) {
						window.location.assign('/login');
					}
					// window.location.assign('/');
				}
			},
			contentType: "application/json; charset=utf-8",
		}).fail((fail) => {
			clearErrorMessages();
			hidePreloader();
			let response = fail.responseJSON;
			if(fail.status) {
				response.message = ['Проверьте данные для входа и повторите попытку!'];
			}
			if(!Array.isArray(response.message) && typeof response.message === 'string') {
				response.message = ['Ошибка, повторите попытку!'];
			}
			if(response.message.length && Array.isArray(response.message)) {
				response.message.forEach(el => {
					$('.error-form').append($('<div>').text(el));
				})
			}
		})

	});

})();



var CustomInputFile = (function() {

	// Variables

	var $customInputFile = $('.custom-input-file');


	// Methods

	function change($input, $this, $e) {
		var fileName,
			$label = $input.next('label'),
			labelVal = $label.html();

		if ($this && $this.files.length > 1) {
			fileName = ($this.getAttribute('data-multiple-caption') || '').replace('{count}', $this.files.length);
		}
		else if ($e.target.value) {
			fileName = $e.target.value.split('\\').pop();
		}

		if (fileName) {
			$label.find('span').html(fileName);
		}
		else {
			$label.html(labelVal);
		}
	}

	function focus($input) {
		$input.addClass('has-focus');
	}

	function blur($input) {
		$input.removeClass('has-focus');
	}


	// Events

	if ($customInputFile.length) {
		$customInputFile.each(function() {
			var $input = $(this);

			$input.on('change', function(e) {
				var $this = this,
					$e = e;

				change($input, $this, $e);
	        });

	        // Firefox bug fix
	        $input.on('focus', function() {
	            focus($input);
	        })
	        .on('blur', function() {
	            blur($input);
	        });
		});
	}
})();
