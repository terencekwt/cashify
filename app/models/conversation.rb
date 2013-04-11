class Conversation < ActiveRecord::Base
  attr_accessible :board_id, :id, :title, :user_id
  has_many :comments
  belongs_to :user
  belongs_to :board
  validates_presence_of :title
end
