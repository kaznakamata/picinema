class AddIndexToReviews < ActiveRecord::Migration[5.2]
  def change
    add_index :reviews, :body, length: 32
  end
end
