$(document).ready(function(){
    $("#searchform").on("submit",function(e){
      var searchtext = $("#searchtext").val();
      getmovie(searchtext);
      e.preventDefault();
    });
});
function getmovie(arg)
{
  axios.get('http://www.omdbapi.com/?s='+arg)
  .then(function (response) {
    var list = response.data.Search;
    var output = "";
    $.each( list, function( index) {
          output += "<div class='col-md-3'><div class='well' style='height:390px;'><img style='height:255px;width:100%;' src='"+list[index].Poster+"'>"
                             +list[index].Title+
                             "<br/><br/><a type='button' href='' onClick=\"return gotoNode('"+ list[index].imdbID + "')\" class='btn btn-primary'>Movie Details</a></div></div>";
    });

    $( "#movies" ).html(output);
  })
  .catch(function (error) {
    console.log(error);
  });
}
function gotoNode(arg) {
  localStorage.setItem('movieid', arg);
  window.location.href = "http://localhost/movieapp/movie.html";
  return false;
}
function getMovie()
{
   var id = localStorage.getItem("movieid");
   axios.get('http://www.omdbapi.com/?i='+id)
   .then(function (response) {
     var singlemve = response.data;
     console.log(singlemve);
     details = `
         <div clas="row">
           <div class="col-md-3" >
             <img src="${singlemve.Poster}" style="height:360px;width:100;"></img>
           </div>
           <div class="col-md-9">
             <h3>${singlemve.Title}</h3>
             <ul class="list-group">
             <li class="list-group-item"><b>Actors : </b> ${singlemve.Actors}</li>
             <li class="list-group-item"><b>Director : </b> ${singlemve.Director}</li>
             <li class="list-group-item"><b>Genre : </b> ${singlemve.Genre}</li>
             <li class="list-group-item"><b>Language : </b> ${singlemve.Language}</li>
             <li class="list-group-item"><b>Released : </b> ${singlemve.Released}</li>
             <li class="list-group-item"><b>Awards : </b> ${singlemve.Awards}</li>
             </ul>
           </div>
         </div>`;
      plot = `
      <div clas="row">
          <div clas="well>
            <div class="col-md-10">
              <h1>Plot</h1>
              <p>${singlemve.Plot}</p>
              <a type = "button" href="http://www.imdb.com/title/${singlemve.imdbID}/" target="_blank" class = "btn btn-primary">View IMDB</a>
              <a type = "button" href="index.html" class = "btn btn-default">Go Back To Search</a>
            </div>
          </div>
      </div>`;
     $( "#movie" ).html(details);
     $( "#plot" ).html(plot);
   })
   .catch(function (error) {
     console.log(error);
   });
}
