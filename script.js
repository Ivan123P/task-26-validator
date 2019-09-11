'use sctrict';

function Validator(options) {
  // получаю выборку формы
  this.form = $(options.form);
  // обьект со списком инпутов
  this.inputs = options.inputs;
  // массив обьектов со списком правил
  this.ruls = options.ruls;
  this.messageErrorDiv = '<div class="message-error"></div>';

  // навешиваю события
  this.init();
}

Validator.prototype.init = function() {
  // перебираю обьект инпутов для передачи каждого в функцию обработчик this == Validator
  $.each( this.inputs, (i, val) => {
    // передаю текущий элемент и набор правил. this == Validator
    this.onBlur(val, this.ruls);
    this.onInput(val);
  });
}

Validator.prototype.onBlur = function(element, ruls) {
  // Ссылка на Validator для использования его методов
  const mainObj = this;

  // находим нужные элементы в нашей форме
  $.each($(mainObj.form).find(element), (i, val) => {
    // инициализирую на каждом слушатель события потери фокуса (blur)
    $(val).on('blur', function(e) {

      // сортирую по типу для вызова нужных правил
      if($(this).attr("type") === "text") {
        if(mainObj.minLength($(this), ruls.minLength)) {
          $(this).addClass('error');
        } else {
          $(this).removeClass('error');
        }

      } else if ($(this).attr("type") === "tel") {
        if(mainObj.phone($(this), ruls.phone) || mainObj.minLength($(this), ruls.minLength)) {
          $(this).addClass('error');
        } else {
          $(this).removeClass('error');
        }

      } else if ($(this).attr("type") === "email") {
        if(mainObj.email($(this), ruls.email)) {
          $(this).addClass('error');
        } else {
          $(this).removeClass('error');
        }

      } else if ($(this).attr("type") === "password") {
        if(mainObj.password($(this), ruls.password)) {
          $(this).addClass('error');
        } else {
          $(this).removeClass('error');
        }
      }
    })
  });
}

Validator.prototype.onInput = function(element) {
  $.each($(this.form).find(element), (i, element) => {
    $(element).on('input', function(e) {
      if($(this).hasClass('error')) {
        $(this).removeClass('error');
      }
      if($(this).prev('.message-error')) {
        $(this).prev('.message-error').detach();
      }
    });
  });
}

Validator.prototype.minLength = function(val, min) {
  // если количество символов меньше min то указываем на ошибку - true ошибка есть
  if(val.val().length < min) {
    this.addErrorMessage(val, "Необходимо ввести минимум 4 символа");
    return true;
  }
  // иначе ошибки нет и элемент валиден
  return false;
}

Validator.prototype.email = function(val, rul) {
  // если match === null(иначе вернул бы обьект с совпадением) то указываем на ошибку - true ошибка есть
  if(val.val().match(rul) === null) {
    this.addErrorMessage(val, "Введите корректный email. simple@example.com");
    return true;
  }
  return false;
}

Validator.prototype.phone = function(val, rul) {
  if(val.val().match(rul) === null) {
    this.addErrorMessage(val, "Введенные данные не должны содержать символы");
    return true;
  }
  return false;
}

Validator.prototype.password = function(val, rul) {
  if(val.val().match(rul) === null) {
    this.addErrorMessage(val, "Пароль должен состоять из минимум 1 цифры, 1 латинской буквы и содержать 8 символов");
    return true;
  }
  return false;
}

Validator.prototype.addErrorMessage = function(element, text) {
  if(element.prev('.message-error').length === 0) {
    element.before($(this.messageErrorDiv).clone().text(text));
  }
}

Validator.prototype.validate = function() {
}

const validator = new Validator({
  form: '.js_validate',
  inputs: {
    text: 'input[type=text]:required',
    tel: 'input[type=tel]:required',
    email: 'input[type=email]:required',
    password: 'input[type=password]:required'
  },
  ruls:
    {
      minLength: 4,
      email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      phone: /^[0-9]*$/,
      password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    }
});

validator.validate();

// const minLength = 10;
// const inputs = $('input');

// $('form').on('submit', function(e) {
//   const inputNameValue = $('.input-name').val();
//   if(inputNameValue === '') {
//     return false;
//   }

// });

//----------------------------------------- change \/



// inputs.on('change', function() {
//   console.log($(this).val());
// });
//----------------------------------------- focus \/

// inputs.on('focus', function() {
//   console.log($(this).val());
// });
//----------------------------------------- blur \/

// inputs.on('blur', function() {
//   if($(this).val().length < minLength) {
//     $('input[type=submit]').attr('disabled', true);
//   } else {
//     $('input[type=submit]').attr('disabled', false);
//   }

//   console.log($(this).val());
// });
