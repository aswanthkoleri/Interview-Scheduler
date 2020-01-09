module Api::V1
    class InterviewsController < ApplicationController
      def index
        @interviews = Interview.all
        # ReminderMailer.reminder_email("aswanth9495@gmail.com").deliver_now
        # puts @interviews
        render json: @interviews
      end
      def show
        @interview = Interview.find(params[:id])
        render json: @interview.attributes.merge({"participants" => @interview.participants})
      end
      def create
        @interview = Interview.new(interview_params)
        participantlist = params[:participantlist].to_s.split(",").map(&:to_i)
        puts params[:participantlist]
        puts participantlist
        peeps = []
        for p in participantlist
          participant = Participant.find(p)
          # puts participant.name
          # @interview.participants << participant
          peeps << participant
        end
        # isOverlap =
        puts "Peeepssssssssssss"
        puts peeps
        if not Interview.time_overlap(peeps,@interview)
          @interview.save
          # emails = @interview.participants.map{|p| p.email}
          # puts "The Create and Reminder block"
          # puts emails
          emails = []
          for p in participantlist
            participant = Participant.find(p)
            puts participant.name
            emails << participant.email
            @interview.participants << participant
            # peeps << participant
          end
          t = @interview.start
          d = @interview.date
          # puts t
          # puts d
          # puts "Time now"+Time.now.to_s
          c= Time.now
          current = DateTime.new(c.year,c.month,c.day,c.hour,c.min,c.sec).to_i
          # puts DateTime.new(c.year,c.month,c.day,c.hour,c.min,c.sec)
          start = DateTime.new(d.year,d.month,d.day,t.hour,t.min,t.sec).utc.to_i
          # puts "Start time"+DateTime.new(d.year,d.month,d.day,t.hour,t.min,t.sec,t.zone).to_s
          # puts "Reminder will work at",(start-current)
          SendReminderEmailWorker.perform_at(start-current-1800,emails,@interview.id)
          render json: @interview
        else
          render json: {status: "error", code: 3000, message: "There is overalap in date and time"}
        end 
        # puts "IT is working"
        # puts params[:participantlist]
      end
      def update
        @interview = Interview.find(params[:id])
        currentInterview =Interview.new(interview_params)
        participantlist = params[:participantlist].to_s.split(",").map(&:to_i)
        peeps = []
        for p in participantlist
          participant = Participant.find(p)
          # puts participant.name
          # @interview.participants << participant
          peeps << participant
        end
        puts peeps
        if not Interview.time_overlap(peeps,currentInterview)
          @interview.update_attributes(interview_params)
          emails = @interview.participants.map{|p| p.email}
          t = @interview.start
          d = @interview.date
          # puts t
          # puts d
          # puts "Time now"+Time.now.to_s
          c= Time.now
          current = DateTime.new(c.year,c.month,c.day,c.hour,c.min,c.sec).to_i
          # puts DateTime.new(c.year,c.month,c.day,c.hour,c.min,c.sec)
          start = DateTime.new(d.year,d.month,d.day,t.hour,t.min,t.sec).utc.to_i
          SendReminderEmailWorker.perform_at((start-current-1800),emails,@interview.id)
          for p in participantlist
            participant = Participant.find(p)
            # puts participant.name
            @interview.participants.clear
            @interview.participants << participant
            # peeps << participant
          end
        render json: @interview
      else
        render json: {status: "error", code: 3000, message: "There is overalap in date and time"}
      end 
    end
      def destroy
        @interview = Interview.find(params[:id])

        if @interview.destroy
          head :no_content, status: :ok
        else
          render json: @interview.errors, status: :unprocessable_entity
        end
      end
      private
        def interview_params
          params.require(:interview).permit(:date,:start,:end,:title,:participantlist)
        end
    end
  end