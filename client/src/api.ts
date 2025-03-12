const server = "http://localhost:8000";

export const getTemplates = async () => {
  const response = await fetch(`${server}/get_templates`, { method: "GET" });
  const data = await response.json();
  return data;
};

export const getTemplate = async (templateKey: string) => {
  const response = await fetch(`${server}/get_template/${templateKey}`, {
    method: "GET",
  });
  const data = await response.json();
  return data;
};

export const getEmailLists = async () => {
  const response = await fetch(`${server}/get_email_lists`, {
    method: "GET",
  });
  const data = await response.json();
  return data;
};

export const getEmailsFromList = async (listKey: string) => {
  const response = await fetch(`${server}/get_emails_from_list/${listKey}`, {
    method: "GET",
  });
  const data = await response.json();
  return data;
};

export const deleteEmail = async (emailKey: string, emailListKey: string) => {
  const response = await fetch(
    `${server}/delete_email?email_key=${emailKey}&email_list_key=${emailListKey}`,
    {
      method: "POST",
    }
  );
  const data = await response.json();
  return data;
};

export const editEmailName = async (name: string, emailListKey: string) =>
  await fetch(
    `${server}/edit_email_name?name=${name}&email_list_key=${emailListKey}`,
    {
      method: "POST",
    }
  );

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
  const data = await response.json();
  return data;
};

export const addTemplate = async (subject: string, body: string) => {
  const response = await fetch(
    `${server}/add_template?subject=${subject}&body=${body}`,
    {
      method: "POST",
    }
  );
  const data = await response.json();
  return data;
};

export const deleteTemplate = async (templateKey: string) => {
  const response = await fetch(`${server}/delete_template/${templateKey}`, {
    method: "POST",
  });
  const data = await response.json();
  return data;
};

export const editTemplate = async (
  templateKey: string,
  subject: string,
  body: string
) => {
  const response = await fetch(
    `${server}/edit_template?template_key=${templateKey}&subject=${subject}&body=${body}`,
    {
      method: "POST",
    }
  );
  const data = await response.json();
  return data;
};
