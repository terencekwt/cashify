class Comment < ActiveRecord::Base
  attr_accessible :body, :conversation_id, :id, :user_id
  belongs_to :conversation
  belongs_to :user
  validates_presence_of :body
end
