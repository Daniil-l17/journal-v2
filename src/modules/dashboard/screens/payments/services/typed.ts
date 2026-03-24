export type PaymentScheduleItem = {
	id: number
	description: string
	price: number
	payment_date: string
	status: number
}

export type PaymentHistoryItem = {
	date: string
	amount: number
	description: string
	type: number
}
