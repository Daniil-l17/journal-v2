import * as Yup from 'yup'

export const validationSchema = Yup.object({
	username: Yup.string().required('Логин обязателен для заполнения').min(1),
	password: Yup.string().required('Пароль обязателен для заполнения').min(1)
})
