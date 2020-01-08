class ReviewsController < ApplicationController
  def index
    respond_to do |format|
      format.html
      format.json
    end
  end

  def new
  end
  def create
    Review.create(review_params)
    redirect_to root_path
  end

  def search
    @reviews = Review.search(params[:keyword])
    respond_to do |format|
      format.html
      format.json
    end
  end

  private
  def review_params
    params.require(:review).permit(:tmdb_id, :body)
  end
end
