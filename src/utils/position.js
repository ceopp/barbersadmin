export const languages = {
    uz: 'O\'zbek',
    ru: 'Русский',
    en: 'English',
}

export const classes = {
    admin: 'is-success',
    accountant: 'is-danger',
    marketing: 'is-primary',
    teacher: 'is-warning',
}

export function position(name) {
    return languages[name]
}

export function positionClass(name) {
    return classes[name]
}
