# EmailJS Contact Form Setup Instructions

## 1. Get Your EmailJS Public Key

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Sign in to your account
3. Navigate to **Account** → **General**
4. Copy your **Public Key** (it looks like: `YOUR_PUBLIC_KEY`)

## 2. Update the Contact Page

Open `/src/app/contact/page.tsx` and replace this line:

```typescript
emailjs.init("YOUR_PUBLIC_KEY"); // You need to add your public key here
```

With your actual public key:

```typescript
emailjs.init("your_actual_public_key_here");
```

## 3. Setup EmailJS Template

### Service ID: `service_vimorsl`

### Template ID: `template_o5pa1ug`

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Navigate to **Email Templates**
3. Find your template `template_o5pa1ug`
4. Click **Edit Template**
5. Switch to **HTML** view
6. Copy the entire content from `emailjs-template.html` file
7. Paste it into the template editor
8. Click **Save**

### Template Variables Used:

- `{{to_name}}` - Ministry name (hardcoded as "Ismael Silva Ministry")
- `{{from_name}}` - Sender's full name
- `{{from_email}}` - Sender's email address
- `{{phone}}` - Sender's phone number
- `{{subject}}` - Message subject
- `{{message}}` - The actual message content

## 4. Configure Email Service

Make sure your email service (`service_vimorsl`) is properly configured:

1. Go to **Email Services** in EmailJS Dashboard
2. Select your service `service_vimorsl`
3. Configure your email provider (Gmail, Outlook, etc.)
4. Test the connection

## 5. Test the Contact Form

1. Run your development server:

   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/contact`
3. Fill out the form with test data
4. Click "Send Message"
5. Check your configured email inbox for the message

## 6. Update Contact Information (Optional)

In `/src/app/contact/page.tsx`, update the contact cards with your actual information:

```typescript
// Email Card
contact@ismaelsilva.com  // Replace with your actual email

// Phone Card
"Available upon request"  // Replace with your phone or keep as is

// Location Card
"Serving communities worldwide"  // Update with your location
```

## Troubleshooting

### Error: "Failed to send message"

- Check that your Public Key is correct
- Verify Service ID and Template ID match your EmailJS dashboard
- Check browser console for detailed error messages
- Make sure your EmailJS account is active and not rate-limited

### Template Variables Not Showing

- Make sure variable names match exactly: `{{from_name}}`, `{{from_email}}`, etc.
- Template variables are case-sensitive
- Check that the template is saved after editing

### Email Not Received

- Check spam/junk folder
- Verify email service configuration in EmailJS
- Test email service connection in EmailJS dashboard
- Check EmailJS usage quota

## Features Included

✅ Beautiful responsive contact form
✅ Dark mode support
✅ Multi-language support (English/Portuguese)
✅ Form validation
✅ Loading states
✅ Success/error messages
✅ Professional HTML email template
✅ Mobile-friendly design
✅ Accessibility features

## Navigation

The contact page is now accessible via:

- Navbar "Contact" link
- Direct URL: `/contact`
- The old `/#contact` section has been replaced with the new dedicated page

Enjoy your new contact form! 🎉
