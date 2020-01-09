class SendReminderEmailWorker
  include Sidekiq::Worker
  def perform(emails,interviewid)
    puts "The reminder mail will be sent"
    interview1 = Interview.find(interviewid)
    if interview1
      puts "The Interview is found"
      t = interview1.start
      d = interview1.date
      start = DateTime.new(d.year,d.month,d.day,t.hour,t.min,t.sec,t.zone).utc.to_i
      c = Time.now
      puts emails
      
      current = DateTime.new(c.year,c.month,c.day,c.hour,c.min,c.sec).utc.to_i
      puts (start-current)
      if (start-current) <= 1800 and (start-current) >= 1700
        emails.each do |e|
          puts "The mail is sent to : "+e.to_s
          ReminderMailer.reminder_email(e).deliver_now
        end
      end
    end
  end
end
