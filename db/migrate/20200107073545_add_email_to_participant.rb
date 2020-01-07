class AddEmailToParticipant < ActiveRecord::Migration[5.2]
  def change
    add_column :participants, :email, :email
  end
end
