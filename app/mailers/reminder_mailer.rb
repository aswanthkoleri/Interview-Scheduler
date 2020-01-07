class ReminderMailer < ApplicationMailer
    default from: "aswanth9495@gmail.com"

    def sample_email(email)
        mail(to: email, subject: 'Reminder Email')
    end
    def update_email(email)
        mail(to: email, subject: 'Interview Updated' )
    end
    def cancel_email(email)
        mail(to: email, subject: 'Interview Cancelled')
    end
    def created_email(email)
        mail(to: email, subject: 'Interview Created')
    end
end
