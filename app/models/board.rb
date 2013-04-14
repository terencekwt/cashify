class Board < ActiveRecord::Base
  attr_accessible :id, :title
  has_many :conversations
  def recent_conversations (num)
      Conversation.all(:conditions => 'board_id = ' + self.id.to_s, :order => 'created_at DESC', :limit => num)
  end
end
