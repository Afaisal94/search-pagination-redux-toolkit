import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPostsByKeyword } from './features/postSlice';

function App() {
    const [inputSearch, setInputSearch] = useState('');
    const [keyword, setKeyword] = useState('');
    const [items, setItems] = useState([]);
    const [pageCount, setpageCount] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    let limit = 10;
    // let total = 100;
    // setpageCount(Math.ceil(total / limit));
    const dispatch = useDispatch();
    const { posts, totalPosts } = useSelector((state) => ({
        ...state.post
    }));

    useEffect(() => {
        dispatch(fetchPostsByKeyword({currentPage, limit, keyword})); 
        setItems(posts); 
        setpageCount(Math.ceil(totalPosts / limit));
    }, [posts]);

    
    const handlePageClick = async (posts) => {
        console.log(posts.selected);
        setCurrentPage(posts.selected + 1); 
    };

    const handleSearch = (event) => {
        event.preventDefault();
        setKeyword(inputSearch);
    }
    return (
        <div className="container">
            <center><h1>Posts</h1></center>

            <form onSubmit={handleSearch}>
                <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Search" value={inputSearch} onChange={(e) => setInputSearch(e.target.value)} />
                <div className="input-group-append">
                    <button className="btn btn-primary" type="submit">Search</button>
                </div>
                </div>
            </form>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        items.map((item, index) => (
                            <tr key={item.id}>
                                <td>{((currentPage-1)*limit+1)+index}</td>
                                <td>{item.title}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            />
        </div>
    );
}

export default App;
