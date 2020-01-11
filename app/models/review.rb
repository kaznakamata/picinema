class Review < ApplicationRecord
  def self.search(search)
    Review.where(tmdb_id: "#{search}")
  end
end
