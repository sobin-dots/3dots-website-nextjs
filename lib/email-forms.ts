/**
 * Catalog of every "form event" that can trigger an email.
 *
 * Each entry describes:
 *   - key:      stable identifier persisted in FormEmailMapping.formKey
 *   - label:    human-friendly name shown in admin UI
 *   - audience: "admin" (sent to staff) or "user" (sent to the end user)
 *   - variables: placeholders the template author can use, e.g. {{name}}
 *
 * To wire a new form to email, add an entry here and call sendFormEmail()
 * from the route handler with the matching variables.
 */
export type FormAudience = "admin" | "user";

export interface FormEventDefinition {
  key: string;
  label: string;
  group: string;
  audience: FormAudience;
  description: string;
  variables: string[];
}

export const FORM_EVENTS: FormEventDefinition[] = [
  // Contact Us
  {
    key: "contact_admin",
    label: "Contact Inquiry — Admin Notification",
    group: "Contact Us",
    audience: "admin",
    description: "Sent to the admin every time someone submits the contact form.",
    variables: ["name", "email", "phone", "message", "submittedAt"],
  },
  {
    key: "contact_user",
    label: "Contact Inquiry — User Confirmation",
    group: "Contact Us",
    audience: "user",
    description: "Auto-reply confirming the inquiry was received.",
    variables: ["name", "email", "message", "submittedAt"],
  },

  // Launchpad
  {
    key: "launchpad_admin",
    label: "Launchpad Application — Admin Notification",
    group: "Launchpad",
    audience: "admin",
    description: "Sent to the admin when a Launchpad application is submitted.",
    variables: [
      "fullName",
      "email",
      "mobileNumber",
      "startupName",
      "category",
      "description",
      "submittedAt",
    ],
  },
  {
    key: "launchpad_user",
    label: "Launchpad Application — User Confirmation",
    group: "Launchpad",
    audience: "user",
    description: "Sent to the founder confirming receipt of their pitch.",
    variables: ["fullName", "email", "startupName", "submittedAt"],
  },

  // Careers / Job Applications
  {
    key: "job_application_admin",
    label: "Job Application — Admin Notification",
    group: "Careers",
    audience: "admin",
    description: "Sent to HR/admin every time a candidate applies.",
    variables: [
      "fullName",
      "email",
      "phone",
      "position",
      "jobTitle",
      "resumeUrl",
      "coverLetter",
      "submittedAt",
    ],
  },
  {
    key: "job_application_user",
    label: "Job Application — Candidate Confirmation",
    group: "Careers",
    audience: "user",
    description: "Sent to the candidate confirming their application is in.",
    variables: ["fullName", "email", "position", "jobTitle", "submittedAt"],
  },
  {
    key: "job_application_shortlist",
    label: "Job Application — Shortlist Notification",
    group: "Careers",
    audience: "user",
    description: "Sent when the admin shortlists a candidate via 'Inform Applicant'.",
    variables: ["fullName", "email", "position", "jobTitle"],
  },
  {
    key: "job_application_reject",
    label: "Job Application — Rejection Notification",
    group: "Careers",
    audience: "user",
    description: "Sent when the admin rejects a candidate via 'Inform Applicant'.",
    variables: ["fullName", "email", "position", "jobTitle"],
  },
  {
    key: "job_application_reviewing",
    label: "Job Application — Under Review Notification",
    group: "Careers",
    audience: "user",
    description: "Optional update letting the candidate know their application is under review.",
    variables: ["fullName", "email", "position", "jobTitle"],
  },
  {
    key: "interview_invite",
    label: "Interview Invitation",
    group: "Careers",
    audience: "user",
    description:
      "Sent to invite a candidate to an interview. Used by the 'Schedule Interview' action.",
    variables: [
      "fullName",
      "email",
      "position",
      "jobTitle",
      "interviewDate",
      "interviewTime",
      "interviewMode",
      "interviewLocation",
      "interviewerName",
      "requirements",
      "notes",
    ],
  },

  // Newsletter
  {
    key: "newsletter_user",
    label: "Newsletter — Welcome Email",
    group: "Newsletter",
    audience: "user",
    description: "Welcome email after a successful newsletter subscription.",
    variables: ["email", "unsubscribeUrl"],
  },
  {
    key: "newsletter_admin",
    label: "Newsletter — Admin Notification",
    group: "Newsletter",
    audience: "admin",
    description: "Sent to admin when someone subscribes to the newsletter.",
    variables: ["email", "submittedAt"],
  },

  // Appointments
  {
    key: "appointment_user",
    label: "Appointment — Client Confirmation",
    group: "Appointments",
    audience: "user",
    description: "Sent to the client to confirm the booked appointment.",
    variables: ["clientName", "expertName", "date", "reason"],
  },
  {
    key: "appointment_admin",
    label: "Appointment — Admin Notification",
    group: "Appointments",
    audience: "admin",
    description: "Sent to admin when a new appointment is booked.",
    variables: ["clientName", "clientEmail", "expertName", "date", "reason"],
  },
];

export function getFormEvent(key: string): FormEventDefinition | undefined {
  return FORM_EVENTS.find((event) => event.key === key);
}
