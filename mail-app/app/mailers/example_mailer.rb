class ExampleMailer < ApplicationMailer
	default from: 'aswanth9495@example.com'
	def sample_email(user)
    @user = user
    @url  = 'http://www.gmail.com'
    mail(to: @user.email, subject: 'Sample Email')
  end
end
