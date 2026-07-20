import { useState } from "react";

function PaginationCom() {
    const [books, useBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const fetchBooks = async () => {
        setLoading(true);
        try {
            const response = await fetch()
        }
      }
    
      return () => {
        second
      }
    }, [third])
    

    return (
        <div></div>
    )
}

export default PaginationCom;