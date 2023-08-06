import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import up from "../up.png";
import down from "../down.png";
import axios from "axios";




function Favourite(){
    let genereids={
    28:'Action',12:'Adventure',16:'Animation',35:'Comedy',80:'Crime',99:'Documentary',18:'Drama',10751:'Family',14:'Fantasy'
    ,36:'History',27:'Horror',10402:'Music',9648:'Mystery',10749:'Romance',878:'Sci-Fi',10770:'TV',53:'Thriller',10752:'War',37:'Western'

   


    }
    const [favourites,setfavourites]=useState([]);
  const [generes,setgeneres]=useState([]);
  const [curgenere,setgenere]=useState('all genere');
  const [movies,setmovies]=useState([]);
  let [pagenumber,setpage]=useState(1);
  const [rating,setrating]=useState(0);
  const [popularity,setpopularity]=useState(0);
  const [search,setsearch]=useState("");
  const [row,setrow]=useState(0);
  
useEffect(()=>{
    
    let oldfav=localStorage.getItem("tmdb");
    oldfav=JSON.parse(oldfav)||[];
    setfavourites([...oldfav]);
},[])
function remove(movie){
  let newarray=favourites.filter((m)=> m.id!=movie.id)
    setfavourites([...newarray]);
    localStorage.setItem("tmdb",JSON.stringify(newarray));
  }

useEffect(()=>{
let temp=favourites.map((movie)=>genereids[movie.genre_ids[0]])
// console.log(temp);
temp=new Set(temp);
setgeneres(["All Generes",...temp]);
},[favourites])


 function goahead(){
    setpage(pagenumber+1);
    // seturl("`https://api.themoviedb.org/3/movie/popular?language=en-US&page=2");
}
function godown(){
    if(pagenumber>1){
    setpage(pagenumber-1);}
}
function remove(movie){
    let newarray=favourites.filter((m)=> m.id!=movie.id)
      setfavourites([...newarray]);
      localStorage.setItem("tmdb",JSON.stringify(newarray));
    }

 const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pagenumber}`,
  //   url: url,
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMGM4MThkYzc3MTcxZWVjMjAwOGNiOWU5ODljZTk2NyIsInN1YiI6IjY0Y2UxZGQzNGQ2NzkxMDExYzE3MDgyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YKQoHoSlO9Dhdyx1B9UoodIQs8SE9wzUamWwonkvu-s'
    }
  };
  
  axios
    .request(options)
    .then(function (response) {
      // console.log(response.data);
      setmovies(response.data.results);
    })
    .catch(function (error) {
      console.error(error);
    });
     


    let filterMovies=[]

    filterMovies= curgenere=="all genere"?favourites: favourites.filter((movie)=>genereids[movie.genre_ids[0]]==curgenere)


    if(rating==1){
filterMovies=filterMovies.sort(function(objA,objB){
    return objA.vote_average-objB.vote_average
})
    }else if(rating==-1){
        filterMovies=filterMovies.sort(function(objA,objB){
            return objB.vote_average-objA.vote_average
    })}
    
    if(popularity==1){
        filterMovies=filterMovies.sort(function(objA,objB){
            return objA.popularity-objB.popularity
        })
            }else if(popularity==-1){
                filterMovies=filterMovies.sort(function(objA,objB){
                    return objB.popularity-objA.popularity
            })}



            filterMovies=filterMovies.filter((movie)=>{
                movie.title.toLowerCase().includes(search.toLowerCase());
                console.log();
            })
            

    return(<>

    <div className="flex justify-center flex-wrap space-x-2 space-y-1 mt-4 px-2">
      {
        generes.map((genere)=>
          <button className={
            curgenere==genere?
            "text-xl p-2 bg-blue-400 text-white rounded-xl font-bold":
            "text-xl p-2 bg-gray-400 hover:bg-blue-400 text-white rounded-xl font-bold"
            
            } onClick={()=>setgenere(genere)}
            >{genere}</button>
        )
      }
        
         
           
               
          
        
     
            {/* <button className={
    curgenere=='action'?
    "text-xl p-2 bg-blue-400 text-white rounded-xl font-bold":
    "text-xl p-2 bg-gray-400 hover:bg-blue-400 text-white rounded-xl font-bold"
    }>  Action</button> */}
        {/* <button className="text-xl p-2 bg-gray-400 hover:bg-blue-400 text-white rounded-xl font-bold"> All Generes</button>
        <button className="text-xl p-2 bg-gray-400 hover:bg-blue-400 text-white rounded-xl font-bold"> All Generes</button> */}
    </div>
    <div className="text-center">
        <input type="text" value={search} onChange={(e)=>{setsearch(e.target.value)}} placeholder="search" className="border border-2 text-center p-1 m-2"/>
        <input type="number" value={row} onChange={(e)=>{setrow(e.target.value)}} placeholder="rows" className="border border-2 text-center p-1 m-2"/>
    </div>
    <div> </div>
    <div> </div>
    
    <div class="flex flex-col">
  <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div class="overflow-hidden">
        <table class="min-w-full text-left text-sm font-light">
          <thead class="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" class="px-6 py-4 text-xl">Name</th>
              <th scope="col" class=" px-6 py-4 text-xl"> <div className="flex"><img src={up} onClick={()=>{setpopularity(0)
                 setrating(-1)}} 
                 className="mr-2 cursor-pointer w-5 h-5"></img> Rating <img src={down} onClick={()=>{setpopularity(0) 
                 setrating(1)}}
                  className="m1-2 mr-2 cursor-pointer  w-5 h-5"></img></div></th>
              <th scope="col" class=" px-6 py-4 text-xl"><div className="flex"><img src={up} onClick={()=>{setrating(0)
                 setpopularity(-1)}} className="mr-2 cursor-pointer w-5 h-5"></img>Popularity<img src={down} onClick={()=>{setrating(0)
                  setpopularity(1)}} className="m1-2 mr-2 cursor-pointer  w-5 h-5"></img></div></th>
              <th scope="col" class="px-6 py-4 text-xl">Genere</th>
              <th  scope="col" class="px-6 py-4 text-xl">Remove From Fav</th>
            </tr>
          </thead>
          <tbody>
            {
            filterMovies.map((movie)=>(
            <tr class="border-b dark:border-neutral-500">
              <td class="whitespace-nowrap px-6 py-4 font-medium">
              <div  className={`relative bg-[url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})] h-[20vh] w-[100px] md:h-[30vh] md:w-[180px] bg-center bg-cover rounded-xl flex  items-end  m-4 hover:scale-110 ease-out duration-300`}>
              <div className="w-full bg-gray-900 text-white py-2 text-center rounded-b-xl font-bold ">{movie.title}</div>
              </div>
                </td>
              <td class="whitespace-nowrap px-6 py-4 font-bold">{movie.vote_average}</td>
              <td class="whitespace-nowrap px-6 py-4 font-bold">{movie.popularity}</td>
              <td class="whitespace-nowrap px-6 py-4 font-bold text-green-500">{ genereids[movie.genre_ids[0]]}
              
              
              
              </td>
              <td class="whitespace-nowrap px-6 py-4 font-bold"><button className="px-6 py-4 hover:text-red-500" onClick={()=>remove(movie)}>delete</button></td>
            </tr>))
}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>




    <div className="mt-4">

    <Pagination pagenumber={pagenumber} goahead={goahead} godown={godown} />
    </div>

    </>);
}
export default Favourite;