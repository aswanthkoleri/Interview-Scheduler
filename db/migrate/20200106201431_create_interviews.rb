class CreateInterviews < ActiveRecord::Migration[5.2]
  def change
    create_table :interviews do |t|
      t.time :startTime
      t.time :endTime
      t.date :interviewDate
      t.integer :participant_id
      t.string :title

      t.timestamps
    end
  end
end
