class CreateInterviews < ActiveRecord::Migration[5.1]
  def change
    create_table :interviews do |t|
      t.time :startTime
      t.time :endTime
      t.date :interviewDate
      t.string :participants
      t.string :title

      t.timestamps
    end
  end
end
