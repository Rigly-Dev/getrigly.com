---
title: Mail
description: Catch every email your apps send and read it in Rigly, sorted by project.
---
Rigly catches the email your local apps send, so nothing reaches a real inbox by accident. Open the **Mail** window from the sidebar or the menu bar to read it.

## Send mail to Rigly

Rigly runs a mail server on `127.0.0.1` port `1025`. It accepts any username and password, without TLS. For Laravel, set this in `.env`:

```sh
MAIL_MAILER=smtp
MAIL_HOST=127.0.0.1
MAIL_PORT=1025
```

For WordPress or plain PHP, use an SMTP plugin or library with the same host and port.

## Reading mail

The Mail window shows each message as HTML or plain text, with its source, headers and attachments. A notification appears when new mail arrives; click it to open the message.

## Mailboxes per project

Mail is sorted into a mailbox for each project. Rigly picks the mailbox from, in order:

1. the sender's name, which is Laravel's `MAIL_FROM_NAME`;
2. the SMTP username, which is Laravel's `MAIL_USERNAME`;
3. the sender's domain, if it matches a site: mail from `orders@shop.test` goes to **shop**.

Anything else goes to **Unassigned**.

## From the command line

```sh
rigly mail          # list caught mail
rigly mail:clear    # delete it all
```

Rigly keeps the newest 500 messages.
