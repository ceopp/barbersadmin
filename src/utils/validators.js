/* eslint-disable no-restricted-syntax */
import { integersOnly } from './number'
import { removeEmojis } from './string'

/* eslint-disable consistent-return */

export function required(value) {
    if (value === '' || value === null || value === undefined || value.length === 0) {
        return 'Это обязательное поле'
    }
}

export function limitFileSize(size, file = null) {
    // size on mb
    return (value) => {
        if ((file || value).size > size * 1048576) {
            return `The maximum file size that can be uploaded is ${size}MB`
        }
    }
}

export function maxNumber(limit) {
    return (value) => {
        if (value > limit) {
            return `Максимальное значение ${limit}`
        }
    }
}

export function minTime(startTime) {
    return (endTime) => {
        const valueStartTime = new Date(`2018.01.01 ${startTime}`).getTime()
        const valueEndTime = new Date(`2018.01.01 ${endTime}`).getTime()
        if (valueStartTime > valueEndTime) {
            return 'Урок не может закончиться прежде чем начаться.'
        }
    }
}

export function email(value) {
    const regx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!regx.test(value)) {
        return 'Incorrect email address'
    }
}

export function phone(value) {
    const integers = integersOnly(value)

    if (integers.length !== 12) {
        return 'Номер телефона должен состоять из 12 цифр'
    }
}

function isNumber(value) {
    return /^-?\d*(\.\d+)?$/.test(value)
}

export function number(value) {
    if (!isNumber(value)) {
        return 'This field should be number'
    }
}

export function max(size) {
    return (value) => {
        if (isNumber(value) && parseFloat(value) > size) {
            return `This field should be less then "${size}"`
        }
    }
}

export function maxLength(size) {
    return (value) => {
        if (value.length > size) {
            return `This field should contain less then "${size}" chars.`
        }
    }
}

export function minLength(size) {
    return (value) => {
        if (value.length < size) {
            return `This field should contain more then "${size}" chars.`
        }
    }
}

export function validator(...validators) {
    return (value) => {
        for (const fn of validators) {
            const message = fn(value)
            if (message) return message
        }
    }
}

export function validateForm(rules) {
    return (data) => {
        const errors = {}
        for (const key of Object.keys(rules)) {
            const message = rules[key](data[key])
            if (message) {
                errors[key] = message
            }
        }
        return errors
    }
}

export function emojiValidate(value) {
    if (removeEmojis(value) !== value) {
        return 'Do not insert emoji in Category name directly. Use separate emoji field'
    }
}
