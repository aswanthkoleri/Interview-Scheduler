class ReminderMailer < ApplicationMailer
default from: 'interview-scheduler@interviewbit.com'
 
  def reminder_email(email)
    mail(to: email, subject: 'Reminder Email')
  end
end
