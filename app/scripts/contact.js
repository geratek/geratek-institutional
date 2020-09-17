const $contactForm = document.querySelector('#contact form')

Inputmask({ mask: '(99) 99999-9999', }).mask('input[type="tel"]');

class FieldValidator {
  static notBlank(value) {
    return /\S/.test(value)
  };

  static email(value) {
    return !FieldValidator.notBlank(value) || /^.+@.+\..+$/.test(value)
  };

  static phone(value) {
    return !FieldValidator.notBlank(value) || /^\(?\d{2}\)?\s\d{4,5}\-\d{4}$/.test(value)
  }

  static number(value) {
    return !FieldValidator.notBlank(value) || /^[+-][0-9.,]+$/.test(value) && parseFloat(value.replace(/[^0-9.,]/g, '')) != NaN
  }
}

class ValidateFields {
  constructor(form, callback = () => {}) {
    this.form = form
    this.fields = Array.from(form.querySelectorAll('input[data-validation], select[data-validation], textarea[data-validation]'))
    this.callback = callback
    this.onLoad()
  }

  onLoad() {
    this.fields.forEach(field => {
      field.addEventListener('blur', this.onBlur.bind(this))
      field.addEventListener('input', this.onInput.bind(this))
    })

    const submitButtons = this.form.querySelectorAll('button[type=\'submit\']')
    submitButtons.forEach(button => {
      button.addEventListener('click', this.onSubmit.bind(this))
    })
  }

  onBlur(event) {
    if (event.currentTarget) {
      this.validateField(event.currentTarget)
    }
  }

  onInput(event) {
    if (event.currentTarget && event.currentTarget.classList.contains('is-danger')) {
      this.validateField(event.currentTarget)
    }
  }

  onSubmit(event) {
    event.preventDefault()

    const hasErrors = this.validateFields(this.fields)

    if (!hasErrors) {
      this.callback(event)
    }
  }

  validateFields(fields, silently = false) {
    let hasErrors = false
    fields.forEach(field => {
      const thisField = this.validateField(field, silently)
      hasErrors = hasErrors || thisField;
    })

    return hasErrors;
  }

  validateField(field, silently = false) {
    const validator = this.getValidatorFunction(field.dataset.validation || '')
    const parent = this.searchForParent(field, 'field')
    const messages = parent.querySelectorAll('.help.is-danger')
    let val = field.value || ''
    let hasErrors = !validator(val)

    if (!silently) {
      field.classList.toggle('is-danger', hasErrors)

      Array.from(messages).forEach(message => {
        message.classList.toggle('is-hidden', !hasErrors)
      })
    }

    return hasErrors
  }

  searchForParent(field, className) {
    let currentAncestor = field

    do {
      if (currentAncestor.parentElement !== null) {
        currentAncestor = currentAncestor.parentElement
      } else {
        break
      }
    } while (currentAncestor && currentAncestor.parentElement && !currentAncestor.classList.contains(className))

    return currentAncestor
  }

  getValidatorFunction(dataValidationAttr) {
    if (dataValidationAttr !== null && dataValidationAttr !== undefined) {
      const validators = dataValidationAttr.split(' ')

      let resultArr = []

      validators.forEach(validator => {
        switch (validator) {
          case 'not-blank': resultArr.push(FieldValidator.notBlank); break
          case 'email': resultArr.push(FieldValidator.email); break
          case 'phone': resultArr.push(FieldValidator.phone); break
          case 'number': resultArr.push(FieldValidator.number); break
        }
      })

      return (value) => {
        return resultArr.map((fun) => fun(value))
          .reduce((previous, current) => { return previous && current }, true)
      }
    } else {
      return () => true
    }
  }
}

new ValidateFields($contactForm, event => {
  event.preventDefault()

  const data = getData($contactForm)

  fetch('https://api.geratek.com.br/email/send', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    },
  })
    .then(response => response.json())
    .then(() => {
      alert('Mensagem enviada')
      $contactForm.reset()
    })
    .catch(() => {
      alert('Erro ao enviar mensagem')
    })
});

function getData($form) {
  const $formElements = $form.elements

  const reducer = (acc, $element) => {
    const { checked, name, type, value } = $element

    if (!name || (value.trim() === '' && !checked)) {
      return acc
    }

    if (type === 'number') {
      acc[name] = parseFloat(value)
    } else if (type === 'checkbox' || type === 'radio') {
      acc[name] = checked
    } else {
      acc[name] = value
    }

    return acc
  }

  return Array.from($formElements).reduce(reducer, {})
}
