/* * */

interface MessageData {
	content: string
	title: string
}

/* * */

export const getNotificationPlainTemplate = (messageData: MessageData) => {
	return `
		<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
		<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
		<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="format-detection" content="telephone=no">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>
		</title>
		<style type="text/css" emogrify="no">#outlook a { padding:0; } .ExternalClass { width:100%; } .ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; } table td { border-collapse: collapse; mso-line-height-rule: exactly; } .editable.image { font-size: 0 !important; line-height: 0 !important; } .nl2go_preheader { display: none !important; mso-hide:all !important; mso-line-height-rule: exactly; visibility: hidden !important; line-height: 0px !important; font-size: 0px !important; } body { width:100% !important; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; margin:0; padding:0; } img { outline:none; text-decoration:none; -ms-interpolation-mode: bicubic; } a img { border:none; } table { border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; } th { font-weight: normal; text-align: left; } *[class="gmail-fix"] { display: none !important; } </style>
		<style type="text/css" emogrify="no"> @media (max-width: 600px) { .gmx-killpill { content: ' \x03D1';} } </style>
		<style type="text/css" emogrify="no">@media (max-width: 600px) { .gmx-killpill { content: ' \x03D1';} .r0-o { border-style: solid !important; margin: 0 auto 0 auto !important; width: 320px !important } .r1-i { background-color: #ffffff !important } .r2-o { border-style: solid !important; margin: 0 auto 0 auto !important; width: 100% !important } .r3-c { box-sizing: border-box !important; display: block !important; valign: middle !important; width: 100% !important } .r4-o { border-style: solid !important; width: 100% !important } .r5-i { padding-bottom: 0px !important; padding-left: 0px !important; padding-right: 0px !important; padding-top: 0px !important } .r6-c { box-sizing: border-box !important; text-align: center !important; valign: middle !important; width: 100% !important } .r7-i { background-color: #ebe9e6 !important; padding-bottom: 15px !important; padding-left: 20px !important; padding-right: 20px !important; padding-top: 15px !important } .r8-o { border-style: solid !important; margin: 0 auto 0 0 !important; width: 100% !important } .r9-i { padding-bottom: 10px !important; padding-left: 10px !important; padding-right: 10px !important; padding-top: 10px !important; text-align: left !important } .r10-i { padding-bottom: 20px !important; padding-left: 10px !important; padding-right: 10px !important; padding-top: 20px !important; text-align: left !important } .r11-c { box-sizing: border-box !important; text-align: center !important; valign: top !important; width: 100% !important } .r12-i { padding-bottom: 10px !important; padding-left: 15px !important; padding-right: 15px !important; padding-top: 10px !important } .r13-c { box-sizing: border-box !important; display: block !important; valign: top !important; width: 100% !important } .r14-i { padding-bottom: 0px !important; padding-left: 0px !important; padding-right: 0px !important; padding-top: 0px !important; text-align: left !important } body { -webkit-text-size-adjust: none } .nl2go-responsive-hide { display: none } .nl2go-body-table { min-width: unset !important } .mobshow { height: auto !important; overflow: visible !important; max-height: unset !important; visibility: visible !important } .resp-table { display: inline-table !important } .magic-resp { display: table-cell !important } } </style>
		<!--[if !mso]>
		<!-->
		<style type="text/css" emogrify="no">@import url("https://fonts.googleapis.com/css2?family=Lato"); </style>
		<!--<![endif]-->
		<style type="text/css">p, h1, h2, h3, h4, ol, ul, li { margin: 0; } .nl2go-default-textstyle { color: #3b3f44; font-family: Arial; font-size: 16px; line-height: 1.5; word-break: break-word } .default-button { color: #ffffff; font-family: Arial; font-size: 16px; font-style: normal; font-weight: normal; line-height: 1.15; text-decoration: none; word-break: break-word } a, a:link { color: #9e2064; text-decoration: underline } .default-heading1 { color: #1F2D3D; font-family: Arial; font-size: 36px; word-break: break-word } .default-heading2 { color: #1F2D3D; font-family: Arial; font-size: 32px; word-break: break-word } .default-heading3 { color: #1F2D3D; font-family: Arial; font-size: 24px; word-break: break-word } .default-heading4 { color: #1F2D3D; font-family: Arial; font-size: 18px; word-break: break-word } a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; font-size: inherit !important; font-family: inherit !important; font-weight: inherit !important; line-height: inherit !important; } .no-show-for-you { border: none; display: none; float: none; font-size: 0; height: 0; line-height: 0; max-height: 0; mso-hide: all; overflow: hidden; table-layout: fixed; visibility: hidden; width: 0; } </style>
		<!--[if mso]>
		<xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml>
		<![endif]-->
		<style type="text/css">a:link{color: #9e2064; text-decoration: underline;}</style>
		</head>
		<body bgcolor="#ffffff" text="#3b3f44" link="#9e2064" yahoo="fix" style="background-color: #ffffff;"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" class="nl2go-body-table" width="100%" style="background-color: #ffffff; width: 100%;">
		<tr>
		<td> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="500" align="center" class="r0-o" style="table-layout: fixed; width: 500px;">
		<tr>
		<td valign="top" class="r1-i" style="background-color: #ffffff;"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" align="center" class="r2-o" style="background-color: #ebe9e6; table-layout: fixed; width: 100%;">
		<tr>
		<th width="100%" valign="middle" class="r3-c" style="font-weight: normal;"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="500" align="center" class="r2-o" style="table-layout: fixed; width: 500px;">
		<tr>
		<td style="font-size: 0px; line-height: 0px;"> <img src="https://spginecologia.pt/wp-content/mu-plugins/post_office/templates/imgs/spg-mail-header@2x.png" width="500" border="0" style="display: block; width: 100%;">
		</td> </tr>
		</table>
		</th> </tr>
		</table>
		<table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" align="center" class="r2-o" style="background-color: #ebe9e6; table-layout: fixed; width: 100%;">
		<tr>
		<th width="100%" valign="middle" class="r3-c" style="font-weight: normal;"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="500" align="center" class="r2-o" style="table-layout: fixed;">
		<tr>
		<td class="r5-i" style="height: 2px;"> <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation">
		<tr>
		<td>
		<table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation" class="r5-i" height="2" style="border-top-style: solid; background-clip: border-box; border-top-color: #ffffff; border-top-width: 2px; font-size: 2px; line-height: 2px;">
		<tr>
		<td height="0" style="font-size: 0px; line-height: 0px;">­</td> </tr>
		</table>
		</td> </tr>
		</table>
		</td> </tr>
		</table>
		</th> </tr>
		</table>
		<table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" align="center" class="r2-o" style="table-layout: fixed; width: 100%;">
		<tr>
		<td class="r7-i" style="background-color: #ebe9e6; padding-bottom: 15px; padding-left: 20px; padding-right: 20px; padding-top: 15px;"> <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation">
		<tr>
		<th width="100%" valign="middle" class="r3-c" style="font-weight: normal;"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" align="left" class="r8-o" style="table-layout: fixed; width: 100%;">
		<tr>
		<td align="left" valign="top" class="r9-i nl2go-default-textstyle" style="color: #3b3f44; font-family: Arial; font-size: 16px; word-break: break-word; line-height: 1; padding-bottom: 10px; padding-left: 10px; padding-right: 10px; padding-top: 10px; text-align: left;"> <div>
		<p style="margin: 0;">
		<span style="color: #000000; font-family: lato, arial; font-size: 18px;">
		<strong>${messageData.title}</strong>
		</span>
		</p>
		</div> </td> </tr>
		</table>
		<table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" align="left" class="r8-o" style="table-layout: fixed; width: 100%;">
		<tr>
		<td align="left" valign="top" class="r9-i nl2go-default-textstyle" style="color: #3b3f44; font-family: Arial; font-size: 16px; word-break: break-word; line-height: 1.3; padding-bottom: 10px; padding-left: 10px; padding-right: 10px; padding-top: 10px; text-align: left;"> <div>
		<p style="margin: 0;">${messageData.content}</p>
		</div> </td> </tr>
		</table>
		<table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" align="left" class="r8-o" style="table-layout: fixed; width: 100%;">
		<tr>
		<td align="left" valign="top" class="r10-i nl2go-default-textstyle" style="color: #3b3f44; font-family: Arial; font-size: 16px; word-break: break-word; line-height: 1; padding-bottom: 20px; padding-left: 10px; padding-right: 10px; padding-top: 20px; text-align: left;"> <div>
		<p style="margin: 0;">
		<span style="color: #000000; font-family: lato, arial; font-size: 16px;">
		<strong>Academia SPG</strong>
		</span>
		</p>
		</div> </td> </tr>
		</table>
		</th> </tr>
		</table>
		</td> </tr>
		</table>
		<table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" align="center" class="r2-o" style="table-layout: fixed; width: 100%;">
		<tr>
		<td class="r12-i" style="padding-bottom: 10px; padding-top: 10px;"> <table width="100%" cellspacing="0" cellpadding="0" border="0" role="presentation">
		<tr>
		<th width="100%" valign="top" class="r13-c" style="font-weight: normal;"> <table cellspacing="0" cellpadding="0" border="0" role="presentation" width="100%" align="left" class="r8-o" style="table-layout: fixed; width: 100%;">
		<tr>
		<td align="left" valign="top" class="r14-i nl2go-default-textstyle" style="color: #3b3f44; font-family: Arial; font-size: 16px; word-break: break-word; line-height: 1; text-align: left;"> <div>
		<p style="margin: 0;">
		<span style="color: #a09696; font-family: lato, arial; font-size: 10px;">Esta mensagem foi enviada automaticamente. Entre em contacto connosco se precisar de mais informações ou se acha que recebeu esta mensagem por engano. Visite o nosso site em </span>
		<a href="https://spginecologia.pt" target="_blank" style="color: #9e2064; text-decoration: underline;">
		<span style="font-family: lato, arial; font-size: 10px;">https://spginecologia.pt</span>
		</a>
		</p>
		</div> </td> </tr>
		</table>
		</th> </tr>
		</table>
		</td> </tr>
		</table>
		</td> </tr>
		</table>
		</td> </tr>
		</table>
		</body>
		</html>
	`;
};
