//ticket status
export const NEW = 1;
export const IN_PROGRESS = 2;
export const RESOLVED = 3;

//pages
export const MAIN = 1;
export const ADMIN = 2;

//main page fields
export const HEADER_FIELDS = {
  'header': 'Brief Summary (50 characters or less)',
  'urgent': 'Is this urgent?'
};
export const BODY_FIELDS = {
  'body': 'Detailed Issue (400 characters or less)',
  'first_name': 'First Name:',
  'last_name': 'Last Name:',
  'email': 'Email:'
};

//state
export const NEW_TICKET_STATE = {
  status_id: 1,
  header: '',
  body: '',
  urgent: '',
  first_name: '',
  last_name: '',
  email: ''
};