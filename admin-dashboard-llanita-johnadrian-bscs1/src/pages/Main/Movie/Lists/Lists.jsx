import { useNavigate } from 'react-router-dom';
import './Lists.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';

const Lists = () => {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const [lists, setLists] = useState([]);
  const { setMovieData } = useOutletContext();

  const updateMovieData = (movie) => {
    // Update the movie data
    setMovieData(movie);
  };

  const getMovies = () => {
    //get the movies from the api or database
    axios.get('/movies').then((response) => {
      console.log(response)
      setLists(response.data);
    });
  };
  useEffect(() => {
    getMovies();
  }, []);

  const handleDelete = (id) => {
    const isConfirm = window.confirm(
      'Are you sure that you want to delete this data?'
    );
    if (isConfirm) {
      axios
        .delete(`/movies/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then(() => {
          //update list by modifying the movie list array
          const tempLists = [...lists];
          const index = lists.findIndex((movie) => movie.id === id);
          if (index !== undefined || index !== -1) {
            tempLists.splice(index, 1);
            setLists(tempLists);
          }

          //update list by requesting again to api
          // getMovies();
        });
    }
  };

  return (
    <>
      <div className='lists-container'>
        <div className='create-container'>
          <button
            className='createbutton'
            type='button'
            onClick={() => {
              navigate('/main/movies/form');
            }}
          >
            Create new
          </button>
        </div>
        <div className='table-container'>
          <table className='movie-lists'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {lists.map((movie, i) => (
                <tr
                  onClick={() => updateMovieData(movie)}
                  key={movie.id}
                >
                  <td>{i}</td>
                  <td style={{ cursor: 'pointer' }}>{movie.title}</td>
                  <td>
                    <button
                      className='editbutton'
                      type='button'
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the row click from triggering
                        navigate(`/main/movies/form/${movie.id}`);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className='deletebutton'
                      type='button'
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the row click from triggering
                        handleDelete(movie.id);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className='castcrewbutton'
                      type='button'
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the row click from triggering
                        navigate(`${movie.id}/cast-and-crews`);
                      }}
                    >
                      View Cast & Crew
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </>
  );
};

export default Lists;
