class ReminderMailer < ApplicationMailer
    default from: "aswanth9495@gmail.com"

    def sample_email(email)
        mail(to: email, subject: 'Sample Email')
    end
end
