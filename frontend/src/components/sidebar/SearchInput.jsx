import React, { useState } from 'react'
import { MdOutlineYoutubeSearchedFor } from "react-icons/md";
import useConversation from '../../zustand/useConversation';
import useGetComversation from '../../hooks/useGetConversations'
import toast from 'react-hot-toast';

function SearchInput() {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetComversation();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters");
    }

    const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()));
    
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch('');
    } else {
      toast.error(`No user found with name ${search}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2'>
      <input
        type="text"
        placeholder='Search...'
        className='input input-bordered rounded-full'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
        <MdOutlineYoutubeSearchedFor className='w-6 h-6 outline-none' />
      </button>
    </form>
  )
}

export default SearchInput;
