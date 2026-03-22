import * as Yup from 'yup'
import { useIntl } from 'react-intl'

export const getValidationSchema = () => {
	const intl = useIntl()
	return Yup.object({
		username: Yup.string()
			.required(intl.formatMessage({ id: 'validation_username_required' }))
			.min(1),
		password: Yup.string()
			.required(intl.formatMessage({ id: 'validation_password_required' }))
			.min(1)
	})
}
