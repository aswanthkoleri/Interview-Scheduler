class CreateParticipants < ActiveRecord::Migration[5.2]
  def change
    create_table :participants do |t|
      t.string :name
      t.string :role
      t.integer :interview_id
      t.timestamps
    end
  end
end
