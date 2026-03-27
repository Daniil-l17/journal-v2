export type HomeworkStud = {
  id: number
  filename: string | null
  file_path: string | null
  tmp_file: string | null
  mark: number | null
  creation_time: string | null
  stud_answer: string | null
  auto_mark: boolean
}

export type HomeworkComment = {
  text_comment: string | null
  attachment: string | null
  attachment_path: string | null
  date_updated: string | null
}

export type HomeworkItem = {
  id: number
  id_spec: number
  id_teach: number
  id_group: number
  fio_teach: string
  theme: string
  completion_time: string
  creation_time: string
  overdue_time: string
  filename: string | null
  file_path: string | null
  comment: string
  name_spec: string
  status: number
  common_status: number | null
  homework_stud: HomeworkStud | null
  homework_comment: HomeworkComment | null
  cover_image: string | null
}


