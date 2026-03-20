// export const waitlistTemplate = (email: string) => {
//   const html = `
//     <div style="font-family: sans-serif; padding: 20px;">
//       <h2>Welcome to Candor</h2>
//       <p>You’ve successfully joined our waitlist.</p>
//       <p>We’ll notify you at <strong>${email}</strong></p>
//     </div>
//   `;

//   return {
//     subject: 'Welcome to Candor',
//     html,
//   };
// };

export const waitlistTemplate = (email: string) => {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>You're on the Candor waitlist</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f6f9; font-family: 'Segoe UI', Helvetica, Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f6f9; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table width="520" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; max-width: 520px; width: 100%; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);">

          <tr>
            <td bgcolor="#050048" style="background:#050048; padding: 32px 40px; text-align: center;">
              <p style="margin: 0 0 8px; color: #f0c040; font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase;">Candor</p>
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">You're in! 🎉</h1>
            </td>
          </tr>

          <tr>
            <td style="padding: 32px 40px;">
              <p style="margin: 0 0 16px; color: #2c3e50; font-size: 15px; line-height: 1.7;">
                Thanks for joining our waitlist! We've secured your spot and will send your invitation to <strong>${email}</strong> as soon as we're ready for you.
              </p>
              <p style="margin: 0 0 28px; color: #2c3e50; font-size: 15px; line-height: 1.7;">
                We're building Candor to take the guesswork out of taxes, giving you a clear and honest view of what your tax without the jargon.
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 28px;">
                <tr>
                  <td align="center">
                    <a href="#" style="display: inline-block; background:#050048; color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; padding: 12px 32px; border-radius: 7px;">
                      Follow our progress →
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0; color: #2c3e50; font-size: 15px; line-height: 1.7;">
                Best,<br/>
                <strong>The Candor Team</strong>
              </p>
            </td>
          </tr>

          <tr>
            <td style="padding: 16px 40px 24px; text-align: center; border-top: 1px solid #e8edf2;">
              <p style="margin: 0; color: #b0bec5; font-size: 12px;">
                Simplifying compliance for everyone.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `;

  return {
    subject: "You're on the Candor waitlist 🎉",
    html,
  };
};
