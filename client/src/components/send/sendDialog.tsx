import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useStore } from "../../store.ts";
import { useFetchTemplates } from "../../hooks/template/useFetchTemplates.ts";
import { useBuildTemplatesDict } from "../../hooks/template/useBuildTemplatesDict.ts";
import { Autocomplete } from "@mui/material";
import { useFetchEmailLists } from "../../hooks/email/useFetchEmailLists.ts";
import { useState } from "react";
import { sendMails } from "../../api.ts";
import { useSnackbar } from "../../hooks/common/useSnackbar.ts";

export const SendDialog = () => {
  const sendDialogOpen = useStore((state) => state.sendDialogOpen);
  const setSendDialogOpen = useStore((state) => state.setSendDialogOpen);
  const [templateKey, setTemplateKey] = useState<string | null>(null);
  const [emailListKey, setEmailListKey] = useState<string | null>(null);
  const { templates } = useFetchTemplates();
  const { templatesDict } = useBuildTemplatesDict({ templates: templates });
  const { emailLists } = useFetchEmailLists();
  const { showSnackbar } = useSnackbar();
  const setTotalDailyMailsSent = useStore(
    (state) => state.setTotalDailyMailsSent
  );

  const buildOptions = (optionsDict: Record<string, string> | null) => {
    if (!optionsDict) return [];
    const options: { label: string; value: string }[] = [];
    Object.keys(optionsDict).map((key) =>
      options.push({ label: key, value: optionsDict[key] })
    );
    return options;
  };

  const handleClose = () => {
    setSendDialogOpen(false);
    setTemplateKey(null);
    setEmailListKey(null);
  };

  const handleSend = async () => {
    if (!templateKey || !emailListKey) return;
    const response = await sendMails(templateKey, emailListKey);
    if (response && response.mails_sent_in_day) {
      setTotalDailyMailsSent(response.mails_sent_in_day);
      setSendDialogOpen(false);
      showSnackbar({
        message: `Mails sent succesfully!`,
        severity: "success",
      });
    }
  };

  return (
    <Dialog open={sendDialogOpen} onClose={handleClose}>
      <DialogTitle>Send Emails</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Choose a template, a mailing list, and click send!
        </DialogContentText>
        <Autocomplete
          disablePortal
          onChange={(e, value) => setTemplateKey(value?.value || null)}
          options={buildOptions(templatesDict)}
          sx={{ width: "95%", marginTop: "1rem" }}
          renderInput={(params) => <TextField {...params} label="Template" />}
        />
        <Autocomplete
          disablePortal
          onChange={(e, value) => setEmailListKey(value?.value || null)}
          options={buildOptions(emailLists)}
          sx={{ width: "95%", marginTop: "1rem" }}
          renderInput={(params) => <TextField {...params} label="List" />}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSend}>Send</Button>
      </DialogActions>
    </Dialog>
  );
};
