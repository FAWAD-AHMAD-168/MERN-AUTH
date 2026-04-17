import {Resend}  from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const resendEmail = async (to, subject, html) => {
    try {
        const response = await resend.emails.send({
            from: "onboarding@resend.dev",
            to,
            subject,
            html
        });
        return response;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};
