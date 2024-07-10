import ronaldo from '../../assets/ronaldo.jpeg'
import { FaRegComments } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";


export default function BookCard({ book }) {
    return (
        <div className=" w-full book-card rounded-lg overflow-hidden">

            <div className="w-full h-80">
                <img src={ronaldo} alt="Example Image" className='w-full h-full object-cover' />
            </div>

            <div className="flex justify-between text-sm mt-3">
                <h4 className='w-1/2 text-left truncate-overflow text-base font-bold'>{book.title}</h4>
                <h4 className='w-1/2 text-right truncate-overflow text-base font-bold'>{book.category}</h4>
            </div>

            <div className="flex gap-3 text-sm mt-3">

                <div className="flex gap-2">
                    <FaRegComments className='text-primary text-base' />
                    <h4 className='truncate-overflow font-bold'>{book.number_comments}</h4>
                </div>

                <div className="flex gap-2">
                    <FaStar className='text-yellow-500 text-base' />
                    <h4 className='truncate-overflow font-bold'>{book.number_stars}</h4>
                </div>
            </div>
        </div>
    )
}