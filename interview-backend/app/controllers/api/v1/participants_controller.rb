module Api::V1
    class ParticipantsController < ApplicationController
      def index
        @participants = Participant.all
        render json: @participants
      end
      def create
        @participant = Participant.create(participant_params)
        render json: @participant
      end
      def update
        @participant = Participant.find(params[:id])
        @participant.update_attributes(participant_params)
        render json: @participant
      end
      def destroy
        @participant = Participant.find(params[:id])
        if @participant.destroy
          head :no_content, status: :ok
        else
          render json: @participant.errors, status: :unprocessable_entity
        end
      end
      private
        def participant_params
          params.require(:participant).permit(:email)
        end
    end
end