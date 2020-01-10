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
      participantlist = params[:participantlist].to_s.split(",").map(&:to_s)
      puts params[:participantlist]
      puts participantlist
      peeps = []
      for p in participantlist
        par = Participant.find_by(:email => p)
        # puts par.email
        if not par
          par = Participant.new(:email => p)
          par.save
        end
        peeps << par
      end
      puts peeps
      if not Interview.time_overlap(peeps,@interview)
        @interview.save
        emails = []
        for p in peeps
          emails << p.email
          @interview.participants << p
        end
        t = @interview.start
        d = @interview.date
        c= Time.now
        current = DateTime.new(c.year,c.month,c.day,c.hour,c.min,c.sec).to_i
        start = DateTime.new(d.year,d.month,d.day,t.hour,t.min,t.sec).utc.to_i
        SendReminderEmailWorker.perform_at(start-current-1800,emails,@interview.id)
        render json: @interview
      else
        render json: {status: "error", code: 3000, message: "There is overalap in date and time"}
      end 
    end
    def update
      @interview = Interview.find(params[:id])
      currentInterview =Interview.new(interview_params)
      puts currentInterview.title
      currentInterview.id=params[:id]
      puts currentInterview.id
      participantlist = params[:participantlist].to_s.split(",").map(&:to_s)
      peeps = []
      for p in participantlist
        par = Participant.find_by(:email => p)
        # puts par.email
        if not par
          par = Participant.new(:email => p)
          par.save
        end
        peeps << par
      end
      puts peeps
      if not Interview.time_overlap(peeps,currentInterview)
        @interview.update_attributes(interview_params)
        emails = peeps.map{|p| p.email}
        t = @interview.start
        d = @interview.date
        c= Time.now
        current = DateTime.new(c.year,c.month,c.day,c.hour,c.min,c.sec).to_i
        start = DateTime.new(d.year,d.month,d.day,t.hour,t.min,t.sec).utc.to_i
        SendReminderEmailWorker.perform_at((start-current-1800),emails,@interview.id)
        @interview.participants.clear
        for p in peeps
          # participant = Participant.find(p)
          @interview.participants << p
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