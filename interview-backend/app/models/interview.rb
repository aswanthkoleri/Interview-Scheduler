class Interview < ApplicationRecord
    has_and_belongs_to_many :participants
    # validate :time_overlap
    def self.time_overlap(participants,currentInterview)
        puts "Proof that time overalap is running" 
        puts participants
		for participant in participants
			prevInterviews = participant.interviews
            prevInterviews.each do |interview|
                puts interview.id != currentInterview.id, interview.date == currentInterview.date , currentInterview.start.strftime( "%H%M%S%N" )<= interview.end.strftime( "%H%M%S%N" ) , currentInterview.end.strftime( "%H%M%S%N" ) >= interview.start.strftime( "%H%M%S%N" )
				if interview.id != currentInterview.id and interview.date == currentInterview.date and currentInterview.start.strftime( "%H%M%S%N" )<= interview.end.strftime( "%H%M%S%N" ) and currentInterview.end.strftime( "%H%M%S%N" ) >= interview.start.strftime( "%H%M%S%N" )
					return true
                end
            end
        end
        return false
    end
    
end
