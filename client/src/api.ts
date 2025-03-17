const server = "http://localhost:8000";

export const getTemplates = async () => {
  const response = await fetch(`${server}/get_templates`, { method: "GET" });

  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
};

export const getTemplate = async (templateKey: string) => {
  const response = await fetch(`${server}/get_template/${templateKey}`, {
    method: "GET",
  });

  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
};

export const getEmailLists = async () => {
  const response = await fetch(`${server}/get_email_lists`, {
    method: "GET",
  });

  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
};

export const getEmailsFromList = async (listKey: string) => {
  const response = await fetch(`${server}/get_emails_from_list/${listKey}`, {
    method: "GET",
  });

  if (response.status) {
    const data = await response.json();
    return data;
  }
};

export const deleteEmail = async (emailKey: string, emailListKey: string) => {
  const response = await fetch(
    `${server}/delete_email?email_key=${emailKey}&email_list_key=${emailListKey}`,
    {
      method: "POST",
    }
  );

  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
};

export const editEmailName = async (name: string, emailListKey: string) => {
  const response = await fetch(
    `${server}/edit_email_name?name=${name}&email_list_key=${emailListKey}`,
    {
      method: "POST",
    }
  );

  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
};

export const addEmail = async (
  email: string,
  name: string,
  emailListKey: string
) => {
  const response = await fetch(
    `${server}/add_email?email=${email}&name=${name}&email_list_key=${emailListKey}`,
    {
      method: "POST",
    }
  );

  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
};

export const addEmailList = async (name: string) => {
  const response = await fetch(`${server}/add_email_list?name=${name}`, {
    method: "POST",
  });

  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
};

export const deleteEmailList = async (list_key: string) => {
  const response = await fetch(`${server}/delete_email_list/${list_key}`, {
    method: "POST",
  });

  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
};

export const addTemplate = async (subject: string, body: string) => {
  const response = await fetch(`${server}/add_template`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subject, body }),
  });

  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
};

export const deleteTemplate = async (templateKey: string) => {
  const response = await fetch(`${server}/delete_template/${templateKey}`, {
    method: "POST",
  });

  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
};

export const editTemplate = async (
  templateKey: string,
  subject: string,
  body: string
) => {
  const response = await fetch(
    `${server}/edit_template?template_key=${templateKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, body }),
    }
  );

  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
};

export const sendMails = async (templateKey: string, emailListKey: string) => {
  const response = await fetch(
    `${server}/send_mails?template_key=${templateKey}&email_list_key=${emailListKey}`,
    {
      method: "POST",
    }
  );

  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
};

export const getDailyEmails = async () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formatted_date = `${year}-${month}-${day}`;

  const response = await fetch(
    `${server}/get_day_email_count/${formatted_date}`
  );

  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
};

export const checkCredentials = async () => {
  const response = await fetch(`${server}/get_confirmation_credentials`, {
    method: "GET",
  });

  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
};

export const sendAuthCodeToServer = async (code: string) => {
  const response = await fetch(
    `${server}/exchange_code_for_token?code=${code}`,
    {
      method: "POST",
    }
  );

  if (response.status === 200) {
    const data = await response.json();
    return data;
  }
};
