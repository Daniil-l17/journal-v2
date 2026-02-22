import * as Yup from 'yup'

export const getValidationSchema = (formatMessage: (id: string) => string) =>
	Yup.object({
		username: Yup.string()
			.required(formatMessage('validation_username_required'))
			.min(1),
		password: Yup.string()
			.required(formatMessage('validation_password_required'))
			.min(1)
	})
