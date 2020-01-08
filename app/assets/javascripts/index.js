$(function(){
  $(".box-3").on("click", function(){
    function movieRandom(){
      $(".search-reviews").empty();
      var randomPage = 1 + Math.floor(Math.random()*(250))
      var randomResult = Math.floor(Math.random()*(19))
      var url = 'https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=1970-01-01&page=xxxxxx&include_video=false&include_adult=false&sort_by=popularity.desc&language=US-en&api_key=db926ca771f371cb7a61522df8e0f05e' 
      var urls = url.replace(/xxxxxx/, randomPage)

      fetch(urls)
      .then(response => {
        return response.json();
      })
      .then(data => {
        $(".main__center__poster__left__info-title").empty().append(data.results[randomResult].title);
        var pos = "https://image.tmdb.org/t/p/w300/xxxxxx"
        var pospos = pos.replace(/xxxxxx/, data.results[randomResult].poster_path);
        $("img").attr({src: pospos, id: data.results[randomResult].id});
        $("#main__center__poster__left__form__tmdb_id").attr({value: data.results[randomResult].id});
        $(".search-reviews").attr({value: data.results[randomResult].id}); //検索側にも入れる
        $(".main__center__poster__left__info-releasedate").empty().append(data.results[randomResult].release_date);
      })
      .catch(error => {
      });
    }
  

    function searchReview(){
      $(".main__center__poster__left").mouseover(function(){
        var input = $(".search-reviews").val();
        $("img").css({opacity: 0.1});
        $(".main__center__poster__left__writedreview").css({opacity: 1});

        
        $.ajax({
          type: 'GET',
          url: '/reviews/search',
          data: {keyword: input},
          dataType: 'json'
        })
        .done(function(reviews){
          $.each(reviews, function(index, review){
            var writed = review.body
            console.log(writed);
            $(".main__center__poster__left__writedreview").empty().append(`
                                                <li>
                                                ${writed}
                                                </li>
            `);
          })
        })
        .fail(function(){
          console.log("失敗");
        })
        
      })
      $(".main__center__poster__left").mouseout(function(){
        $("img").css({opacity: 1});
        $(".main__center__poster__left__writedreview").css({opacity: 0});
        $(".main__center__poster__left__writedreview").empty();

      })
    }

    function formAppear(){
      // $("form").css({opacity: 1});
      $("#review-body").css({opacity: 1});
    }

    movieRandom();
    formAppear();
    searchReview();
  })
})