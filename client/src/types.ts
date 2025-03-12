export interface Template {
  subject: string;
  body: string;
}

export interface Email {
  email: string;
  name: string;
  key: string;
}

export interface EmailList {
  name: string;
  emails: Record<string, Email>;
}
