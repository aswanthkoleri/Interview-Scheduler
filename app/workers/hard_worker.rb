class HardWorker
  include Sidekiq::Worker
  def perform(name, count) # instance method
    # execute something here such as send emails, cleanup things
		# this happens when a job in the queue is taken out the queue,
    # getting processed
		puts "test worker log"
  end
end