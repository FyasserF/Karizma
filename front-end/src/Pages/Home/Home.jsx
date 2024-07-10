import { Link, useMatch } from "react-router-dom";
import BookCard from "../../components/BookCard/BookCard";
import logo from '../../assets/R.png'


export default function Home() {
    const books = [
        {
            title: "The Great Gatsby",
            image: "https://images-na.ssl-images-amazon.com/images/I/51Npu5ZFHML._SX303_BO1,204,203,200_.jpg",
            width: 303,
            height: 400,
            category: "Classic Literature",
            number_comments: 120,
            number_stars: 4.2
        },
        {
            title: "Sapiens: A Brief History of Humankind",
            image: "https://images-na.ssl-images-amazon.com/images/I/51bRzjsb5EL._SX331_BO1,204,203,200_.jpg",
            width: 331,
            height: 400,
            category: "History",
            number_comments: 85,
            number_stars: 4.5
        },
        {
            title: "The Hitchhiker's Guide to the Galaxy",
            image: "https://images-na.ssl-images-amazon.com/images/I/81aWuEpW1nL.jpg",
            width: 265,
            height: 400,
            category: "Science Fiction",
            number_comments: 95,
            number_stars: 4.7
        },
        {
            title: "The Hitchhiker's Guide to the Galaxy",
            image: "https://images-na.ssl-images-amazon.com/images/I/81aWuEpW1nL.jpg",
            width: 265,
            height: 400,
            category: "Science Fiction",
            number_comments: 95,
            number_stars: 4.7
        },
        {
            title: "The Hitchhiker's Guide to the Galaxy",
            image: "https://images-na.ssl-images-amazon.com/images/I/81aWuEpW1nL.jpg",
            width: 265,
            height: 400,
            category: "Science Fiction",
            number_comments: 95,
            number_stars: 4.7
        },
        {
            title: "The Hitchhiker's Guide to the Galaxy",
            image: "https://images-na.ssl-images-amazon.com/images/I/81aWuEpW1nL.jpg",
            width: 265,
            height: 400,
            category: "Science Fiction",
            number_comments: 95,
            number_stars: 4.7
        },
        {
            title: "The Hitchhiker's Guide to the Galaxy",
            image: "https://images-na.ssl-images-amazon.com/images/I/81aWuEpW1nL.jpg",
            width: 265,
            height: 400,
            category: "Science Fiction",
            number_comments: 95,
            number_stars: 4.7
        },
        {
            title: "The Hitchhiker's Guide to the Galaxy",
            image: "https://images-na.ssl-images-amazon.com/images/I/81aWuEpW1nL.jpg",
            width: 265,
            height: 400,
            category: "Science Fiction",
            number_comments: 95,
            number_stars: 4.7
        },
        {
            title: "The Hitchhiker's Guide to the Galaxy",
            image: "https://images-na.ssl-images-amazon.com/images/I/81aWuEpW1nL.jpg",
            width: 265,
            height: 400,
            category: "Science Fiction",
            number_comments: 95,
            number_stars: 4.7
        },
        {
            title: "The Hitchhiker's Guide to the Galaxy",
            image: "https://images-na.ssl-images-amazon.com/images/I/81aWuEpW1nL.jpg",
            width: 265,
            height: 400,
            category: "Science Fiction",
            number_comments: 95,
            number_stars: 4.7
        },
    ];

    return (
        <div className="home">
            <nav className='w-[95%] md:w-5/6 m-auto py-3 flex items-center justify-between'>
                <img src={logo} alt="Example Image" width={100} />

                <div className="flex items-center gap-8">
                    <Link to="/login" className='text-sm md:text-base transition-all duration-300 ease-in-out font-bold hover:text-primary'>
                        Login
                    </Link>

                    <Link href="/signup" className='text-sm text-white md:text-base bg-primary py-2 px-4 font-bold rounded-md transition-all duration-300 ease-in-out hover:opacity-70'>
                        Sign Up
                    </Link>
                </div>
            </nav>

            <div className="w-[95%] h-[700px] md:w-5/6 my-3 mx-auto  bg-gray-800 rounded-lg"></div>


            {/* --- Books section --- */}
            <div className="w-[95%] p-0 md:w-5/6 m-auto md:p-4">

                <h1 className='text-primary font-bold md:text-2xl py-5 sm:text-base'>Explore Books</h1>

                <div className=" sm:grid-cols-2 grid xl:grid-cols-4 gap-x-3 gap-y-5 lg:grid-cols-3 md:grid-cols-3">

                    {books.map((item, index) => (
                        <BookCard key={index} book={item} />
                    ))}

                </div>

            </div>
        </div>
    )
}
