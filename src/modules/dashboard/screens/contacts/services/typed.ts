export type ContactsOperationsResponse = {
	adress: Array<{
		adress_name: string
		learning_tel: string[]
		tel_room: string[]
		schedule_academic: string[]
	}>
	learning_tel: string[]
	teach_main: Array<{
		teachMain_name: string
		href_teach: string[]
	}>
	href_teach: string[]
	tel_room: string[]
	tel_book: null
	tel_economists: null
	site_shag: string[]
	mail_shag: string[]
	vk: string[]
	facebook: null
	instagram: null
	youtube: null
	twitter: null
	google_maps: null
	google_plus: null
	teach_contacts: Array<unknown>
	schedule_academic: string[]
	schedule_office: null
	remote_class_address: null
	happy_manager_contacts: null
}

