json.extract! interview, :id, :startTime, :endTime, :interviewDate, :participants, :title, :created_at, :updated_at
json.url interview_url(interview, format: :json)
