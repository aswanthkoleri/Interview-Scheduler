class HardWorker
  include Sidekiq::Worker
  def perform(emails) # instance method
    # execute something here such as send emails, cleanup things
		# this happens when a job in the queue is taken out the queue,
    # getting processed
    # puts "Emails are sent"
    # puts emails
    # ReminderMailer.sample_email().deliver_now
    emails.each do |e|
      # puts "One email done"
      ReminderMailer.sample_email(e).deliver_now
    end
    # Send a mail when work is started in 2 seconds
    
  end
end