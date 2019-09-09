'use sctrict';

function Validator(options) {
  // получаю выборку формы
  this.form = $(options.form);
  // обьект со списком инпутов
  this.inputs = options.inputs;
  // массив обьектов со списком правил
  this.ruls = options.ruls;

  // навешиваю события
  this.init();
}

Validator.prototype.init = function() {
  // перебираю обьект инпутов для передачи каждого в функцию обработчик this == Validator
  $.each( this.inputs, (i, val) => {
    // передаю текущий элемент и набор правил. this == Validator
    this.onBlur(val, this.ruls);
  });
}

Validator.prototype.onBlur = function(element, ruls) {
  // Ссылка на Validator для использования его методов
  const mainObj = this;

  // перебираю выборку element
  $.each($(element), (i, val) => {
    // инициализирую на каждом слушатель события потери фокуса (blur)
    $(val).on('blur', function(e) {

      // сортирую по типу для вызова нужных правил
      if($(this).attr("type") === "text") {
        if(mainObj.minLength($(this).val(), ruls[0].value)) {
          $(this).addClass('error');
        } else {
          $(this).removeClass('error');
        }

      } else if ($(this).attr("type") === "tel") {
        if(mainObj.minLength($(this).val(), ruls[0].value)) {
          $(this).addClass('error');
        } else {
          $(this).removeClass('error');
        }

      } else if ($(this).attr("type") === "email") {
        if(mainObj.minLength($(this).val(), ruls[0].value)) {
          $(this).addClass('error');
        } else {
          $(this).removeClass('error');
        }

      } else if ($(this).attr("type") === "password") {
        if(mainObj.minLength($(this).val(), ruls[0].value)) {
          $(this).addClass('error');
        } else {
          $(this).removeClass('error');
        }
      }
    })
  });
}

Validator.prototype.minLength = function(val, min) {
  // если количество символов меньше min то указываем на ошибку - true ошибка есть
  if(val.length < min) {
    return true;
  }
  // иначе ошибки нет и элемент валиден
  return false;
}

Validator.prototype.latinAlphabet = function(val, min) {}

Validator.prototype.numbers = function(val, min) {}

Validator.prototype.hasAtSymbol = function(val, min) {}

Validator.prototype.validate = function() {
  this.ruls.forEach((el, i) => {
    console.log(this.ruls[0]);
  });
}

const validator = new Validator({
  form: '.js_validate',
  inputs: {
    text: 'input[type=text]:required',
    tel: 'input[type=tel]:required',
    email: 'input[type=email]:required',
    password: 'input[type=password]:required'
  },
  ruls: [
    {
      key: "minLength",
      value: 4
    },
    {
      key: "latinAlphabet",
      value: 4
    },
    {
      key: "numbers",
      value: 4
    },
    {
      key: "hasAtSymbol",
      value: 4
    }
  ]
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