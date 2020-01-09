class Notify
  def initialize(time,interviewId)
    @time = time
    @interviewId = interviewId
  end
end
class InterviewsController < ApplicationController
  before_action :set_interview, only: [:show, :edit, :update, :destroy]
  # GET /interviews
  # GET /interviews.json
  # @@notifyArray = []
  def index
    @interviews = Interview.all
    # ReminderMailer.sample_email("aswanth@interviewbit.com").deliver_now˜
  end

  # GET /interviews/1
  # GET /interviews/1.json
  def show
  end

  # GET /interviews/new
  def new
    @interview = Interview.new
  end

  # GET /interviews/1/edit
  def edit
  end

  # POST /interviews
  # POST /interviews.json
  def create
    @interview = Interview.new(interview_params)
    params[:interview][:participant_ids].each do |participant_id|
      unless participant_id.empty?
      participant = Participant.find(participant_id)
        @interview.participants << participant
      end
    end
    respond_to do |format|
      if @interview.save
        d = @interview.interviewDate
        t = @interview.startTime
        start = DateTime.new(d.year,d.month,d.day,t.hour,t.min,t.sec,t.zone).utc.to_i
        current = Time.now.utc.to_i
        participants = @interview.participants
        # ReminderMailer.sample_email("aswanth@interviewbit.com").deliver_now
        # HardWorker.perform_in((start-current-1800).seconds,participants)
        # puts participants[0].email, participants[1].email
        emails = []
        participants.each do |p|
          emails += [p.email]
          ReminderMailer.created_email(p.email).deliver_now
        end
        puts emails
        # HardWorker.perform_at(2.seconds,emails)
        HardWorker.perform_at((start-current-1800).seconds,emails)
        format.html { redirect_to @interview, notice: 'Interview was successfully created.' }
        format.json { render :show, status: :created, location: @interview }
      else
        format.html { render :new }
        format.json { render json: @interview.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /interviews/1
  # PATCH/PUT /interviews/1.json
  def update
    params[:interview][:participant_ids].each do |participant_id|
      unless participant_id.empty?
      participant = Participant.find(participant_id)
        @interview.participants << participant
      end
    end
    respond_to do |format|

      if @interview.update(interview_params)
        participants = @interview.participants
        emails = []
        participants.each do |p|
          emails += [p.email]
          ReminderMailer.update_email(p.email).deliver_now
        end
        format.html { redirect_to @interview, notice: 'Interview was successfully updated.' }
        format.json { render :show, status: :ok, location: @interview }
      else
        format.html { render :edit }
        format.json { render json: @interview.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /interviews/1
  # DELETE /interviews/1.json
  def destroy
    @interview.destroy
    participants = @interview.participants
        emails = []
        participants.each do |p|
          emails += [p.email]
          ReminderMailer.cancel_email(p.email).deliver_now
        end
    respond_to do |format|
      format.html { redirect_to interviews_url, notice: 'Interview was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_interview
      @interview = Interview.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def interview_params
      params.require(:interview).permit(:startTime, :endTime, :interviewDate, :participants, :title, :resume)
    end
end
