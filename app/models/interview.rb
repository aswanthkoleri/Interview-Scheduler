class Interview < ApplicationRecord
	has_one_attached :resume
	has_and_belongs_to_many :participants
	# validates :interviewDate
	validate :time_overlap
	def time_overlap
		for participant in participants
			prevInterviews = participant.interviews
			prevInterviews.each do |interview|
				# puts "Date= ",interviewDate, "prev Start time ="+interview.startTime.strftime( "%H%M%S%N" ),"current start time = " + startTime.to_s,"prev end time"+interview.endTime.to_s,"current start time"+endTime.to_s
				# Check if participants are different
				if interview.id != id and interview.interviewDate == interviewDate and (startTime.strftime( "%H%M%S%N" )..endTime.strftime( "%H%M%S%N" )).overlaps?(interview.startTime.strftime( "%H%M%S%N" )..interview.endTime.strftime( "%H%M%S%N" )) 
					errors.add(:Base, "Date and time overlaps")
				end
			end
		end
	end
end


